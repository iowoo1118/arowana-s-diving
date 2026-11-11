import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Wind, Heart, Trophy } from 'lucide-react';

export const ApneaTrainer: React.FC = () => {
  const [mode, setMode] = useState<'relax' | 'apnea'>('relax');
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Relax mode state (4s inhale -> 2s hold -> 8s exhale)
  const [relaxPhase, setRelaxPhase] = useState<'들이마시기' | '호흡 유지' | '천천히 내쉬기'>('들이마시기');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  // Apnea hold timer state
  const [apneaElapsed, setApneaElapsed] = useState(0);
  const [bestApnea, setBestApnea] = useState<number>(145); // default sample: 2m 25s

  // Audio tone generator
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = (freq = 440, duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  };

  // Relax breathing timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && mode === 'relax') {
      interval = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition phase
            if (relaxPhase === '들이마시기') {
              setRelaxPhase('호흡 유지');
              playTone(520, 0.2);
              return 2;
            } else if (relaxPhase === '호흡 유지') {
              setRelaxPhase('천천히 내쉬기');
              playTone(380, 0.2);
              return 8;
            } else {
              setRelaxPhase('들이마시기');
              setCycleCount((c) => c + 1);
              playTone(600, 0.2);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, relaxPhase, soundEnabled]);

  // Apnea hold timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && mode === 'apnea') {
      interval = setInterval(() => {
        setApneaElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode]);

  const toggleRun = () => {
    if (!isRunning) {
      playTone(550, 0.2);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'relax') {
      setRelaxPhase('들이마시기');
      setPhaseSecondsLeft(4);
      setCycleCount(0);
    } else {
      if (apneaElapsed > bestApnea) {
        setBestApnea(apneaElapsed);
      }
      setApneaElapsed(0);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Visual pulse calculation
  const getScaleClass = () => {
    if (!isRunning || mode !== 'relax') return 'scale-100';
    if (relaxPhase === '들이마시기') return 'scale-125';
    if (relaxPhase === '호흡 유지') return 'scale-125';
    return 'scale-90';
  };

  return (
    <section id="trainer" className="py-20 lg:py-24 bg-slate-950 text-slate-100 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Apnea & Breathing Guide
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            아로아나 마인드 & 호흡 트레이너
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            다이빙 직전 심박수를 안정시키는 이완 호흡(Relaxation Breath)과 스태틱(STA) 숨참기를 연습해 보세요.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="max-w-md mx-auto flex items-center justify-center p-1 bg-slate-900 rounded-xl border border-slate-800 mb-8">
          <button
            onClick={() => {
              setIsRunning(false);
              setMode('relax');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              mode === 'relax'
                ? 'bg-cyan-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>이완 호흡 (4-2-8)</span>
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setMode('apnea');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              mode === 'apnea'
                ? 'bg-cyan-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>스태틱(STA) 숨참기 타이머</span>
          </button>
        </div>

        {/* Breathing Sandbox Card */}
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 text-center relative overflow-hidden">
          {/* Audio toggle */}
          <div className="absolute top-5 right-5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
              title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {mode === 'relax' ? (
            <div>
              {/* Visual Breathing Orb */}
              <div className="py-10 flex items-center justify-center">
                <div
                  className={`w-48 h-48 rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-sky-900/40 flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out shadow-2xl shadow-cyan-950/50 ${getScaleClass()}`}
                >
                  <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-1">
                    {relaxPhase}
                  </span>
                  <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                    {phaseSecondsLeft}s
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-8 space-y-1">
                <div>진행된 호흡 사이클: <strong className="text-cyan-300 font-mono">{cycleCount}회</strong></div>
                <div className="text-slate-500">배로 천천히 공기를 들이마시고, 어깨의 긴장을 풀며 길게 내쉽니다.</div>
              </div>
            </div>
          ) : (
            <div>
              {/* Apnea Timer Display */}
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
                  Static Apnea Stopwatch
                </div>
                <div className="text-6xl font-black text-white font-mono tracking-tight tabular-nums mb-3">
                  {formatSeconds(apneaElapsed)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>오늘의 최고 기록: {formatSeconds(bestApnea)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={toggleRun}
              className="px-6 py-3 text-xs font-semibold rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>일시정지</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>훈련 시작</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="p-3 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors border border-slate-700/60"
              title="리셋"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
