/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LogOut, BookOpen, Clock, Globe, Sun, Moon } from 'lucide-react';
import { Language, User } from '../types';

interface NavbarProps {
  language: Language;
  onLanguageChange: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ 
  language, 
  onLanguageChange, 
  theme, 
  onThemeToggle, 
  user, 
  onLogout 
}: NavbarProps) {
  const isDark = theme === 'dark';

  return (
    <nav className={`transition-all duration-300 backdrop-blur-md border-b sticky top-0 z-50 px-4 py-3 md:px-8 ${
      isDark 
        ? 'bg-slate-900/80 border-slate-800/70 text-slate-100' 
        : 'bg-white/90 border-slate-200/90 text-slate-800 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand identity & Contact info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 p-2 rounded-xl shadow-md shadow-blue-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-550 to-indigo-500">
                Amoo Academy
              </h1>
              <p className={`text-[11px] font-medium tracking-wide mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="text-blue-500 font-semibold">Owner:</span> Amanuel | <span className="text-blue-500 font-semibold">Address:</span> Harar | <span className="text-blue-500 font-semibold">Call:</span> +251967145146
              </p>
            </div>
          </div>
          
          {/* Mobile responsive controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onThemeToggle}
              className={`flex items-center justify-center p-2 rounded-xl border transition cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-yellow-400' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-amber-600'
              }`}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onLanguageChange}
              className={`flex items-center gap-1 border text-xs font-bold px-2 rounded-xl h-8 transition cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{language === 'om' ? 'EN' : 'OM'}</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {/* Active stats if logged in */}
          {user && (
            <div className={`hidden sm:flex items-center gap-2 bg-slate-100/50 border px-3 py-1.5 rounded-xl text-xs font-semibold ${
              isDark 
                ? 'bg-slate-800/40 border-slate-800 text-slate-300' 
                : 'bg-slate-50 border-slate-205 text-slate-700'
            }`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{user.name}</span>
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Desktop Theme Trigger */}
            <button
              onClick={onThemeToggle}
              id="global-theme-btn"
              className={`hidden md:flex items-center gap-2 border text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-yellow-400'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-indigo-900 shadow-sm'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>{language === 'om' ? 'Ifaa (Light)' : 'Light Mode'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-700" />
                  <span>{language === 'om' ? 'Dukkana (Dark)' : 'Dark Mode'}</span>
                </>
              )}
            </button>

            {/* Desktop Language Trigger */}
            <button
              onClick={onLanguageChange}
              id="global-lang-btn"
              className={`hidden md:flex items-center gap-2 border text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-705 text-white hover:border-blue-500/50'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Globe className="w-4 h-4 text-blue-500" />
              {language === 'om' ? 'English' : 'Afaan Oromoo'}
            </button>

            {/* Logout Trigger */}
            {user && (
              <button
                onClick={onLogout}
                id="system-logout-btn"
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 hover:border-transparent text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{language === 'om' ? "Ba'i (Logout)" : 'Log Out'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
