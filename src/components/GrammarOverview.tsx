import React, { useState } from 'react';
import { UserLevel } from '../types';
import GrammarBlock from './GrammarBlock';
import { GRAMMAR_RULES, getRulesByCategory } from '../data/grammarData';

interface Props {
  userLevel: UserLevel;
  onClose: () => void;
}

type Tab = 'counters' | 'movement' | 'reasons' | 'honorifics' | 'structured';

const TABS: { key: Tab; label: string }[] = [
  { key: 'structured', label: '📐 Грамматика' },
  { key: 'counters', label: '🔢 Счётные' },
  { key: 'movement', label: '🚶 Движение' },
  { key: 'reasons', label: '🔗 Причина' },
  { key: 'honorifics', label: '🙋 Вежливость' },
];

// ── COUNTERS ──────────────────────────────────────────────────────────
type CounterRow = { unit: string; forWhat: string; meaning: string; examples: string };

const counterData: Record<UserLevel, CounterRow[]> = {
  1: [
    { unit: '명', forWhat: '👤 Люди', meaning: 'людей', examples: '한 명 · 두 명 · 세 명' },
    { unit: '개', forWhat: '📦 Обычные предметы', meaning: 'штук', examples: '한 개 · 두 개 · 세 개' },
    { unit: '마리', forWhat: '🐾 Животные', meaning: 'животных', examples: '한 마리 · 두 마리' },
    { unit: '권', forWhat: '📚 Книги / тетради', meaning: 'книг', examples: '한 권 · 두 권' },
  ],
  2: [
    { unit: '잔', forWhat: '☕ Напитки в чашке', meaning: 'чашек / стаканов', examples: '한 잔 · 두 잔' },
    { unit: '병', forWhat: '🍶 Бутылки', meaning: 'бутылок', examples: '한 병 · 두 병' },
    { unit: '장', forWhat: '📄 Бумага / фото', meaning: 'листов', examples: '한 장 · 두 장' },
    { unit: '벌', forWhat: '👕 Одежда', meaning: 'комплектов', examples: '한 벌 · 두 벌' },
    { unit: '켤레', forWhat: '👟 Обувь / носки', meaning: 'пар', examples: '한 켤레 · 두 켤레' },
  ],
  3: [
    { unit: '대', forWhat: '🚗 Транспорт / техника', meaning: 'машин / устройств', examples: '한 대 · 두 대' },
    { unit: '그릇', forWhat: '🍜 Блюда в посуде', meaning: 'мисок / порций', examples: '한 그릇 · 두 그릇' },
    { unit: '통', forWhat: '🫙 Банки / контейнеры', meaning: 'банок / контейнеров', examples: '한 통 · 두 통' },
    { unit: '상자', forWhat: '📦 Коробки', meaning: 'коробок', examples: '한 상자 · 두 상자' },
  ],
  4: [
    { unit: '봉지', forWhat: '🛍️ Пакеты', meaning: 'пакетов', examples: '한 봉지 · 두 봉지' },
    { unit: '봉', forWhat: '✏️ Карандаши / ручки (в стержнях)', meaning: 'штук (тонких)', examples: '한 봉 · 두 봉' },
    { unit: '줄', forWhat: '📿 Нити / ряды', meaning: 'рядов / нитей', examples: '한 줄 · 두 줄' },
    { unit: '송이', forWhat: '🌸 Цветы', meaning: 'цветков', examples: '한 송이 · 두 송이' },
  ],
  5: [
    { unit: '포기', forWhat: '🥬 Кочаны (капуста, редька)', meaning: 'кочанов / растений', examples: '한 포기 · 두 포기' },
    { unit: '알', forWhat: '🧄 Лук / чеснок / зёрна', meaning: 'головок / зёрен', examples: '한 알 · 두 알' },
    { unit: '채', forWhat: '🏠 Здания / дома', meaning: 'домов', examples: '한 채 · 두 채' },
    { unit: '척', forWhat: '⛵ Корабли', meaning: 'кораблей / судов', examples: '한 척 · 두 척' },
    { unit: '덩어리', forWhat: '🧱 Куски / глыбы', meaning: 'кусков', examples: '한 덩어리 · 두 덩어리' },
  ],
};

// ── MOVEMENT ──────────────────────────────────────────────────────────
type MovRow = { ga: string; wa: string; meaning: string; example: string };

