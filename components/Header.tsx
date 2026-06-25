"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, GitBranch, Mail } from "lucide-react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="border-b border-purple-955/10 bg-slate-955/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3.5 cursor-pointer">
          <img src="/logo.jpeg" alt="Kassandra Logo" className="w-9 h-9 rounded-full object-cover border border-purple-500/20" />
          <span className="font-black text-2xl tracking-wider bg-gradient-to-r from-white via-indigo-200 to-slate-300 bg-clip-text text-transparent">KASSANDRA</span>
        </Link>

        <div className="flex items-center space-x-6">
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
              <span>Get in Touch</span>
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
                    href="https://www.linkedin.com/in/mustafacapankassandra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/10 transition-colors border-t border-purple-955/20"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .58 1 1.42v4.7h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z"/>
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/mustafacapan/Kassandra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/10 transition-colors border-t border-purple-955/20"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
