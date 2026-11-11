import React, { useState } from 'react';
import { MapPin, Coffee, Wrench, ShieldAlert, Copy, Check } from 'lucide-react';

export const ClubhouseInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const address = '서울특별시 송파구 백제고분로 41길 18, 지하 1층 (아로아나의 바다창고)';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-20 lg:py-24 bg-slate-900/50 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
                Clubhouse & Lounge
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                아로아나 오프라인 창고 & 라운지
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                잠실 제2수영장 다이빙풀에서 차로 7분 거리. 
                다이빙 전후로 회원들이 모여 장비를 피팅하고, 따뜻한 커피를 마시며 로그북을 공유하는 쉼터입니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <div className="text-slate-200 font-semibold mb-1">아지트 주소</div>
                  <div className="text-slate-400 mb-2">{address}</div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 rounded-md hover:bg-cyan-900/60 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? '주소 복사 완료' : '주소 복사하기'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1">
                    <Coffee className="w-4 h-4 text-cyan-400" />
                    <span>라운지 & 카페</span>
                  </div>
                  <div className="text-slate-400">드립 커피, 냉온음료, 드라이 매트 구비</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    <span>장비 튜닝 작업대</span>
                  </div>
                  <div className="text-slate-400">핀 풋포켓 교체, 넥웨이트 제작, 글루잉</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Operational rules & Hours card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span>창고 이용 및 안전 헌장</span>
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-cyan-400 font-bold">01</span>
                <span><strong>무단 단독 다이빙 엄금</strong>: 동호회 이름으로 입장하는 모든 풀장 및 해양 세션은 공식 1:1 버디 상호 점검을 마친 후 입수합니다.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-cyan-400 font-bold">02</span>
                <span><strong>장비 청결 반납</strong>: 공유 롱핀과 수트는 민물 세척 후 창고 통풍 건조대에 정돈하여 반납합니다.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-cyan-400 font-bold">03</span>
                <span><strong>초보자 배려 문화</strong>: 수심이나 숨참기 기록으로 서열을 매기지 않으며, 누구나 편안하고 안전하게 물과 친해질 수 있도록 격려합니다.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>운영 시간: <strong>화~일 13:00 - 22:00 (월요일 휴무)</strong></span>
              <span className="text-cyan-400 font-medium">방문 전 오픈챗 알림 필수</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
