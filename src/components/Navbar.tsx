import React, { useState } from 'react';
import { Waves, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal: (initialInterest?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '동호회 소개', href: '#about' },
    { label: '트레이닝 세션', href: '#sessions' },
    { label: '창고 장비실', href: '#gear' },
    { label: '버디 찾기', href: '#buddy' },
    { label: '호흡 훈련기', href: '#trainer' },
    { label: '갤러리 & 후기', href: '#gallery' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-5 lg:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500 transition-colors">
            <Waves className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-semibold text-slate-100 tracking-normal">아로아나의 바다창고</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenJoinModal('신규 회원 가입 및 세션 문의')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm shadow-cyan-900/30 flex items-center gap-1.5"
          >
            <span>가입 & 세션 신청</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 border-b border-slate-900/60"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal('신규 회원 가입 및 세션 문의');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
            >
              동호회 가입 및 세션 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
