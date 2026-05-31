/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'om' | 'en';

export interface Lesson {
  id: string;
  courseId: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  duration: string;
  videoMockupType: 'adjust' | 'crop' | 'filter' | 'mask' | 'layers' | 'grid' | 'typography' | 'vector' | 'export' | 'timeline' | 'speed' | 'audio' | 'render';
  contentMarkdown: Record<Language, string>;
}

export interface QuizQuestion {
  id: string;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
  explanation: Record<Language, string>;
}

export interface Course {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
  category: 'editing' | 'graphic' | 'video';
  lessons: Lesson[];
  quizzes: QuizQuestion[];
  imageUrl: string;
  bannerGradient: string;
}

export interface User {
  email: string;
  name: string;
  progress: string[]; // completed lesson IDs
  notes: Record<string, string>; // lessonId -> noteContent
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}
