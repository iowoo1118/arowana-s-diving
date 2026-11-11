import React, { useState } from 'react';
import { GearItem } from '../types';
import { Package, Search, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface GearWarehouseProps {
  gearList: GearItem[];
  onRentGear: (gearId: string, renterName: string, rentDate: string, sizeNote: string) => void;
}

export const GearWarehouse: React.FC<GearWarehouseProps> = ({ gearList, onRentGear }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GearItem | null>(null);
  const [renterName, setRenterName] = useState('');
  const [rentDate, setRentDate] = useState('');
  const [sizeNote, setSizeNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['전체', '롱핀', '모노핀', '웻수트', '마스크/스노클', '다이브 컴퓨터', '웨이트/기타'];

  const filteredGear = gearList.filter((item) => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitRental = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !renterName.trim()) return;

    onRentGear(selectedItem.id, renterName, rentDate, sizeNote);
    const itemName = selectedItem.name;
    setSelectedItem(null);
    setRenterName('');
    setRentDate('');
    setSizeNote('');

    setToastMessage(`📦 [${itemName}] 대여 예약이 완료되었습니다. 창고지기가 확인 후 대여 번호표를 발급해 드립니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <section id="gear" className="py-20 lg:py-24 bg-slate-950 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Arowana Equipment Locker
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              아로아나 장비 창고
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              정회원 및 입문 회원을 위한 오픈 장비실. 고가의 카본 롱핀부터 네오프렌 수트, 다이브 컴퓨터까지 
              직접 착용해보고 세션에 들고 갈 수 있습니다.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="장비명, 브랜드, 스펙 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
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

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGear.map((item) => {
            const isOutOfStock = item.availableCount <= 0;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all hover:bg-slate-900/70"
              >
                <div>
                  {/* Clean unboxed metadata line */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cyan-400">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.brand}</span>
                    </div>
                    <span className="font-mono tabular-nums text-slate-300">
                      잔여 <strong className={item.availableCount <= 1 ? 'text-amber-400' : 'text-cyan-400'}>{item.availableCount}</strong> / {item.totalCount}대
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.name}
                  </h3>

                  {/* Specs */}
                  <p className="text-xs text-slate-300 mb-4 bg-slate-950/60 p-2.5 rounded-lg border border-slate-900 leading-relaxed">
                    {item.specs}
                  </p>

                  {/* Condition & Fees */}
                  <div className="space-y-1.5 text-xs text-slate-400 mb-6">
                    <div className="flex items-center justify-between">
                      <span>장비 상태:</span>
                      <span className="text-slate-200 font-medium">{item.condition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>대여 요금:</span>
                      <span className="text-cyan-300 font-medium">{item.rentalFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>보증금:</span>
                      <span className="text-slate-400">{item.depositFee}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    창고 픽업 및 세션 현장 전달
                  </div>
                  <button
                    disabled={isOutOfStock}
                    onClick={() => setSelectedItem(item)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      isOutOfStock
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 border border-slate-700/80'
                    }`}
                  >
                    {isOutOfStock ? '대여중 (전량 소진)' : '대여 신청'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGear.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-500">
            검색 결과와 일치하는 장비가 없습니다.
          </div>
        )}
      </div>

      {/* Equipment Rental Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              장비 대여 예약 신청
            </h3>
            <p className="text-xs text-cyan-400 mb-4">
              {selectedItem.name} ({selectedItem.brand})
            </p>

            <form onSubmit={handleSubmitRental} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  신청자 이름 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김민수"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  사용 예정일 / 세션 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 11월 15일 딥스테이션 세션"
                  value={rentDate}
                  onChange={(e) => setRentDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  희망 사이즈 및 요청사항
                </label>
                <input
                  type="text"
                  placeholder="예: 롱핀 39사이즈 / 웻수트 M사이즈 / 발볼 넓음"
                  value={sizeNote}
                  onChange={(e) => setSizeNote(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1">
                <div>· 대여료: <strong className="text-cyan-300">{selectedItem.rentalFee}</strong></div>
                <div>· 보증금 안내: {selectedItem.depositFee}</div>
                <div>· 수령 방법: 서울 송파 아지트 창고 수령 또는 주말 정기 세션 풀장 현장 전달</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                >
                  닫기
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all"
                >
                  대여 예약 접수
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
