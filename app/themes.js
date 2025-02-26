'use client';

import { Sun, Moon, Snowflake } from 'lucide-react';

export const themes = {
  summer: {
    bg: 'from-amber-900 via-rose-900 to-slate-900',
    button: 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-rose-500 hover:to-amber-500',
    text: 'text-amber-400',
    accent: 'amber',
    icon: <Sun className="w-8 h-8 text-amber-400" />,
    particles: {
      color: '#f59e0b',
      number: 50
    }
  },
  winter: {
    bg: 'from-blue-900 via-indigo-900 to-slate-900',
    button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500',
    text: 'text-blue-400',
    accent: 'blue',
    icon: <Snowflake className="w-8 h-8 text-blue-400" />,
    particles: {
      color: '#3b82f6',
      number: 30
    }
  },
  night: {
    bg: 'from-purple-900 via-violet-900 to-slate-900',
    button: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-violet-500 hover:to-purple-500',
    text: 'text-purple-400',
    accent: 'purple',
    icon: <Moon className="w-8 h-8 text-purple-400" />,
    particles: {
      color: '#a855f7',
      number: 40
    }
  }
}; 