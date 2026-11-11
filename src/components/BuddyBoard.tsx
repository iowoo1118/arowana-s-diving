import React, { useState } from 'react';
import { BuddyPost, DiverLevel } from '../types';
import { UserPlus, MessageSquare, MapPin, Calendar, CheckCircle2, Shield } from 'lucide-react';

interface BuddyBoardProps {
  posts: BuddyPost[];
  onAddPost: (newPost: Omit<BuddyPost, 'id' | 'createdAt' | 'repliesCount' | 'status'>) => void;
}

export const BuddyBoard: React.FC<BuddyBoardProps> = ({ posts, onAddPost }) => {
  const [levelFilter, setLevelFilter] = useState<string>('전체');
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [contactModalPost, setContactModalPost] = useState<BuddyPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [authorLevel, setAuthorLevel] = useState<DiverLevel>('레벨 2 (중급)');
  const [authorPB, setAuthorPB] = useState('');
  const [targetPlace, setTargetPlace] = useState('용인 딥스테이션');
  const [targetDate, setTargetDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  // Reply message for contacting
  const [replyMessage, setReplyMessage] = useState('');
  const [replyContact, setReplyContact] = useState('');

  const filteredPosts = posts.filter((post) => {
    if (levelFilter === '전체') return true;
    return post.level.includes(levelFilter);
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !postTitle.trim() || !postContent.trim()) return;

    onAddPost({
      author: authorName,
      level: authorLevel,
      pbDepth: authorPB || '기록 없음',
      title: postTitle,
      content: postContent,
      preferredPlace: targetPlace,
      targetDate: targetDate || '일정 조율 가능',
      timeSlot: timeSlot || '시간 협의',
      lookingFor: lookingFor || '상호 세이프티 가능한 버디',
    });

    setIsPostingModalOpen(false);
    setAuthorName('');
    setAuthorPB('');
    setPostTitle('');
    setPostContent('');
    setLookingFor('');

    setToastMessage('🤿 버디 모집 글이 등록되었습니다! 회원들이 확인 후 연락을 드릴 예정입니다.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendBuddyReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactModalPost || !replyContact.trim()) return;

    setContactModalPost(null);
    setReplyMessage('');
    setReplyContact('');
    setToastMessage(`📨 [${contactModalPost.author}]님에게 버디 신청 메시지가 전송되었습니다.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <section id="buddy" className="py-20 lg:py-24 bg-slate-900/60 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Never Dive Alone
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              안전 버디 매칭 게시판
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              프리다이빙의 첫 번째 규칙은 절대 혼자 다이빙하지 않는 것입니다. 
              수심과 목표가 맞는 신뢰할 수 있는 동호회 버디를 찾아보세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPostingModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>버디 모집 글 등록</span>
            </button>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full mb-8">
          {['전체', '초급', '중급', '상급'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                levelFilter === lvl
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl === '전체' ? '전체 레벨' : `${lvl} 다이버`}
            </button>
          ))}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-8 p-4 rounded-xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-200 text-sm flex items-start gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">{toastMessage}</div>
          </div>
        )}

        {/* Buddy Post Cards */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2.5 max-w-2xl">
                {/* Meta without pills */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-cyan-400">{post.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.level}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300 font-mono">{post.pbDepth}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{post.createdAt}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{post.preferredPlace}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{post.targetDate} ({post.timeSlot})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>희망: {post.lookingFor}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                <button
                  onClick={() => setContactModalPost(post)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>버디 신청하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Buddy Post Modal */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-1">
              새로운 버디 모집 글 등록
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              동행할 수영장과 목표 훈련을 명확히 작성해주시면 더 빠르고 안전한 매칭이 이루어집니다.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">작성자 닉네임 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 딥블루 (김민재)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">본인 라이선스 *</label>
                  <select
                    value={authorLevel}
                    onChange={(e) => setAuthorLevel(e.target.value as DiverLevel)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="입문 (무자격)">입문 (무자격)</option>
                    <option value="레벨 1 (초급)">레벨 1 (초급)</option>
                    <option value="레벨 2 (중급)">레벨 2 (중급)</option>
                    <option value="레벨 3 (상급)">레벨 3 (상급)</option>
                    <option value="강사/마스터">강사 / 마스터</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">개인 최고 기록 (PB)</label>
                <input
                  type="text"
                  placeholder="예: CWT 22m / STA 3분 10초"
                  value={authorPB}
                  onChange={(e) => setAuthorPB(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">희망 다이빙풀</label>
                  <input
                    type="text"
                    placeholder="예: 용인 딥스테이션 / 잠실 5m"
                    value={targetPlace}
                    onChange={(e) => setTargetPlace(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">희망 날짜 및 시간</label>
                  <input
                    type="text"
                    placeholder="예: 이번주 토요일 오후 2시"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">글 제목 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 딥스테이션 20m 라인트레이닝 세이프티 버디 모십니다"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">상세 내용 및 훈련 목표 *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="훈련 내용, 상호 촬영 계획, 카풀 여부 등을 편하게 적어주세요."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">원하는 버디 조건</label>
                <input
                  type="text"
                  placeholder="예: 10m 이상 마중 세이프티 가능하신 분"
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPostingModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all"
                >
                  모집글 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              버디 신청 메시지 보내기
            </h3>
            <p className="text-xs text-cyan-400 mb-4">
              수신자: {contactModalPost.author} ({contactModalPost.preferredPlace})
            </p>

            <form onSubmit={handleSendBuddyReply} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  신청자 연락처 / 카톡 아이디 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="카톡 ID 또는 전화번호"
                  value={replyContact}
                  onChange={(e) => setReplyContact(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  전달할 메시지
                </label>
                <textarea
                  rows={3}
                  placeholder="예: 안녕하세요! 저도 당일 세션 참여 예정인데 세이프티 함께 맞춰보고 싶습니다. 레벨2이고 20m 세이프티 편안하게 가능해요."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalPost(null)}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all"
                >
                  버디 신청 전송
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
