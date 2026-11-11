import { DivingSession, GearItem, BuddyPost, StoryItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_freediver_ocean_1794375131621.jpg';
export const POOL_TRAINING_IMAGE = '/src/assets/images/freediving_pool_training_1794375132812.jpg';
export const WAREHOUSE_HUB_IMAGE = '/src/assets/images/warehouse_gear_hub_1794375133189.jpg';
export const OCEAN_TRIP_IMAGE = '/src/assets/images/ocean_trip_jeju_bohol_1794375131896.jpg';

export const INITIAL_SESSIONS: DivingSession[] = [
  {
    id: 'sess-1',
    title: '딥스테이션(36m) 주말 정기 트레이닝 & 프렌젤 클리닉',
    location: '용인 딥스테이션',
    locationDetail: '경기 용인시 처인구 포곡읍 (수심 36m)',
    date: '2026-11-15 (토)',
    time: '13:00 - 17:00 (4시간)',
    leader: '한도현 (AIDA Instructor)',
    leaderCert: 'AIDA 강사 / EFR 응급처치관',
    targetLevel: '전체 레벨',
    maxSlots: 10,
    currentSlots: 7,
    entryFee: '풀 입장료 실비 (동호회 강습비 0원)',
    highlight: '이퀄라이징(Frenzel) 점검 및 20~30m 라인 세이프티 집중',
    tags: ['딥스테이션', '라인트레이닝', '세이프티']
  },
  {
    id: 'sess-2',
    title: '잠실 다이빙풀 평일 야간 번개: 덕다이빙 & 핀킥 자세 교정',
    location: '잠실 제2수영장',
    locationDetail: '서울 송파구 올림픽로 25 잠실다이빙풀 (수심 5m)',
    date: '2026-11-18 (화)',
    time: '19:30 - 22:00',
    leader: '송민재 (Molchanovs Wave 3)',
    leaderCert: '몰차노프 W3 / 동호회 운영진',
    targetLevel: '입문 (무자격)',
    maxSlots: 8,
    currentSlots: 5,
    entryFee: '입장료 1.5만원 (수영장 직접 결제)',
    highlight: '초보자도 환영! 물 공포증 완화 및 유선형 자세 수중 촬영',
    tags: ['잠실', '퇴근후벙', '수중촬영', '초보환영']
  },
  {
    id: 'sess-3',
    title: 'K26 가평 아침 웜업 세션: CWT 딥 하강 & FIM 릴랙스',
    location: '가평 K26',
    locationDetail: '경기 가평군 청평면 고성리 (수심 26m)',
    date: '2026-11-22 (일)',
    time: '09:00 - 12:30',
    leader: '김채원 (SSI Master Diver)',
    leaderCert: 'SSI 프리다이버 레벨 3',
    targetLevel: '레벨 2 (중급)',
    maxSlots: 6,
    currentSlots: 4,
    entryFee: '풀 입장료 실비',
    highlight: '깊은 수심에서의 정숙과 중성부력 제어 훈련',
    tags: ['K26', '중급자', '수심도전']
  },
  {
    id: 'sess-4',
    title: '올림픽공원 다이빙풀 스테틱(STA) 멘탈 트레이닝 & 호흡법',
    location: '올림픽공원 수영장',
    locationDetail: '서울 송파구 올림픽로 424 (다이빙풀)',
    date: '2026-11-26 (목)',
    time: '19:00 - 21:30',
    leader: '박서준 (AIDA Master)',
    leaderCert: 'STA PB 5분 20초 / 동호회 트레이너',
    targetLevel: '전체 레벨',
    maxSlots: 8,
    currentSlots: 6,
    entryFee: '입장료 1.8만원',
    highlight: '4-7-8 이완 호흡, 횡격막 스트레칭, 숨참기 심리적 한계 극복',
    tags: ['올팍', '스테틱', '호흡법']
  }
];

export const INITIAL_GEAR: GearItem[] = [
  {
    id: 'gear-1',
    name: '리더핀스 카본 퓨어 바이핀 (Leaderfins Carbon Pure)',
    category: '롱핀',
    brand: 'Leaderfins',
    specs: '포르자 풋포켓 / Soft 강도 / 사이즈 37-44 보유',
    condition: '최상',
    availableCount: 8,
    totalCount: 12,
    depositFee: '20,000원 (반납시 환급)',
    rentalFee: '정회원 무료 / 준회원 5,000원',
    isPopular: true
  },
  {
    id: 'gear-2',
    name: '세트마 만트라 카본 C8 핀 (Cetma Composites Mantra)',
    category: '롱핀',
    brand: 'Cetma Composites',
    specs: 'S-Wing 풋포켓 / 고탄성 카본 / 수심 트레이닝용',
    condition: '최상',
    availableCount: 3,
    totalCount: 4,
    depositFee: '30,000원 (반납시 환급)',
    rentalFee: '정회원 무료 / 준회원 10,000원',
    isPopular: true
  },
  {
    id: 'gear-3',
    name: '몰차노프 프로 모노핀 3 카본 (Molchanovs Pro Monofin 3)',
    category: '모노핀',
    brand: 'Molchanovs',
    specs: '커스텀 앵글 / 돌핀킥 추진력 극대화 / 미디엄 블레이드',
    condition: '신품급',
    availableCount: 2,
    totalCount: 2,
    depositFee: '50,000원 (반납시 환급)',
    rentalFee: '정회원 5,000원',
    isPopular: false
  },
  {
    id: 'gear-4',
    name: '베스트다이브 2mm 투피스 야마모토 네오프렌 수트',
    category: '웻수트',
    brand: 'Bestdive',
    specs: 'SCS 글라이드 스킨 / 남성(M, L, XL), 여성(XS, S, M) 전사이즈',
    condition: '최상',
    availableCount: 14,
    totalCount: 18,
    depositFee: '20,000원 (반납시 환급)',
    rentalFee: '정회원 무료 / 준회원 5,000원',
    isPopular: true
  },
  {
    id: 'gear-5',
    name: '스페라 저용적 마스크 & 실리콘 J형 스노클 세트',
    category: '마스크/스노클',
    brand: 'Aqua Lung Sphera X',
    specs: '곡면 렌즈 초경량 / 이퀄라이징 용이 코포켓',
    condition: '최상',
    availableCount: 15,
    totalCount: 20,
    depositFee: '10,000원 (반납시 환급)',
    rentalFee: '전회원 무료 렌탈',
    isPopular: false
  },
  {
    id: 'gear-6',
    name: '가민 디센트 G1 다이브 컴퓨터 (Garmin Descent G1)',
    category: '다이브 컴퓨터',
    brand: 'Garmin',
    specs: '실시간 수심/하강속도/수면휴식 알림 / GPS 로그 기록',
    condition: '신품급',
    availableCount: 4,
    totalCount: 5,
    depositFee: '30,000원 (반납시 환급)',
    rentalFee: '정회원 5,000원 / 준회원 10,000원',
    isPopular: true
  },
  {
    id: 'gear-7',
    name: '아로아나 자체제작 실리콘 넥웨이트 (1.2kg ~ 2.5kg)',
    category: '웨이트/기타',
    brand: 'Arowana Custom',
    specs: '부드러운 실리콘 코팅 / 인체공학 쇄골 압박 최소화',
    condition: '양호',
    availableCount: 18,
    totalCount: 20,
    depositFee: '10,000원',
    rentalFee: '전회원 무료 렌탈',
    isPopular: false
  }
];

export const INITIAL_BUDDY_POSTS: BuddyPost[] = [
  {
    id: 'buddy-1',
    author: '바다거북 (이유진)',
    level: '레벨 2 (중급)',
    pbDepth: 'PB 24m / STA 3m 40s',
    title: '11/16(일) 딥스테이션 오후 세션 라인트레이닝 세이프티 버디 구해요!',
    content: 'CWT 25m 도전 및 이퀄라이징 프렌젤 점검 예정입니다. 수심 15~20m 세이프티 가능하신 레벨 2 이상 버디님 함께해요! 서로 영상도 정성껏 찍어드립니다.',
    preferredPlace: '용인 딥스테이션',
    targetDate: '2026-11-16 (일)',
    timeSlot: '14:00 - 18:00',
    lookingFor: '레벨 2 이상 상호 세이프티 가능하신 분',
    createdAt: '2시간 전',
    repliesCount: 3,
    status: '모집중'
  },
  {
    id: 'buddy-2',
    author: '블루노트 (최원석)',
    level: '레벨 1 (초급)',
    pbDepth: 'PB 12m',
    title: '평일 잠실 제2수영장에서 덕다이빙 기본기 같이 연습하실 초보 버디님!',
    content: '라이선스 딴 지 한 달 된 뉴비입니다. 혼자 가기 쑥스러워서 잠실 5m 풀에서 덕다이빙 자세랑 중성부력 감각 같이 잡으실 분 계실까요? 아로아나 창고에서 롱핀 빌려서 갈 생각입니다.',
    preferredPlace: '잠실 제2수영장',
    targetDate: '2026-11-19 (수)',
    timeSlot: '19:30 - 21:30',
    lookingFor: '초보 환영 (레벨 1~2 누구나 편하게)',
    createdAt: '5시간 전',
    repliesCount: 4,
    status: '모집중'
  },
  {
    id: 'buddy-3',
    author: '해연 (강지훈)',
    level: '레벨 3 (상급)',
    pbDepth: 'PB 38m / STA 4m 50s',
    title: '가평 K26 오전 FIM 및 마우스필(Mouthfill) 감각 익히실 분',
    content: '30m 언저리에서 마우스필 연습 및 턴 자세 가다듬을 예정입니다. 릴랙스 위주로 천천히 타실 분 모십니다. 웜업 천천히 같이 해요.',
    preferredPlace: '가평 K26',
    targetDate: '2026-11-21 (토)',
    timeSlot: '09:30 - 12:30',
    lookingFor: '레벨 2 후반 또는 레벨 3 다이버',
    createdAt: '1일 전',
    repliesCount: 2,
    status: '모집중'
  }
];

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    title: '아로아나 제주 서귀포 문섬 원정: 푸른 바다와의 조우',
    location: '제주 서귀포 문섬 & 범섬',
    author: '클럽 마스터 강민석',
    date: '2026년 10월',
    depth: '수심 22m 펀다이빙',
    image: OCEAN_TRIP_IMAGE,
    summary: '청명한 가을 제주의 연산호 군락 사이를 핀 한 번의 킥으로 미끄러져 내려가는 순간, 세상의 모든 소음이 멈추고 심장 박동만 남았습니다.'
  },
  {
    id: 'story-2',
    title: '딥스테이션 36m 트레이닝: 두려움을 호흡으로 녹여내다',
    location: '용인 딥스테이션 36m',
    author: '회원 정소희',
    date: '2026년 11월',
    depth: 'PB 30.5m 달성',
    image: POOL_TRAINING_IMAGE,
    summary: '처음엔 5미터도 귓속이 아파 버거웠는데, 아로아나 창고 버디들의 꼼꼼한 세이프티와 프렌젤 팁 덕분에 편안한 자유낙하(Freefall)를 맛보았습니다.'
  },
  {
    id: 'story-3',
    title: '동호회의 심장, 아로아나 장비 라운지에서의 금요일 밤',
    location: '아로아나 창고 라운지 (송파 아지트)',
    author: '운영진 일동',
    date: '상시 운영',
    depth: '지상 웜업 & 핀 세팅',
    image: WAREHOUSE_HUB_IMAGE,
    summary: '다이빙 후 따뜻한 차를 마시며 로그북을 적고, 새 카본 블레이드와 넥웨이트를 피팅해보는 시간. 우리는 물속뿐 아니라 물 밖에서도 최고의 버디입니다.'
  }
];