const movementData: Record<UserLevel, MovRow[]> = {
  1: [
    { ga: '가다', wa: '오다', meaning: 'идти / ехать', example: '학교에 가요. / 집에 와요.' },
    { ga: '들어가다', wa: '들어오다', meaning: 'заходить внутрь', example: '교실에 들어가요.' },
    { ga: '나가다', wa: '나오다', meaning: 'выходить наружу', example: '밖에 나가요.' },
    { ga: '올라가다', wa: '올라오다', meaning: 'подниматься', example: '산에 올라가요.' },
  ],
  2: [
    { ga: '내려가다', wa: '내려오다', meaning: 'спускаться', example: '아래층으로 내려가요.' },
    { ga: '건너가다', wa: '건너오다', meaning: 'переходить (дорогу / мост)', example: '길을 건너가요.' },
    { ga: '돌아가다', wa: '돌아오다', meaning: 'возвращаться', example: '집으로 돌아가요.' },
    { ga: '지나가다', wa: '지나오다', meaning: 'проходить мимо', example: '학교 앞을 지나가요.' },
  ],
  3: [
    { ga: '다가가다', wa: '다가오다', meaning: 'приближаться', example: '고양이에게 다가가요.' },
    { ga: '물러가다', wa: '물러오다', meaning: 'отступать', example: '뒤로 물러가요.' },
    { ga: '떠나가다', wa: '떠나오다', meaning: 'покидать / уходить', example: '도시를 떠나가요.' },
    { ga: '흘러가다', wa: '흘러오다', meaning: 'течь / доноситься', example: '강물이 흘러가요.' },
  ],
  4: [
    { ga: '굴러가다', wa: '굴러오다', meaning: 'катиться', example: '공이 굴러가요.' },
    { ga: '날아가다', wa: '날아오다', meaning: 'лететь', example: '새가 날아가요.' },
    { ga: '뛰어가다', wa: '뛰어오다', meaning: 'бежать', example: '운동장으로 뛰어가요.' },
    { ga: '걸어가다', wa: '걸어오다', meaning: 'идти пешком', example: '역까지 걸어가요.' },
    { ga: '기어가다', wa: '기어오다', meaning: 'ползти', example: '아기가 기어가요.' },
  ],
  5: [
    { ga: '달려가다', wa: '달려오다', meaning: 'мчаться / бежать быстро', example: '현장으로 달려가요.' },
    { ga: '헤엄쳐가다', wa: '헤엄쳐오다', meaning: 'плыть', example: '반대편으로 헤엄쳐가요.' },
    { ga: '옮겨가다', wa: '옮겨오다', meaning: 'перемещаться / переносить', example: '새 실험실로 옮겨가요.' },
    { ga: '이동하다', wa: '—', meaning: 'перемещаться (нейтр.)', example: '회의실로 이동해요.' },
    { ga: '출발하다', wa: '—', meaning: 'отправляться', example: '버스가 출발해요.' },
    { ga: '도착하다', wa: '—', meaning: 'прибывать', example: '역에 도착해요.' },
  ],
};

// ── REASONS ───────────────────────────────────────────────────────────
type ReasonRow = { word: string; meaning: string; type: string; example: string };

