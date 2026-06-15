// speakingData.ts — Speaking(Говорение) 카테고리 문제 데이터
// 기존 grammar/vocabulary 데이터와 분리된 독립 파일

export type SpeakingQuestionType =
  | 'listening_picture'   // 듣고 그림 선택
  | 'meaning_picture'     // 러시아어 뜻 → 그림 선택
  | 'complete_sentence';  // 문장 완성

// 그림 카드 선택지 (이모지 + 텍스트로 표현)
export interface PictureChoice {
  id: string;
  korean: string;       // 한국어 텍스트
  russian: string;      // 러시아어 뜻
  emoji: string;        // 시각적 표현 이모지
  romanization: string; // 로마자 표기
}

export interface SpeakingQuestion {
  id: string;
  level: 1 | 2 | 3 | 4 | 5;
  type: SpeakingQuestionType;

  // 공통
  instructionRu: string; // 문제 지시문 (러시아어)

  // listening_picture / meaning_picture 공통
  audioText?: string;      // TTS로 읽을 텍스트 (한국어)
  choices?: PictureChoice[]; // 4지선다 그림 선택지
  correctChoiceId?: string;  // 정답 선택지 id

  // complete_sentence 전용
  sentenceKr?: string;     // 빈칸이 있는 한국어 문장 (예: "___ 안녕하세요")
  sentenceRu?: string;     // 문장의 러시아어 번역
  wordChoices?: string[];  // 단어 선택 카드 목록 (한국어)
  correctWord?: string;    // 정답 단어

  // meaning_picture 전용
  meaningRu?: string;      // 보여줄 러시아어 뜻
}

