import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SessionsSection } from './components/SessionsSection';
import { GearWarehouse } from './components/GearWarehouse';
import { BuddyBoard } from './components/BuddyBoard';
import { ApneaTrainer } from './components/ApneaTrainer';
import { GallerySection } from './components/GallerySection';
import { ClubhouseInfo } from './components/ClubhouseInfo';
import { FaqSection } from './components/FaqSection';
import { JoinModal } from './components/JoinModal';
import { Footer } from './components/Footer';

import { INITIAL_SESSIONS, INITIAL_GEAR, INITIAL_BUDDY_POSTS } from './data/mockData';
import { DivingSession, GearItem, BuddyPost } from './types';

export default function App() {
  const [sessions, setSessions] = useState<DivingSession[]>(INITIAL_SESSIONS);
  const [gearList, setGearList] = useState<GearItem[]>(INITIAL_GEAR);
  const [buddyPosts, setBuddyPosts] = useState<BuddyPost[]>(INITIAL_BUDDY_POSTS);

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalInterest, setJoinModalInterest] = useState<string | undefined>(undefined);

  const handleOpenJoinModal = (initialInterest?: string) => {
    setJoinModalInterest(initialInterest);
    setIsJoinModalOpen(true);
  };

  const handleScrollToSessions = () => {
    const el = document.getElementById('sessions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // RSVP handler
  const handleRSVP = (sessionId: string, _applicantName: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId && s.currentSlots < s.maxSlots) {
          return { ...s, currentSlots: s.currentSlots + 1 };
        }
        return s;
      })
    );
  };

  // Gear rental handler
  const handleRentGear = (
    gearId: string,
    _renterName: string,
    _rentDate: string,
    _sizeNote: string
  ) => {
    setGearList((prev) =>
      prev.map((g) => {
        if (g.id === gearId && g.availableCount > 0) {
          return { ...g, availableCount: g.availableCount - 1 };
        }
        return g;
      })
    );
  };

  // Add buddy post handler
  const handleAddBuddyPost = (
    newPost: Omit<BuddyPost, 'id' | 'createdAt' | 'repliesCount' | 'status'>
  ) => {
    const postItem: BuddyPost = {
      ...newPost,
      id: `buddy-${Date.now()}`,
      createdAt: '방금 전',
      repliesCount: 0,
      status: '모집중',
    };
    setBuddyPosts((prev) => [postItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* 3-Zone Top Bar Contract Navigation */}
      <Navbar onOpenJoinModal={handleOpenJoinModal} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenJoinModal={handleOpenJoinModal}
          onScrollToSessions={handleScrollToSessions}
        />

        {/* About & Core Identity Section */}
        <AboutSection />

        {/* Regular Sessions & RSVP */}
        <SessionsSection sessions={sessions} onRSVP={handleRSVP} />

        {/* Gear Warehouse Locker */}
        <GearWarehouse gearList={gearList} onRentGear={handleRentGear} />

        {/* Never Dive Alone Buddy Board */}
        <BuddyBoard posts={buddyPosts} onAddPost={handleAddBuddyPost} />

        {/* Interactive Apnea & Breathing Trainer */}
        <ApneaTrainer />

        {/* Diving Logs & Visual Gallery */}
        <GallerySection />

        {/* Clubhouse & Lounge Physical Venue */}
        <ClubhouseInfo />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Join & Inquiries Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        initialInterest={joinModalInterest}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