const reasonData: Record<UserLevel, ReasonRow[]> = {
  1: [
    { word: '그래서', meaning: 'поэтому', type: '➡ Результат', example: '비가 와요. 그래서 집에 있어요.' },
    { word: '그리고', meaning: 'и, затем', type: '➕ Добавление', example: '밥을 먹어요. 그리고 물을 마셔요.' },
    { word: '하지만', meaning: 'но', type: '❌ Контраст', example: '비가 와요. 하지만 우산이 없어요.' },
    { word: '-아서/어서', meaning: 'потому что', type: '🔍 Причина', example: '책을 읽어서 기분이 좋아요.' },
    { word: '때문에', meaning: 'из-за', type: '🔍 Причина', example: '비 때문에 늦었어요.' },
    { word: '아니면', meaning: 'или', type: '🔀 Выбор', example: '커피 아니면 차를 마셔요.' },
  ],
  2: [
    { word: '-니까', meaning: 'поскольку', type: '🔍 Причина', example: '늦었으니까 택시를 타요.' },
    { word: '그러니까', meaning: 'поэтому, значит', type: '➡ Результат', example: '시간이 없어요. 그러니까 빨리 가요.' },
    { word: '또는', meaning: 'или', type: '🔀 Выбор', example: '버스 또는 지하철을 타요.' },
    { word: '그러면 / 그럼', meaning: 'тогда', type: '⬡ Условие', example: '시간이 있으면 그럼 같이 가요.' },
    { word: '그리고 나서', meaning: 'после этого', type: '🔢 Порядок', example: '숙제를 해요. 그리고 나서 쉬어요.' },
    { word: '그런데', meaning: 'но, кстати', type: '❌ Контраст', example: '가고 싶어요. 그런데 시간이 없어요.' },
  ],
  3: [
    { word: '-기 때문에', meaning: 'потому что', type: '🔍 Причина', example: '비가 오기 때문에 취소됐어요.' },
    { word: '왜냐하면', meaning: 'потому что (начало объяснения)', type: '🔍 Причина', example: '왜냐하면 아프기 때문이에요.' },
    { word: '그렇기 때문에', meaning: 'именно поэтому', type: '➡ Результат', example: '규칙이 중요해요. 그렇기 때문에 지켜야 해요.' },
    { word: '만약 / 만약에', meaning: 'если', type: '⬡ Условие', example: '만약 시간이 있으면 전화해요.' },
    { word: '그렇다면', meaning: 'если так, тогда', type: '⬡ Условие', example: '그렇다면 다시 설명할게요.' },
    { word: '그러다가', meaning: 'потом вдруг / в процессе', type: '🔢 Порядок', example: '걷고 있었어요. 그러다가 친구를 만났어요.' },
  ],
  4: [
    { word: '그렇지만 / 그러나', meaning: 'однако', type: '❌ Контраст', example: '연습은 좋아졌어요. 그렇지만 어려웠어요.' },
    { word: '그런데도', meaning: 'несмотря на это', type: '❌ Контраст', example: '많이 연습했어요. 그런데도 잊어버렸어요.' },
    { word: '또한', meaning: 'также', type: '➕ Добавление', example: '문법을 배웠어요. 또한 단어도 확인했어요.' },
    { word: '게다가 / 더구나', meaning: 'к тому же / более того', type: '➕ Добавление', example: '비가 왔어요. 게다가 바람도 불었어요.' },
    { word: '뿐만 아니라', meaning: 'не только, но и', type: '➕ Добавление', example: '음식 뿐만 아니라 예절도 소개했어요.' },
    { word: '반면에', meaning: 'в то время как / наоборот', type: '⚖ Сравнение', example: '형은 계획을 세워요. 반면에 동생은 먼저 해요.' },
    { word: '한편', meaning: 'с другой стороны', type: '⚖ Сравнение', example: '카페는 확장했어요. 한편 옆 가게는 조용했어요.' },
    { word: '오히려', meaning: 'наоборот, скорее', type: '⚖ Сравнение', example: '나누자 오히려 이해가 더 빨라졌어요.' },
  ],
  5: [
    { word: '덕분에', meaning: 'благодаря (позитивная причина)', type: '✅ Причина (+)', example: '선생님 덕분에 이해했어요.' },
    { word: '탓에', meaning: 'из-за, по вине (негативная причина)', type: '❌ Причина (−)', example: '실수 탓에 일정이 늦어졌어요.' },
    { word: '-느라고', meaning: 'из-за того что был занят', type: '🔍 Причина', example: '일하느라고 전화를 못 받았어요.' },
    { word: '즉 / 다시 말하면', meaning: 'то есть / другими словами', type: '💬 Пояснение', example: '즉, 자료를 분석하는 사람입니다.' },
    { word: '예를 들면', meaning: 'например', type: '💬 Пример', example: '운동이 좋아요. 예를 들면 수영이 있어요.' },
    { word: '그러므로', meaning: 'следовательно', type: '➡ Вывод', example: '자료가 충분해요. 그러므로 결론을 낼 수 있어요.' },
  ],
};

// ── HONORIFICS ────────────────────────────────────────────────────────
type HonRow = { polite: string; casual: string; meaning: string; example: string };
type HonLevel = { intro: string; items: HonRow[] };

