/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlayCircle, CheckCircle, Award, BookOpen } from 'lucide-react';
import { Course, Language, User } from '../types';

interface CourseCardProps {
  key?: string;
  course: Course;
  language: Language;
  user: User;
  onSelectCourse: (course: Course) => void;
  theme: 'light' | 'dark';
}

export default function CourseCard({ 
  course, 
  language, 
  user, 
  onSelectCourse,
  theme
}: CourseCardProps) {
  // Compute how many lessons in this course are completed by the user
  const courseLessons = course.lessons;
  const completedCount = courseLessons.filter(lesson => user.progress.includes(lesson.id)).length;
  const progressPercent = courseLessons.length > 0 
    ? Math.round((completedCount / courseLessons.length) * 100) 
    : 0;

  const isCompleted = progressPercent === 100;
  const isDark = theme === 'dark';

  // Render proper localized titles
  const categoryLabels = {
    editing: { om: 'Photo Editing 📸', en: 'Photo Editing 📸' },
    graphic: { om: 'Graphic Design 📉', en: 'Graphic Design 📉' },
    video: { om: 'Video Editing 🎬', en: 'Video Editing 🎬' }
  };

  const cLabel = categoryLabels[course.category][language];

  return (
    <div className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 border group ${
      isDark 
        ? 'bg-slate-800/80 border-slate-700/60 shadow-xl hover:border-slate-500 hover:shadow-2xl' 
        : 'bg-white border-slate-200 shadow-md shadow-slate-100 hover:border-blue-450 hover:shadow-xl'
    }`}>
      
      {/* Course Header Poster with overlay label */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title[language]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
        
        {/* Rating or Category ribbon */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-emerald-500/20">
          {cLabel}
        </span>
        
        {/* Completed status ribbon */}
        {isCompleted && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'om' ? 'Kukkuutum' : 'Mastered'}</span>
          </span>
        )}
      </div>

      {/* Main details body */}
      <div className={`p-5 flex-1 flex flex-col justify-between ${isDark ? 'bg-slate-900/10' : 'bg-slate-50/20'}`}>
        <div>
          <h3 className={`text-xl font-black font-display mb-2 transition ${
            isDark 
              ? 'text-white group-hover:text-blue-400' 
              : 'text-slate-900 group-hover:text-blue-600'
          }`}>
            {course.title[language]}
          </h3>
          <p className={`text-xs font-semibold leading-relaxed mb-4 min-h-[42px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {course.subtitle[language]}
          </p>

          {/* Progress bar and statistics */}
          <div className={`p-3 rounded-xl mb-5 border ${
            isDark 
              ? 'bg-slate-800/70 border-slate-800/80' 
              : 'bg-slate-100/60 border-slate-205/60'
          }`}>
            <div className={`flex justify-between items-center text-[10px] mb-1.5 font-bold tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>
                {language === 'om' ? 'Guddina (Progress)' : 'Advancement'}
              </span>
              <span className={isCompleted ? 'text-emerald-500' : 'text-blue-500'}>
                {progressPercent}% ({completedCount}/{courseLessons.length})
              </span>
            </div>
            
            {/* Visual Meter */}
            <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-700/50' : 'bg-slate-200'}`}>
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelectCourse(course)}
          className={`w-full py-3 rounded-xl font-bold font-display text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow flex items-center justify-center gap-2 ${
            isCompleted 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:shadow-emerald-500/10' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white hover:shadow-blue-500/10'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 text-white" />
              <span>{language === 'om' ? 'Koozii Deebi\'i' : 'Review Curriculum'}</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4 text-white" />
              <span>{language === 'om' ? 'Jalqabi' : 'Start Course'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
