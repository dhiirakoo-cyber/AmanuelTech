/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, CheckCircle, AlertTriangle, HelpCircle, RefreshCw, BarChart2 } from 'lucide-react';
import { Course, Language, QuizQuestion } from '../types';

interface QuizSectionProps {
  course: Course;
  language: Language;
  theme: 'light' | 'dark';
}

export default function QuizSection({ course, language, theme }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const isDark = theme === 'dark';
  const questions = course.quizzes;

  if (!questions || questions.length === 0) {
    return (
      <div className={`p-6 rounded-2xl text-center border ${
        isDark ? 'bg-slate-900/40 border-slate-800 p-6' : 'bg-white border-slate-200 shadow-sm p-6'
      }`}>
        <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className={isDark ? 'text-slate-400 text-xs' : 'text-slate-600 text-xs font-semibold'}>
          {language === 'om' ? 'Koozii kanaf qormaanni hin qophoofne.' : 'No quizzes correspond to this specific course.'}
        </p>
      </div>
    );
  }

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted[questionId]) return; // locked once submitted
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuestion = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmitted(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted({});
    setQuizScore(null);
  };

  return (
    <div className={`p-6 rounded-2xl w-full border ${
      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
    }`}>
      <div className={`flex justify-between items-center mb-6 pb-4 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-205'
      }`}>
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-500" />
          <h3 className={`text-sm font-black font-display uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {language === 'om' ? 'Madaalii Beekumsaa (Quiz Test)' : 'Skill Evaluation Quiz'}
          </h3>
        </div>

        <button
          onClick={handleResetQuiz}
          className={`flex items-center gap-1.5 text-xs font-bold transition cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-650'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{language === 'om' ? 'Haaromsi' : 'Reset Exam'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isUserChoice = selectedAnswers[q.id];
          const hasSubmitted = submitted[q.id];
          const isCorrect = isUserChoice === q.correctIndex;

          return (
            <div key={q.id} className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-950/40 border-slate-850' : 'bg-slate-50/70 border-slate-200/60'
            }`}>
              <span className="text-[10px] text-blue-505 font-black uppercase font-mono tracking-widest block mb-2">
                {language === 'om' ? `Gaaffii ${idx + 1}` : `Test Question ${idx + 1}`}
              </span>
              <p className={`text-sm font-bold tracking-tight leading-relaxed mb-4 ${
                isDark ? 'text-slate-200' : 'text-slate-805'
              }`}>
                {q.question[language]}
              </p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5 mb-4">
                {q.options[language].map((option, optIdx) => {
                  const isSelected = isUserChoice === optIdx;
                  let optionStyle = isDark 
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900/90' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/45';

                  if (isSelected) {
                    optionStyle = isDark 
                      ? 'bg-blue-600/15 border-blue-500 text-blue-300' 
                      : 'bg-blue-50 border-blue-400 text-blue-800';
                  }

                  if (hasSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyle = isDark 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300' 
                        : 'bg-emerald-50 border-emerald-450 text-emerald-800';
                    } else if (isSelected) {
                      optionStyle = isDark 
                        ? 'bg-red-500/15 border-red-500 text-red-300' 
                        : 'bg-red-50 border-red-400 text-red-800';
                    } else {
                      optionStyle = isDark 
                        ? 'opacity-30 bg-slate-900/60 border-slate-850 text-slate-550' 
                        : 'opacity-40 bg-slate-100 border-slate-200 text-slate-450';
                    }
                  }

                  return (
                     <button
                       key={optIdx}
                       disabled={hasSubmitted}
                       onClick={() => handleSelect(q.id, optIdx)}
                       className={`w-full text-left p-3 rounded-xl border text-xs font-semibold tracking-wide transition duration-150 flex items-center justify-between cursor-pointer ${optionStyle}`}
                     >
                       <span>{option}</span>
                       {hasSubmitted && optIdx === q.correctIndex && (
                         <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                       )}
                     </button>
                  );
                })}
              </div>

              {/* Action buttons */}
              {!hasSubmitted ? (
                <button
                  type="button"
                  disabled={isUserChoice === undefined}
                  onClick={() => handleSubmitQuestion(q.id)}
                  className="bg-blue-605 hover:bg-blue-600 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  {language === 'om' ? 'Deebii Salphaa' : 'Submit Answer'}
                </button>
              ) : (
                <div className={`mt-3 p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-black text-emerald-500">
                          {language === 'om' ? 'SIRIIDHA! (Correct!)' : 'CORRECT ANSWER!'}
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-black text-red-500">
                          {language === 'om' ? 'SOBA! (Incorrect)' : 'INCORRECT MATCH'}
                        </span>
                      </>
                    )}
                  </div>
                  <p className={`text-[11px] leading-relaxed font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{language === 'om' ? 'Ibsa:' : 'Explanation:'}</span> {q.explanation[language]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