const honorificsData: Record<UserLevel, HonLevel> = {
  1: {
    intro: 'В корейском есть два стиля речи: 🎩 вежливый (со старшими и незнакомыми) и 😊 разговорный (с друзьями). Разница — в окончании глагола.',
    items: [
      { polite: '먹어요', casual: '먹어', meaning: 'ем / есть', example: '뭐 먹어요? → 뭐 먹어?' },
      { polite: '공부해요', casual: '공부해', meaning: 'учусь', example: '지금 공부해요 → 지금 공부해' },
      { polite: '학생이에요', casual: '학생이야', meaning: 'я студент', example: '저는 학생이에요 → 나는 학생이야' },
      { polite: '좋아요', casual: '좋아', meaning: 'хорошо / нравится', example: '이거 좋아요? → 이거 좋아?' },
    ],
  },
  2: {
    intro: 'Прошедшее время: добавь -았어요 / -었어요 (вежливо) или -았어 / -었어 (разговорно). Просьба: -아/어 주세요.',
    items: [
      { polite: '먹었어요', casual: '먹었어', meaning: 'поел / поела', example: '어제 밥 먹었어요.' },
      { polite: '지금 먹고 있어요', casual: '지금 먹고 있어', meaning: 'сейчас ем', example: '뭐 하고 있어요?' },
      { polite: '도와 주세요', casual: '도와 줘', meaning: 'помогите / помоги', example: '좀 도와 주세요!' },
      { polite: '가지 마세요', casual: '가지 마', meaning: 'не уходите / не уходи', example: '가지 마세요, 아직 있어요.' },
    ],
  },
  3: {
    intro: 'Как сказать «нужно», «можно», или предложить что-то — в вежливой и разговорной форме.',
    items: [
      { polite: '-아야 해요', casual: '-아야 해', meaning: 'нужно сделать', example: '공부해야 해요. / 공부해야 해.' },
      { polite: '-아도 돼요', casual: '-아도 돼', meaning: 'можно сделать', example: '먹어도 돼요? / 먹어도 돼?' },
      { polite: '-(으)ㄹ까요?', casual: '-(으)ㄹ까?', meaning: 'может, сделаем?', example: '같이 갈까요? / 같이 갈까?' },
      { polite: '-을래요?', casual: '-을래?', meaning: 'хотите? / хочешь?', example: '차 마실래요? / 마실래?' },
    ],
  },
  4: {
    intro: 'В официальных ситуациях (на работе, в учреждении) используй формальный стиль -ㅂ니다/습니다. Уважение к собеседнику передаётся суффиксом -시-.',
    items: [
      { polite: '-겠습니다', casual: '(-겠어요)', meaning: 'я буду / намерен (официально)', example: '보고하겠습니다. → 보고할게요.' },
      { polite: '-ㅂ니다 / 습니다', casual: '(-아요 / 어요)', meaning: 'официальная форма наст. вр.', example: '회의가 있습니다. → 회의가 있어요.' },
      { polite: '-십시오', casual: '(-아/어 주세요)', meaning: 'пожалуйста, сделайте (официально)', example: '제출하십시오. → 제출해 주세요.' },
      { polite: '-시- / -세요', casual: '—', meaning: 'суффикс уважения к 3-му лицу', example: '선생님이 오십니다. (Учитель идёт.)' },
    ],
  },
  5: {
    intro: 'На продвинутом уровне важно передавать тонкий тон: удивление, осознание, деликатное предложение.',
    items: [
      { polite: '-네요', casual: '(-네)', meaning: 'замечание / ой, оказывается', example: '맛있네요! → 맛있네!' },
      { polite: '-군요', casual: '(-구나)', meaning: 'осознание / открытие', example: '그렇군요. → 그렇구나.' },
      { polite: '-잖아요', casual: '(-잖아)', meaning: 'ведь / же', example: '바쁘잖아요. → 바쁘잖아.' },
      { polite: '-시겠어요?', casual: '—', meaning: 'не желаете ли? (деликатно)', example: '시작하시겠어요? (Начнёте?)' },
    ],
  },
};

// ── RENDER HELPERS ────────────────────────────────────────────────────

