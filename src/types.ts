export type DiverLevel = '입문 (무자격)' | '레벨 1 (초급)' | '레벨 2 (중급)' | '레벨 3 (상급)' | '강사/마스터';

export interface DivingSession {
  id: string;
  title: string;
  location: string;
  locationDetail: string;
  date: string;
  time: string;
  leader: string;
  leaderCert: string;
  targetLevel: DiverLevel | '전체 레벨';
  maxSlots: number;
  currentSlots: number;
  entryFee: string;
  highlight: string;
  tags: string[];
}

export interface GearItem {
  id: string;
  name: string;
  category: '롱핀' | '모노핀' | '웻수트' | '마스크/스노클' | '다이브 컴퓨터' | '웨이트/기타';
  brand: string;
  specs: string;
  condition: '신품급' | '최상' | '양호';
  availableCount: number;
  totalCount: number;
  depositFee: string;
  rentalFee: string;
  isPopular?: boolean;
}

export interface BuddyPost {
  id: string;
  author: string;
  level: DiverLevel;
  pbDepth: string;
  title: string;
  content: string;
  preferredPlace: string;
  targetDate: string;
  timeSlot: string;
  lookingFor: string;
  createdAt: string;
  repliesCount: number;
  status: '모집중' | '마감';
}

export interface StoryItem {
  id: string;
  title: string;
  location: string;
  author: string;
  date: string;
  depth: string;
  image: string;
  summary: string;
}
