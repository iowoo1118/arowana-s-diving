import React from 'react';
import { HERO_IMAGE } from '../data/mockData';
import { Calendar, Compass, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenJoinModal: (initialInterest?: string) => void;
  onScrollToSessions: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal, onScrollToSessions }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-900">
      {/* Background Hero Image with deeper contrast, rich saturation, and oceanic depth */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="프리다이버가 푸른 바다 속으로 고요하게 하강하는 모습"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out brightness-[0.82] contrast-[1.25] saturate-[1.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl">
          {/* Subtle unboxed kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 mb-4 uppercase">
            <span>Arowana Freediving Club</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Since 2021</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>수도권 프리다이빙 아지트</span>
          </div>

          {/* Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18] mb-6 [text-wrap:balance]">
            깊고 고요한 바다로 향하는 호흡, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
              아로아나의 바다창고
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
            수면 아래 세상에서 만나는 가장 순수한 침묵. <br />
            장비 부담 없이 시작하는 풀세트 대여 창고, 매주 열리는 딥스테이션·K26 정기 세션, 
            그리고 100% 안전을 약속하는 1:1 버디들이 여러분을 기다립니다.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenJoinModal('신규 회원 가입 및 환영 세션')}
              className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-lg shadow-cyan-950/40 flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>이번 주 세션 참여 & 가입</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToSessions}
              className="px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>정기 세션 일정표</span>
            </button>
          </div>
        </div>

        {/* Quantitative Proof Strip in full-width row below */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">240<span className="text-cyan-400">+</span></div>
            <div className="text-xs text-slate-400 mt-1">함께하는 활동 크루</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">520<span className="text-cyan-400">+</span></div>
            <div className="text-xs text-slate-400 mt-1">누적 다이빙 세션 기록</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">100<span className="text-cyan-400">%</span></div>
            <div className="text-xs text-slate-400 mt-1">상호 세이프티 버디제</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">85<span className="text-cyan-400">set</span></div>
            <div className="text-xs text-slate-400 mt-1">창고 보유 공유 장비</div>
          </div>
        </div>
      </div>
    </section>
  );
};
