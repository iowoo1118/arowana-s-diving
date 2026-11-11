import React from 'react';
import { Waves } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2.5 text-white font-bold text-base mb-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
                <Waves className="w-3.5 h-3.5" />
              </div>
              <span>아로아나의 바다창고</span>
              <span className="text-xs font-normal text-slate-500 font-mono">Arowana Freediving Club</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              자유로운 호흡과 안전한 버디십으로 바다와 마주하는 프리다이빙 크루. 
              우리는 상호 안전(Never Dive Alone)과 열린 장비 나눔 문화를 지향합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">동호회 소개</a>
            <a href="#sessions" className="hover:text-cyan-400 transition-colors">정기 세션</a>
            <a href="#gear" className="hover:text-cyan-400 transition-colors">장비 창고</a>
            <a href="#buddy" className="hover:text-cyan-400 transition-colors">버디 게시판</a>
            <a href="#trainer" className="hover:text-cyan-400 transition-colors">호흡 훈련</a>
            <a href="#gallery" className="hover:text-cyan-400 transition-colors">로그 & 갤러리</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 아로아나의 바다창고 (Arowana Freediving Club). All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>서울 송파구 백제고분로 41길 18 지하1층</span>
            <span aria-hidden="true">·</span>
            <span>문의: arowana.freedive@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