// ────────────────────────────────────────────────────────────────
// LEVEL 1 — 인사, 감사, 사과, 국가명, 기본 명사 (12문제)
// ────────────────────────────────────────────────────────────────
const level1Questions: SpeakingQuestion[] = [
  // --- listening_picture ---
  {
    id: 'sp1-001',
    level: 1,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '한국',
    choices: [
      { id: 'A', korean: '한국', russian: 'Корея', emoji: '🇰🇷', romanization: 'han-guk' },
      { id: 'B', korean: '미국', russian: 'Америка', emoji: '🇺🇸', romanization: 'mi-guk' },
      { id: 'C', korean: '중국', russian: 'Китай', emoji: '🇨🇳', romanization: 'jung-guk' },
      { id: 'D', korean: '영국', russian: 'Англия', emoji: '🇬🇧', romanization: 'yeong-guk' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp1-002',
    level: 1,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '미국',
    choices: [
      { id: 'A', korean: '중국', russian: 'Китай', emoji: '🇨🇳', romanization: 'jung-guk' },
      { id: 'B', korean: '미국', russian: 'Америка', emoji: '🇺🇸', romanization: 'mi-guk' },
      { id: 'C', korean: '한국', russian: 'Корея', emoji: '🇰🇷', romanization: 'han-guk' },
      { id: 'D', korean: '영국', russian: 'Англия', emoji: '🇬🇧', romanization: 'yeong-guk' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp1-003',
    level: 1,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '영국',
    choices: [
      { id: 'A', korean: '한국', russian: 'Корея', emoji: '🇰🇷', romanization: 'han-guk' },
      { id: 'B', korean: '중국', russian: 'Китай', emoji: '🇨🇳', romanization: 'jung-guk' },
      { id: 'C', korean: '영국', russian: 'Англия', emoji: '🇬🇧', romanization: 'yeong-guk' },
      { id: 'D', korean: '미국', russian: 'Америка', emoji: '🇺🇸', romanization: 'mi-guk' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp1-004',
    level: 1,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '안녕하세요',
    choices: [
      { id: 'A', korean: '감사합니다', russian: 'Спасибо', emoji: '🙏', romanization: 'gam-sa-ham-ni-da' },
      { id: 'B', korean: '미안합니다', russian: 'Извините', emoji: '😔', romanization: 'mi-an-ham-ni-da' },
      { id: 'C', korean: '안녕하세요', russian: 'Здравствуйте', emoji: '👋', romanization: 'an-nyeong-ha-se-yo' },
      { id: 'D', korean: '안녕히 계세요', russian: 'До свидания', emoji: '👋', romanization: 'an-nyeong-hi gye-se-yo' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp1-005',
    level: 1,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '감사합니다',
    choices: [
      { id: 'A', korean: '안녕하세요', russian: 'Здравствуйте', emoji: '👋', romanization: 'an-nyeong-ha-se-yo' },
      { id: 'B', korean: '감사합니다', russian: 'Спасибо', emoji: '🙏', romanization: 'gam-sa-ham-ni-da' },
      { id: 'C', korean: '미안합니다', russian: 'Извините', emoji: '😔', romanization: 'mi-an-ham-ni-da' },
      { id: 'D', korean: '괜찮아요', russian: 'Всё хорошо', emoji: '👍', romanization: 'gwaen-chan-a-yo' },
    ],
    correctChoiceId: 'B',
  },

  // --- meaning_picture ---
  {
    id: 'sp1-006',
    level: 1,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Англия, Англия',
    audioText: '영국',
    choices: [
      { id: 'A', korean: '한국', russian: 'Корея', emoji: '🇰🇷', romanization: 'han-guk' },
      { id: 'B', korean: '중국', russian: 'Китай', emoji: '🇨🇳', romanization: 'jung-guk' },
      { id: 'C', korean: '영국', russian: 'Англия', emoji: '🇬🇧', romanization: 'yeong-guk' },
      { id: 'D', korean: '미국', russian: 'Америка', emoji: '🇺🇸', romanization: 'mi-guk' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp1-007',
    level: 1,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Америка, Америка',
    audioText: '미국',
    choices: [
      { id: 'A', korean: '중국', russian: 'Китай', emoji: '🇨🇳', romanization: 'jung-guk' },
      { id: 'B', korean: '미국', russian: 'Америка', emoji: '🇺🇸', romanization: 'mi-guk' },
      { id: 'C', korean: '한국', russian: 'Корея', emoji: '🇰🇷', romanization: 'han-guk' },
      { id: 'D', korean: '영국', russian: 'Англия', emoji: '🇬🇧', romanization: 'yeong-guk' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp1-008',
    level: 1,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Спасибо',
    audioText: '감사합니다',
    choices: [
      { id: 'A', korean: '안녕하세요', russian: 'Здравствуйте', emoji: '👋', romanization: 'an-nyeong-ha-se-yo' },
      { id: 'B', korean: '미안합니다', russian: 'Извините', emoji: '😔', romanization: 'mi-an-ham-ni-da' },
      { id: 'C', korean: '감사합니다', russian: 'Спасибо', emoji: '🙏', romanization: 'gam-sa-ham-ni-da' },
      { id: 'D', korean: '괜찮아요', russian: 'Всё хорошо', emoji: '👍', romanization: 'gwaen-chan-a-yo' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp1-009',
    level: 1,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Извините',
    audioText: '미안합니다',
    choices: [
      { id: 'A', korean: '감사합니다', russian: 'Спасибо', emoji: '🙏', romanization: 'gam-sa-ham-ni-da' },
      { id: 'B', korean: '미안합니다', russian: 'Извините', emoji: '😔', romanization: 'mi-an-ham-ni-da' },
      { id: 'C', korean: '안녕하세요', russian: 'Здравствуйте', emoji: '👋', romanization: 'an-nyeong-ha-se-yo' },
      { id: 'D', korean: '네', russian: 'Да', emoji: '✅', romanization: 'ne' },
    ],
    correctChoiceId: 'B',
  },

  // --- complete_sentence ---
  {
    id: 'sp1-010',
    level: 1,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '___ 안녕하세요!',
    sentenceRu: 'Здравствуйте, Корея!',
    audioText: '한국 안녕하세요',
    wordChoices: ['미국', '한국', '중국', '일본', '영국'],
    correctWord: '한국',
  },
  {
    id: 'sp1-011',
    level: 1,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '___ 안녕하세요!',
    sentenceRu: 'Здравствуйте, Англия!',
    audioText: '영국 안녕하세요',
    wordChoices: ['한국', '영국', '중국', '미국'],
    correctWord: '영국',
  },
  {
    id: 'sp1-012',
    level: 1,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '안녕하세요, ___.',
    sentenceRu: 'Здравствуйте, спасибо.',
    audioText: '안녕하세요, 감사합니다.',
    wordChoices: ['미안합니다', '감사합니다', '안녕히계세요', '괜찮아요'],
    correctWord: '감사합니다',
  },
];

// ────────────────────────────────────────────────────────────────
// LEVEL 2 — 자기소개, 직업, 국적, 가족 (12문제)
// ────────────────────────────────────────────────────────────────
const level2Questions: SpeakingQuestion[] = [
  {
    id: 'sp2-001',
    level: 2,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '학생',
    choices: [
      { id: 'A', korean: '선생님', russian: 'Учитель', emoji: '👩‍🏫', romanization: 'seon-saeng-nim' },
      { id: 'B', korean: '학생', russian: 'Студент', emoji: '🎒', romanization: 'hak-saeng' },
      { id: 'C', korean: '의사', russian: 'Врач', emoji: '👨‍⚕️', romanization: 'ui-sa' },
      { id: 'D', korean: '요리사', russian: 'Повар', emoji: '👨‍🍳', romanization: 'yo-ri-sa' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp2-002',
    level: 2,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '가족',
    choices: [
      { id: 'A', korean: '친구', russian: 'Друг', emoji: '👫', romanization: 'chin-gu' },
      { id: 'B', korean: '선생님', russian: 'Учитель', emoji: '👩‍🏫', romanization: 'seon-saeng-nim' },
      { id: 'C', korean: '가족', russian: 'Семья', emoji: '👨‍👩‍👧‍👦', romanization: 'ga-jok' },
      { id: 'D', korean: '이웃', russian: 'Сосед', emoji: '🏘️', romanization: 'i-ut' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp2-003',
    level: 2,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '어머니',
    choices: [
      { id: 'A', korean: '아버지', russian: 'Папа', emoji: '👨', romanization: 'a-beo-ji' },
      { id: 'B', korean: '언니', russian: 'Старшая сестра', emoji: '👧', romanization: 'eon-ni' },
      { id: 'C', korean: '오빠', russian: 'Старший брат', emoji: '👦', romanization: 'op-pa' },
      { id: 'D', korean: '어머니', russian: 'Мама', emoji: '👩', romanization: 'eo-meo-ni' },
    ],
    correctChoiceId: 'D',
  },
  {
    id: 'sp2-004',
    level: 2,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Учитель',
    audioText: '선생님',
    choices: [
      { id: 'A', korean: '학생', russian: 'Студент', emoji: '🎒', romanization: 'hak-saeng' },
      { id: 'B', korean: '선생님', russian: 'Учитель', emoji: '👩‍🏫', romanization: 'seon-saeng-nim' },
      { id: 'C', korean: '의사', russian: 'Врач', emoji: '👨‍⚕️', romanization: 'ui-sa' },
      { id: 'D', korean: '경찰', russian: 'Полицейский', emoji: '👮', romanization: 'gyeong-chal' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp2-005',
    level: 2,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Папа',
    audioText: '아버지',
    choices: [
      { id: 'A', korean: '어머니', russian: 'Мама', emoji: '👩', romanization: 'eo-meo-ni' },
      { id: 'B', korean: '아버지', russian: 'Папа', emoji: '👨', romanization: 'a-beo-ji' },
      { id: 'C', korean: '형', russian: 'Старший брат (м.)', emoji: '👦', romanization: 'hyeong' },
      { id: 'D', korean: '동생', russian: 'Младший брат/сестра', emoji: '👶', romanization: 'dong-saeng' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp2-006',
    level: 2,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Друг',
    audioText: '친구',
    choices: [
      { id: 'A', korean: '가족', russian: 'Семья', emoji: '👨‍👩‍👧‍👦', romanization: 'ga-jok' },
      { id: 'B', korean: '선생님', russian: 'Учитель', emoji: '👩‍🏫', romanization: 'seon-saeng-nim' },
      { id: 'C', korean: '친구', russian: 'Друг', emoji: '👫', romanization: 'chin-gu' },
      { id: 'D', korean: '이웃', russian: 'Сосед', emoji: '🏘️', romanization: 'i-ut' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp2-007',
    level: 2,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 ___ 이에요.',
    sentenceRu: 'Я студент.',
    audioText: '저는 학생이에요.',
    wordChoices: ['의사', '학생', '선생님', '요리사'],
    correctWord: '학생',
  },
  {
    id: 'sp2-008',
    level: 2,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 한국 ___ 이에요.',
    sentenceRu: 'Я кореец/кореянка.',
    audioText: '저는 한국 사람이에요.',
    wordChoices: ['나라', '음식', '사람', '학교'],
    correctWord: '사람',
  },
  {
    id: 'sp2-009',
    level: 2,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '제 ___ 은 민수예요.',
    sentenceRu: 'Моё имя — Минсу.',
    audioText: '제 이름은 민수예요.',
    wordChoices: ['나이', '이름', '친구', '가족'],
    correctWord: '이름',
  },
  {
    id: 'sp2-010',
    level: 2,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '의사',
    choices: [
      { id: 'A', korean: '의사', russian: 'Врач', emoji: '👨‍⚕️', romanization: 'ui-sa' },
      { id: 'B', korean: '학생', russian: 'Студент', emoji: '🎒', romanization: 'hak-saeng' },
      { id: 'C', korean: '경찰', russian: 'Полицейский', emoji: '👮', romanization: 'gyeong-chal' },
      { id: 'D', korean: '요리사', russian: 'Повар', emoji: '👨‍🍳', romanization: 'yo-ri-sa' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp2-011',
    level: 2,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Корея',
    audioText: '한국',
    choices: [
      { id: 'A', korean: '미국', russian: 'Америка', emoji: '🇺🇸', romanization: 'mi-guk' },
      { id: 'B', korean: '한국', russian: 'Корея', emoji: '🇰🇷', romanization: 'han-guk' },
      { id: 'C', korean: '일본', russian: 'Япония', emoji: '🇯🇵', romanization: 'il-bon' },
      { id: 'D', korean: '중국', russian: 'Китай', emoji: '🇨🇳', romanization: 'jung-guk' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp2-012',
    level: 2,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 ___ 이에요.',
    sentenceRu: 'Я врач.',
    audioText: '저는 의사이에요.',
    wordChoices: ['학생', '의사', '선생님', '가수'],
    correctWord: '의사',
  },
];

// ────────────────────────────────────────────────────────────────
// LEVEL 3 — 일상생활, 음식, 취미, 시간 표현 (12문제)
// ────────────────────────────────────────────────────────────────
const level3Questions: SpeakingQuestion[] = [
  {
    id: 'sp3-001',
    level: 3,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '아침',
    choices: [
      { id: 'A', korean: '저녁', russian: 'Вечер', emoji: '🌙', romanization: 'jeo-nyeok' },
      { id: 'B', korean: '점심', russian: 'Обед', emoji: '☀️', romanization: 'jeom-sim' },
      { id: 'C', korean: '아침', russian: 'Утро', emoji: '🌅', romanization: 'a-chim' },
      { id: 'D', korean: '밤', russian: 'Ночь', emoji: '🌃', romanization: 'bam' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp3-002',
    level: 3,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '비빔밥',
    choices: [
      { id: 'A', korean: '불고기', russian: 'Пулькоги', emoji: '🥩', romanization: 'bul-go-gi' },
      { id: 'B', korean: '김치', russian: 'Кимчи', emoji: '🥬', romanization: 'gim-chi' },
      { id: 'C', korean: '삼겹살', russian: 'Самгёпсаль', emoji: '🐷', romanization: 'sam-gyeop-sal' },
      { id: 'D', korean: '비빔밥', russian: 'Пибимбап', emoji: '🍚', romanization: 'bi-bim-bap' },
    ],
    correctChoiceId: 'D',
  },
  {
    id: 'sp3-003',
    level: 3,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '독서',
    choices: [
      { id: 'A', korean: '독서', russian: 'Чтение', emoji: '📚', romanization: 'dok-seo' },
      { id: 'B', korean: '요리', russian: 'Готовка', emoji: '🍳', romanization: 'yo-ri' },
      { id: 'C', korean: '운동', russian: 'Спорт', emoji: '🏃', romanization: 'un-dong' },
      { id: 'D', korean: '영화', russian: 'Кино', emoji: '🎬', romanization: 'yeong-hwa' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp3-004',
    level: 3,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Завтрак',
    audioText: '아침밥',
    choices: [
      { id: 'A', korean: '점심', russian: 'Обед', emoji: '☀️', romanization: 'jeom-sim' },
      { id: 'B', korean: '저녁', russian: 'Ужин', emoji: '🌙', romanization: 'jeo-nyeok' },
      { id: 'C', korean: '아침밥', russian: 'Завтрак', emoji: '🌅', romanization: 'a-chim-bap' },
      { id: 'D', korean: '간식', russian: 'Перекус', emoji: '🍪', romanization: 'gan-sik' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp3-005',
    level: 3,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Спорт / Тренировка',
    audioText: '운동',
    choices: [
      { id: 'A', korean: '음악', russian: 'Музыка', emoji: '🎵', romanization: 'eum-ak' },
      { id: 'B', korean: '여행', russian: 'Путешествие', emoji: '✈️', romanization: 'yeo-haeng' },
      { id: 'C', korean: '독서', russian: 'Чтение', emoji: '📚', romanization: 'dok-seo' },
      { id: 'D', korean: '운동', russian: 'Спорт', emoji: '🏃', romanization: 'un-dong' },
    ],
    correctChoiceId: 'D',
  },
  {
    id: 'sp3-006',
    level: 3,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Кимчи',
    audioText: '김치',
    choices: [
      { id: 'A', korean: '김치', russian: 'Кимчи', emoji: '🥬', romanization: 'gim-chi' },
      { id: 'B', korean: '불고기', russian: 'Пулькоги', emoji: '🥩', romanization: 'bul-go-gi' },
      { id: 'C', korean: '라면', russian: 'Рамён', emoji: '🍜', romanization: 'ra-myeon' },
      { id: 'D', korean: '떡볶이', russian: 'Топпоки', emoji: '🌶️', romanization: 'tteok-bok-gi' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp3-007',
    level: 3,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 ___ 을 좋아해요.',
    sentenceRu: 'Я люблю читать.',
    audioText: '저는 독서를 좋아해요.',
    wordChoices: ['운동', '독서', '요리', '음악'],
    correctWord: '독서',
  },
  {
    id: 'sp3-008',
    level: 3,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '지금 ___ 이에요.',
    sentenceRu: 'Сейчас утро.',
    audioText: '지금 아침이에요.',
    wordChoices: ['저녁', '점심', '아침', '밤'],
    correctWord: '아침',
  },
  {
    id: 'sp3-009',
    level: 3,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 ___ 을 먹어요.',
    sentenceRu: 'Я ем кимчи.',
    audioText: '저는 김치를 먹어요.',
    wordChoices: ['라면', '김치', '피자', '햄버거'],
    correctWord: '김치',
  },
  {
    id: 'sp3-010',
    level: 3,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '여행',
    choices: [
      { id: 'A', korean: '운동', russian: 'Спорт', emoji: '🏃', romanization: 'un-dong' },
      { id: 'B', korean: '여행', russian: 'Путешествие', emoji: '✈️', romanization: 'yeo-haeng' },
      { id: 'C', korean: '음악', russian: 'Музыка', emoji: '🎵', romanization: 'eum-ak' },
      { id: 'D', korean: '독서', russian: 'Чтение', emoji: '📚', romanization: 'dok-seo' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp3-011',
    level: 3,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Вечер',
    audioText: '저녁',
    choices: [
      { id: 'A', korean: '아침', russian: 'Утро', emoji: '🌅', romanization: 'a-chim' },
      { id: 'B', korean: '점심', russian: 'Обед', emoji: '☀️', romanization: 'jeom-sim' },
      { id: 'C', korean: '저녁', russian: 'Вечер', emoji: '🌙', romanization: 'jeo-nyeok' },
      { id: 'D', korean: '밤', russian: 'Ночь', emoji: '🌃', romanization: 'bam' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp3-012',
    level: 3,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 ___ 을 해요.',
    sentenceRu: 'Я занимаюсь спортом.',
    audioText: '저는 운동을 해요.',
    wordChoices: ['독서', '요리', '운동', '쇼핑'],
    correctWord: '운동',
  },
];

// ────────────────────────────────────────────────────────────────
// LEVEL 4 — 짧은 대화, 여행, 쇼핑, 교통 (12문제)
// ────────────────────────────────────────────────────────────────
const level4Questions: SpeakingQuestion[] = [
  {
    id: 'sp4-001',
    level: 4,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '지하철',
    choices: [
      { id: 'A', korean: '버스', russian: 'Автобус', emoji: '🚌', romanization: 'beo-seu' },
      { id: 'B', korean: '택시', russian: 'Такси', emoji: '🚕', romanization: 'taek-si' },
      { id: 'C', korean: '지하철', russian: 'Метро', emoji: '🚇', romanization: 'ji-ha-cheol' },
      { id: 'D', korean: '비행기', russian: 'Самолёт', emoji: '✈️', romanization: 'bi-haeng-gi' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp4-002',
    level: 4,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '시장',
    choices: [
      { id: 'A', korean: '시장', russian: 'Рынок', emoji: '🏪', romanization: 'si-jang' },
      { id: 'B', korean: '호텔', russian: 'Отель', emoji: '🏨', romanization: 'ho-tel' },
      { id: 'C', korean: '공항', russian: 'Аэропорт', emoji: '🛫', romanization: 'gong-hang' },
      { id: 'D', korean: '병원', russian: 'Больница', emoji: '🏥', romanization: 'byeong-won' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp4-003',
    level: 4,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '얼마예요',
    choices: [
      { id: 'A', korean: '어디예요', russian: 'Где это?', emoji: '📍', romanization: 'eo-di-ye-yo' },
      { id: 'B', korean: '언제예요', russian: 'Когда?', emoji: '📅', romanization: 'eon-je-ye-yo' },
      { id: 'C', korean: '얼마예요', russian: 'Сколько стоит?', emoji: '💰', romanization: 'eol-ma-ye-yo' },
      { id: 'D', korean: '뭐예요', russian: 'Что это?', emoji: '❓', romanization: 'mwo-ye-yo' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp4-004',
    level: 4,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Метро',
    audioText: '지하철',
    choices: [
      { id: 'A', korean: '버스', russian: 'Автобус', emoji: '🚌', romanization: 'beo-seu' },
      { id: 'B', korean: '기차', russian: 'Поезд', emoji: '🚂', romanization: 'gi-cha' },
      { id: 'C', korean: '지하철', russian: 'Метро', emoji: '🚇', romanization: 'ji-ha-cheol' },
      { id: 'D', korean: '택시', russian: 'Такси', emoji: '🚕', romanization: 'taek-si' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp4-005',
    level: 4,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Аэропорт',
    audioText: '공항',
    choices: [
      { id: 'A', korean: '역', russian: 'Станция', emoji: '🚉', romanization: 'yeok' },
      { id: 'B', korean: '공항', russian: 'Аэропорт', emoji: '🛫', romanization: 'gong-hang' },
      { id: 'C', korean: '호텔', russian: 'Отель', emoji: '🏨', romanization: 'ho-tel' },
      { id: 'D', korean: '시장', russian: 'Рынок', emoji: '🏪', romanization: 'si-jang' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp4-006',
    level: 4,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Сколько стоит?',
    audioText: '얼마예요',
    choices: [
      { id: 'A', korean: '어디예요', russian: 'Где это?', emoji: '📍', romanization: 'eo-di-ye-yo' },
      { id: 'B', korean: '뭐예요', russian: 'Что это?', emoji: '❓', romanization: 'mwo-ye-yo' },
      { id: 'C', korean: '언제예요', russian: 'Когда?', emoji: '📅', romanization: 'eon-je-ye-yo' },
      { id: 'D', korean: '얼마예요', russian: 'Сколько стоит?', emoji: '💰', romanization: 'eol-ma-ye-yo' },
    ],
    correctChoiceId: 'D',
  },
  {
    id: 'sp4-007',
    level: 4,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '___ 로 가 주세요.',
    sentenceRu: 'Пожалуйста, отвезите в аэропорт.',
    audioText: '공항으로 가 주세요.',
    wordChoices: ['시장', '공항', '병원', '학교'],
    correctWord: '공항',
  },
  {
    id: 'sp4-008',
    level: 4,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '이거 ___ ?',
    sentenceRu: 'Сколько это стоит?',
    audioText: '이거 얼마예요?',
    wordChoices: ['뭐예요', '어디예요', '얼마예요', '언제예요'],
    correctWord: '얼마예요',
  },
  {
    id: 'sp4-009',
    level: 4,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '___ 어디예요?',
    sentenceRu: 'Где метро?',
    audioText: '지하철 어디예요?',
    wordChoices: ['버스', '지하철', '택시', '기차'],
    correctWord: '지하철',
  },
  {
    id: 'sp4-010',
    level: 4,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '호텔',
    choices: [
      { id: 'A', korean: '식당', russian: 'Ресторан', emoji: '🍽️', romanization: 'sik-dang' },
      { id: 'B', korean: '호텔', russian: 'Отель', emoji: '🏨', romanization: 'ho-tel' },
      { id: 'C', korean: '공항', russian: 'Аэропорт', emoji: '🛫', romanization: 'gong-hang' },
      { id: 'D', korean: '병원', russian: 'Больница', emoji: '🏥', romanization: 'byeong-won' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp4-011',
    level: 4,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Ресторан',
    audioText: '식당',
    choices: [
      { id: 'A', korean: '카페', russian: 'Кафе', emoji: '☕', romanization: 'ka-pe' },
      { id: 'B', korean: '식당', russian: 'Ресторан', emoji: '🍽️', romanization: 'sik-dang' },
      { id: 'C', korean: '마트', russian: 'Супермаркет', emoji: '🛒', romanization: 'ma-teu' },
      { id: 'D', korean: '시장', russian: 'Рынок', emoji: '🏪', romanization: 'si-jang' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp4-012',
    level: 4,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 ___ 을 타요.',
    sentenceRu: 'Я езжу на автобусе.',
    audioText: '저는 버스를 타요.',
    wordChoices: ['지하철', '버스', '택시', '기차'],
    correctWord: '버스',
  },
];

// ────────────────────────────────────────────────────────────────
// LEVEL 5 — 긴 문장, 복합 문장, 실제 회화 표현 (12문제)
// ────────────────────────────────────────────────────────────────
const level5Questions: SpeakingQuestion[] = [
  {
    id: 'sp5-001',
    level: 5,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '비가 오면 집에 있어요',
    choices: [
      { id: 'A', korean: '눈이 오면 스키를 타요', russian: 'Когда идёт снег, катаюсь на лыжах', emoji: '⛷️', romanization: 'nun-i o-myeon seu-ki-reul ta-yo' },
      { id: 'B', korean: '비가 오면 집에 있어요', russian: 'Когда идёт дождь, сижу дома', emoji: '🌧️', romanization: 'bi-ga o-myeon ji-be i-sseo-yo' },
      { id: 'C', korean: '날씨가 좋으면 공원에 가요', russian: 'Когда хорошая погода, иду в парк', emoji: '🌳', romanization: 'nal-ssi-ga jo-eu-myeon gong-wo-ne ga-yo' },
      { id: 'D', korean: '바람이 불면 창문을 닫아요', russian: 'Когда дует ветер, закрываю окно', emoji: '💨', romanization: 'ba-ra-mi bul-myeon chang-mu-neul da-da-yo' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp5-002',
    level: 5,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '저는 매일 아침 운동을 해요',
    choices: [
      { id: 'A', korean: '저는 매일 아침 운동을 해요', russian: 'Я каждое утро занимаюсь спортом', emoji: '🏃', romanization: 'jeo-neun mae-il a-chim un-dong-eul hae-yo' },
      { id: 'B', korean: '저는 저녁에 독서를 해요', russian: 'Я читаю по вечерам', emoji: '📚', romanization: 'jeo-neun jeo-nyeo-ge dok-seo-reul hae-yo' },
      { id: 'C', korean: '저는 주말에 요리를 해요', russian: 'Я готовлю по выходным', emoji: '🍳', romanization: 'jeo-neun ju-ma-le yo-ri-reul hae-yo' },
      { id: 'D', korean: '저는 가끔 영화를 봐요', russian: 'Я иногда смотрю кино', emoji: '🎬', romanization: 'jeo-neun ga-geum yeong-hwa-reul bwa-yo' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp5-003',
    level: 5,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Когда идёт дождь, сижу дома',
    audioText: '비가 오면 집에 있어요',
    choices: [
      { id: 'A', korean: '눈이 오면 스키를 타요', russian: 'Когда идёт снег, катаюсь на лыжах', emoji: '⛷️', romanization: '...' },
      { id: 'B', korean: '날씨가 좋으면 공원에 가요', russian: 'Когда хорошая погода, иду в парк', emoji: '🌳', romanization: '...' },
      { id: 'C', korean: '비가 오면 집에 있어요', russian: 'Когда идёт дождь, сижу дома', emoji: '🌧️', romanization: '...' },
      { id: 'D', korean: '바람이 불면 창문을 닫아요', russian: 'Когда дует ветер, закрываю окно', emoji: '💨', romanization: '...' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp5-004',
    level: 5,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Каждое утро',
    audioText: '매일 아침',
    choices: [
      { id: 'A', korean: '가끔', russian: 'Иногда', emoji: '🔄', romanization: 'ga-geum' },
      { id: 'B', korean: '주말에', russian: 'По выходным', emoji: '📅', romanization: 'ju-ma-le' },
      { id: 'C', korean: '매일 아침', russian: 'Каждое утро', emoji: '🌅', romanization: 'mae-il a-chim' },
      { id: 'D', korean: '저녁에', russian: 'По вечерам', emoji: '🌙', romanization: 'jeo-nyeo-ge' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp5-005',
    level: 5,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '비가 ___ 집에 있어요.',
    sentenceRu: 'Когда идёт дождь, сижу дома.',
    audioText: '비가 오면 집에 있어요.',
    wordChoices: ['오면', '가면', '오고', '가고'],
    correctWord: '오면',
  },
  {
    id: 'sp5-006',
    level: 5,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '저는 매일 아침 ___ 을 해요.',
    sentenceRu: 'Я каждое утро занимаюсь спортом.',
    audioText: '저는 매일 아침 운동을 해요.',
    wordChoices: ['독서', '요리', '운동', '쇼핑'],
    correctWord: '운동',
  },
  {
    id: 'sp5-007',
    level: 5,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '한국어를 공부하고 싶어요',
    choices: [
      { id: 'A', korean: '영어를 배우고 싶어요', russian: 'Хочу выучить английский', emoji: '🇺🇸', romanization: '...' },
      { id: 'B', korean: '한국어를 공부하고 싶어요', russian: 'Хочу изучать корейский', emoji: '🇰🇷', romanization: '...' },
      { id: 'C', korean: '중국어를 배우고 싶어요', russian: 'Хочу выучить китайский', emoji: '🇨🇳', romanization: '...' },
      { id: 'D', korean: '일본어를 공부하고 싶어요', russian: 'Хочу изучать японский', emoji: '🇯🇵', romanization: '...' },
    ],
    correctChoiceId: 'B',
  },
  {
    id: 'sp5-008',
    level: 5,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Хочу изучать корейский',
    audioText: '한국어를 공부하고 싶어요',
    choices: [
      { id: 'A', korean: '한국어를 가르치고 싶어요', russian: 'Хочу преподавать корейский', emoji: '👩‍🏫', romanization: '...' },
      { id: 'B', korean: '한국에 살고 싶어요', russian: 'Хочу жить в Корее', emoji: '🏠', romanization: '...' },
      { id: 'C', korean: '한국어를 공부하고 싶어요', russian: 'Хочу изучать корейский', emoji: '🇰🇷', romanization: '...' },
      { id: 'D', korean: '한국 음식을 먹고 싶어요', russian: 'Хочу есть корейскую еду', emoji: '🍚', romanization: '...' },
    ],
    correctChoiceId: 'C',
  },
  {
    id: 'sp5-009',
    level: 5,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '한국어를 공부하고 ___.',
    sentenceRu: 'Хочу изучать корейский.',
    audioText: '한국어를 공부하고 싶어요.',
    wordChoices: ['좋아요', '싶어요', '있어요', '해요'],
    correctWord: '싶어요',
  },
  {
    id: 'sp5-010',
    level: 5,
    type: 'complete_sentence',
    instructionRu: 'Составьте значение предложения',
    sentenceKr: '날씨가 ___ 공원에 가요.',
    sentenceRu: 'Когда хорошая погода, иду в парк.',
    audioText: '날씨가 좋으면 공원에 가요.',
    wordChoices: ['좋아서', '좋으면', '좋지만', '좋고'],
    correctWord: '좋으면',
  },
  {
    id: 'sp5-011',
    level: 5,
    type: 'listening_picture',
    instructionRu: 'Послушайте и выберите правильное изображение',
    audioText: '시간이 있으면 같이 밥 먹어요',
    choices: [
      { id: 'A', korean: '시간이 있으면 같이 밥 먹어요', russian: 'Если есть время, поедим вместе', emoji: '🍽️', romanization: '...' },
      { id: 'B', korean: '시간이 없으면 혼자 먹어요', russian: 'Если нет времени, ем один', emoji: '🧑', romanization: '...' },
      { id: 'C', korean: '배가 고프면 라면 먹어요', russian: 'Когда голодный, ем рамён', emoji: '🍜', romanization: '...' },
      { id: 'D', korean: '배가 부르면 그냥 쉬어요', russian: 'Когда сыт, просто отдыхаю', emoji: '😌', romanization: '...' },
    ],
    correctChoiceId: 'A',
  },
  {
    id: 'sp5-012',
    level: 5,
    type: 'meaning_picture',
    instructionRu: 'Выберите правильное слово для следующего значения',
    meaningRu: 'Если есть время, поедим вместе',
    audioText: '시간이 있으면 같이 밥 먹어요',
    choices: [
      { id: 'A', korean: '배가 고프면 라면 먹어요', russian: 'Когда голодный, ем рамён', emoji: '🍜', romanization: '...' },
      { id: 'B', korean: '시간이 있으면 같이 밥 먹어요', russian: 'Если есть время, поедим вместе', emoji: '🍽️', romanization: '...' },
      { id: 'C', korean: '시간이 없으면 혼자 먹어요', russian: 'Если нет времени, ем один', emoji: '🧑', romanization: '...' },
      { id: 'D', korean: '날씨가 좋으면 공원에 가요', russian: 'Когда хорошая погода, иду в парк', emoji: '🌳', romanization: '...' },
    ],
    correctChoiceId: 'B',
  },
];

// ────────────────────────────────────────────────────────────────
// 통합 export
// ────────────────────────────────────────────────────────────────
export const speakingQuestions: Record<1 | 2 | 3 | 4 | 5, SpeakingQuestion[]> = {
  1: level1Questions,
  2: level2Questions,
  3: level3Questions,
  4: level4Questions,
  5: level5Questions,
};

export function getSpeakingQuestions(level: 1 | 2 | 3 | 4 | 5): SpeakingQuestion[] {
  return speakingQuestions[level] ?? [];
}
