"use client";

import { useState } from "react";
import { ChevronDown, GitBranch, Mail, BookOpen } from "lucide-react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="border-b border-purple-950/10 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <img src="/logo.jpeg" alt="Kassandra Logo" className="w-9 h-9 rounded-full object-cover border border-purple-500/20" />
          <span className="font-black text-2xl tracking-wider bg-gradient-to-r from-white via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">KASSANDRA</span>
        </div>
        
        {/* Dropdown Menu Header Item */}
        <div 
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a 
            href="mailto:mustafa@kassandra.it.com"
            className="text-xs font-mono bg-purple-950/20 border border-purple-900/30 px-4 py-2.5 rounded-xl text-slate-300 hover:text-purple-400 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>Get in Demo</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
          </a>

          {/* Dropdown Items */}
          {dropdownOpen && (
            <div className="absolute right-0 pt-2 w-48 z-50">
              <div className="bg-slate-950/95 border border-purple-900/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl py-1 font-mono text-[10px]">
              <a
                href="mailto:mustafa@kassandra.it.com"
                className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/10 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Founder</span>
              </a>
              <a
                href="https://github.com/mustafacapan/Kassandra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/10 transition-colors border-t border-purple-950/20"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
