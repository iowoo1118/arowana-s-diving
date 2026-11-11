import React, { useState } from 'react';
import { DivingSession } from '../types';
import { MapPin, Clock, UserCheck, CalendarCheck, CheckCircle2 } from 'lucide-react';

interface SessionsSectionProps {
  sessions: DivingSession[];
  onRSVP: (sessionId: string, applicantName: string) => void;
}

export const SessionsSection: React.FC<SessionsSectionProps> = ({ sessions, onRSVP }) => {
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [selectedSession, setSelectedSession] = useState<DivingSession | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLevel, setApplicantLevel] = useState('레벨 1 (초급)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filters = ['전체', '용인 딥스테이션', '가평 K26', '잠실 제2수영장', '올림픽공원 수영장'];

  const filteredSessions = sessions.filter((s) => {
    if (activeFilter === '전체') return true;
    return s.location.includes(activeFilter) || s.locationDetail.includes(activeFilter);
  });

  const handleConfirmRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;
    if (!applicantName.trim()) return;

    onRSVP(selectedSession.id, applicantName);
    const sessionTitle = selectedSession.title;
    setSelectedSession(null);
    setApplicantName('');
    setApplicantPhone('');

    setToastMessage(`🎉 [${sessionTitle}] 세션 참가가 성공적으로 접수되었습니다! 담당 리더가 오픈챗 초대 링크를 전송해 드립니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <section id="sessions" className="py-20 lg:py-24 bg-slate-900/50 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Official Schedule
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              정기 트레이닝 & 벙개 세션
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              실시간으로 신청 가능한 수도권 잠수풀 세션입니다. 리더 강사의 코칭과 세이프티 버디가 함께 배정됩니다.
            </p>
          </div>

          {/* Interactive filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-8 p-4 rounded-xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-200 text-sm flex items-start gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">{toastMessage}</div>
          </div>
        )}

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSessions.map((session) => {
            const isFull = session.currentSlots >= session.maxSlots;
            const remaining = session.maxSlots - session.currentSlots;

            return (
              <div
                key={session.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Top metadata line without pill boxes */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cyan-400">{session.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{session.targetLevel}</span>
                    </div>
                    <span className="font-mono tabular-nums text-slate-300">
                      잔여 <strong className={remaining <= 2 ? 'text-amber-400' : 'text-cyan-400'}>{remaining}석</strong> / 총 {session.maxSlots}석
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {session.title}
                  </h3>

                  {/* Highlights */}
                  <p className="text-sm text-slate-300 mb-5 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                    {session.highlight}
                  </p>

                  {/* Details metadata */}
                  <div className="space-y-2 text-xs text-slate-400 mb-6">
                    <div className="flex items-center gap-2.5">
                      <CalendarCheck className="w-4 h-4 text-cyan-400/80 shrink-0" />
                      <span className="text-slate-200 font-medium">{session.date}</span>
                      <span aria-hidden="true">·</span>
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-cyan-400/80 shrink-0" />
                      <span>{session.locationDetail}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="w-4 h-4 text-cyan-400/80 shrink-0" />
                      <span>리더: <strong className="text-slate-200">{session.leader}</strong> ({session.leaderCert})</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action & Cost */}
                <div className="pt-4 border-t border-slate-900 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    참가비: <span className="text-slate-200 font-medium">{session.entryFee}</span>
                  </div>

                  <button
                    disabled={isFull}
                    onClick={() => setSelectedSession(session)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      isFull
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 active:scale-[0.98]'
                    }`}
                  >
                    {isFull ? '신청 마감' : '세션 참가 신청'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-500">
            선택하신 장소의 예정된 세션이 없습니다. 상단에서 다른 수영장을 선택해 보세요.
          </div>
        )}
      </div>

      {/* RSVP Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              트레이닝 세션 참가 신청
            </h3>
            <p className="text-xs text-cyan-400 mb-4">
              {selectedSession.title}
            </p>

            <form onSubmit={handleConfirmRSVP} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  참가자 성함 (닉네임) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 (바다사자)"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  연락처 (카카오톡 오픈챗 안내용) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  현재 다이빙 레벨
                </label>
                <select
                  value={applicantLevel}
                  onChange={(e) => setApplicantLevel(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="입문 (무자격)">입문 (라이선스 없음 / 첫 시작)</option>
                  <option value="레벨 1 (초급)">레벨 1 (초급 / 5m 풀 이수)</option>
                  <option value="레벨 2 (중급)">레벨 2 (중급 / 수심 15~20m)</option>
                  <option value="레벨 3 (상급)">레벨 3 (상급 / 수심 30m+)</option>
                  <option value="강사/마스터">강사 / 마스터 다이버</option>
                </select>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1">
                <div>· 세션 일시: <strong className="text-slate-200">{selectedSession.date} {selectedSession.time}</strong></div>
                <div>· 장소: <strong className="text-slate-200">{selectedSession.location}</strong></div>
                <div>· 필수 장비: 마스크, 스노클, 롱핀, 수트 (창고 장비 무료 대여 가능)</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSession(null)}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all"
                >
                  신청 완료하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
