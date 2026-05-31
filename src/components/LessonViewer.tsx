/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle, BookOpen, Clock, PlayCircle, Video, Save, 
  Sparkles, FileText, CheckCircle2, Circle, GraduationCap 
} from 'lucide-react';
import { Course, Lesson, Language, User } from '../types';

interface LessonViewerProps {
  course: Course;
  language: Language;
  user: User;
  onBack: () => void;
  onToggleProgress: (lessonId: string, completed: boolean) => void;
  onSaveNotes: (lessonId: string, content: string) => Promise<void>;
  theme: 'light' | 'dark';
}

export default function LessonViewer({ 
  course, 
  language, 
  user, 
  onBack, 
  onToggleProgress, 
  onSaveNotes,
  theme
}: LessonViewerProps) {
  
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.lessons[0]);
  const [noteText, setNoteText] = useState('');
  const [isNoteSaving, setIsNoteSaving] = useState(false);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const isDark = theme === 'dark';

  // Load saved note on lesson change
  useEffect(() => {
    setNoteText(user.notes[activeLesson.id] || '');
    setVideoPlaying(false);
    setNoteSavedFeedback(false);
  }, [activeLesson, user.notes]);

  const handleNotesSync = async () => {
    setIsNoteSaving(true);
    try {
      await onSaveNotes(activeLesson.id, noteText);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2500);
    } catch (e) {
      console.error('Notes save issue:', e);
    } finally {
      setIsNoteSaving(false);
    }
  };

  const isCurrentLessonCompleted = user.progress.includes(activeLesson.id);

  // Render mock video media dashboard overlay based on configuration type
  const renderMockVideoPlayer = () => {
    const types = {
      adjust: 'Cinematic Adjustment Matrix',
      crop: 'Object Extract Perspective Layer',
      filter: 'LUT Color Balance Channels',
      mask: 'Pen Path Precision Isolation Layer',
      layers: 'Multitrack Overlay Node Mapping',
      grid: 'responsive UI column blueprint',
      typography: 'Golden Font pairing grid',
      vector: 'Bezier geometry vector node',
      export: 'Figma DevMode metadata panel',
      timeline: 'Dynamic Cuts multi-track sequence',
      speed: 'framerate keyframe timing velocity',
      audio: 'calibration equalizer db limiter',
      render: 'Multipass social H264 rendering queue'
    };

    const typeDesc = types[activeLesson.videoMockupType] || 'Standard Workspace';

    return (
      <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-inner group">
        
        {/* Animated Background Simulation */}
        <div className="absolute inset-0 bg-slate-950 opacity-90 flex flex-col items-center justify-center">
          
          {videoPlaying ? (
            /* Simulation of video playing */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-sm flex flex-col gap-3">
                <div className="flex gap-1 justify-center items-end h-12">
                  <div className="w-2.5 bg-blue-500 rounded h-12 animate-[pulse_1s_infinite]"></div>
                  <div className="w-2.5 bg-blue-400 rounded h-6 animate-[bounce_1.4s_infinite]"></div>
                  <div className="w-2.5 bg-indigo-500 rounded h-10 animate-[pulse_1.2s_infinite]"></div>
                  <div className="w-2.5 bg-emerald-500 rounded h-7 animate-[bounce_1.6s_infinite]"></div>
                  <div className="w-2.5 bg-orange-500 rounded h-9 animate-[pulse_0.8s_infinite]"></div>
                  <div className="w-2.5 bg-indigo-400 rounded h-5 animate-[bounce_1.1s_infinite]"></div>
                </div>
                <p className="text-center text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                  {language === 'om' ? 'Viidiyoon Tabatachaa Jira...' : 'Playing Lesson Feed...'}
                </p>
                <p className="text-center text-[10px] font-mono text-blue-400/90 tracking-wide mt-1 bg-blue-500/10 py-1 px-3 rounded-lg border border-blue-500/20 max-w-xs mx-auto">
                  {typeDesc}
                </p>
              </div>
            </div>
          ) : (
            /* Video Poster/Intro */
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-slate-900/60 flex flex-col items-center justify-center p-6 text-center cursor-pointer" onClick={() => setVideoPlaying(true)}>
              <div className="bg-blue-600 hover:bg-blue-500 p-5 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 transform group-hover:scale-110 pulsing-effect mb-3.5">
                <PlayCircle className="w-9 h-9 text-white" />
              </div>
              <h4 className="text-base font-black text-white tracking-tight px-4 max-w-md">
                {activeLesson.title[language]}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1.5 font-medium px-4">
                {language === 'om' ? 'Koozii xiqqaa kana jalqabuuf gubbaa cuqaasi' : 'Click to begin rendering lesson workspace'}
              </p>
            </div>
          )}
        </div>

        {/* Video Control Bar */}
        <div className="relative z-10 p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between w-full mt-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setVideoPlaying(!videoPlaying)}
              className="text-xs font-black font-display text-blue-400 uppercase tracking-widest bg-slate-900/90 border border-slate-700/60 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition"
            >
              {videoPlaying ? (language === 'om' ? 'HAYYI (Pause)' : 'Pause') : (language === 'om' ? 'DOO\'ADH (Play)' : 'Play')}
            </button>
            <span className="text-[10px] text-slate-500 font-mono font-semibold">
              {videoPlaying ? '03:42 / 12:00' : '--:--'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider font-mono">
              Live Feed
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Upper navigation header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b ${
        isDark ? 'border-slate-800/80' : 'border-slate-205'
      }`}>
        <button
          onClick={onBack}
          className={`flex items-center gap-1.5 font-black text-xs uppercase tracking-widest cursor-pointer px-3.5 py-2 rounded-xl transition duration-200 self-start ${
            isDark 
              ? 'text-slate-400 hover:text-white bg-slate-800/40 border border-slate-850' 
              : 'text-slate-700 hover:text-slate-950 bg-white border border-slate-200 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'om' ? 'KOOZIIWWATTI DEEBI\'I' : 'Back to Dashboard'}</span>
        </button>
        
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-500" />
          <h2 className={`text-sm font-black font-display tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            {course.title[language]}
          </h2>
        </div>
      </div>

      {/* Grid: 1/3 sidebar, 2/3 lesson feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Course Directory Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className={`border rounded-2xl p-4 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>{language === 'om' ? 'Haala Koozichaa (Lessons)' : 'Course Directory'}</span>
            </h3>

            <div className="space-y-2.5">
              {course.lessons.map((lesson, idx) => {
                const isSelected = lesson.id === activeLesson.id;
                const isComplete = user.progress.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? isDark 
                          ? 'bg-blue-600/10 border-blue-500 text-white shadow-md' 
                          : 'bg-blue-50/80 border-blue-200 text-blue-900 shadow-sm'
                        : isDark
                          ? 'bg-slate-850/40 border-slate-800 text-slate-400 hover:bg-slate-850/80 hover:text-slate-200'
                          : 'bg-slate-50/50 border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-905'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className={`w-4 h-4 ${isDark ? 'text-slate-600' : 'text-slate-350'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`text-xs font-extrabold tracking-tight ${
                        isSelected 
                          ? isDark ? 'text-white' : 'text-blue-900' 
                          : isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {idx + 1}. {lesson.title[language]}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info block */}
          <div className={`p-4 rounded-2xl text-center border ${
            isDark ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150 shadow-sm'
          }`}>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'om' ? 'Harar keessatti qabxii dabalataaf' : 'Contact expert support for custom credentials'}
            </p>
            <p className="text-xs text-blue-505 font-black tracking-tight mt-1">
              Call Amanuel: +251967145146
            </p>
          </div>
        </div>

        {/* Lesson Active Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Mock Player Screen */}
          {renderMockVideoPlayer()}

          {/* Lesson Action Header Controls */}
          <div className={`p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border ${
            isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
          }`}>
            <div>
              <p className={`text-[10px] font-black tracking-widest uppercase mb-0.5 ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>
                {language === 'om' ? 'Maayila Jalqabaa' : 'Active Module'}
              </p>
              <h2 className={`text-lg font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeLesson.title[language]}
              </h2>
            </div>

            {/* Checkbox Trigger to mark completed */}
            <button
              onClick={() => onToggleProgress(activeLesson.id, !isCurrentLessonCompleted)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                isCurrentLessonCompleted
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow shadow-blue-500/10'
              }`}
            >
              {isCurrentLessonCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{language === 'om' ? 'Kukkuutum (Done!)' : 'Completed (Click to Reset)'}</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>{language === 'om' ? 'Hojjadheera (Complete)' : 'Mark as Completed'}</span>
                </>
              )}
            </button>
          </div>

          {/* Core Content Explanation */}
          <div className={`p-6 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-3.5 flex items-center gap-2.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <FileText className="w-4 h-4 text-blue-500" />
              <span>{language === 'om' ? 'Qabiyyee Barruu (Lesson Notes)' : 'Lesson Material Content'}</span>
            </h3>

            {/* Simulated Custom CSS-Free Markdown Formatter */}
            <div className={`space-y-4 text-xs sm:text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {activeLesson.contentMarkdown[language].split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h4 key={pIdx} className={`text-base font-black font-display mt-4 border-l-4 border-blue-500 pl-3 py-0.5 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {paragraph.replace('###', '').trim()}
                    </h4>
                  );
                }
                if (paragraph.startsWith('*') || paragraph.startsWith('-') || paragraph.startsWith('1.')) {
                  // list items
                  return (
                    <ul key={pIdx} className={`space-y-2 list-none pl-1 p-3 rounded-xl border ${
                      isDark ? 'bg-slate-950/30 border-slate-850' : 'bg-slate-50 border-slate-200/50'
                    }`}>
                      {paragraph.split('\n').map((li, liIdx) => (
                        <li key={liIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span>{li.replace(/^[\s*-]+|^[\s*\d.]+/g, '').trim()}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* PERSONAL SCRATCHPAD (Note-taker sync with Express) */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <h4 className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                  {language === 'om' ? 'Yaadannoo koo (My Personal Scratchpad)' : 'Study Scratchpad Notes'}
                </h4>
              </div>
              
              {/* Feedback messages for saving state */}
              {noteSavedFeedback && (
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg animate-fade-in">
                  {language === 'om' ? 'Gadaasafame!' : 'Notes Synced Successfully!'}
                </span>
              )}
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={language === 'om' ? 'Yaadannoo koo asirraatti galmeeffadha...' : 'Jot down personal learning notes or key shortcuts here while learning...'}
              rows={4}
              className={`w-full p-3.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono ${
                isDark 
                  ? 'bg-slate-950/80 border-slate-800 text-slate-200 placeholder-slate-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-450'
              }`}
            />

            <div className="flex justify-end mt-2.5">
              <button
                type="button"
                onClick={handleNotesSync}
                disabled={isNoteSaving}
                className={`border text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 disabled:opacity-40 ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700/80 border-slate-705 text-slate-200 hover:text-white' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-220 text-slate-700 hover:text-slate-900 shadow-sm'
                }`}
              >
                <Save className="w-3.5 h-3.5 text-blue-500" />
                <span>{isNoteSaving ? (language === 'om' ? 'Galmeeffamaa...' : 'Saving...') : (language === 'om' ? 'Yaadannoo Galmeessi' : 'Save Notes')}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
