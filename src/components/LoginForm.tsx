/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldAlert, Sparkles, LogIn, Key, UserPlus } from 'lucide-react';
import { Language } from '../types';

interface LoginFormProps {
  language: Language;
  onLoginSuccess: (user: any) => void;
  theme: 'light' | 'dark';
}

export default function LoginForm({ language, onLoginSuccess, theme }: LoginFormProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isDark = theme === 'dark';

  // Localization Dictionary matching original mockup keys plus expansions
  const words = {
    om: {
      titleWelcome: 'Baga Nagaan Dhuftan',
      subtitleWelcome: 'Gara kooziitti deebi\'uuf seeni',
      titleRegister: 'Galmaa\'i (Register)',
      subtitleRegister: 'Amoo Academy keessatti dandeettii haaraa baradhu!',
      lblEmail: 'Email Keessan',
      lblPassword: 'Password',
      lblName: 'Maqaa Keessan',
      btnSubmitLogin: 'Login Tahuu',
      btnSubmitRegister: 'Galmaayi (Register)',
      btnLoading: 'Eegamaa jira...',
      toggleToRegister: 'Duraan akkaawuntii hin qabduu? Asitti Galmaayi',
      toggleToLogin: 'Akkawuntii qabduu? Gara Login deebi\'i',
      demoBtn: 'Frictionless Demo login: student@amoo.com',
      alertSuccess: 'Baga nagaan dhufte Amoo Academy keessatti!',
      alertError: 'Dogoggora Seensaa: '
    },
    en: {
      titleWelcome: 'Welcome Back',
      subtitleWelcome: 'Sign in to return to your courses',
      titleRegister: 'Create Account',
      subtitleRegister: 'Unlock elite design skills inside Amoo Academy',
      lblEmail: 'Your Email',
      lblPassword: 'Password',
      lblName: 'Your Full Name',
      btnSubmitLogin: 'Sign In',
      btnSubmitRegister: 'Create Account',
      btnLoading: 'Loading workspace...',
      toggleToRegister: 'Don\'t have an account? Register here',
      toggleToLogin: 'Already have an account? Sign in here',
      demoBtn: 'Frictionless Demo login: student@amoo.com',
      alertSuccess: 'Welcome back to Amoo Academy!',
      alertError: 'Authentication Error: '
    }
  };

  const activeLang = words[language];

  const handleDemoLogin = () => {
    setEmail('student@amoo.com');
    setPassword('amoo123');
    setErrorStatus(null);
    submitAuth('student@amoo.com', 'amoo123');
  };

  const submitAuth = async (targetEmail = email, targetPassword = password, targetName = name) => {
    setLoading(true);
    setErrorStatus(null);
    setSuccessMsg(null);

    const apiPath = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister 
      ? { name: targetName, email: targetEmail, password: targetPassword }
      : { email: targetEmail, password: targetPassword };

    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Server error occurred');
      }

      setSuccessMsg(activeLang.alertSuccess);
      setTimeout(() => {
        onLoginSuccess(resData);
      }, 800);

    } catch (err: any) {
      console.error('Auth error:', err);
      setErrorStatus(activeLang.alertError + (err.message || 'Network failure'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAuth();
  };

  return (
    <div id="login-section" className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh]">
      <div className={`p-8 rounded-3xl w-full max-w-md transition-all duration-300 border ${
        isDark 
          ? 'bg-slate-800/40 backdrop-blur-md border-slate-700/50 shadow-2xl' 
          : 'bg-white backdrop-blur-md border-slate-200/90 shadow-xl shadow-slate-200/50'
      }`}>
        
        {/* Tab Selection */}
        <div className={`flex p-1 rounded-xl mb-6 border ${
          isDark 
            ? 'bg-slate-900/60 border-slate-800' 
            : 'bg-slate-100 border-slate-200/60'
        }`}>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setErrorStatus(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              !isRegister 
                ? 'bg-blue-600 text-white shadow-sm' 
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200' 
                  : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'om' ? 'Seeni (Login)' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setErrorStatus(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              isRegister 
                ? 'bg-blue-600 text-white shadow-sm' 
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200' 
                  : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'om' ? 'Galmeeffadhu' : 'Register'}
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 id="login-title" className={`text-3xl font-black font-display tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isRegister ? activeLang.titleRegister : activeLang.titleWelcome}
          </h2>
          <p id="login-subtitle" className={`text-sm mt-1.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isRegister ? activeLang.subtitleRegister : activeLang.subtitleWelcome}
          </p>
        </div>

        {/* Feedback alerts */}
        {errorStatus && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-red-300">
            <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorStatus}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 bg-emerald-500/15 border border-emerald-500/20 p-3.5 rounded-2xl flex items-center gap-2 text-xs text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form id="auth-form" onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label id="lbl-name" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeLang.lblName}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amanuel Hararee"
                className={`w-full p-3 rounded-2xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent ${
                  isDark 
                    ? 'bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-600' 
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                required={isRegister}
              />
            </div>
          )}

          <div>
            <label id="lbl-email" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeLang.lblEmail}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="barataa@gmail.com"
              className={`w-full p-3 rounded-2xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent ${
                isDark 
                  ? 'bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-600' 
                  : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
              required
            />
          </div>

          <div>
            <label id="lbl-password" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeLang.lblPassword}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full p-3 rounded-2xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent ${
                isDark 
                  ? 'bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-600' 
                  : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
              required
            />
          </div>

          <button
            type="submit"
            id="submit-btn"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold p-3.5 rounded-2xl transition-all shadow-lg active:scale-[0.98] cursor-pointer text-sm font-sans flex items-center justify-center gap-2 hover:shadow-blue-500/10 disabled:opacity-50"
          >
            {loading ? (
              <span>{activeLang.btnLoading}</span>
            ) : (
              <>
                {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                <span>{isRegister ? activeLang.btnSubmitRegister : activeLang.btnSubmitLogin}</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Hook */}
        <div className="relative my-7 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className={`w-full border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'}`}></div>
          </div>
          <span className={`relative px-3 text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-400'
          }`}>
            {language === 'om' ? 'Yookaan (Or)' : 'Or Explore Instantly'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className={`w-full border font-semibold p-3 rounded-2xl transition text-xs flex items-center justify-center gap-2 cursor-pointer pulsing-effect ${
            isDark 
              ? 'bg-slate-700/30 hover:bg-slate-700/50 border-slate-750 text-blue-400' 
              : 'bg-blue-50/70 hover:bg-blue-100/80 border-blue-200 text-blue-600'
          }`}
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>{language === 'om' ? 'Demo Login Fayyadami' : 'Click For Fast Demo Co-Pilot'}</span>
        </button>

        {/* Switch Auth mode footer text */}
        <p className="text-center text-xs text-slate-500 mt-6 font-medium">
          <button
            onClick={() => { setIsRegister(!isRegister); setErrorStatus(null); }}
            className="text-blue-500 font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isRegister ? activeLang.toggleToLogin : activeLang.toggleToRegister}
          </button>
        </p>
      </div>
    </div>
  );
}
