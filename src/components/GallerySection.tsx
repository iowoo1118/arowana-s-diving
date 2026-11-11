import React, { useState } from 'react';
import { INITIAL_STORIES } from '../data/mockData';
import { StoryItem } from '../types';
import { MapPin, Calendar, Compass, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-slate-900/40 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Stories & Moments
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            아로아나 다이빙 로그 & 갤러리
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            물속 깊은 곳에서 버디와 나눈 눈빛, 환상적인 산호초와 고요한 잠수풀의 순간들을 기록합니다.
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 font-medium text-cyan-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{story.location}</span>
                  </div>
                  <span className="font-mono text-slate-400">{story.depth}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-slate-500 mb-2">
                  <span>{story.author}</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {story.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {story.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[16/9] w-full bg-slate-950 overflow-hidden relative">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2 font-medium">
                <span>{selectedStory.location}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedStory.depth}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{selectedStory.date}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {selectedStory.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                {selectedStory.summary}
              </p>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>작성자: <strong className="text-slate-200">{selectedStory.author}</strong></span>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
