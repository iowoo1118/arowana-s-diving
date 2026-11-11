import React from 'react';
import { WAREHOUSE_HUB_IMAGE } from '../data/mockData';
import { Shield, Sparkles, Anchor, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-950 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
            Why Arowana's Warehouse
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-5 [text-wrap:balance]">
            고대의 물고기 아로아나처럼 유연하게, <br />
            다이버들의 든든한 아지트 ‘창고’처럼 따뜻하게.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            비싼 장비 구매에 대한 문턱 때문에, 혹은 믿을 수 있는 버디를 찾지 못해 프리다이빙의 깊은 매력을 놓치지 않도록. 
            ‘아로아나의 바다창고’는 입문자부터 마스터까지 모두가 장비를 공유하고 지식을 나누는 열린 프리다이빙 커뮤니티입니다.
          </p>
        </div>

        {/* 2-Column Split: Image Showcase & Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Real Warehouse Club Hub Photo */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={WAREHOUSE_HUB_IMAGE}
              alt="아로아나 프리다이빙 창고 장비실 및 커뮤니티 라운지"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover min-h-[360px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs text-cyan-300 font-medium mb-1">Seoul Songpa · Arowana Hub</div>
              <div className="text-sm font-semibold text-white">동호회원 전용 장비실 & 드라이 트레이닝 라운지</div>
              <div className="text-xs text-slate-300 mt-1">카본 롱핀 피팅, 웻수트 수선, 다이빙 로그북 나눔</div>
            </div>
          </div>

          {/* Right: Numbered Editorial Core Values */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">01. Never Dive Alone</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                모든 세션은 100% 1:1 상호 세이프티로 진행됩니다. 딥스테이션 36m부터 잠실 5m 풀까지 수면 안전과 하강 마중 수칙을 엄격하게 지킵니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">02. 오픈 기어 웨어하우스</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                수십만 원대 카본 롱핀, 야마모토 네오프렌 수트, 다이브 컴퓨터를 초보 시절부터 부담 없이 직접 착용해보고 실전 테스트할 수 있습니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">03. 주 3~4회 정기 딥풀 번개</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                주말 딥스테이션(36m)과 K26(26m)은 물론, 평일 퇴근 후 잠실/올림픽 다이빙풀 번개까지 일정에 맞추어 언제든 물에 적실 수 있습니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">04. 따뜻한 블루워터 크루</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                제주 서귀포 연산호 투어, 동해 난파선, 필리핀 보홀·모알보알 원정까지. 안전하고 신뢰하는 버디들과 평생 기억에 남을 해양 다이빙을 떠납니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
