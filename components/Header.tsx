"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, ChevronDown, GitBranch, Mail } from "lucide-react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3.5 cursor-pointer">
          <img src="/logo.jpeg" alt="Kassandra Prophecy Logo" className="w-9 h-9 rounded-full object-cover border border-[rgba(43,83,114,0.10)]" />
          <span className="font-semibold text-2xl tracking-tight text-[#1A2834] text-balance">KASSANDRA PROPHECY</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/blog" className="text-sm font-medium text-[#4A5A68] hover:text-[#2B5372] transition-colors">
            Blog
          </Link>
          {/* Dropdown Menu Header Item */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="mailto:mustafa@kassandraprophecy.com"
              className="btn-energy inline-flex cursor-pointer items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`} />
            </a>

            {/* Dropdown Items */}
            {dropdownOpen && (
              <div className="absolute right-0 pt-2 w-48 z-50">
                <div className="bg-white border border-[rgba(43,83,114,0.10)] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden py-1">
                  <a
                    href="mailto:mustafa@kassandraprophecy.com"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4A5A68] hover:text-[#10B981] hover:bg-black/[0.03] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Founder</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mustafacapan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4A5A68] hover:text-[#10B981] hover:bg-black/[0.03] transition-colors border-t border-[rgba(43,83,114,0.10)]"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .58 1 1.42v4.7h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z"/>
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4A5A68] hover:text-[#10B981] hover:bg-black/[0.03] transition-colors border-t border-[rgba(43,83,114,0.10)]"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Request Briefing</span>
                  </Link>
                  <a
                    href="https://github.com/mustafacapan/Kassandra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4A5A68] hover:text-[#10B981] hover:bg-black/[0.03] transition-colors border-t border-[rgba(43,83,114,0.10)]"
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
