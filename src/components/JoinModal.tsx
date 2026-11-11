import React, { useState } from 'react';
import { DiverLevel } from '../types';
import { X, CheckCircle2, MessageCircle, Copy, Check } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  initialInterest?: string;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, initialInterest, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState<DiverLevel>('입문 (무자격)');
  const [interest, setInterest] = useState(initialInterest || '정기 잠수풀 세션 참여');
  const [experience, setExperience] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AROWANA-DEEP-2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setExperience('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
              Join Arowana Freediving Club
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              아로아나의 바다창고 회원 가입 신청
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              가입비나 월 회비는 전혀 없습니다. 안전한 다이빙과 즐거운 동행을 약속하는 분이라면 
              수영 실력이나 장비 유무와 상관없이 환영합니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  이름 또는 닉네임 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김바다"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  휴대폰 번호 (오픈챗 가입 안내용) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    현재 라이선스
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as DiverLevel)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="입문 (무자격)">입문 (라이선스 없음)</option>
                    <option value="레벨 1 (초급)">AIDA/SSI 레벨 1</option>
                    <option value="레벨 2 (중급)">AIDA/SSI 레벨 2</option>
                    <option value="레벨 3 (상급)">AIDA/SSI 레벨 3</option>
                    <option value="강사/마스터">강사 / 인스트럭터</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    주요 관심 분야
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="정기 잠수풀 세션 참여">정기 잠수풀 세션 참여</option>
                    <option value="창고 장비 무료 대여">창고 장비 무료 대여</option>
                    <option value="버디 구하기 & 친목">버디 구하기 & 친목</option>
                    <option value="해양 블루워터 투어">해양 블루워터 투어</option>
                    <option value="프렌젤 이퀄라이징 교정">프렌젤 이퀄라이징 교정</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  남기고 싶은 말 (보유 장비 여부, 다이빙 목표 등)
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 롱핀이 없어서 대여하고 싶어요 / 다음 달 딥스테이션 첫 방문 예정입니다!"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] rounded-xl transition-all shadow-md shadow-cyan-950/30"
                >
                  가입 신청서 제출하기
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              환영합니다, {name}님!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
              아로아나의 바다창고 크루원이 되신 것을 진심으로 환영합니다. 
              공식 카카오톡 오픈채팅방에 입장하여 버디들과 인사를 나누어 보세요.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">오픈채팅방 입장 참여코드:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-cyan-300">
                  <span>AROWANA-DEEP-2026</span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1 hover:text-white transition-colors"
                    title="코드 복사"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">
                · 담당 운영진이 24시간 내 문자 메시지로 환영 안내 및 세션 참여 매뉴얼을 보내드립니다.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert('카카오톡 오픈채팅방 [아로아나의 바다창고 Freediving] 검색 후 참여코드 AROWANA-DEEP-2026을 입력해주세요.');
                }}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>카카오톡 오픈챗 바로가기</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                창 닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