export const CLUB_FAQS = [
  {
    q: '수영을 전혀 못하거나 물을 무서워해도 가입할 수 있나요?',
    a: '물론입니다! 프리다이빙은 수영 영법과는 전혀 다릅니다. 롱핀(오리발)과 수트의 부력 덕분에 물에 편안히 뜨며, 숨을 쉬지 않는 이완 상태를 체계적으로 배우므로 물 공포증을 극복하고 오신 회원님들이 매우 많습니다.'
  },
  {
    q: '장비가 하나도 없는데 바로 참여할 수 있나요?',
    a: '네, 바로 그것이 우리 동호회의 이름이 "아로아나의 바다창고"인 이유입니다! 카본 롱핀, 저볼륨 마스크, 2mm 네오프렌 수트, 다이브 컴퓨터까지 동호회 창고에 전 사이즈가 구비되어 있어 첫 모임부터 무료/최소 실비로 대여해 드립니다.'
  },
  {
    q: '이퀄라이징(귀 압력 평형)이 잘 안 되는데 도움을 받을 수 있나요?',
    a: '발살바(Valsalva)에서 프렌젤(Frenzel)로 넘어가지 못해 고민하는 분들을 위해 지상 오토벤트 및 이퀄라이징 풍선 훈련, 혀 뿌리 제어 팁을 매주 세션 전후로 꼼꼼하게 피드백해 드립니다.'
  },
  {
    q: '동호회 정기 모임 및 세이프티 안전 수칙은 어떻게 되나요?',
    a: '아로아나의 바다창고는 "절대 단독 다이빙 금지(Never Dive Alone)" 철칙을 100% 준수합니다. 모든 잠수풀 입장 시 1:1 버디 시스템을 운영하며, 하강하는 다이버를 수면에서 지켜보고 10~15m 구간에서 마중 나가는 세이프티 프로토콜을 철저히 지킵니다.'
  }
];