function Counters({ data }: { data: CounterRow[] }) {
  return (
    <div>
      <div className="gov-intro">
        🔑 В корейском числа зависят от того, <em>что</em> считать. Каждый тип предметов требует особого «счётного слова».
      </div>
      <div className="gov-numbers-box">
        <strong>Числа по-корейски:</strong>
        <div className="gov-number-row">
          {['한(1)', '두(2)', '세(3)', '네(4)', '다섯(5)', '여섯(6)', '일곱(7)', '여덟(8)', '아홉(9)', '열(10)'].map(n => (
            <span key={n} className="gov-number-chip">{n}</span>
          ))}
        </div>
        <div className="gov-number-note">💡 Перед счётным словом число принимает короткую форму: 하나→한, 둘→두, 셋→세, 넷→네</div>
      </div>
      <table className="gov-table">
        <thead><tr><th>Счётное слово</th><th>Для чего</th><th>Значение</th><th>Пример</th></tr></thead>
        <tbody>
          {data.map(r => (
            <tr key={r.unit}>
              <td className="gov-td-unit">{r.unit}</td>
              <td>{r.forWhat}</td>
              <td>{r.meaning}</td>
              <td className="gov-td-ex">{r.examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Movement({ data }: { data: MovRow[] }) {
  return (
    <div>
      <div className="gov-intro">
        🧭 Главное правило: <strong>-가다</strong> = двигаться <em>от говорящего</em> (туда ➡), <strong>-오다</strong> = двигаться <em>к говорящему</em> (сюда ⬅).
      </div>
      <div className="gov-rule-box">
        <span className="gov-rule-go">기본동사 + 가다 = туда</span>
        <span className="gov-rule-sep">·</span>
        <span className="gov-rule-come">기본동사 + 오다 = сюда</span>
      </div>
      <table className="gov-table">
        <thead><tr><th>-가다 (туда ➡)</th><th>-오다 (сюда ⬅)</th><th>Смысл</th><th>Пример</th></tr></thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td className="gov-td-blue">{r.ga}</td>
              <td className="gov-td-pink">{r.wa}</td>
              <td>{r.meaning}</td>
              <td className="gov-td-ex">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Reasons({ data }: { data: ReasonRow[] }) {
  return (
    <div>
      <div className="gov-intro">
        🔗 Эти слова соединяют предложения — как «и», «но», «поэтому» в русском.
      </div>
      <table className="gov-table">
        <thead><tr><th>Слово</th><th>Значение</th><th>Тип</th><th>Пример</th></tr></thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td className="gov-td-unit">{r.word}</td>
              <td>{r.meaning}</td>
              <td className="gov-td-type">{r.type}</td>
              <td className="gov-td-ex">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Honorifics({ data }: { data: HonLevel }) {
  return (
    <div>
      <div className="gov-intro">{data.intro}</div>
      <table className="gov-table">
        <thead><tr><th>🎩 Вежливо</th><th>😊 Разговорно</th><th>Значение</th><th>Пример</th></tr></thead>
        <tbody>
          {data.items.map((r, i) => (
            <tr key={i}>
              <td className="gov-td-pink">{r.polite}</td>
              <td className="gov-td-blue">{r.casual}</td>
              <td>{r.meaning}</td>
              <td className="gov-td-ex">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── STRUCTURED GRAMMAR BLOCKS (from grammarData.ts) ──────────────────
function StructuredGrammar({ userLevel }: { userLevel: UserLevel }) {
  const rules = GRAMMAR_RULES.filter(r => r.level <= userLevel);
  return (
    <div>
      <div className="gov-intro">
        📐 Подробные грамматические правила с примерами, правилами образования и разбором ошибок.
      </div>
      {rules.map(rule => (
        <GrammarBlock key={rule.id} rule={rule} />
      ))}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────

const GrammarOverview: React.FC<Props> = ({ userLevel, onClose }) => {
  const [tab, setTab] = useState<Tab>('structured');

  return (
    <div className="gov-overlay">
      <div className="gov-panel">
        <div className="gov-header">
          <div>
            <div className="gov-title">📚 Грамматика и справочник</div>
            <div className="gov-level-badge">Уровень {userLevel}</div>
          </div>
          <button className="gov-close" onClick={onClose} type="button" aria-label="Закрыть">✕</button>
        </div>

        <div className="gov-tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`gov-tab${tab === t.key ? ' gov-tab-active' : ''}`}
              onClick={() => setTab(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="gov-body">
          {tab === 'structured' && <StructuredGrammar userLevel={userLevel} />}
          {tab === 'counters'   && <Counters  data={counterData[userLevel]} />}
          {tab === 'movement'   && <Movement  data={movementData[userLevel]} />}
          {tab === 'reasons'    && <Reasons   data={reasonData[userLevel]} />}
          {tab === 'honorifics' && <Honorifics data={honorificsData[userLevel]} />}
        </div>
      </div>
    </div>
  );
};

export default GrammarOverview;
