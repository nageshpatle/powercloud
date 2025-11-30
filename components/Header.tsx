import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-1.5 rounded-lg text-white">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            Power<span className="text-primary-600">Cloud</span>
          </span>
        </div>
        
        <nav className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">
            Interactive Lab
          </span>
        </nav>
      </div>
    </header>
  );
};