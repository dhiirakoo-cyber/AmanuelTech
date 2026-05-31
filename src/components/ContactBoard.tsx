/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, Smartphone } from 'lucide-react';
import { Language } from '../types';

interface ContactBoardProps {
  language: Language;
  theme: 'light' | 'dark';
}

export default function ContactBoard({ language, theme }: ContactBoardProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+251');
  const [message, setMessage] = useState('');
  
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const labels = {
    om: {
      title: 'Amanueliin Quunnami',
      desc: 'Hojii dhuunfaa ykn qabxii dabalataa yoo qabaattan, Amanuel Harar irra jiru bilisaan gorsa isiniif kenna!',
      lblName: 'Maqaa Keessan',
      lblEmail: 'Email Keessan',
      lblPhone: 'Bilbila Keessan',
      lblMsg: 'Yaada ykn gaaffii qabdan gabaabsi',
      btnSubmit: 'Yaada Ergi',
      btnSending: 'Eegamaa jira ...',
      toastSuccess: 'Yaadni keessan fudhatameera! Amanuel isinii deebisa. Galatoomaa!',
      toastError: 'Erguun hindandeesse, maaloo irra deebiadhaa'
    },
    en: {
      title: 'Direct Link to Amanuel',
      desc: 'Looking for 1-on-1 mentorship, career advice on Fiverr, or physically joining our lessons in Harar? Drop a direct note!',
      lblName: 'Your Full Name',
      lblEmail: 'Email Address',
      lblPhone: 'Phone Number',
      lblMsg: 'How can Amanuel help you develop?',
      btnSubmit: 'Dispatch Inquiry',
      btnSending: 'Sending message...',
      toastSuccess: 'Inquiry registered! Amanuel will contact you back personally soon.',
      toastError: 'Could not send message, please try again'
    }
  };

  const current = labels[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorText(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, message })
      });

      if (!response.ok) {
        throw new Error('Connection failed');
      }

      setSuccess(true);
      // reset form
      setName('');
      setEmail('');
      setPhone('+251');
      setMessage('');

      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      console.error(err);
      setErrorText(current.toastError);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl w-full border transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900/60 border-slate-850' 
        : 'bg-white border-slate-200/90 shadow shadow-slate-100'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Info blocks */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md max-w-max block mb-2 font-mono border ${
              isDark 
                ? 'text-blue-400 bg-blue-505/10 border-blue-500/20' 
                : 'text-blue-600 bg-blue-50 border-blue-200/80'
            }`}>
              Harar Workspace
            </span>
            <h3 className={`text-xl font-black font-display tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {current.title}
            </h3>
            <p className={`text-xs leading-relaxed font-semibold mb-6 ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
              {current.desc}
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Owner name */}
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDark 
                ? 'bg-slate-950/20 border-slate-850 text-slate-300' 
                : 'bg-slate-50 border-slate-150 text-slate-700 shadow-sm'
            }`}>
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <p className={`text-[9px] font-extrabold uppercase ${isDark ? 'text-slate-550' : 'text-slate-400'}`}>{language === 'om' ? 'Bilbila Amanuel' : 'Call Amanuel'}</p>
                <p className="text-xs font-bold leading-none mt-0.5">+251967145146</p>
              </div>
            </div>

            {/* Location */}
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDark 
                ? 'bg-slate-950/20 border-slate-850 text-slate-300' 
                : 'bg-slate-50 border-slate-150 text-slate-700 shadow-sm'
            }`}>
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <p className={`text-[9px] font-extrabold uppercase ${isDark ? 'text-slate-550' : 'text-slate-400'}`}>{language === 'om' ? 'Teessoo' : 'Campus Location'}</p>
                <p className="text-xs font-bold leading-none mt-0.5">Harar, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={`p-5 rounded-2xl border ${
          isDark 
            ? 'bg-slate-950/30 border-slate-850' 
            : 'bg-slate-50/50 border-slate-150'
        }`}>
          
          {success && (
            <div className="mb-4 bg-emerald-500/15 border border-emerald-500/30 p-4 rounded-xl text-emerald-500 font-semibold text-xs flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{current.toastSuccess}</span>
            </div>
          )}

          {errorText && (
            <div className="mb-4 bg-red-500/15 border border-red-500/30 p-4 rounded-xl text-red-500 font-semibold text-xs">
              <span>{errorText}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{current.lblName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Barataa Haaraa"
                  className={`w-full p-3 rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-slate-900/60 border-slate-805 text-white placeholder-slate-600' 
                      : 'bg-white border-slate-205 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{current.lblEmail}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  className={`w-full p-3 rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-slate-900/60 border-slate-805 text-white placeholder-slate-600' 
                      : 'bg-white border-slate-205 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{current.lblPhone}</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251967145146"
                className={`w-full p-3 rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-slate-900/60 border-slate-805 text-white placeholder-slate-600' 
                    : 'bg-white border-slate-205 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{current.lblMsg}</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={current.lblMsg}
                className={`w-full p-3 rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-slate-900/60 border-slate-805 text-white placeholder-slate-600' 
                    : 'bg-white border-slate-205 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold p-3 rounded-xl transition duration-150 text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sending ? current.btnSending : current.btnSubmit}</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
