/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, PlayCircle, BookOpen, Clock, Heart, 
  MapPin, CheckCircle, GraduationCap, ChevronRight, MessageSquare, Code, LayoutDashboard 
} from 'lucide-react';

import { Course, Language, User } from './types';
import { coursesData } from './coursesData';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import CourseCard from './components/CourseCard';
import LessonViewer from './components/LessonViewer';
import QuizSection from './components/QuizSection';
import AmooTutor from './components/AmooTutor';
import ContactBoard from './components/ContactBoard';

export default function App() {
  const [language, setLanguage] = useState<Language>('om');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // High-level tab management inside active course workspace
  const [activeCourseTab, setActiveCourseTab] = useState<'content' | 'quiz' | 'tutor'>('content');

  // Multi-language strings for main page headings
  const pageWords = {
    om: {
      dashTitle: 'Kooziiwwan Keeti Gulaala',
      dashSubtitle: 'Dandeettii kee asirraatti gabbifadhu bro! Qajeelfama Amanuel guutuu.',
      statsTitle: 'Progreesii Barumsa Keetii',
      statsDesc: 'Lesson-oota siriitti hojjataman fi xumuraman asitti hordofi.',
      contactHeader: 'Gorsa fi Deeggarsa',
      footerQuote: 'Amoo Academy hunda caalaa dandeettii daldalatti si geessa!',
      totalBadge: 'Barataa Gufata Qaxabaa'
    },
    en: {
      dashTitle: 'Your Professional Courses',
      dashSubtitle: 'Master creative high-demand skills step-by-step from Amanuel.',
      statsTitle: 'Overall Learning Progress',
      statsDesc: 'Monitor your completed lessons and track overall milestones.',
      contactHeader: 'Mentorship & Support',
      footerQuote: 'Amoo Academy bridges creative excellence with international opportunities!',
      totalBadge: 'Elite Creative Student'
    }
  };

  const labels = pageWords[language];

  // Try to recover state from LocalStorage on mount for immediate hydration
  useEffect(() => {
    const savedUser = localStorage.getItem('amoo_user');
    const savedLang = localStorage.getItem('amoo_lang');
    const savedTheme = localStorage.getItem('amoo_theme');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('amoo_user');
      }
    }
    if (savedLang === 'om' || savedLang === 'en') {
      setLanguage(savedLang);
    }
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  const handleLanguageToggle = () => {
    const nextLang = language === 'om' ? 'en' : 'om';
    setLanguage(nextLang);
    localStorage.setItem('amoo_lang', nextLang);
  };

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('amoo_theme', nextTheme);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('amoo_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCourse(null);
    localStorage.removeItem('amoo_user');
  };

  // Sync progress selection with server
  const handleToggleProgress = async (lessonId: string, completed: boolean) => {
    if (!user) return;

    try {
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          lessonId,
          completed
        })
      });

      const resData = await response.json();
      if (response.ok && resData.progress) {
        const updatedUser = {
          ...user,
          progress: resData.progress
        };
        setUser(updatedUser);
        localStorage.setItem('amoo_user', JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error('Progress sync error:', e);
    }
  };

  // Save lesson note to server
  const handleSaveNotes = async (lessonId: string, noteContent: string) => {
    if (!user) return;

    try {
      const response = await fetch('/api/user/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          lessonId,
          noteContent
        })
      });

      const resData = await response.json();
      if (response.ok && resData.notes) {
        const updatedUser = {
          ...user,
          notes: resData.notes
        };
        setUser(updatedUser);
        localStorage.setItem('amoo_user', JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error('Notes sync error:', e);
    }
  };

  // Compute total completed/all stats
  const totalLessonsCount = coursesData.reduce((acc, course) => acc + course.lessons.length, 0);
  const totalCompletedCount = user ? user.progress.length : 0;
  const overallPercent = totalLessonsCount > 0 
    ? Math.round((totalCompletedCount / totalLessonsCount) * 100) 
    : 0;

  const isDark = theme === 'dark';

  return (
    <div className={`transition-all duration-300 min-h-screen antialiased font-sans flex flex-col justify-between ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 to-blue-950 text-slate-100' 
        : 'bg-gradient-to-br from-slate-50 to-indigo-50/50 text-slate-800'
    }`}>
      
      {/* Dynamic top navigation header */}
      <Navbar 
        language={language}
        onLanguageChange={handleLanguageToggle}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:px-8">
        
        {/* VIEW 1: AUTH LOCK SCREEN */}
        {!user ? (
          <LoginForm 
            language={language}
            onLoginSuccess={handleLoginSuccess}
            theme={theme}
          />
        ) : (
          
          /* VIEW 2: LOGGED-IN ACADEMY ECOSYSTEM */
          <div className="space-y-10 animate-fade-in-quick">
            
            {/* Upper progression banner metrics */}
            <div className={`p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transition-all duration-300 border ${
              isDark 
                ? 'bg-gradient-to-r from-blue-950 to-slate-900 border-blue-900/30' 
                : 'bg-white border-slate-200/90 shadow shadow-slate-100 text-slate-800'
            }`}>
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
                <Sparkles className="w-64 h-64 text-blue-500" />
              </div>

              <div className="text-center md:text-left z-10">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center mb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                    isDark 
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/20' 
                      : 'bg-blue-50 text-blue-650 border-blue-200 font-bold'
                  }`}>
                    {labels.totalBadge}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {user.email}
                  </span>
                </div>
                
                <h2 className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'om' ? `Baga gorfamte, ${user.name}!` : `Welcome back, ${user.name}!`}
                </h2>
                <p className={`text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {labels.dashSubtitle}
                </p>
              </div>

              {/* Progress visual score indicator circle */}
              <div className={`flex items-center gap-4 p-4 rounded-2xl border shrink-0 z-10 w-full md:w-auto justify-center md:justify-start ${
                isDark 
                  ? 'bg-slate-900/60 border-slate-800' 
                  : 'bg-slate-50 border-slate-150'
              }`}>
                <div className="relative flex items-center justify-center">
                  {/* Gauge ring */}
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" className={isDark ? 'stroke-slate-800' : 'stroke-slate-205'} strokeWidth="4" fill="transparent" />
                    <circle 
                      cx="32" cy="32" r="28" 
                      className={`stroke-blue-500 transition-all duration-700`} 
                      strokeWidth="5" 
                      fill="transparent" 
                      strokeDasharray="175"
                      strokeDashoffset={175 - (175 * overallPercent) / 100}
                    />
                  </svg>
                  <span className={`absolute text-sm font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {overallPercent}%
                  </span>
                </div>

                <div>
                  <h4 className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-305' : 'text-slate-800'}`}>
                    {labels.statsTitle}
                  </h4>
                  <p className="text-slate-500 text-[10px] leading-tight max-w-[160px] font-semibold mt-0.5">
                    {totalCompletedCount} of {totalLessonsCount} course parts finalized.
                  </p>
                </div>
              </div>
            </div>

            {/* IF NO ACTIVE COURSE SELECTED: RENDER DASHBOARD DIRECTORY CARD LIST */}
            {!selectedCourse ? (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className={`text-2xl font-black font-display tracking-tight flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <LayoutDashboard className="w-6 h-6 text-blue-500" />
                    <span>{language === 'om' ? 'Kooziiwwan Dilbalee' : 'Educational Curriculum Programs'}</span>
                  </h2>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {language === 'om' ? 'Koozii xiqqaa hojjechuuf gubbaa eegali' : 'Select a professional learning vector path below to begin lesson tutorials.'}
                  </p>
                </div>

                {/* Grid layout (Laptop = 3, Mobile = 1) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesData.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      language={language}
                      user={user}
                      theme={theme}
                      onSelectCourse={(c) => {
                        setSelectedCourse(c);
                        setActiveCourseTab('content');
                      }}
                    />
                  ))}
                </div>

                {/* Direct Contact board to Amanuel inside foot of dashboard */}
                <div className={`pt-6 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                  <h3 className={`text-lg font-black font-display uppercase tracking-wider mb-4 flex items-center gap-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                    <span>{labels.contactHeader}</span>
                  </h3>
                  <ContactBoard language={language} theme={theme} />
                </div>
              </div>
            ) : (
              
              /* VIEW 3: SYSTEM CLASSROOM (Active course workspace with AI sidekick and Quizzes inside integrated view panels!) */
              <div className="space-y-4 animate-fade-in-quick">
                
                {/* Immersive Course Classroom header breadcrumbs */}
                <div className={`p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-slate-800' 
                    : 'bg-white border-slate-200/90 shadow shadow-slate-100'
                }`}>
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className={`font-black text-[10px] uppercase tracking-wider cursor-pointer border px-3.5 py-1.5 rounded-lg transition ${
                        isDark 
                          ? 'text-slate-400 hover:text-white bg-slate-850 border-slate-705' 
                          : 'text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border-slate-220 shadow-sm'
                      }`}
                    >
                      {language === 'om' ? 'Hunda (DASHBOARD)' : 'Dashboard'}
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-500 hidden md:block" />
                    <span className={`text-xs font-black font-display hidden md:inline tracking-wider ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {selectedCourse.title[language]}
                    </span>
                  </div>

                  {/* Tabs Controller representing split screen */}
                  <div className={`flex p-1.5 rounded-xl border w-full md:w-auto ${
                    isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-205'
                  }`}>
                    <button
                      onClick={() => setActiveCourseTab('content')}
                      className={`flex-1 md:flex-none py-1.5 px-4 rounded-lg text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                        activeCourseTab === 'content' 
                          ? 'bg-blue-600 text-white shadow' 
                          : isDark 
                            ? 'text-slate-450 hover:text-slate-200' 
                            : 'text-slate-600 hover:text-red-950'
                      }`}
                    >
                      {language === 'om' ? 'Lectures & Yaadannoo' : 'Lessons & Notes'}
                    </button>
                    <button
                      onClick={() => setActiveCourseTab('quiz')}
                      className={`flex-1 md:flex-none py-1.5 px-4 rounded-lg text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                        activeCourseTab === 'quiz' 
                          ? 'bg-blue-600 text-white shadow' 
                          : isDark 
                            ? 'text-slate-455 hover:text-slate-200' 
                            : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {language === 'om' ? 'Madaalii (Quiz)' : 'Solve Quiz'}
                    </button>
                    <button
                      onClick={() => setActiveCourseTab('tutor')}
                      className={`flex-1 md:flex-none py-1.5 px-4 rounded-lg text-xs font-extrabold transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 relative ${
                        activeCourseTab === 'tutor' 
                          ? 'bg-blue-600 text-white shadow' 
                          : isDark 
                            ? 'text-slate-460 hover:text-slate-200' 
                            : 'text-slate-650 hover:text-slate-950'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                      <span>{language === 'om' ? 'Tutor (AI)' : 'Study Co-Pilot'}</span>
                    </button>
                  </div>
                </div>

                {/* Sub panels depending on screen selection */}
                {activeCourseTab === 'content' && (
                  <LessonViewer
                    course={selectedCourse}
                    language={language}
                    user={user}
                    theme={theme}
                    onBack={() => setSelectedCourse(null)}
                    onToggleProgress={handleToggleProgress}
                    onSaveNotes={handleSaveNotes}
                  />
                )}

                {activeCourseTab === 'quiz' && (
                  <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto py-4">
                    <QuizSection 
                      course={selectedCourse}
                      language={language}
                      theme={theme}
                    />
                  </div>
                )}

                {activeCourseTab === 'tutor' && (
                  <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto py-4">
                    <AmooTutor 
                      course={selectedCourse}
                      language={language}
                      theme={theme}
                    />
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* Standard professional footer */}
      <footer className={`border-t py-6 text-center text-xs px-4 mt-12 shrink-0 transition-all duration-300 ${
        isDark 
          ? 'bg-slate-950/80 border-slate-900 text-slate-500' 
          : 'bg-white border-slate-205 text-slate-500 shadow shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
          <p className="font-semibold tracking-wide">&copy; 2026 Amoo Academy. Coders & Architects Co.</p>
          <p className="text-[11px] font-medium font-serif italic max-w-md">
            "{labels.footerQuote}"
          </p>
        </div>
      </footer>

    </div>
  );
}
