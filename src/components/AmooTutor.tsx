/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, MessageSquare, Bot, User as UserIcon, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage, Language, Course } from '../types';

interface AmooTutorProps {
  course: Course;
  language: Language;
  theme: 'light' | 'dark';
}

export default function AmooTutor({ course, language, theme }: AmooTutorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Initialize welcome text depending on active language
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: language === 'om' 
          ? 'Yo bro! Maqaan koo Amanuel. Ani tutor diizaayinii keeti Harar irraa! Gulaallii suuraa, Figma, fi Premiere Pro irratti gaaffii qabdu hunda asirratti na gaafachuu dandeessa!'
          : 'Yo bro! My name is Amanuel. I am your creative tutor based in Harar. Ask me any design secrets about photo adjustments, Figma layout variables, or Premiere timelines!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Auto-scroll to lowest chats
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    setErrorDetails(null);
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            text: m.text
          })),
          courseId: course.id,
          language: language
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Connection failed');
      }

      const tutorResponse: ChatMessage = {
        id: 'msg_' + Date.now() + '_reply',
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorResponse]);

    } catch (e: any) {
      console.error('Tutor communication issue:', e);
      setErrorDetails(
        language === 'om' 
          ? 'Tutor quunnamuu hin dandeenye. Maaloo API Key keessan Secrets keessatti galchuufi keessan mirkaneessaa bro!'
          : 'Failed to access the tutor. Please verify GEMINI_API_KEY is configured in Settings > Secrets!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: language === 'om' 
          ? 'Yo bro! Haaraa jalqabna! Gaaffii dandeettii creative haarawa na gaafadhu.'
          : 'Let\'s restart fresh, bro! Ask me any design or editing question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorDetails(null);
  };

  // Pre-loaded custom template triggers depending on course
  const courseTemplates = {
    'photo-editing': [
      { om: 'Curves Tool akkamitti hojjata?', en: 'Explain curves and histograms simply' },
      { om: 'Fiverr irratti portfolio akkamiitti qopheessu?', en: 'How do I present photo work for Fiverr?' },
      { om: 'Frequency Separation trick tokko naaf kenni!', en: 'Give me a frequency separation skin trick' }
    ],
    'graphic-design': [
      { om: 'Figma Components faayidaan isaani maali?', en: 'What is the master components rule?' },
      { om: 'Typography pairing sirriin akkamii dha?', en: 'Give me a golden typography pairing tip' },
      { om: "Bezier Curves to'ooftuuf trick?", en: 'How do I master vector pen curves?' }
    ],
    'video-editing': [
      { om: 'L-cuts fi J-cuts maaliif gargaaru?', en: 'Contrast J-cuts versus L-cuts' },
      { om: 'TikTok viidiyoof bitrate gaariin kami?', en: 'What is the optimal bitrate profile for social uploads?' },
      { om: 'Audio ducking sirreessuf trick naaf kenni!', en: 'Explain background audio ducking specs' }
    ]
  };

  const activeTemplates = courseTemplates[course.id as keyof typeof courseTemplates] || [];

  return (
    <div className={`p-5 flex flex-col h-[520px] rounded-3xl border transition-all duration-300 relative ${
      isDark 
        ? 'bg-slate-900/60 border-slate-800 shadow-2xl text-slate-100' 
        : 'bg-white border-slate-200 shadow-md shadow-slate-100 text-slate-800'
    }`}>
      
      {/* Bot Header info */}
      <div className={`flex items-center justify-between pb-3 border-b mb-4 shrink-0 ${
        isDark ? 'border-white/5' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-yellow-400 to-orange-500 p-2 rounded-xl text-slate-950 shadow-md">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-905'}`}>
              <span>Amoo AI Study Tutor</span>
              <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
            </h4>
            <p className={`text-[10px] font-semibold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {language === 'om' ? 'Amanuel Harar irraa siif dhiyeesse' : 'Empowered by Amanuel (Harar)'}
            </p>
          </div>
        </div>

        <button 
          onClick={handleResetChat}
          className={`transition p-1.5 rounded-lg ${
            isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          }`}
          title="Reset chat session"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dynamic quick questions */}
      <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
        {activeTemplates.map((tmpl, idx) => {
          const text = tmpl[language];
          return (
            <button
              key={idx}
              onClick={() => handleSend(text)}
              className={`text-[10px] font-extrabold border py-1.5 px-2.5 rounded-lg transition text-left cursor-pointer transition-all active:scale-[0.98] ${
                isDark 
                  ? 'bg-slate-850/70 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300' 
                  : 'bg-blue-50/60 hover:bg-blue-100/80 border-blue-200/80 text-blue-700 hover:text-blue-900 shadow-sm'
              }`}
            >
              🚀 {text}
            </button>
          );
        })}
      </div>

      {/* Message scroll log */}
      <div className="flex-1 overflow-y-auto px-1 space-y-4 mb-4 pr-1">
        {messages.map(msg => {
          const isBot = msg.role === 'model';
          return (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2.5 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`p-2 rounded-xl mt-1 shrink-0 ${
                isBot 
                  ? isDark 
                    ? 'bg-indigo-650/10 text-indigo-400 border border-indigo-500/10' 
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  : isDark 
                    ? 'bg-slate-800 text-slate-300' 
                    : 'bg-slate-150 text-slate-750 shadow-sm'
              }`}>
                {isBot ? <Bot className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
              </div>

              <div>
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  isBot 
                    ? isDark 
                      ? 'bg-slate-900/80 text-slate-200 border border-slate-850 rounded-tl-none font-medium' 
                      : 'bg-slate-50 text-slate-800 border border-slate-150 rounded-tl-none font-medium'
                    : 'bg-blue-600 text-white rounded-tr-none font-medium'
                }`}>
                  {/* Clean text formatted as lines */}
                  {msg.text.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                <span className={`text-[9px] text-slate-550 font-bold block mt-1 tracking-wide ${isBot ? 'text-left' : 'text-right'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className={`flex items-center gap-2 text-xs font-mono font-bold pl-2 py-2.5 px-4 rounded-xl border max-w-max ${
            isDark ? 'text-slate-400 bg-slate-950/25 border-slate-850' : 'text-slate-500 bg-slate-50 border-slate-150'
          }`}>
            <div className="flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-[bounce_0.6s_infinite_100ms]"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-[bounce_0.6s_infinite_300ms]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-[bounce_0.6s_infinite_500ms]"></span>
            </div>
            <span>{language === 'om' ? 'Amanuel deebisaa jira...' : 'Amanuel is writing response...'}</span>
          </div>
        )}

        {errorDetails && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{language === 'om' ? 'Quunnamtii Dogoggora' : 'No Gemini Secret'}</p>
              <p className="opacity-85 text-[10px] font-mono mt-0.5 leading-relaxed">{errorDetails}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls footer */}
      <div className={`mt-auto pt-3 border-t shrink-0 ${
        isDark ? 'border-white/5' : 'border-slate-100'
      }`}>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder={
              language === 'om' 
                ? 'Gaaffii dandeettii creative dhuunfaa na gaafadhu...' 
                : 'Ask design curves, figma grids, or cut techniques...'
            }
            className={`flex-1 p-3 rounded-2xl text-xs transition ${
              isDark 
                ? 'bg-slate-950/85 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500/60' 
                : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-blue-500/60'
            }`}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-2xl transition duration-150 shadow shadow-blue-500/10 cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
