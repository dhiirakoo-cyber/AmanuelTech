/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to locally persisted JSON database
const DB_FILE = path.join(process.cwd(), 'amoo_database.json');

interface LocalDB {
  users: Record<string, {
    email: string;
    name: string;
    passwordHash: string;
    progress: string[];
    notes: Record<string, string>;
  }>;
  contacts: any[];
}

// Ensure database file exists
function readDB(): LocalDB {
  if (!fs.existsSync(DB_FILE)) {
    const initialDB: LocalDB = {
      users: {
        // Bootstrap a default test user so the app is immediately navigable
        'student@amoo.com': {
          email: 'student@amoo.com',
          name: 'Barataa Amoo (Student)',
          passwordHash: 'amoo123',
          progress: ['pe-l1'], // Pre-complete lesson 1 for demo
          notes: {
            'pe-l1': 'Selection is the foundation of photo editing. Always use Layer Masks!'
          }
        }
      },
      contacts: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2), 'utf-8');
    return initialDB;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading database file, resetting:', e);
    return { users: {}, contacts: [] };
  }
}

function writeDB(db: LocalDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing to database file:', e);
  }
}

// Lazy-initialized Gemini API Client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required but missing. Configure it in Settings > Secrets.');
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

// ==================== AUTHENTICATION API ==================== //

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = readDB();
  const normalizedEmail = email.toLowerCase().trim();
  const user = db.users[normalizedEmail];

  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Incorrect email or password / Iimeeliin ykn password dogoggora' });
  }

  return res.json({
    email: user.email,
    name: user.name,
    progress: user.progress || [],
    notes: user.notes || {}
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const db = readDB();
  const normalizedEmail = email.toLowerCase().trim();

  if (db.users[normalizedEmail]) {
    return res.status(400).json({ error: 'Email already registered / Iimeeliin kun duraan galmaayeera' });
  }

  db.users[normalizedEmail] = {
    email: normalizedEmail,
    name: name.trim(),
    passwordHash: password,
    progress: [],
    notes: {}
  };

  writeDB(db);

  return res.status(201).json({
    email: normalizedEmail,
    name: name.trim(),
    progress: [],
    notes: {}
  });
});

// ==================== USER DATA ENDPOINTS ==================== //

app.post('/api/user/progress', (req, res) => {
  const { email, lessonId, completed } = req.body;
  if (!email || !lessonId) {
    return res.status(400).json({ error: 'Email and lessonId are required' });
  }

  const db = readDB();
  const normalized = email.toLowerCase().trim();
  const user = db.users[normalized];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const currentProgress = user.progress || [];
  if (completed) {
    if (!currentProgress.includes(lessonId)) {
      currentProgress.push(lessonId);
    }
  } else {
    db.users[normalized].progress = currentProgress.filter(id => id !== lessonId);
  }

  db.users[normalized].progress = currentProgress;
  writeDB(db);

  return res.json({ progress: db.users[normalized].progress });
});

app.post('/api/user/notes', (req, res) => {
  const { email, lessonId, noteContent } = req.body;
  if (!email || !lessonId) {
    return res.status(400).json({ error: 'Email and lessonId are required' });
  }

  const db = readDB();
  const normalized = email.toLowerCase().trim();
  const user = db.users[normalized];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.notes) user.notes = {};
  user.notes[lessonId] = noteContent || '';

  writeDB(db);
  return res.json({ notes: user.notes });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const db = readDB();
  const inquiry = {
    id: 'contact_' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  db.contacts.push(inquiry);
  writeDB(db);

  return res.status(201).json({ success: true, inquiry });
});

// ==================== GEMINI STUDY TUTOR PROXY ==================== //

app.post('/api/gemini/tutor', async (req, res) => {
  const { messages, courseId, lessonId, language } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Valid chat messages array is required' });
  }

  try {
    const ai = getGemini();

    // Context setting based on the active course
    let courseContext = 'General Design & Creative suite support.';
    if (courseId === 'photo-editing') {
      courseContext = 'Lesson covers professional non-destructive Photo Editing, pen tools, layer masks, RGB Curves, cinematic color grading, raw filters, frequency separation, and building portfolios for freelancing sites like Fiverr.';
    } else if (courseId === 'graphic-design') {
      courseContext = 'Lesson covers full Graphic Design principles, Vector paths, Boolean geometry combinations (union/exclude), Figma workspace grids and frames, and typography hierarchy rules.';
    } else if (courseId === 'video-editing') {
      courseContext = 'Lesson covers active Video Editing and post production, timing on sequence timelines, A-Roll versus B-Roll footage, cinematic cuts (J-cuts and L-cuts), audio frequency EQ calibration, bitrates, sRGB/Rec709 colorspaces, and social compression matching.';
    }

    const currentLanguageName = language === 'om' ? 'Afaan Oromoo' : 'English';
    
    const systemInstruction = `You are Amanuel, the expert creative design tutor at Amoo Academy located in Harar, Ethiopia (phone: +251967145146).
You are extremely enthusiastic, encouraging, energetic, and practical. 
You speak to students colloquially like your beloved peers ("yo bro!", "dandeettii kee asirraatti gabbifadhu!").
You have world-class expertise in Adobe Photoshop, Figma, and Premiere Pro.

CRITICAL INSTRUCTIONS:
1. You MUST formulate all thoughts and text responses 100% in ${currentLanguageName}. If the language is Afaan Oromoo, avoid English sentences entirely, using common Oromo technical design translations where applicable.
2. Maintain your persona of Amanuel in Harar: warm, wise, helpful, and optimistic. 
3. Direct your answers towards helping them master: ${courseContext}
4. When talking about active lessons, suggest helpful shortcuts (e.g., 'P' for Pen tool in Photoshop, 'F' for Frame in Figma, 'C' to select Razor cut tool in Premiere).
5. Keep your answers formatting clean, visually engaging, structured with markdown tables or bullets, and highly scannable. Limit word count to around 200 words.`;

    // Map message roles to Gemini specifications
    const contents = messages.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Generate output with gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.95
      }
    });

    const reply = response.text || "Sorry, I couldn't formulate a suggestion. Let's try again, bro!";
    return res.json({ reply });

  } catch (error: any) {
    console.error('Gemini interface error:', error);
    // User-friendly error propagation
    const errorMsg = error.message || String(error);
    return res.status(500).json({ 
      error: 'Tutor connection issue / Sirreessi API Key hin jiru.',
      details: errorMsg 
    });
  }
});

// ==================== ASSET SERVING & VITE ==================== //

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Amoo Academy full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
