import { Question, GrammarCategory, UserLevel, QuestionType, Choice, Difficulty } from '../types';

export const CATEGORIES: GrammarCategory[] = ['counters', 'movement', 'reasons', 'honorifics'];

export const categoryMeta: Record<GrammarCategory, { nameKr: string; nameRu: string; emoji: string }> = {
  counters: { nameKr: '수사 + 단위명사', nameRu: 'Счётные слова', emoji: '🔢' },
  movement: { nameKr: '이동 · 방향 동사', nameRu: 'Глаголы движения', emoji: '🚶' },
  reasons: { nameKr: '접속사 + 이유 · 원인 · 결과', nameRu: 'Причина и результат', emoji: '🔗' },
  honorifics: { nameKr: '존댓말 / 반말 표현', nameRu: 'Вежливая и разговорная речь', emoji: '🙋' },
};

// Backward-compatible exports for older screens that still import these names.
export const categoryInfo = categoryMeta;
export const difficultyInfo: Record<Difficulty, { nameKr: string; nameRu: string; color: string }> = {
  beginner: { nameKr: '쉬움', nameRu: 'Легко', color: '#22c55e' },
  intermediate: { nameKr: '보통', nameRu: 'Средне', color: '#f59e0b' },
  advanced: { nameKr: '어려움', nameRu: 'Сложно', color: '#ef4444' },
};

export const levelMeta: Record<UserLevel, { nameRu: string; short: string }> = {
  1: { nameRu: 'Новичок', short: 'Lv.1' },
  2: { nameRu: 'знаю несколько простых слов', short: 'Lv.2' },
  3: { nameRu: 'могу поддержать простой разговор', short: 'Lv.3' },
  4: { nameRu: 'могу обсудить различные темы', short: 'Lv.4' },
  5: { nameRu: 'могу подробно обсудить большинство тем', short: 'Lv.5' },
};
export const levelInfo: Record<UserLevel, { label: string; nameRu: string; short: string }> = {
  1: { label: levelMeta[1].nameRu, ...levelMeta[1] },
  2: { label: levelMeta[2].nameRu, ...levelMeta[2] },
  3: { label: levelMeta[3].nameRu, ...levelMeta[3] },
  4: { label: levelMeta[4].nameRu, ...levelMeta[4] },
  5: { label: levelMeta[5].nameRu, ...levelMeta[5] },
};

const LEVELS: UserLevel[] = [1, 2, 3, 4, 5];
const NUMBERS = ['한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];

type CounterItem = {
  item: string;
  meaning: string;
  unit: string;
  unitMeaning: string;
};

type TargetItem = {
  target: string;
  meaning: string;
  hintKr: string;
  exampleKr: string;
  exampleRu: string;
};

type QuestionContextSeed = {
  category: GrammarCategory;
  level: UserLevel;
  order: number;
  stage: 'main' | 'remedial';
};

const categoryContextLabel: Record<GrammarCategory, string> = {
  counters: '수량 표현',
  movement: '이동 표현',
  reasons: '이유 연결 표현',
  honorifics: '말 높임 표현',
};

function questionContextStarter(_seed: QuestionContextSeed): string {
  return '';
}

const counterBank: Record<UserLevel, CounterItem[]> = {
  1: [
    { item: '학생', meaning: 'студент', unit: '명', unitMeaning: 'людей' },
    { item: '친구', meaning: 'друг', unit: '명', unitMeaning: 'людей' },
    { item: '사과', meaning: 'яблоко', unit: '개', unitMeaning: 'обычных предметов' },
    { item: '연필', meaning: 'карандаш', unit: '개', unitMeaning: 'обычных предметов' },
    { item: '고양이', meaning: 'кошка', unit: '마리', unitMeaning: 'животных' },
    { item: '강아지', meaning: 'щенок', unit: '마리', unitMeaning: 'животных' },
    { item: '책', meaning: 'книга', unit: '권', unitMeaning: 'книг' },
    { item: '노트', meaning: 'тетрадь', unit: '권', unitMeaning: 'книг и тетрадей' },
    { item: '사람', meaning: 'человек', unit: '명', unitMeaning: 'людей' },
    { item: '가방', meaning: 'сумка', unit: '개', unitMeaning: 'обычных предметов' },
  ],
  2: [
    { item: '커피', meaning: 'кофе', unit: '잔', unitMeaning: 'напитков в чашке/стакане' },
    { item: '물', meaning: 'вода', unit: '잔', unitMeaning: 'напитков в чашке/стакане' },
    { item: '우유', meaning: 'молоко', unit: '병', unitMeaning: 'бутылок' },
    { item: '주스', meaning: 'сок', unit: '병', unitMeaning: 'бутылок' },
    { item: '종이', meaning: 'бумага', unit: '장', unitMeaning: 'листов' },
    { item: '사진', meaning: 'фотография', unit: '장', unitMeaning: 'листов/фотографий' },
    { item: '옷', meaning: 'одежда', unit: '벌', unitMeaning: 'комплектов одежды' },
    { item: '정장', meaning: 'костюм', unit: '벌', unitMeaning: 'комплектов одежды' },
    { item: '신발', meaning: 'обувь', unit: '켤레', unitMeaning: 'пар обуви/носков' },
    { item: '양말', meaning: 'носки', unit: '켤레', unitMeaning: 'пар обуви/носков' },
  ],
  3: [
    { item: '자동차', meaning: 'автомобиль', unit: '대', unitMeaning: 'машин и техники' },
    { item: '컴퓨터', meaning: 'компьютер', unit: '대', unitMeaning: 'машин и техники' },
    { item: '비빔밥', meaning: 'пибимпап', unit: '그릇', unitMeaning: 'мисок/порций в посуде' },
    { item: '라면', meaning: 'рамен', unit: '그릇', unitMeaning: 'мисок/порций в посуде' },
    { item: '김치', meaning: 'кимчи', unit: '통', unitMeaning: 'контейнеров/банок' },
    { item: '물통', meaning: 'канистра воды', unit: '통', unitMeaning: 'контейнеров/банок' },
    { item: '귤', meaning: 'мандарины', unit: '상자', unitMeaning: 'коробок' },
    { item: '책', meaning: 'книги', unit: '상자', unitMeaning: 'коробок' },
    { item: '버스', meaning: 'автобус', unit: '대', unitMeaning: 'машин и транспорта' },
    { item: '국수', meaning: 'лапша', unit: '그릇', unitMeaning: 'мисок/порций в посуде' },
  ],
  4: [
    { item: '과자', meaning: 'снеки', unit: '봉지', unitMeaning: 'пакетов' },
    { item: '라면', meaning: 'рамен', unit: '봉지', unitMeaning: 'пакетов' },
    { item: '연필', meaning: 'карандаши', unit: '봉', unitMeaning: 'палочек/стержней' },
    { item: '볼펜', meaning: 'ручки', unit: '봉', unitMeaning: 'палочек/стержней' },
    { item: '김밥', meaning: 'кимбап', unit: '줄', unitMeaning: 'длинных рядов/рулонов' },
    { item: '목걸이', meaning: 'ожерелье', unit: '줄', unitMeaning: 'нитей/рядов' },
    { item: '장미', meaning: 'роза', unit: '송이', unitMeaning: 'цветков' },
    { item: '국화', meaning: 'хризантема', unit: '송이', unitMeaning: 'цветков' },
    { item: '사탕', meaning: 'конфеты', unit: '봉지', unitMeaning: 'пакетов' },
    { item: '진주', meaning: 'жемчуг', unit: '줄', unitMeaning: 'нитей/рядов' },
  ],
  5: [
    { item: '배추', meaning: 'пекинская капуста', unit: '포기', unitMeaning: 'кочанов/растений' },
    { item: '무', meaning: 'редька', unit: '포기', unitMeaning: 'кочанов/растений' },
    { item: '양파', meaning: 'лук', unit: '알', unitMeaning: 'головок/зёрен' },
    { item: '마늘', meaning: 'чеснок', unit: '알', unitMeaning: 'зубчиков/головок' },
    { item: '한옥', meaning: 'традиционный дом', unit: '채', unitMeaning: 'домов/зданий' },
    { item: '집', meaning: 'дом', unit: '채', unitMeaning: 'домов/зданий' },
    { item: '배', meaning: 'судно', unit: '척', unitMeaning: 'кораблей' },
    { item: '장기', meaning: 'корейские шахматы', unit: '판', unitMeaning: 'партий/игровых досок' },
    { item: '고기', meaning: 'мясо', unit: '덩어리', unitMeaning: 'кусков/глыб' },
    { item: '얼음', meaning: 'лёд', unit: '덩어리', unitMeaning: 'кусков/глыб' },
  ],
};

const movementBank: Record<UserLevel, TargetItem[]> = {
  1: [
    { target: '가다', meaning: 'идти/ехать туда', hintKr: '말하는 사람에게서 멀어지는 이동', exampleKr: '저는 학교에 가요.', exampleRu: 'Я иду в школу.' },
    { target: '오다', meaning: 'приходить сюда', hintKr: '말하는 사람 쪽으로 오는 이동', exampleKr: '친구가 집에 와요.', exampleRu: 'Друг приходит домой.' },
    { target: '들어가다', meaning: 'заходить внутрь туда', hintKr: '밖에서 안으로, 말하는 사람에게서 멀어짐', exampleKr: '학생이 교실에 들어가요.', exampleRu: 'Ученик заходит в класс.' },
    { target: '들어오다', meaning: 'заходить внутрь сюда', hintKr: '밖에서 안으로, 말하는 사람 쪽으로 옴', exampleKr: '고양이가 방에 들어와요.', exampleRu: 'Кошка заходит в комнату.' },
    { target: '나가다', meaning: 'выходить наружу туда', hintKr: '안에서 밖으로, 멀어짐', exampleKr: '동생이 밖에 나가요.', exampleRu: 'Младший брат выходит наружу.' },
    { target: '나오다', meaning: 'выходить наружу сюда', hintKr: '안에서 밖으로, 화자 쪽으로 옴', exampleKr: '선생님이 교실에서 나와요.', exampleRu: 'Учитель выходит из класса.' },
    { target: '올라가다', meaning: 'подниматься вверх туда', hintKr: '아래에서 위로 멀어짐', exampleKr: '우리는 산에 올라가요.', exampleRu: 'Мы поднимаемся на гору.' },
    { target: '올라오다', meaning: 'подниматься вверх сюда', hintKr: '아래에서 위로 화자 쪽으로 옴', exampleKr: '친구가 계단을 올라와요.', exampleRu: 'Друг поднимается по лестнице сюда.' },
  ],
  2: [
    { target: '내려가다', meaning: 'спускаться вниз туда', hintKr: '위에서 아래로 멀어짐', exampleKr: '엘리베이터가 아래층으로 내려가요.', exampleRu: 'Лифт спускается вниз.' },
    { target: '내려오다', meaning: 'спускаться вниз сюда', hintKr: '위에서 아래로 화자 쪽으로 옴', exampleKr: '형이 계단을 내려와요.', exampleRu: 'Старший брат спускается сюда.' },
    { target: '건너가다', meaning: 'переходить на другую сторону туда', hintKr: '길이나 강을 건너 멀어짐', exampleKr: '학생이 길을 건너가요.', exampleRu: 'Ученик переходит дорогу туда.' },
    { target: '건너오다', meaning: 'переходить на другую сторону сюда', hintKr: '길이나 강을 건너 화자 쪽으로 옴', exampleKr: '친구가 다리를 건너와요.', exampleRu: 'Друг переходит мост сюда.' },
    { target: '돌아가다', meaning: 'возвращаться туда/назад', hintKr: '원래 있던 곳으로 멀어짐', exampleKr: '저는 집으로 돌아가요.', exampleRu: 'Я возвращаюсь домой.' },
    { target: '돌아오다', meaning: 'возвращаться сюда', hintKr: '원래 있던 곳에서 화자 쪽으로 옴', exampleKr: '아버지가 집에 돌아와요.', exampleRu: 'Отец возвращается домой.' },
    { target: '지나가다', meaning: 'проходить мимо туда', hintKr: '어떤 곳을 스쳐 멀어짐', exampleKr: '버스가 학교 앞을 지나가요.', exampleRu: 'Автобус проезжает мимо школы.' },
    { target: '지나오다', meaning: 'проходить мимо сюда', hintKr: '어떤 곳을 지나 화자 쪽으로 옴', exampleKr: '친구가 공원을 지나와요.', exampleRu: 'Друг проходит через парк сюда.' },
  ],
  3: [
    { target: '다가가다', meaning: 'подходить ближе туда', hintKr: '대상에게 가까이 감', exampleKr: '아이가 강아지에게 다가가요.', exampleRu: 'Ребёнок подходит к щенку.' },
    { target: '다가오다', meaning: 'приближаться сюда', hintKr: '대상이 화자에게 가까이 옴', exampleKr: '기차가 역으로 다가와요.', exampleRu: 'Поезд приближается к станции.' },
    { target: '물러가다', meaning: 'отступать туда', hintKr: '뒤로 물러나 멀어짐', exampleKr: '군중이 천천히 물러가요.', exampleRu: 'Толпа медленно отступает.' },
    { target: '물러오다', meaning: 'отступать сюда', hintKr: '뒤로 물러나 화자 쪽으로 옴', exampleKr: '아이가 뒤쪽으로 물러와요.', exampleRu: 'Ребёнок отступает назад сюда.' },
    { target: '떠나가다', meaning: 'уходить/уезжать прочь', hintKr: '어떤 곳을 떠나 멀어짐', exampleKr: '친구가 도시를 떠나가요.', exampleRu: 'Друг уезжает из города.' },
    { target: '떠나오다', meaning: 'покидать и приходить сюда', hintKr: '어떤 곳을 떠나 화자 쪽으로 옴', exampleKr: '저는 고향을 떠나왔어요.', exampleRu: 'Я уехал из родного города сюда.' },
    { target: '흘러가다', meaning: 'течь туда/протекать', hintKr: '물이나 시간이 흘러 멀어짐', exampleKr: '강물이 바다로 흘러가요.', exampleRu: 'Речная вода течёт к морю.' },
    { target: '흘러오다', meaning: 'течь сюда', hintKr: '물이나 소리가 화자 쪽으로 옴', exampleKr: '음악 소리가 창문으로 흘러와요.', exampleRu: 'Музыка доносится через окно.' },
  ],
  4: [
    { target: '굴러가다', meaning: 'катиться туда', hintKr: '둥근 물체가 굴러 멀어짐', exampleKr: '공이 운동장 끝으로 굴러가요.', exampleRu: 'Мяч катится к краю площадки.' },
    { target: '굴러오다', meaning: 'катиться сюда', hintKr: '둥근 물체가 굴러 화자 쪽으로 옴', exampleKr: '동전이 제 발밑으로 굴러와요.', exampleRu: 'Монета катится к моим ногам.' },
    { target: '날아가다', meaning: 'улетать туда', hintKr: '공중으로 날아 멀어짐', exampleKr: '새가 숲 쪽으로 날아가요.', exampleRu: 'Птица улетает к лесу.' },
    { target: '날아오다', meaning: 'прилетать сюда', hintKr: '공중에서 화자 쪽으로 옴', exampleKr: '종이비행기가 제 쪽으로 날아와요.', exampleRu: 'Бумажный самолётик прилетает ко мне.' },
    { target: '뛰어가다', meaning: 'бежать туда', hintKr: '뛰어서 멀어짐', exampleKr: '학생이 버스 정류장으로 뛰어가요.', exampleRu: 'Ученик бежит к остановке.' },
    { target: '뛰어오다', meaning: 'бежать сюда', hintKr: '뛰어서 화자 쪽으로 옴', exampleKr: '친구가 저에게 뛰어와요.', exampleRu: 'Друг бежит ко мне.' },
    { target: '걸어가다', meaning: 'идти пешком туда', hintKr: '걸어서 멀어짐', exampleKr: '우리는 학교까지 걸어가요.', exampleRu: 'Мы идём пешком до школы.' },
    { target: '걸어오다', meaning: 'идти пешком сюда', hintKr: '걸어서 화자 쪽으로 옴', exampleKr: '선생님이 교실로 걸어오세요.', exampleRu: 'Учитель идёт пешком в класс.' },
  ],
  5: [
    { target: '기어가다', meaning: 'ползти туда', hintKr: '몸을 낮추고 기어서 멀어짐', exampleKr: '거북이가 모래 위를 기어가요.', exampleRu: 'Черепаха ползёт по песку.' },
    { target: '기어오다', meaning: 'ползти сюда', hintKr: '몸을 낮추고 기어서 화자 쪽으로 옴', exampleKr: '아기가 엄마에게 기어와요.', exampleRu: 'Малыш ползёт к маме.' },
    { target: '기어내려가다', meaning: 'сползать вниз туда', hintKr: '기어서 아래로 멀어짐', exampleKr: '벌레가 나무에서 기어내려가요.', exampleRu: 'Насекомое сползает с дерева.' },
    { target: '기어올라오다', meaning: 'заползать вверх сюда', hintKr: '기어서 위로 화자 쪽에 옴', exampleKr: '고양이가 지붕 위로 기어올라와요.', exampleRu: 'Кошка заползает на крышу сюда.' },
    { target: '달려가다', meaning: 'мчаться/бежать туда', hintKr: '빠르게 뛰어서 멀어짐', exampleKr: '구조대원이 현장으로 달려가요.', exampleRu: 'Спасатель мчится к месту происшествия.' },
    { target: '달려오다', meaning: 'мчаться/бежать сюда', hintKr: '빠르게 뛰어서 화자 쪽으로 옴', exampleKr: '아이가 부모님에게 달려와요.', exampleRu: 'Ребёнок бежит к родителям.' },
    { target: '헤엄쳐가다', meaning: 'плыть туда', hintKr: '헤엄쳐서 멀어짐', exampleKr: '선수가 반대편으로 헤엄쳐가요.', exampleRu: 'Спортсмен плывёт на другую сторону.' },
    { target: '헤엄쳐오다', meaning: 'плыть сюда', hintKr: '헤엄쳐서 화자 쪽으로 옴', exampleKr: '오리가 강가로 헤엄쳐와요.', exampleRu: 'Утка подплывает к берегу.' },
    { target: '옮겨가다', meaning: 'перемещаться туда', hintKr: '장소나 소속이 다른 곳으로 바뀜', exampleKr: '회사가 새 건물로 옮겨가요.', exampleRu: 'Компания переезжает в новое здание.' },
    { target: '옮겨오다', meaning: 'перемещаться сюда', hintKr: '다른 곳에서 이쪽으로 이동함', exampleKr: '자료가 새 서버로 옮겨와요.', exampleRu: 'Данные переносятся на новый сервер.' },
    { target: '이동하다', meaning: 'перемещаться', hintKr: '장소를 바꿈', exampleKr: '참가자들이 회의실로 이동합니다.', exampleRu: 'Участники перемещаются в переговорную.' },
    { target: '출발하다', meaning: 'отправляться', hintKr: '어떤 곳에서 떠남', exampleKr: '버스가 정시에 출발합니다.', exampleRu: 'Автобус отправляется вовремя.' },
    { target: '도착하다', meaning: 'прибывать', hintKr: '목적지에 이름', exampleKr: '기차가 역에 도착합니다.', exampleRu: 'Поезд прибывает на станцию.' },
  ],
};

const reasonBank: Record<UserLevel, TargetItem[]> = {
  1: [
    { target: '그래서', meaning: 'поэтому', hintKr: '앞의 일이 뒤의 결과를 만듦', exampleKr: '비가 와요. 그래서 집에 있어요.', exampleRu: 'Идёт дождь. Поэтому я дома.' },
    { target: '그리고', meaning: 'и, затем', hintKr: '두 내용을 이어 줌', exampleKr: '밥을 먹어요. 그리고 물을 마셔요.', exampleRu: 'Ем. И пью воду.' },
    { target: '하지만', meaning: 'но', hintKr: '반대되는 내용을 말함', exampleKr: '비가 와요. 하지만 우산이 없어요.', exampleRu: 'Идёт дождь. Но зонта нет.' },
    { target: '-아서/어서', meaning: 'потому что', hintKr: '원인을 자연스럽게 연결함', exampleKr: '책을 읽어서 기분이 좋아요.', exampleRu: 'Читал книгу, поэтому настроение хорошее.' },
    { target: '-해서', meaning: 'потому что сделал/из-за действия', hintKr: '하다 동사와 연결함', exampleKr: '운동해서 피곤해요.', exampleRu: 'Устал, потому что тренировался.' },
    { target: '때문에', meaning: 'из-за', hintKr: '명사나 원인 뒤에 씀', exampleKr: '비 때문에 늦었어요.', exampleRu: 'Опоздал из-за дождя.' },
    { target: '아니면', meaning: 'или, иначе', hintKr: '다른 선택을 말함', exampleKr: '커피 아니면 차를 마셔요.', exampleRu: 'Пью кофе или чай.' },
  ],
  2: [
    { target: '-니까', meaning: 'поскольку, так как', hintKr: '이유를 강하게 말함', exampleKr: '늦었으니까 택시를 타요.', exampleRu: 'Поскольку поздно, еду на такси.' },
    { target: '그러니까', meaning: 'поэтому, значит', hintKr: '앞 내용을 바탕으로 결론을 말함', exampleKr: '시간이 없어요. 그러니까 빨리 가요.', exampleRu: 'Нет времени. Поэтому идём быстро.' },
    { target: '그래서요', meaning: 'поэтому-то / и поэтому', hintKr: '대화에서 결과를 부드럽게 말함', exampleKr: '길이 막혔어요. 그래서요, 조금 늦었어요.', exampleRu: 'Были пробки. Поэтому я немного опоздал.' },
    { target: '또는', meaning: 'или', hintKr: '선택지를 연결함', exampleKr: '버스 또는 지하철을 타요.', exampleRu: 'Еду на автобусе или метро.' },
    { target: '그러면', meaning: 'тогда', hintKr: '조건 뒤의 결과를 말함', exampleKr: '시간이 있으면 그러면 같이 가요.', exampleRu: 'Если есть время, тогда пойдём вместе.' },
    { target: '그럼', meaning: 'тогда, ну тогда', hintKr: '말할 때 짧게 씀', exampleKr: '그럼 내일 만나요.', exampleRu: 'Тогда увидимся завтра.' },
    { target: '그리고 나서', meaning: 'после этого', hintKr: '순서를 말함', exampleKr: '숙제를 해요. 그리고 나서 쉬어요.', exampleRu: 'Делаю домашку. Потом отдыхаю.' },
    { target: '그런데', meaning: 'но, кстати', hintKr: '새 정보나 반전을 말함', exampleKr: '가고 싶어요. 그런데 시간이 없어요.', exampleRu: 'Хочу пойти, но нет времени.' },
  ],
  3: [
    { target: '-기 때문에', meaning: 'потому что, из-за того что', hintKr: '공식적이고 분명한 이유', exampleKr: '비가 오기 때문에 행사가 취소됐어요.', exampleRu: 'Мероприятие отменили, потому что идёт дождь.' },
    { target: '왜냐하면', meaning: 'потому что', hintKr: '이유를 직접 설명하기 시작함', exampleKr: '저는 집에 있어요. 왜냐하면 아프기 때문이에요.', exampleRu: 'Я дома, потому что болею.' },
    { target: '그렇기 때문에', meaning: 'именно поэтому', hintKr: '앞 이유를 받아 결과를 강조함', exampleKr: '규칙이 중요해요. 그렇기 때문에 지켜야 해요.', exampleRu: 'Правила важны. Поэтому их нужно соблюдать.' },
    { target: '그러면서', meaning: 'при этом, одновременно', hintKr: '두 행동이 함께 일어남', exampleKr: '그는 웃었어요. 그러면서 손을 흔들었어요.', exampleRu: 'Он улыбнулся и при этом помахал рукой.' },
    { target: '그러다가', meaning: 'потом в процессе', hintKr: '하던 중 상황이 바뀜', exampleKr: '걷고 있었어요. 그러다가 친구를 만났어요.', exampleRu: 'Шёл, и тут встретил друга.' },
    { target: '만약', meaning: 'если', hintKr: '조건을 말함', exampleKr: '만약 시간이 있으면 전화해요.', exampleRu: 'Если будет время, позвони.' },
    { target: '만약에', meaning: 'если вдруг', hintKr: '가정 조건을 조금 더 부드럽게 말함', exampleKr: '만약에 비가 오면 집에 있을게요.', exampleRu: 'Если вдруг пойдёт дождь, останусь дома.' },
    { target: '그렇다면', meaning: 'если так, тогда', hintKr: '앞 조건을 받아 결론을 말함', exampleKr: '그렇다면 다시 설명할게요.', exampleRu: 'Если так, объясню ещё раз.' },
  ],
  4: [
    { target: '그렇지만', meaning: 'однако, но', hintKr: '반대 내용을 부드럽게 연결함', exampleKr: '계획은 좋습니다. 그렇지만 예산이 부족합니다.', exampleRu: 'План хороший. Однако бюджета мало.' },
    { target: '그러나', meaning: 'однако', hintKr: '글에서 반전을 공식적으로 말함', exampleKr: '자료는 충분합니다. 그러나 시간이 부족합니다.', exampleRu: 'Материалов достаточно. Однако времени мало.' },
    { target: '그런데도', meaning: 'несмотря на это', hintKr: '앞 상황과 다른 결과', exampleKr: '많이 연습했습니다. 그런데도 실수했습니다.', exampleRu: 'Много тренировался. Но всё равно ошибся.' },
    { target: '또한', meaning: 'также', hintKr: '추가 정보를 더함', exampleKr: '문법도 중요합니다. 또한 어휘도 중요합니다.', exampleRu: 'Грамматика важна. Также важна лексика.' },
    { target: '게다가', meaning: 'к тому же', hintKr: '추가 이유를 더함', exampleKr: '비가 옵니다. 게다가 바람도 강합니다.', exampleRu: 'Идёт дождь. К тому же сильный ветер.' },
    { target: '더구나', meaning: 'более того', hintKr: '더 강한 추가 이유', exampleKr: '길이 막힙니다. 더구나 눈도 옵니다.', exampleRu: 'Пробки. Более того, идёт снег.' },
    { target: '뿐만 아니라', meaning: 'не только, но и', hintKr: '두 가지를 함께 강조함', exampleKr: '한국어뿐만 아니라 문화도 배웁니다.', exampleRu: 'Изучаем не только корейский, но и культуру.' },
    { target: '한편', meaning: 'с другой стороны, тем временем', hintKr: '다른 관점으로 넘어감', exampleKr: '학생은 늘었습니다. 한편 교재는 부족합니다.', exampleRu: 'Студентов стало больше. С другой стороны, учебников мало.' },
    { target: '반면에', meaning: 'в то время как, наоборот', hintKr: '대조를 말함', exampleKr: '한국어는 재미있습니다. 반면에 문법은 어렵습니다.', exampleRu: 'Корейский интересный, а грамматика сложная.' },
    { target: '오히려', meaning: 'наоборот, скорее', hintKr: '예상과 반대 결과', exampleKr: '쉬울 줄 알았습니다. 오히려 더 어려웠습니다.', exampleRu: 'Думал, будет легко. Наоборот, было сложнее.' },
  ],
  5: [
    { target: '덕분에', meaning: 'благодаря', hintKr: '긍정적 원인', exampleKr: '선생님 덕분에 이해했습니다.', exampleRu: 'Понял благодаря учителю.' },
    { target: '탓에', meaning: 'из-за, по вине', hintKr: '부정적 원인', exampleKr: '실수 탓에 일정이 늦어졌습니다.', exampleRu: 'График задержался из-за ошибки.' },
    { target: '-느라고', meaning: 'из-за того что был занят действием', hintKr: '어떤 행동 때문에 다른 일을 못 함', exampleKr: '일하느라고 전화를 못 받았습니다.', exampleRu: 'Не ответил, потому что работал.' },
    { target: '즉', meaning: 'то есть', hintKr: '앞 내용을 짧게 정리함', exampleKr: '그는 연구자입니다. 즉, 자료를 분석하는 사람입니다.', exampleRu: 'Он исследователь, то есть анализирует данные.' },
    { target: '다시 말하면', meaning: 'другими словами', hintKr: '같은 내용을 다시 설명함', exampleKr: '이 방법은 효율적입니다. 다시 말하면 시간이 절약됩니다.', exampleRu: 'Метод эффективен, другими словами экономит время.' },
    { target: '예를 들면', meaning: 'например', hintKr: '예시를 제시함', exampleKr: '운동이 좋아요. 예를 들면 수영이 있어요.', exampleRu: 'Спорт полезен. Например, плавание.' },
    { target: '그러므로', meaning: 'следовательно', hintKr: '논리적 결론', exampleKr: '자료가 충분합니다. 그러므로 결론을 낼 수 있습니다.', exampleRu: 'Данных достаточно. Следовательно, можно сделать вывод.' },
  ],
};

const honorificBank: Record<UserLevel, TargetItem[]> = {
  1: [
    { target: '-요', meaning: 'мягкое вежливое окончание', hintKr: '말을 부드럽게 높임', exampleKr: '좋아요.', exampleRu: 'Хорошо.' },
    { target: '-아요/어요', meaning: 'вежливая форма настоящего времени', hintKr: '동사를 존댓말로 만듦', exampleKr: '먹어요.', exampleRu: 'Ем / ест.' },
    { target: '-해요', meaning: 'вежливая форма 하다', hintKr: '하다가 해요가 됨', exampleKr: '공부해요.', exampleRu: 'Учусь.' },
    { target: '-예요/이에요', meaning: 'вежливое “есть/является”', hintKr: '명사 뒤에 씀', exampleKr: '학생이에요.', exampleRu: 'Я студент.' },
    { target: '-아/어', meaning: 'разговорная форма', hintKr: '친한 사람에게 씀', exampleKr: '먹어.', exampleRu: 'Ешь.' },
    { target: '-해', meaning: 'разговорная форма 하다', hintKr: '친구에게 말함', exampleKr: '공부해.', exampleRu: 'Учись.' },
    { target: '-야', meaning: 'разговорное “есть/является”', hintKr: '명사 뒤 반말', exampleKr: '친구야.', exampleRu: 'Это друг / эй, друг.' },
  ],
  2: [
    { target: '-았어요/었어요/했어요', meaning: 'вежливое прошедшее время', hintKr: '존댓말 과거', exampleKr: '어제 공부했어요.', exampleRu: 'Вчера учился.' },
    { target: '-고 있어요', meaning: 'вежливое действие сейчас', hintKr: '지금 하는 중', exampleKr: '지금 먹고 있어요.', exampleRu: 'Сейчас ем.' },
    { target: '-아/어 주세요', meaning: 'пожалуйста, сделайте', hintKr: '공손한 부탁', exampleKr: '도와 주세요.', exampleRu: 'Помогите, пожалуйста.' },
    { target: '-지 마세요', meaning: 'пожалуйста, не делайте', hintKr: '공손한 금지', exampleKr: '가지 마세요.', exampleRu: 'Пожалуйста, не уходите.' },
    { target: '-고 있어', meaning: 'разговорное действие сейчас', hintKr: '친구에게 현재 진행', exampleKr: '나 공부하고 있어.', exampleRu: 'Я сейчас учусь.' },
    { target: '-아/어 줘', meaning: 'сделай для меня', hintKr: '친구에게 부탁', exampleKr: '도와 줘.', exampleRu: 'Помоги.' },
    { target: '-지 마', meaning: 'не делай', hintKr: '친구에게 금지', exampleKr: '가지 마.', exampleRu: 'Не уходи.' },
  ],
  3: [
    { target: '-아/어야 해요', meaning: 'нужно сделать, вежливо', hintKr: '의무를 존댓말로 말함', exampleKr: '숙제해야 해요.', exampleRu: 'Нужно сделать домашку.' },
    { target: '-아/어도 돼요', meaning: 'можно сделать, вежливо', hintKr: '허락을 존댓말로 말함', exampleKr: '들어가도 돼요?', exampleRu: 'Можно войти?' },
    { target: '-(으)ㄹ까요?', meaning: 'может, сделаем?/мне сделать?', hintKr: '공손한 제안이나 질문', exampleKr: '같이 갈까요?', exampleRu: 'Пойдём вместе?' },
    { target: '-을래요/ㄹ래요', meaning: 'хотите?/собираетесь?', hintKr: '의향을 물음', exampleKr: '커피 마실래요?', exampleRu: 'Хотите кофе?' },
    { target: '-아/어야 해', meaning: 'нужно сделать, разговорно', hintKr: '친구에게 의무', exampleKr: '너 공부해야 해.', exampleRu: 'Тебе нужно учиться.' },
    { target: '-아/어도 돼', meaning: 'можно сделать, разговорно', hintKr: '친구에게 허락', exampleKr: '들어와도 돼.', exampleRu: 'Можно войти.' },
    { target: '-(으)ㄹ까?', meaning: 'может, сделаем?, разговорно', hintKr: '친구에게 제안', exampleKr: '같이 갈까?', exampleRu: 'Пойдём вместе?' },
    { target: '-을래/ㄹ래', meaning: 'хочешь?, разговорно', hintKr: '친구에게 의향 질문', exampleKr: '커피 마실래?', exampleRu: 'Хочешь кофе?' },
  ],
  4: [
    { target: '-겠습니다', meaning: 'официальное намерение/буду', hintKr: '공식적인 의지 표현', exampleKr: '제가 설명하겠습니다.', exampleRu: 'Я объясню.' },
    { target: '-ㅂ니다/습니다', meaning: 'официальное повествование', hintKr: '격식체 평서문', exampleKr: '회의를 시작합니다.', exampleRu: 'Начинаем собрание.' },
    { target: '-입니까?', meaning: 'официальный вопрос с noun', hintKr: '명사 질문 격식체', exampleKr: '학생입니까?', exampleRu: 'Вы студент?' },
    { target: '-습니까?', meaning: 'официальный вопрос', hintKr: '동사/형용사 질문 격식체', exampleKr: '알겠습니까?', exampleRu: 'Понятно?' },
    { target: '-십시오', meaning: 'официальная просьба/приказ', hintKr: '매우 공손한 지시', exampleKr: '잠시 기다리십시오.', exampleRu: 'Пожалуйста, подождите.' },
    { target: '-시-', meaning: 'почтительный суффикс', hintKr: '주어를 높임', exampleKr: '선생님이 오세요.', exampleRu: 'Учитель приходит.' },
    { target: '-(으)시다', meaning: 'почтительная словарная форма', hintKr: '높임 기본형', exampleKr: '읽으시다.', exampleRu: 'Читать, почтительно.' },
    { target: '-십니다', meaning: 'официальная почтительная форма', hintKr: '높임 격식체', exampleKr: '교수님께서 말씀하십니다.', exampleRu: 'Профессор говорит.' },
    { target: '-셨어요', meaning: 'почтительное прошедшее время', hintKr: '높임 과거', exampleKr: '선생님이 오셨어요.', exampleRu: 'Учитель пришёл.' },
  ],
  5: [
    { target: '-네요', meaning: 'замечание/удивление', hintKr: '새롭게 느낀 점', exampleKr: '정말 빠르네요.', exampleRu: 'Как быстро.' },
    { target: '-군요', meaning: 'осознание/понимание', hintKr: '알게 된 사실', exampleKr: '그렇군요.', exampleRu: 'Вот как.' },
    { target: '-잖아요', meaning: 'ведь, же', hintKr: '상대도 아는 사실 확인', exampleKr: '아까 말했잖아요.', exampleRu: 'Я же говорил.' },
    { target: '-지요/죠', meaning: 'не так ли?, ведь', hintKr: '확인이나 부드러운 동의', exampleKr: '오늘 춥죠?', exampleRu: 'Сегодня холодно, да?' },
    { target: '-거예요/-(으)ㄹ 거예요', meaning: 'будущее/намерение', hintKr: '예정이나 추측', exampleKr: '내일 갈 거예요.', exampleRu: 'Завтра пойду.' },
    { target: '-고 있었어요', meaning: 'действие продолжалось в прошлом', hintKr: '과거 진행', exampleKr: '기다리고 있었어요.', exampleRu: 'Я ждал.' },
    { target: '-시겠어요', meaning: 'вежливое предложение/готовность', hintKr: '상대 의향을 공손히 물음', exampleKr: '앉으시겠어요?', exampleRu: 'Присядете?' },
    { target: '-시죠', meaning: 'вежливое предложение', hintKr: '공손하게 권유함', exampleKr: '먼저 들어가시죠.', exampleRu: 'Проходите первым.' },
  ],
};

function levelContext(
  level: UserLevel,
  coreBlank: string,
  coreFull: string,
  ruHint: string,
  seed: QuestionContextSeed
) {
  const starter = questionContextStarter(seed);

  if (level === 1) {
    return {
      promptKr: `${starter} ${coreBlank}`,
      audioText: `${starter} ${coreFull}`,
      promptRu: ruHint,
    };
  }

  if (level === 2) {
    return {
      promptKr: `${starter} 오늘 수업이 있어요. ${coreBlank}`,
      audioText: `${starter} 오늘 수업이 있어요. ${coreFull}`,
      promptRu: ruHint,
    };
  }

  if (level === 3) {
    return {
      promptKr: `${starter} 학생들은 한국어 수업에서 새 표현을 배웠어요. 선생님은 예문을 보여 주고 천천히 설명했어요. ${coreBlank}`,
      audioText: `${starter} 학생들은 한국어 수업에서 새 표현을 배웠어요. 선생님은 예문을 보여 주고 천천히 설명했어요. ${coreFull}`,
      promptRu: ruHint,
    };
  }

  if (level === 4) {
    const before = [
      `${starter} 지역 교육 기관의 운영 회의에서는 학습자 수준 평가 결과와 개선 방향을 함께 검토했습니다.`,
      '참여 학생들은 복합적인 문장 구조와 실제 사용 맥락을 비교하면서 문제를 해결했습니다.',
      '담당 교사는 오류 유형을 분석하고 단계별 피드백 기준을 세밀하게 조정했습니다.',
      '그 과정에서 문법 선택의 정확성과 표현 사용의 자연성을 동시에 확인해야 했습니다.',
    ].join(' ');
    return {
      promptKr: `${before} ${coreBlank}`,
      audioText: `${before} ${coreFull}`,
      promptRu: ruHint,
    };
  }

  const before = [
    `${starter} 국제 교육 서비스의 고도화 전략을 수립하기 위해 운영진은 장기 성과 지표를 분석했습니다.`,
    '학습 데이터 기반의 개인화 추천 시스템은 문법 오류 유형과 복습 우선순위를 정교하게 분류했습니다.',
    '다국어 사용자 환경에서는 문화적 배경, 학습 목적, 인지 부담, 지속 이용 가능성을 종합적으로 고려해야 합니다.',
    '평가 담당자는 실증 분석 결과와 사용자 인터뷰 내용을 대조하면서 문제 설계의 타당성을 검증했습니다.',
    '또한 고급 학습자는 단순한 형태 인식보다 문맥 추론과 의미 관계 파악을 더 자주 요구합니다.',
    '따라서 다음 문항은 전체 담화의 인과 관계와 문법 정확성을 동시에 평가하기 위한 독해형 문제입니다.',
  ].join(' ');
  return {
    promptKr: `${before} ${coreBlank}`,
    audioText: `${before} ${coreFull}`,
    promptRu: ruHint,
  };
}
function counterLevel2Context(
  blankPhrase: string,
  fullPhrase: string,
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '아침에 카페에 갔어요. 주문표에 __BLANK__이라고 적혀있어요.',
      full: '아침에 카페에 갔어요. 주문표에 __FULL__이라고 적혀있어요.',
    },
    {
      blank: '운동 후에 목이 말랐어요. 저는 __BLANK__을 마셨어요.',
      full: '운동 후에 목이 말랐어요. 저는 __FULL__을 마셨어요.',
    },
    {
      blank: '마트에서 장을 봤어요. 장바구니에는 __BLANK__이 들어 있어요.',
      full: '마트에서 장을 봤어요. 장바구니에는 __FULL__이 들어 있어요.',
    },
    {
      blank: '생일 파티를 준비해요. 냉장고에 __BLANK__을 넣었어요.',
      full: '생일 파티를 준비해요. 냉장고에 __FULL__을 넣었어요.',
    },
    {
      blank: '미술 시간에 종이가 필요해요. 선생님이 __BLANK__을 나눠 줬어요.',
      full: '미술 시간에 종이가 필요해요. 선생님이 __FULL__을 나눠 줬어요.',
    },
    {
      blank: '앨범을 정리하고 있어요. 책상 위에 __BLANK__이 놓여 있어요.',
      full: '앨범을 정리하고 있어요. 책상 위에 __FULL__이 놓여 있어요.',
    },
    {
      blank: '공연 준비를 해요. 의상실에는 __BLANK__이 걸려 있어요.',
      full: '공연 준비를 해요. 의상실에는 __FULL__이 걸려 있어요.',
    },
    {
      blank: '면접을 준비하는 사람들이 왔어요. 대기실에 __BLANK__이 준비되어 있어요.',
      full: '면접을 준비하는 사람들이 왔어요. 대기실에 __FULL__이 준비되어 있어요.',
    },
    {
      blank: '신발장을 정리했어요. 현관에는 __BLANK__가 가지런히 있어요.',
      full: '신발장을 정리했어요. 현관에는 __FULL__가 가지런히 있어요.',
    },
    {
      blank: '여행 가방을 싸고 있어요. 가방 안에 __BLANK__을 넣었어요.',
      full: '여행 가방을 싸고 있어요. 가방 안에 __FULL__을 넣었어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '친구와 카페에 앉았어요. 저는 __BLANK__을 주문했어요.',
      full: '친구와 카페에 앉았어요. 저는 __FULL__을 주문했어요.',
    },
    {
      blank: '식탁 위에 컵이 있어요. 컵 안에는 __BLANK__이 담겨 있어요.',
      full: '식탁 위에 컵이 있어요. 컵 안에는 __FULL__이 담겨 있어요.',
    },
    {
      blank: '동생이 우유를 좋아해요. 엄마가 __BLANK__을 사 왔어요.',
      full: '동생이 우유를 좋아해요. 엄마가 __FULL__을 사 왔어요.',
    },
  ];

  const templates = seed.stage === 'remedial' ? remedialTemplates : mainTemplates;
  const template = templates[(seed.order - 1) % templates.length];

  return {
    promptKr: `${starter} ${template.blank.replace('__BLANK__', blankPhrase)}`,
    audioText: `${starter} ${template.full.replace('__FULL__', fullPhrase)}`,
    promptRu: ruHint,
  };
}
function counterLevel3Context(
  blankPhrase: string,
  fullPhrase: string,
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '아빠가 새 차를 샀어요. 주차장에 __BLANK__가 있어요. 가족들이 함께 차를 구경해요.',
      full: '아빠가 새 차를 샀어요. 주차장에 __FULL__가 있어요. 가족들이 함께 차를 구경해요.',
    },
    {
      blank: '교실에 컴퓨터가 부족해요. 선생님이 __BLANK__를 더 가져왔어요. 학생들이 같이 사용할 거예요.',
      full: '교실에 컴퓨터가 부족해요. 선생님이 __FULL__를 더 가져왔어요. 학생들이 같이 사용할 거예요.',
    },
    {
      blank: '점심시간에 식당에 갔어요. 친구들이 비빔밥을 먹고 싶어 했어요. 우리는 __BLANK__을 주문했어요.',
      full: '점심시간에 식당에 갔어요. 친구들이 비빔밥을 먹고 싶어 했어요. 우리는 __FULL__을 주문했어요.',
    },
    {
      blank: '밤에 배가 고팠어요. 동생들이 라면을 먹고 싶다고 했어요. 그래서 엄마가 __BLANK__을 끓였어요.',
      full: '밤에 배가 고팠어요. 동생들이 라면을 먹고 싶다고 했어요. 그래서 엄마가 __FULL__을 끓였어요.',
    },
    {
      blank: '할머니가 김장을 했어요. 큰 냉장고 안에 김치가 많아요. 우리는 __BLANK__을 보관했어요.',
      full: '할머니가 김장을 했어요. 큰 냉장고 안에 김치가 많아요. 우리는 __FULL__을 보관했어요.',
    },
    {
      blank: '운동회가 끝났어요. 학생들이 물을 많이 마셨어요. 운동장 옆에는 __BLANK__이 놓여 있어요.',
      full: '운동회가 끝났어요. 학생들이 물을 많이 마셨어요. 운동장 옆에는 __FULL__이 놓여 있어요.',
    },
    {
      blank: '겨울에 귤을 많이 샀어요. 가족들이 모두 귤을 좋아해요. 베란다에는 __BLANK__가 쌓여 있어요.',
      full: '겨울에 귤을 많이 샀어요. 가족들이 모두 귤을 좋아해요. 베란다에는 __FULL__가 쌓여 있어요.',
    },
    {
      blank: '이사를 준비하고 있어요. 아빠가 책을 정리했어요. 거실에는 __BLANK__가 놓여 있어요.',
      full: '이사를 준비하고 있어요. 아빠가 책을 정리했어요. 거실에는 __FULL__가 놓여 있어요.',
    },
    {
      blank: '수학여행 날 아침이에요. 학교 앞에 학생들이 모였어요. 운동장에는 __BLANK__가 기다리고 있어요.',
      full: '수학여행 날 아침이에요. 학교 앞에 학생들이 모였어요. 운동장에는 __FULL__가 기다리고 있어요.',
    },
    {
      blank: '잔치가 있어서 음식을 많이 준비했어요. 손님들이 국수를 좋아해요. 부엌에서는 __BLANK__을 만들고 있어요.',
      full: '잔치가 있어서 음식을 많이 준비했어요. 손님들이 국수를 좋아해요. 부엌에서는 __FULL__을 만들고 있어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '자동차 전시회에 갔어요. 빨간 차가 가장 눈에 띄었어요. 전시장 앞에 __BLANK__가 서 있어요.',
      full: '자동차 전시회에 갔어요. 빨간 차가 가장 눈에 띄었어요. 전시장 앞에 __FULL__가 서 있어요.',
    },
    {
      blank: '컴퓨터실 수업이 시작됐어요. 학생 두 명이 컴퓨터를 써야 해요. 책상 위에 __BLANK__가 있어요.',
      full: '컴퓨터실 수업이 시작됐어요. 학생 두 명이 컴퓨터를 써야 해요. 책상 위에 __FULL__가 있어요.',
    },
    {
      blank: '친구들과 한국 식당에 갔어요. 모두 비빔밥을 먹고 싶어 했어요. 우리는 __BLANK__을 시켰어요.',
      full: '친구들과 한국 식당에 갔어요. 모두 비빔밥을 먹고 싶어 했어요. 우리는 __FULL__을 시켰어요.',
    },
  ];

  const templates = seed.stage === 'remedial' ? remedialTemplates : mainTemplates;
  const template = templates[(seed.order - 1) % templates.length];

  return {
    promptKr: `${starter} ${template.blank.replace('__BLANK__', blankPhrase)}`,
    audioText: `${starter} ${template.full.replace('__FULL__', fullPhrase)}`,
    promptRu: ruHint,
  };
}
function movementLevel2Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '우리 교실은 5층에 있어요. 수업이 끝나서 학생들이 1층으로 ___.',
      full: '우리 교실은 5층에 있어요. 수업이 끝나서 학생들이 1층으로 내려가요.',
    },
    {
      blank: '나는 건물 1층에서 형을 기다려요. 형이 3층에서 계단으로 ___.',
      full: '나는 건물 1층에서 형을 기다려요. 형이 3층에서 계단으로 내려와요.',
    },
    {
      blank: '민수는 길 이쪽에 서 있어요. 학교가 길 건너편에 있어요. 그래서 민수는 횡단보도를 ___.',
      full: '민수는 길 이쪽에 서 있어요. 학교가 길 건너편에 있어요. 그래서 민수는 횡단보도를 건너가요.',
    },
    {
      blank: '나는 다리 이쪽에서 친구를 기다려요. 친구가 반대편에서 다리를 ___.',
      full: '나는 다리 이쪽에서 친구를 기다려요. 친구가 반대편에서 다리를 건너와요.',
    },
    {
      blank: '수업이 끝났어요. 저는 가방을 챙기고 집으로 ___.',
      full: '수업이 끝났어요. 저는 가방을 챙기고 집으로 돌아가요.',
    },
    {
      blank: '아빠는 아침에 회사에 갔어요. 저녁이 되면 우리 집으로 ___.',
      full: '아빠는 아침에 회사에 갔어요. 저녁이 되면 우리 집으로 돌아와요.',
    },
    {
      blank: '우리는 학교 앞 정류장에 서 있어요. 파란 버스가 우리 앞을 천천히 ___.',
      full: '우리는 학교 앞 정류장에 서 있어요. 파란 버스가 우리 앞을 천천히 지나가요.',
    },
    {
      blank: '나는 공원 입구에서 친구를 기다려요. 친구가 큰 나무 옆길을 지나서 나에게 ___.',
      full: '나는 공원 입구에서 친구를 기다려요. 친구가 큰 나무 옆길을 지나서 나에게 지나와요.',
    },
    {
      blank: '산 위 전망대에 사람들이 있어요. 해가 지기 전에 사람들이 아래 주차장으로 ___.',
      full: '산 위 전망대에 사람들이 있어요. 해가 지기 전에 사람들이 아래 주차장으로 내려가요.',
    },
    {
      blank: '나는 계곡 아래에서 동생을 불러요. 동생이 산길을 따라 내 쪽으로 ___.',
      full: '나는 계곡 아래에서 동생을 불러요. 동생이 산길을 따라 내 쪽으로 내려와요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '엘리베이터가 7층에 있어요. 사람들이 1층으로 ___.',
      full: '엘리베이터가 7층에 있어요. 사람들이 1층으로 내려가요.',
    },
    {
      blank: '나는 1층 로비에서 누나를 기다려요. 누나가 4층에서 로비로 ___.',
      full: '나는 1층 로비에서 누나를 기다려요. 누나가 4층에서 로비로 내려와요.',
    },
    {
      blank: '강 이쪽에 배가 있어요. 배가 사람들을 태우고 반대편으로 ___.',
      full: '강 이쪽에 배가 있어요. 배가 사람들을 태우고 반대편으로 건너가요.',
    },
  ];

  const templates = seed.stage === 'remedial' ? remedialTemplates : mainTemplates;
  const template = templates[(seed.order - 1) % templates.length];

  return {
    promptKr: `${starter} ${template.blank}`,
    audioText: `${starter} ${template.full}`,
    promptRu: ruHint,
  };
}
function movementLevel3Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '아이들이 공원에서 강아지를 봤어요. 강아지가 무서워하지 않도록 천천히 걸었어요. 한 아이가 강아지에게 조심히 ___.',
      full: '아이들이 공원에서 강아지를 봤어요. 강아지가 무서워하지 않도록 천천히 걸었어요. 한 아이가 강아지에게 조심히 다가가요.',
    },
    {
      blank: '저는 지하철역에서 기차를 기다려요. 멀리서 기차 불빛이 보여요. 기차가 역으로 점점 ___.',
      full: '저는 지하철역에서 기차를 기다려요. 멀리서 기차 불빛이 보여요. 기차가 역으로 점점 다가와요.',
    },
    {
      blank: '광장에 사람들이 너무 많이 모였어요. 경찰이 길을 열어 달라고 말했어요. 사람들은 천천히 뒤로 ___.',
      full: '광장에 사람들이 너무 많이 모였어요. 경찰이 길을 열어 달라고 말했어요. 사람들은 천천히 뒤로 물러가요.',
    },
    {
      blank: '저는 운동장에서 공을 차고 있어요. 공이 갑자기 친구 쪽으로 날아갔어요. 친구가 놀라서 제 쪽으로 ___.',
      full: '저는 운동장에서 공을 차고 있어요. 공이 갑자기 친구 쪽으로 날아갔어요. 친구가 놀라서 제 쪽으로 물러와요.',
    },
    {
      blank: '친구가 다른 도시로 이사를 가요. 오늘이 우리 학교에서 마지막 날이에요. 수업이 끝나면 친구가 우리 동네를 ___.',
      full: '친구가 다른 도시로 이사를 가요. 오늘이 우리 학교에서 마지막 날이에요. 수업이 끝나면 친구가 우리 동네를 떠나가요.',
    },
    {
      blank: '저는 부산에서 태어났어요. 지금은 서울에서 공부하고 있어요. 대학 때문에 고향을 ___.',
      full: '저는 부산에서 태어났어요. 지금은 서울에서 공부하고 있어요. 대학 때문에 고향을 떠나왔어요.',
    },
    {
      blank: '비가 많이 와서 강물이 불어났어요. 물은 산에서 낮은 곳으로 내려가요. 강물이 바다 쪽으로 ___.',
      full: '비가 많이 와서 강물이 불어났어요. 물은 산에서 낮은 곳으로 내려가요. 강물이 바다 쪽으로 흘러가요.',
    },
    {
      blank: '창문이 조금 열려 있어요. 옆집에서 피아노 소리가 들려요. 부드러운 음악 소리가 제 방으로 ___.',
      full: '창문이 조금 열려 있어요. 옆집에서 피아노 소리가 들려요. 부드러운 음악 소리가 제 방으로 흘러와요.',
    },
    {
      blank: '아이가 길고양이를 처음 봤어요. 고양이가 도망가지 않게 조용히 앉았어요. 아이는 고양이 쪽으로 천천히 ___.',
      full: '아이가 길고양이를 처음 봤어요. 고양이가 도망가지 않게 조용히 앉았어요. 아이는 고양이 쪽으로 천천히 다가가요.',
    },
    {
      blank: '밤에 역 플랫폼이 조용해요. 멀리서 전철 소리가 들려요. 전철이 승강장으로 ___.',
      full: '밤에 역 플랫폼이 조용해요. 멀리서 전철 소리가 들려요. 전철이 승강장으로 다가와요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '동생이 작은 새를 봤어요. 새가 놀라지 않게 조용히 움직였어요. 동생은 새에게 천천히 ___.',
      full: '동생이 작은 새를 봤어요. 새가 놀라지 않게 조용히 움직였어요. 동생은 새에게 천천히 다가가요.',
    },
    {
      blank: '저는 버스 정류장에서 버스를 기다려요. 멀리서 버스가 보여요. 버스가 제 쪽으로 ___.',
      full: '저는 버스 정류장에서 버스를 기다려요. 멀리서 버스가 보여요. 버스가 제 쪽으로 다가와요.',
    },
    {
      blank: '학생들이 무대 앞에 너무 가까이 섰어요. 선생님이 조금 뒤로 가라고 했어요. 학생들은 무대에서 천천히 ___.',
      full: '학생들이 무대 앞에 너무 가까이 섰어요. 선생님이 조금 뒤로 가라고 했어요. 학생들은 무대에서 천천히 물러가요.',
    },
  ];

  const templates = seed.stage === 'remedial' ? remedialTemplates : mainTemplates;
  const template = templates[(seed.order - 1) % templates.length];

  return {
    promptKr: `${starter} ${template.blank}`,
    audioText: `${starter} ${template.full}`,
    promptRu: ruHint,
  };
}
function reasonLevel2Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '아침에 알람을 못 들었어요. ___ 빨리 택시를 타요.',
      full: '아침에 알람을 못 들었어요. 늦었으니까 빨리 택시를 타요.',
    },
    {
      blank: '시간이 거의 없어요. ___ 준비를 빨리 해요, 민규 씨.',
      full: '시간이 거의 없어요. 그러니까 준비를 빨리 해요, 민규 씨.',
    },
    {
      blank: '버스가 늦게 왔어요. ___, 민규 씨, 약속 시간에 조금 늦을 것 같아요.',
      full: '버스가 늦게 왔어요. 그래서요, 민규 씨, 약속 시간에 조금 늦을 것 같아요.',
    },
    {
      blank: '오늘은 날씨가 추워요. 버스 ___ 지하철을 타는 게 좋아요.',
      full: '오늘은 날씨가 추워요. 버스 또는 지하철을 타는 게 좋아요.',
    },
    {
      blank: '지금 숙제를 끝냈어요. ___ 같이 게임해요.',
      full: '지금 숙제를 끝냈어요. 그러면 같이 게임해요.',
    },
    {
      blank: '영화 시간이 다 됐어요. ___ 빨리 출발해요.',
      full: '영화 시간이 다 됐어요. 그럼 빨리 출발해요.',
    },
    {
      blank: '먼저 손을 씻어요. ___ 간식을 먹어요.',
      full: '먼저 손을 씻어요. 그리고 나서 간식을 먹어요.',
    },
    {
      blank: '소풍을 가고 싶어요. ___ 비가 많이 와요.',
      full: '소풍을 가고 싶어요. 그런데 비가 많이 와요.',
    },
    {
      blank: '길이 많이 막혀요. 학교에 ___ 선생님께 전화해요.',
      full: '길이 많이 막혀요. 학교에 늦었으니까 선생님께 전화해요.',
    },
    {
      blank: '오늘 숙제가 많아요. ___ 집에 가서 바로 숙제를 할 거예요.',
      full: '오늘 숙제가 많아요. 그러니까 집에 가서 바로 숙제를 할 거예요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '아침에 버스를 놓쳤어요. 학교에 ___ 빨리 뛰어가요.',
      full: '아침에 버스를 놓쳤어요. 학교에 늦었으니까 빨리 뛰어가요.',
    },
    {
      blank: '비가 많이 와요. ___ 우산을 가져가요.',
      full: '비가 많이 와요. 그러니까 우산을 가져가요.',
    },
    {
      blank: '전화: 선생님, 제가 길을 잘못 들었어요. ___, 죄송하지만 조금 늦게 도착할 것 같아요.',
      full: '전화: 선생님, 제가 길을 잘못 들었어요. 그래서요, 죄송하지만 조금 늦게 도착할 것 같아요.',
    },
  ];

  const templates = seed.stage === 'remedial' ? remedialTemplates : mainTemplates;
  const template = templates[(seed.order - 1) % templates.length];

  return {
    promptKr: `${starter} ${template.blank}`,
    audioText: `${starter} ${template.full}`,
    promptRu: ruHint,
  };
}
function reasonLevel3Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '내일 야외 체험 수업이 있어요. 날씨 예보에서 비가 많이 ___ 선생님이 일정을 바꿨어요. 학생들은 교실에서 수업을 듣게 됐어요.',
      full: '내일 야외 체험 수업이 있어요. 날씨 예보에서 비가 많이 오기 때문에 선생님이 일정을 바꿨어요. 학생들은 교실에서 수업을 듣게 됐어요.',
    },
    {
      blank: '민수는 오늘 체육 시간에 쉬었어요. 친구가 이유를 물었어요. 민수는 “___ 어제 발목을 다쳤기 때문이야.”라고 말했어요.',
      full: '민수는 오늘 체육 시간에 쉬었어요. 친구가 이유를 물었어요. 민수는 “왜냐하면 어제 발목을 다쳤기 때문이야.”라고 말했어요.',
    },
    {
      blank: '학교 도서관에서는 조용히 해야 해요. 다른 학생들도 책을 읽고 있어요. ___ 큰 소리로 말하면 안 돼요.',
      full: '학교 도서관에서는 조용히 해야 해요. 다른 학생들도 책을 읽고 있어요. 그렇기 때문에 큰 소리로 말하면 안 돼요.',
    },
    {
      blank: '지민이는 발표를 시작했어요. 화면을 가리키며 설명했어요. ___ 친구들에게 사진을 보여 줬어요.',
      full: '지민이는 발표를 시작했어요. 화면을 가리키며 설명했어요. 그러면서 친구들에게 사진을 보여 줬어요.',
    },
    {
      blank: '민호는 공원 길을 걷고 있었어요. 갑자기 휴대전화가 울렸어요. ___ 오랜만에 친구 전화를 받았어요.',
      full: '민호는 공원 길을 걷고 있었어요. 갑자기 휴대전화가 울렸어요. 그러다가 오랜만에 친구 전화를 받았어요.',
    },
    {
      blank: '내일 시간이 있어요. 우리는 같이 도서관에 갈 수 있어요. ___ 숙제가 끝나면 나에게 연락해요.',
      full: '내일 시간이 있어요. 우리는 같이 도서관에 갈 수 있어요. 만약 숙제가 끝나면 나에게 연락해요.',
    },
    {
      blank: '주말에 비가 올 수도 있어요. 밖에 나가지 못할 수도 있어요. ___ 날씨가 나쁘면 집에서 영화를 봐요.',
      full: '주말에 비가 올 수도 있어요. 밖에 나가지 못할 수도 있어요. 만약에 날씨가 나쁘면 집에서 영화를 봐요.',
    },
    {
      blank: '네 말이 맞아요. 시간이 정말 부족해요. ___ 오늘은 짧게만 연습해요.',
      full: '네 말이 맞아요. 시간이 정말 부족해요. 그렇다면 오늘은 짧게만 연습해요.',
    },
    {
      blank: '오늘 아침부터 눈이 내려요. 길이 미끄러울 수 있어요. 눈이 많이 ___ 천천히 걸어가야 해요.',
      full: '오늘 아침부터 눈이 내려요. 길이 미끄러울 수 있어요. 눈이 많이 오기 때문에 천천히 걸어가야 해요.',
    },
    {
      blank: '수진이는 약속을 취소했어요. 친구가 이유를 궁금해했어요. 수진이는 “___ 갑자기 가족 일이 생겼기 때문이야.”라고 설명했어요.',
      full: '수진이는 약속을 취소했어요. 친구가 이유를 궁금해했어요. 수진이는 “왜냐하면 갑자기 가족 일이 생겼기 때문이야.”라고 설명했어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '운동장 행사가 있었어요. 오후부터 비가 내리기 시작했어요. 비가 많이 ___ 체육관으로 장소를 바꿨어요.',
      full: '운동장 행사가 있었어요. 오후부터 비가 내리기 시작했어요. 비가 많이 오기 때문에 체육관으로 장소를 바꿨어요.',
    },
    {
      blank: '저는 오늘 일찍 집에 갔어요. 친구가 왜 먼저 갔는지 물었어요. 저는 “___ 머리가 아프기 때문이야.”라고 말했어요.',
      full: '저는 오늘 일찍 집에 갔어요. 친구가 왜 먼저 갔는지 물었어요. 저는 “왜냐하면 머리가 아프기 때문이야.”라고 말했어요.',
    },
    {
      blank: '시험 전에는 복습이 중요해요. 모르는 단어가 아직 많아요. ___ 오늘 저녁에 다시 공부해야 해요.',
      full: '시험 전에는 복습이 중요해요. 모르는 단어가 아직 많아요. 그렇기 때문에 오늘 저녁에 다시 공부해야 해요.',
    },
  ];

  const templates = seed.stage === 'remedial' ? remedialTemplates : mainTemplates;
  const template = templates[(seed.order - 1) % templates.length];

  return {
    promptKr: `${starter} ${template.blank}`,
    audioText: `${starter} ${template.full}`,
    promptRu: ruHint,
  };
}
function honorificLevelContext(
  level: UserLevel,
  coreBlank: string,
  coreFull: string,
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  if (level === 1) {
    const level1Templates = [
      '오늘 기분이 ___. 그래서 친구한테 웃어요.',
      '지금 밥을 ___. 그런데 엄마가 오셔서 기다려요.',
      '한국어를 열심히 ___. 그래서 선생님이 칭찬해요.',
      '저는 ___. 그래서 선생님께 인사해요.',
      '엄마: 친구와 떡볶이를 ___. 아주 맛있을 거야.',
      '한국어를 ___. 한국에 갈 때 매우 편해.',
      '여기 내 ___.',
      '날씨가 ___. 그래서 외출해요.',
      '김치를 ___. 그런데 너무 매워요.',
      '지금 도서관에서 ___. 그런데 수학이 어려워요.',
    ];

    const template = level1Templates[(seed.order - 1) % level1Templates.length];
    const fullAnswer = coreFull.replace(/[.!?。]$/, '').trim();

    return {
      promptKr: `${starter} ${template}`,
      audioText: `${starter} ${template.replace('___', fullAnswer)}`,
      promptRu: ruHint,
    };
  }

  if (level === 2) {
    const level2MainTemplates = [
      '어제 한국어 수업이 있었어요. 집에 와서 새 단어를 다시 봤어요. 그래서 저는 한국어를 ___.',
      '점심시간이에요. 엄마가 전화해서 지금 뭐 하냐고 물었어요. 저는 “지금 밥을 ___.”라고 대답해요.',
      '숙제가 너무 어려워요. 저는 선생님께 공손하게 부탁하고 싶어요. 그래서 “선생님, 저를 ___.”라고 말해요.',
      '할머니께서 차가 많은 길로 가려고 하세요. 저는 걱정돼서 공손하게 말해요. “그쪽으로 ___.”',
      '친구가 전화했어요. 친구가 지금 뭐 하냐고 물었어요. 저는 친구에게 “나 지금 한국어를 ___.”라고 말해요.',
      '수학 문제가 너무 어려워요. 저는 친한 친구에게 부탁하고 싶어요. 그래서 “나 좀 ___.”라고 말해요.',
      '친구가 비 오는 날 밖에 나가려고 해요. 저는 걱정돼서 친구에게 말해요. “지금은 ___.”',
      '어제 도서관에 갔어요. 시험이 가까워서 오래 앉아 있었어요. 그래서 저는 한국어를 많이 ___.',
      '저녁 시간이 되었어요. 아빠가 방에 와서 뭐 하냐고 물었어요. 저는 “지금 밥을 ___.”라고 말해요.',
      '문장이 너무 길어서 이해하기 어려워요. 저는 선생님께 공손하게 부탁해요. “선생님, 이 문장을 ___.”',
    ];

    const level2MainFullAnswers = [
      '공부했어요',
      '먹고 있어요',
      '도와 주세요',
      '가지 마세요',
      '공부하고 있어',
      '도와 줘',
      '가지 마',
      '공부했어요',
      '먹고 있어요',
      '도와 주세요',
    ];

    const level2RemedialTemplates = [
      '어제 한국어 숙제가 있었어요. 저는 밤에 책상에 앉았어요. 그래서 한국어를 ___.',
      '친구가 메시지를 보냈어요. 친구가 지금 뭐 하냐고 물었어요. 저는 “지금 밥을 ___.”라고 대답해요.',
      '문법 문제가 너무 어려워요. 저는 선생님께 예의 있게 부탁해요. “선생님, 저를 ___.”',
    ];

    const level2RemedialFullAnswers = [
      '공부했어요',
      '먹고 있어요',
      '도와 주세요',
    ];

    const templates = seed.stage === 'remedial'
      ? level2RemedialTemplates
      : level2MainTemplates;

    const fullAnswers = seed.stage === 'remedial'
      ? level2RemedialFullAnswers
      : level2MainFullAnswers;

    const idx = (seed.order - 1) % templates.length;
    const template = templates[idx];
    const fullAnswer = fullAnswers[idx];

    return {
      promptKr: `${starter} ${template}`,
      audioText: `${starter} ${template.replace('___', fullAnswer)}`,
      promptRu: ruHint,
    };
  }

  if (level === 3) {
    const level3MainTemplates = [
      '오늘은 한국어 과제가 많아요. 선생님이 제출 기간이 내일까지라고 설명했어요. 저는 오늘 남자친구를 만나야 해요. 그래서 내일 ___.',
      '민수는 도서관 입구에 서 있어요. 안에서는 조용히 공부하는 학생들이 보여요. 민수는 선생님께 허락을 받고 싶어요. 그래서 “선생님, 제가 ___?”라고 물어요.',
      '시험이 끝난 뒤 친구와 선배들이 운동장에 모였어요. 마음이 홀가분해요. 저는 선배와 친구들에게 같이 농구하자고 제안하고 싶어요. 그래서 “우리 농구하러 ___?”라고 말해요.',
      '학생들이 발표 연습을 끝냈어요. 쉬는 시간에 모두 조금 피곤해 보여요. 저는 선배님께 공손하게 음료를 권하고 싶어요. 그래서 “선배님, 음료를 ___?”라고 물어요.',
      '내일은 중요한 시험이 있어. 친구는 아직 준비를 거의 못 했어. 나는 친구가 걱정돼. 그래서 “너 오늘은 꼭 ___”라고 말해.',
      '친구가 우리 집 앞에 도착했어. 나는 방을 정리하고 문을 열었어. 친구가 들어와도 되는지 눈으로 물어봐. 그래서 나는 “응, 이제 ___”라고 말해.',
      '주말에 친구들과 박물관에 가기로 했어. 그런데 아직 출발 시간을 정하지 못했어. 나는 친구에게 가볍게 제안하고 싶어. 그래서 “우리 오후에 ___?”라고 물어볼거야.',
      '친구가 카페 메뉴를 계속 보고 있어. 나는 친구가 무엇을 마시고 싶은지 궁금해. 그래서 친구한테 가서 물어볼꺼예요. “너 오늘 뭐 ___?”',
      '오늘 친구를 만나서 같이 카페에 갔어요. 오랜만에 만나서 이야기를 많이 했어요. 그런데 숙제를 오늘까지 제출해야 해요. 그래서 지금 집에 가서 ___.',
      '미술관 안에는 관람객이 많아요. 입구 직원은 조용히 들어가라고 안내해요. 저는 선생님께 먼저 확인하고 싶어요. 그래서 “선생님, 지금 ___?”라고 여쭤봐요.',
    ];
  
    const level3MainFullAnswers = [
      '숙제해야 해요',
      '들어가도 돼요?',
      '같이 갈까요?',
      '커피 마실래요?',
      '공부해야 해',
      '들어와도 돼',
      '같이 갈까?',
      '커피 마실래?',
      '숙제해야 해요',
      '들어가도 돼요?',
    ];
  
    const level3RemedialTemplates = [
      '내일 한국어 시험이 있어요. 오늘 복습을 하지 않으면 어려울 수 있어요. 저는 선생님 말씀을 기억했어요. 그래서 집에 가면 바로 ___.',
      '교실 문이 열려 있어요. 하지만 수업이 아직 시작되지 않았어요. 저는 예의 있게 허락을 받고 싶어요. 그래서 “선생님, 제가 ___”라고 물어요.',
      '친구들이 점심시간에 식당 앞에 모였어요. 아직 어디로 갈지 결정하지 않았어요. 저는 모두에게 부드럽게 제안하고 싶어요. 그래서 “우리 같이 ___”라고 말해요.',
    ];
  
    const level3RemedialFullAnswers = [
      '숙제해야 해요',
      '들어가도 돼요?',
      '갈까요?',
    ];
  
    const templates = seed.stage === 'remedial'
      ? level3RemedialTemplates
      : level3MainTemplates;
  
    const fullAnswers = seed.stage === 'remedial'
      ? level3RemedialFullAnswers
      : level3MainFullAnswers;
  
    const idx = (seed.order - 1) % templates.length;
    const template = templates[idx];
    const fullAnswer = fullAnswers[idx];
  
    return {
      promptKr: `${starter} ${template}`,
      audioText: `${starter} ${template.replace('___', fullAnswer)}`,
      promptRu: ruHint,
    };
  }
  return levelContext(level, coreBlank, coreFull, ruHint, seed);
}
function questionType(order: number, category: GrammarCategory): QuestionType {
  if (category === 'counters') {
    if (order <= 4) return 'multiple';
    if (order <= 8) return 'short';
    return 'wordArrange';
  }
  return order <= 5 ? 'multiple' : 'short';
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function nextSeed(seed: number): number {
  return Math.imul(seed, 1664525) + 1013904223 >>> 0;
}

function shuffleBySeed<T>(values: T[], seedKey: string): T[] {
  const shuffled = [...values];
  let seed = hashSeed(seedKey);
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = nextSeed(seed);
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function choicesFrom(target: string, pool: string[], seedKey = target): Choice[] {
  const unique = Array.from(new Set([target, ...pool.filter(v => v !== target)])).slice(0, 4);
  return shuffleBySeed(unique, seedKey).map((text, idx) => ({ id: String.fromCharCode(97 + idx), text }));
}

function choicesFromSurface(target: string, pool: string[], seedKey = target): Choice[] {
  const normalizedTarget = normalizeAnswer(target);
  const unique = Array.from(
    new Set([
      normalizedTarget,
      ...pool.map(normalizeAnswer).filter(v => v && v !== normalizedTarget),
    ])
  ).slice(0, 4);
  return shuffleBySeed(unique, seedKey).map((text, idx) => ({ id: String.fromCharCode(97 + idx), text }));
}

function accepted(target: string): string[] {
  const noDash = target.replace(/^-/, '');
  const noQuestion = target.replace(/\?$/, '');
  return Array.from(new Set([target, noDash, noQuestion, noDash.replace(/\?$/, '')]));
}

function acceptedSurface(answer: string): string[] {
  const normalized = normalizeAnswer(answer);
  return Array.from(new Set([normalized, `${normalized}.`, `${normalized}?`]));
}

function trimQuestionContext<T extends { promptKr: string; audioText: string }>(context: T): T {
  return {
    ...context,
    promptKr: context.promptKr.trim(),
    audioText: context.audioText.trim(),
  };
}

function normalizeAnswer(answer: string): string {
  return answer.trim().replace(/[.!?。]$/, '');
}

function getBlankAnswer(exampleKr: string, blankKr: string): string {
  const blankIndex = blankKr.indexOf('___');
  if (blankIndex === -1) return normalizeAnswer(exampleKr);

  const prefix = blankKr.slice(0, blankIndex);
  const suffix = blankKr.slice(blankIndex + 3);
  if (exampleKr.startsWith(prefix) && exampleKr.endsWith(suffix)) {
    return normalizeAnswer(exampleKr.slice(prefix.length, exampleKr.length - suffix.length));
  }

  return normalizeAnswer(exampleKr);
}

function makeBlankPart(target: string, exampleKr: string): { prompt: string; answer: string } {
  const prompt = makeBlankSentence(target, exampleKr);
  return {
    prompt,
    answer: getBlankAnswer(exampleKr, prompt),
  };
}

function hasBatchim(text: string): boolean {
  const chars = Array.from(text.trim()).reverse();
  const lastHangul = chars.find(ch => /[가-힣]/.test(ch));
  if (!lastHangul) return false;
  return (lastHangul.charCodeAt(0) - 0xac00) % 28 !== 0;
}

function conjugateYo(target: string): string {
  const stem = target.replace(/다$/, '');
  if (stem.endsWith('하')) return `${stem.slice(0, -1)}해요`;
  if (stem.endsWith('오')) return `${stem.slice(0, -1)}와요`;
  return `${stem}요`;
}

function conjugateHonorificYo(target: string): string {
  const stem = target.replace(/다$/, '');
  if (stem.endsWith('하')) return `${stem.slice(0, -1)}하세요`;
  if (stem.endsWith('오')) return `${stem.slice(0, -1)}오세요`;
  return `${stem}세요`;
}

function conjugateFormal(target: string): string {
  const stem = target.replace(/다$/, '');
  if (stem.endsWith('하')) return `${stem.slice(0, -1)}합니다`;
  if (stem.endsWith('오')) return `${stem.slice(0, -1)}옵니다`;
  if (stem.endsWith('가')) return `${stem.slice(0, -1)}갑니다`;
  return `${stem}습니다`;
}

function movementSurface(target: string, correctAnswer: string): string {
  if (correctAnswer.endsWith('세요')) return conjugateHonorificYo(target);
  if (correctAnswer.endsWith('습니다') || correctAnswer.endsWith('합니다')) {
    return conjugateFormal(target);
  }
  return conjugateYo(target);
}

function reasonStemFromAnswer(answer: string): string {
  const normalized = normalizeAnswer(answer);
  if (normalized.endsWith('기 때문에')) return normalized.slice(0, -'기 때문에'.length);
  if (normalized.endsWith('느라고')) return normalized.slice(0, -'느라고'.length);
  if (normalized.endsWith('으니까')) return normalized.slice(0, -'으니까'.length);
  if (normalized.endsWith('니까')) return normalized.slice(0, -'니까'.length);
  if (normalized.endsWith('해서')) return `${normalized.slice(0, -'해서'.length)}하`;
  if (normalized.endsWith('아서')) return normalized.slice(0, -'아서'.length);
  if (normalized.endsWith('어서')) return normalized.slice(0, -'어서'.length);
  return normalized.replace(/(지만|으면|면|고)$/, '');
}

function reasonEndingSurface(target: string, stem: string): string {
  if (target === '-해서') {
    return stem.endsWith('하') ? `${stem.slice(0, -1)}해서` : `${stem}해서`;
  }
  if (target === '-아서/어서') {
    if (stem.endsWith('하')) return `${stem.slice(0, -1)}해서`;
    if (stem.endsWith('오')) return `${stem.slice(0, -1)}와서`;
    if (stem.endsWith('가')) return `${stem}서`;
    return `${stem}${hasBatchim(stem) ? '어서' : '아서'}`;
  }
  if (target === '-니까') return `${stem}${hasBatchim(stem) ? '으니까' : '니까'}`;
  if (target === '-기 때문에') return `${stem}기 때문에`;
  if (target === '-느라고') return `${stem}느라고`;
  if (target === '-지만') return `${stem}지만`;
  if (target === '-으면') return `${stem}${hasBatchim(stem) ? '으면' : '면'}`;
  if (target === '-고') return `${stem}고`;
  return `${stem}${target.replace(/^-/, '')}`;
}

function reasonChoiceTexts(item: TargetItem, pool: TargetItem[], correctAnswer: string): string[] {
  if (!item.target.startsWith('-')) {
    return pool.filter(v => !v.target.startsWith('-')).map(v => v.target);
  }

  const stem = reasonStemFromAnswer(correctAnswer);
  const endings = [
    item.target,
    '-아서/어서',
    '-니까',
    '-지만',
    '-으면',
    '-고',
    '-기 때문에',
    '-느라고',
  ];
  return endings.map(target => reasonEndingSurface(target, stem));
}

function honorificSurface(item: TargetItem): string {
  return makeBlankPart(item.target, item.exampleKr).answer;
}

function toCasualSurface(text: string): string {
  const normalized = normalizeAnswer(text);
  if (normalized.endsWith('주세요')) return normalized.replace(/주세요$/, '줘');
  if (normalized.endsWith('마세요')) return normalized.replace(/마세요$/, '마');
  if (normalized.endsWith('이에요')) return normalized.replace(/이에요$/, '이야');
  if (normalized.endsWith('예요')) return normalized.replace(/예요$/, '야');
  if (normalized.endsWith('돼요')) return normalized.replace(/돼요$/, '돼');
  if (normalized.endsWith('까요')) return normalized.replace(/까요$/, '까');
  if (normalized.endsWith('래요')) return normalized.replace(/래요$/, '래');
  if (normalized.endsWith('해요')) return normalized.replace(/해요$/, '해');
  if (normalized.endsWith('어요')) return normalized.replace(/어요$/, '어');
  if (normalized.endsWith('아요')) return normalized.replace(/아요$/, '아');
  if (normalized.endsWith('요')) return normalized.slice(0, -1);
  return normalized;
}

function honorificVariantChoices(correctAnswer: string): string[] {
  const answer = normalizeAnswer(correctAnswer);

  if (answer === '좋아요') return [answer, '좋겠어요', '좋았어요', '좋네요'];
  if (answer === '먹어요') return [answer, '먹었어요', '먹고 있어요', '먹겠어요'];
  if (answer === '공부해요') return [answer, '공부했어요', '공부하고 있어요', '공부하겠어요'];
  if (answer === '학생이에요') return [answer, '학생이었어요', '학생일 거예요', '학생인가요'];
  if (answer === '먹어') return [answer, '먹었어', '먹고 있어', '먹을래'];

  if (answer.endsWith('했어요')) {
    const stem = answer.slice(0, -'했어요'.length);
    return [answer, `${stem}하셨어요`, `${stem}하고 있었어요`, `${stem}해야 해요`];
  }
  if (answer.endsWith('고 있어요')) {
    const stem = answer.slice(0, -'고 있어요'.length);
    return [answer, `${stem}고 있었어요`, `${stem}겠어요`, `${stem}어야 해요`];
  }
  if (answer.endsWith('주세요')) {
    const stem = answer.slice(0, -'주세요'.length).trimEnd();
    return [answer, `${stem} 주시겠어요`, `${stem} 주셔야 해요`, `${stem} 주실래요`];
  }
  if (answer.endsWith('마세요')) {
    const stem = answer.slice(0, -'마세요'.length).trimEnd();
    return [answer, `${stem} 않으세요`, `${stem} 못 해요`, `${stem} 않을래요`];
  }
  if (answer.endsWith('하고 있어')) {
    const stem = answer.slice(0, -'하고 있어'.length);
    return [answer, `${stem}했어`, `${stem}해야 해`, `${stem}할래`];
  }

  if (answer === '숙제해야 해요') return [answer, '숙제해도 돼요', '숙제할래요', '숙제하겠어요'];
  if (answer === '들어가도 돼요') return [answer, '들어가야 해요', '들어갈래요', '들어가겠어요'];
  if (answer === '갈까요') return [answer, '갈래요', '가겠어요', '가요'];
  if (answer === '같이 갈까요') return [answer, '같이 가요', '같이 갈래요', '같이 가겠어요'];
  if (answer === '마실래요') return [answer, '마셔요', '마실까요', '마시겠어요'];
  if (answer === '커피 마실래요') return [answer, '커피 마셔요', '커피 마실까요', '커피 마시겠어요'];
  if (answer === '공부해야 해') return [answer, '공부해도 돼', '공부할래', '공부하겠어'];

  if (answer === '공부해') return [answer, '공부했어', '공부하고 있어', '공부해야 해'];
  if (answer === '친구야') return [answer, '여기 내 친구', '여기 내 친구야', '내 친구야', '내 친구'];

  return [answer];
}

function honorificChoiceTexts(level: UserLevel, pool: TargetItem[], correctAnswer: string): string[] {
  const surfaces = pool.map(honorificSurface);
  if (level <= 3) {
    return honorificVariantChoices(correctAnswer);
  }
  if (level <= 3 && !correctAnswer.endsWith('요')) {
    return [
      ...surfaces.filter(surface => !surface.endsWith('요')),
      ...surfaces.map(toCasualSurface).filter(surface => !surface.endsWith('요')),
    ];
  }
  if (level <= 3 && correctAnswer.endsWith('요')) {
    return surfaces.filter(surface => surface.endsWith('요'));
  }
  return surfaces;
}

function targetChoiceTexts(
  category: Exclude<GrammarCategory, 'counters'>,
  level: UserLevel,
  item: TargetItem,
  pool: TargetItem[],
  correctAnswer: string
): string[] {
  if (category === 'movement') {
    return pool.map(candidate => movementSurface(candidate.target, correctAnswer));
  }
  if (category === 'reasons') {
    return reasonChoiceTexts(item, pool, correctAnswer);
  }
  return honorificChoiceTexts(level, pool, correctAnswer);
}

// ── Blank sentence builder ───────────────────────────────────────────────────
function makeBlankSentence(target: string, exampleKr: string): string {
  // ── helpers ──
  const isKor = (ch: string) => /[가-힣]/.test(ch);
  const wStart = (s: string, i: number) => { while (i > 0 && isKor(s[i - 1])) i--; return i; };
  const wEnd   = (s: string, i: number) => { while (i < s.length && isKor(s[i])) i++; return i; };
  const applyBlank = (s: string, st: number, en: number) => s.slice(0, st) + '___' + s.slice(en);

  const isEnding = target.startsWith('-');

  // Extract meaningful search variants from target
  // e.g. "-아서/어서" → ["아서","어서"]  "-(으)ㄹ까요?" → ["ㄹ까요","까요"]  "가다" → ["가다"]
  const cleanVariants = target
    .replace(/\?$/, '')                 // drop trailing ?
    .split('/')
    .map(v =>
      v
        .replace(/^-/, '')              // leading dash
        .replace(/\(으\)/g, '')         // (으) optional
        .replace(/\([^)]*\)/g, '')      // any other parenthetical
        .trim()
    )
    .filter(v => v.length > 0);

  if (target.includes('어야 해요')) {
    cleanVariants.unshift('해야 해요', '아야 해요', '어야 해요');
  } else if (target.includes('어야 해')) {
    cleanVariants.unshift('해야 해', '아야 해', '어야 해');
  }

  // ════════════════════════════════════════════════════════════════
  // CASE 1 — GRAMMATICAL ENDINGS  (target starts with -)
  // Strategy: scan space-separated tokens; find one whose clean form
  // ends with any variant (progressive shorter suffix as fallback).
  // Then fall back to plain indexOf for multi-word endings.
  // ════════════════════════════════════════════════════════════════
  if (isEnding) {
    const tokens = exampleKr.split(' ');

    // 1-a: indexOf the full variant first (handles "-고 있어요", "-기 때문에")
    for (const v of cleanVariants.sort((a, b) => b.length - a.length)) {
      const idx = exampleKr.indexOf(v);
      if (idx !== -1) {
        const start = wStart(exampleKr, idx);
        const end   = wEnd(exampleKr, idx + v.length);
        return applyBlank(exampleKr, start, end);
      }
    }

    // 1-b: longest-first suffix match across all variants
    const maxLen = Math.max(...cleanVariants.map(v => v.length));
    for (let sLen = maxLen; sLen >= 1; sLen--) {
      for (const v of cleanVariants) {
        if (v.length < sLen) continue;
        const suffix = v.slice(-sLen);
        for (let i = 0; i < tokens.length; i++) {
          const tk = tokens[i];
          const tkClean = tk.replace(/[.!?,。]/g, '');
          // token must be longer than suffix so some stem is visible
          if (tkClean.length > sLen && tkClean.endsWith(suffix)) {
            const punct = tk.slice(tkClean.length);
            const result = [...tokens];
            if (v.includes(' ') && i > 0) {
              result.splice(i - 1, 2, '___' + punct);
              return result.join(' ');
            }
            result[i] = '___' + punct;
            return result.join(' ');
          }
        }
      }
    }
  }

  // ════════════════════════════════════════════════════════════════
  // CASE 2 — VERB / ADJECTIVE  (first variant ends in 다)
  // Strategy: build a list of surface-form candidates that account
  // for the most common Korean conjugation irregularities, then pick
  // the first one found in the sentence and replace the whole word.
  // ════════════════════════════════════════════════════════════════
  const isVerb = cleanVariants[0]?.endsWith('다') ?? false;
  if (isVerb) {
    const dictForm = cleanVariants[0];
    const stem = dictForm.slice(0, -1);   // remove 다

    const candidates: string[] = [stem];

    // 오 → 와 / 왔  (오다 irregular: 오다→와요, 왔어요)
    if (stem.endsWith('오')) {
      const pre = stem.slice(0, -1);
      candidates.push(pre + '와', pre + '왔');
    }

    // 하 → 합  (하다 + formal -ㅂ니다: 이동합니다)
    // 하 → 해  (하다 + informal -아요: 이동해요)
    if (stem.endsWith('하')) {
      const pre = stem.slice(0, -1);
      candidates.push(pre + '합', pre + '해');
    }

    // 르 → ㄹ라 / ㄹ러  (르 irregular: 모르다→몰라, 부르다→불러)
    if (stem.endsWith('르')) {
      const pre = stem.slice(0, -1);
      candidates.push(pre + '라', pre + '러');
    }

    for (const form of candidates) {
      if (!form) continue;
      const idx = exampleKr.indexOf(form);
      if (idx !== -1) {
        const start = wStart(exampleKr, idx);
        const end   = wEnd(exampleKr, idx + form.length);
        return applyBlank(exampleKr, start, end);
      }
    }
  }

  // ════════════════════════════════════════════════════════════════
  // CASE 3 — STANDALONE CONJUNCTION / EXPRESSION
  // Direct indexOf; extend to word boundaries.
  // ════════════════════════════════════════════════════════════════
  if (!isEnding && !isVerb) {
    for (const v of cleanVariants) {
      if (!v) continue;
      const idx = exampleKr.indexOf(v);
      if (idx !== -1) {
        const start = wStart(exampleKr, idx);
        const end   = wEnd(exampleKr, idx + v.length);
        return applyBlank(exampleKr, start, end);
      }
    }
  }

  // ════════════════════════════════════════════════════════════════
  // FALLBACK — strip trailing punctuation, append ___
  // (should almost never be reached with the above logic)
  // ════════════════════════════════════════════════════════════════
  return exampleKr.replace(/[.!?]$/, '') + ' ___.';
}

// ── Instruction text (Russian) per question type ──────────────────────────────
function getInstructionRu(type: QuestionType, category: GrammarCategory): string {
  if (type === 'wordArrange') return 'Расставьте слова в правильном порядке.';
  const base: Record<GrammarCategory, string> = {
    counters: 'счётное слово',
    movement: 'глагол движения',
    reasons: 'союз / причинный оборот',
    honorifics: 'грамматическое окончание',
  };
  return type === 'short'
    ? `Введите ${base[category]}.`
    : `Выберите ${base[category]}.`;
}
function generateCounterLevel3Explanation(
  order: number,
  stage: 'main' | 'remedial',
  item: CounterItem,
  fullPhrase: string
): string {
  const answer = `**Ответ: ${item.unit}**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В этом вопросе речь идёт об автомобиле.\n` +
      `Для машин, техники и транспорта в корейском языке часто используют счётное слово «대».\n` +
      `Поэтому «자동차 한 대» значит “одна машина”.`,

    'main-2':
      `Здесь нужно посчитать компьютеры.\n` +
      `Компьютер — это техника, поэтому подходит счётное слово «대».\n` +
      `«컴퓨터 두 대» значит “два компьютера”.`,

    'main-3':
      `В этом вопросе люди заказывают пибимпап.\n` +
      `Еду в миске или порцию в посуде считают словом «그릇».\n` +
      `«비빔밥 세 그릇» значит “три миски пибимпапа”.`,

    'main-4':
      `Здесь мама готовит рамен.\n` +
      `Когда еда находится в миске, используют счётное слово «그릇».\n` +
      `«라면 네 그릇» значит “четыре миски рамена”.`,

    'main-5':
      `В этом вопросе считают кимчи в контейнерах.\n` +
      `Для контейнеров, банок или больших ёмкостей используют «통».\n` +
      `«김치 다섯 통» значит “пять контейнеров кимчи”.`,

    'main-6':
      `Здесь речь идёт о больших ёмкостях с водой.\n` +
      `Для таких контейнеров тоже подходит счётное слово «통».\n` +
      `«물통 여섯 통» значит “шесть канистр воды”.`,

    'main-7':
      `В этом вопросе считают коробки с мандаринами.\n` +
      `Для коробок используют счётное слово «상자».\n` +
      `«귤 일곱 상자» значит “семь коробок мандаринов”.`,

    'main-8':
      `Здесь книги лежат в коробках во время переезда.\n` +
      `Когда предметы упакованы в коробки, используют «상자».\n` +
      `«책 여덟 상자» значит “восемь коробок книг”.`,

    'main-9':
      `В этом вопросе считают автобусы.\n` +
      `Автобус — это транспорт, поэтому используется счётное слово «대».\n` +
      `«버스 아홉 대» значит “девять автобусов”.`,

    'main-10':
      `Здесь готовят порции лапши.\n` +
      `Еду в миске считают словом «그릇».\n` +
      `«국수 열 그릇» значит “десять мисок лапши”.`,

    'remedial-1':
      `Это дополнительный вопрос про транспорт.\n` +
      `Автомобиль считают с помощью «대».\n` +
      `«자동차 한 대» значит “одна машина”.`,

    'remedial-2':
      `Это дополнительный вопрос про технику.\n` +
      `Компьютеры считают словом «대».\n` +
      `«컴퓨터 두 대» значит “два компьютера”.`,

    'remedial-3':
      `Это дополнительный вопрос про еду в миске.\n` +
      `Для пибимпапа в мисках подходит «그릇».\n` +
      `«비빔밥 세 그릇» значит “три миски пибимпапа”.`,
  };

  return (
    `${answer} — ${item.unitMeaning}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать правильное счётное слово.\n` +
      `Посмотри, что именно считают: транспорт, еду, коробки или контейнеры.\n` +
      `В корейском языке счётное слово зависит от типа предмета.`) +
    `\nПолное выражение: **${fullPhrase}**`
  );
}
function makeCounterQuestion(level: UserLevel, order: number, stage: 'main' | 'remedial'): Question {
  const item = counterBank[level][(order - 1) % counterBank[level].length];
  const num = NUMBERS[(order - 1) % NUMBERS.length];
  const type = stage === 'remedial' ? (order === 1 ? 'multiple' : order === 2 ? 'short' : 'wordArrange') : questionType(order, 'counters');
  const fullPhrase = `${item.item} ${num} ${item.unit}`;
  const blankPhrase = `${item.item} ${num} ___`;
  const ruHint = `Слово «${item.meaning}»: выберите или впишите правильное счётное слово.`;
  const contextSeed: QuestionContextSeed = {
    category: 'counters',
    level,
    order,
    stage,
  };
  
  const context = trimQuestionContext(
    level === 2
      ? counterLevel2Context(blankPhrase, fullPhrase, ruHint, contextSeed)
      : level === 3
      ? counterLevel3Context(blankPhrase, fullPhrase, ruHint, contextSeed)
      : levelContext(level, blankPhrase, fullPhrase, ruHint, contextSeed)
  );

  // Build comprehensive counter reference table from all levels
  const seenUnits = new Set<string>();
  const allCounterData: { unit: string; unitMeaning: string; example: string }[] = [];
  LEVELS.forEach(lv => {
    counterBank[lv].forEach(c => {
      if (!seenUnits.has(c.unit)) {
        seenUnits.add(c.unit);
        allCounterData.push({ unit: c.unit, unitMeaning: c.unitMeaning, example: c.item });
      }
    });
  });

  const counterTableRows = allCounterData
    .map(c =>
      c.unit === item.unit
        ? `| **✓ ${c.unit}** | ${c.unitMeaning} | ${c.example} |`
        : `| ${c.unit} | ${c.unitMeaning} | ${c.example} |`
    )
    .join('\n');

    const commonCounterExplanationRu =
    `**Ответ: ${item.unit}** — ${item.unitMeaning}\n\n` +
    `«${item.unit}» — счётное слово для подсчёта «${item.meaning}» (кор. ${item.item}). ` +
    `В корейском языке тип счётного слова определяется категорией предмета: его формой, назначением и одушевлённостью. ` +
    `Счётные слова необходимо запоминать вместе с теми существительными, к которым они относятся.\n` +
    `Полное выражение: **${fullPhrase}**\n\n` +
    `Основные счётные слова (✓ = правильный ответ в этом вопросе):\n` +
    `| Счётное слово | Область применения | Пример |\n` +
    `|---|---|---|\n` +
    counterTableRows;
  
  const explanationRu =
    level === 3
      ? generateCounterLevel3Explanation(order, stage, item, fullPhrase)
      : commonCounterExplanationRu;

  if (type === 'wordArrange') {
    return {
      id: `cnt-L${level}-${stage === 'main' ? 'M' : 'R'}${order}`,
      category: 'counters',
      userLevel: level,
      stage,
      type,
      order,
      promptKr: context.promptKr,
      promptRu: ruHint,
      audioText: context.audioText,
      wordItems: [item.item, num, item.unit],
      correctAnswer: fullPhrase,
      acceptedAnswers: [fullPhrase, `${fullPhrase}.`],
      instructionRu: getInstructionRu(type, 'counters'),
      explanationRu,
      exampleKr: `${item.item} ${num} ${item.unit}`,
      exampleRu: `${item.meaning}: ${item.unit}`,
    };
  }

  return {
    id: `cnt-L${level}-${stage === 'main' ? 'M' : 'R'}${order}`,
    category: 'counters',
    userLevel: level,
    stage,
    type,
    order,
    promptKr: context.promptKr,
    promptRu: context.promptRu,
    audioText: context.audioText,
    choices: type === 'multiple' ? choicesFrom(item.unit, counterBank[level].map(v => v.unit), `counters-${level}-${stage}-${order}`) : undefined,
    correctAnswer: item.unit,
    acceptedAnswers: [item.unit],
    instructionRu: getInstructionRu(type, 'counters'),
    explanationRu,
    exampleKr: fullPhrase,
    exampleRu: `${item.meaning}: ${item.unit}`,
  };
}
function generateHonorificLevel1Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В предложении говорится о настроении: «오늘 기분이 ___». Здесь подходит «좋아요», потому что настроение хорошее.\n` +
      `«좋아요» — это вежливая форма. Её можно сказать учителю, взрослому человеку или новому знакомому.\n` +
      `Если сказать «좋아», это будет 반말. Так обычно говорят только близкому другу.`,

    'main-2':
      `В предложении есть «밥을», значит речь идёт о еде. Поэтому подходит глагол «먹어요».\n` +
      `«먹어요» — это вежливая форма глагола «먹다», то есть «есть».\n` +
      `Так можно говорить с мамой, учителем или взрослым человеком.`,

    'main-3':
      `В предложении есть «한국어를 열심히 ___». Здесь нужно сказать, что человек учит корейский язык.\n` +
      `Правильная форма — «공부해요». Это вежливая форма от «공부하다».\n` +
      `Такой ответ звучит аккуратно и подходит для разговора с учителем.`,

    'main-4':
      `В предложении человек говорит о себе: «저는 ___». После существительного нужна форма «이에요/예요».\n` +
      `«학생이에요» значит «я ученик/студент» в вежливой форме.\n` +
      `С учителем лучше говорить вежливо, поэтому «학생이에요» подходит лучше, чем «학생이야».`,

    'main-5':
      `В предложении мама говорит близкому человеку. Поэтому можно использовать простую разговорную форму.\n` +
      `«먹어» — это 반말, то есть форма для близких людей, друзей или младших.\n` +
      `Если нужно говорить вежливо, лучше сказать «먹어요», но в домашнем разговоре «먹어» звучит естественно.`,

    'main-6':
      `В предложении дают совет: «한국어를 ___». Здесь подходит «공부해».\n` +
      `«공부해» — это разговорная форма от «공부하다».\n` +
      `Так можно сказать другу. С учителем или взрослым человеком лучше сказать «공부해요».`,

    'main-7':
      `В предложении говорится о 선생님, то есть об учителе. Учителя обычно нужно уважительно называть и описывать.\n` +
      `Если ответ «오세요», в нём есть уважительная часть «시». Она показывает уважение к учителю.\n` +
      `Поэтому для учителя лучше использовать вежливую или уважительную форму, а не простую 반말.`,

    'main-8':
      `В предложении говорится о дожде: «비가 많이 ___». В корейском говорят «비가 와요» — «идёт дождь».\n` +
      `«와요» — это вежливая форма от «오다».\n` +
      `Форма с «요» звучит мягко и подходит для обычного вежливого разговора.`,

    'main-9':
      `В предложении есть «김치를», значит человек ест кимчи. Поэтому нужен глагол еды.\n` +
      `«먹어요» — это вежливая форма: «김치를 먹어요» значит «ем кимчи».\n` +
      `Эта форма подходит, если мы говорим спокойно и вежливо.`,

    'main-10':
      `В предложении говорится, что человек сейчас учится в библиотеке. Нужно показать действие, которое происходит сейчас.\n` +
      `Если ответ «있어요», вся форма звучит как «공부하고 있어요» — «сейчас учусь».\n` +
      `«있어요» здесь помогает сделать форму настоящего продолженного действия вежливой.`,

    'remedial-1':
      `Это дополнительный вопрос про простую вежливую форму. В предложении нужно выбрать мягкий и уважительный ответ.\n` +
      `«좋아요» подходит, когда мы говорим, что настроение, вещь или ситуация хорошие.\n` +
      `Эту форму легко использовать с учителем, взрослым человеком или новым знакомым.`,

    'remedial-2':
      `Это дополнительный вопрос про действие «есть». Если в предложении есть «밥을», нужен глагол еды.\n` +
      `«먹어요» — это вежливая форма глагола «먹다».\n` +
      `Если сказать «먹어», это будет проще и ближе, но не всегда подходит для вежливой ситуации.`,

    'remedial-3':
      `Это дополнительный вопрос про глагол «учиться». В предложении с «한국어를» нужен ответ «공부해요».\n` +
      `«공부해요» образуется от «공부하다» и звучит вежливо.\n` +
      `Так можно сказать в классе или в разговоре с учителем.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать форму речи, которая подходит к ситуации.\n` +
      `С учителем, взрослым человеком или незнакомым человеком обычно используют 존댓말.\n` +
      `С близким другом или младшим человеком можно использовать 반말, но важно смотреть на контекст.`)
  );
}
function generateHonorificLevel2Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В вопросе говорится: вчера был урок корейского, и ученик снова смотрел новые слова.\n` +
      `Слово «어제» показывает, что действие уже было в прошлом.\n` +
      `Поэтому нужен ответ «공부했어요» — вежливая форма прошедшего времени: “учился / учила”.`,

    'main-2':
      `Мама звонит и спрашивает, что человек делает прямо сейчас.\n` +
      `В ответе есть «지금 밥을», значит человек сейчас ест.\n` +
      `Поэтому подходит «먹고 있어요»: это вежливая форма “сейчас ем”.`,

    'main-3':
      `Здесь ученик говорит с учителем и просит о помощи.\n` +
      `С учителем нужно говорить мягко и вежливо.\n` +
      `Поэтому правильный ответ — «도와 주세요», то есть “помогите, пожалуйста”.`,

    'main-4':
      `Бабушка хочет пойти туда, где много машин.\n` +
      `Говорящий волнуется и вежливо просит её не идти.\n` +
      `«가지 마세요» — это вежливый запрет: “пожалуйста, не ходите”.`,

    'main-5':
      `Здесь человек разговаривает с близким другом по телефону.\n` +
      `Он говорит другу, что сейчас учит корейский язык.\n` +
      `Поэтому подходит «공부하고 있어»: это разговорная форма “сейчас учусь”.`,

    'main-6':
      `В этой ситуации математика трудная, и человек просит близкого друга помочь.\n` +
      `С другом можно говорить просто, без «요».\n` +
      `Поэтому подходит «도와 줘»: это 반말, то есть дружеская просьба “помоги”.`,

    'main-7':
      `Друг хочет выйти на улицу, но идёт дождь.\n` +
      `Говорящий переживает и говорит другу не идти.\n` +
      `«가지 마» — это короткая разговорная форма запрета: “не иди”.`,

    'main-8':
      `В вопросе говорится, что вчера человек был в библиотеке.\n` +
      `Он долго сидел и много учил корейский, поэтому действие уже произошло.\n` +
      `Правильный ответ — «공부했어요», вежливая форма прошедшего времени.`,

    'main-9':
      `Папа спрашивает, что человек делает сейчас.\n` +
      `Ответ связан с едой: «지금 밥을 ...».\n` +
      `Поэтому нужно сказать «먹고 있어요» — “сейчас ем” в вежливой форме.`,

    'main-10':
      `Ученик не понимает длинное предложение и просит учителя помочь.\n` +
      `С учителем нужно использовать вежливую просьбу.\n` +
      `Поэтому подходит «도와 주세요»: “помогите, пожалуйста”.`,

    'remedial-1':
      `Это дополнительный вопрос про прошлое действие.\n` +
      `Слово «어제» показывает, что действие было вчера.\n` +
      `Поэтому нужен ответ «공부했어요» — “учился / учила” в вежливой форме.`,

    'remedial-2':
      `Друг спрашивает, что человек делает сейчас.\n` +
      `В предложении есть «지금 밥을», значит человек сейчас ест.\n` +
      `Поэтому правильный ответ — «먹고 있어요»: “сейчас ем” вежливо.`,

    'remedial-3':
      `Человек просит учителя помочь с трудной грамматикой.\n` +
      `Когда мы просим учителя или взрослого, нужно говорить вежливо.\n` +
      `Поэтому подходит «도와 주세요» — мягкая просьба “помогите, пожалуйста”.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать форму речи по ситуации.\n` +
      `С учителем или взрослым человеком обычно говорят вежливо.\n` +
      `С близким другом можно говорить проще, без окончания «요».`)
  );
}
function generateHonorificLevel3Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В этом вопросе ученик говорит о том, что у него есть корейское задание.\n` +
      `Он не сделал его сейчас, но понимает, что это нужно сделать.\n` +
      `Поэтому подходит «숙제해야 해요» — вежливая форма “нужно сделать домашнее задание”.`,

    'main-2':
      `Минсу стоит у входа в библиотеку и спрашивает разрешение у учителя.\n` +
      `Когда мы спрашиваем учителя, нужно говорить вежливо.\n` +
      `«들어가도 돼요?» значит “можно войти?” и подходит для вежливого вопроса.`,

    'main-3':
      `Здесь говорящий предлагает друзьям и старшим вместе пойти играть в баскетбол.\n` +
      `Так как среди людей есть старшие, лучше говорить мягко и вежливо.\n` +
      `«갈까요?» значит “пойдём вместе?” и звучит как вежливое предложение.`,

    'main-4':
      `Говорящий обращается к 선배님, то есть к старшему человеку.\n` +
      `Он хочет вежливо спросить, хочет ли старший выпить напиток.\n` +
      `«마실래요?» — это вежливый вопрос о желании: “хотите выпить кофе?”`,

    'main-5':
      `Здесь человек говорит с близким другом.\n` +
      `Он переживает, потому что завтра важный экзамен, и говорит другу, что нужно учиться.\n` +
      `«공부해야 해» — разговорная форма “тебе нужно учиться”, её можно сказать другу.`,

    'main-6':
      `Друг пришёл к дому говорящего, и говорящий разрешает ему войти.\n` +
      `Так как это близкий друг, можно использовать простую разговорную форму.\n` +
      `«들어와도 돼» значит “можешь войти” и звучит естественно в разговоре с другом.`,

    'main-7':
      `Здесь говорящий предлагает другу пойти в музей днём.\n` +
      `С другом можно говорить просто, без вежливого окончания «요».\n` +
      `«갈까?» значит “может, пойдём вместе?” и подходит для дружеского предложения.`,

    'main-8':
      `Говорящий спрашивает друга, что тот хочет выпить в кафе.\n` +
      `Так как это разговор с другом, используется 반말.\n` +
      `«마실래?» значит “хочешь выпить кофе?” и звучит естественно между друзьями.`,

    'main-9':
      `Здесь человек говорит о домашнем задании, которое нужно сдать сегодня.\n` +
      `Ситуация серьёзная, поэтому нужно сказать, что задание нужно сделать.\n` +
      `«숙제해야 해요» — вежливая форма “нужно сделать домашнее задание”.`,

    'main-10':
      `Говорящий находится в музее и сначала спрашивает учителя разрешение войти.\n` +
      `С учителем нужно говорить уважительно и мягко.\n` +
      `«들어가도 돼요?» значит “можно войти?” и подходит для вежливого вопроса.`,

    'remedial-1':
      `Это дополнительный вопрос про обязанность.\n` +
      `Если завтра экзамен, ученик понимает, что ему нужно сделать задание и повторить материал.\n` +
      `«숙제해야 해요» значит “нужно сделать домашнее задание” в вежливой форме.`,

    'remedial-2':
      `Это дополнительный вопрос про разрешение.\n` +
      `Ученик хочет войти в класс, но сначала спрашивает учителя.\n` +
      `«들어가도 돼요?» — вежливый вопрос “можно войти?”.`,

    'remedial-3':
      `Это дополнительный вопрос про вежливое предложение.\n` +
      `Говорящий предлагает всем вместе пойти в столовую или куда-то ещё.\n` +
      `«갈까요?» значит “пойдём?” и звучит мягко и вежливо.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать форму речи по ситуации.\n` +
      `Если говорим с учителем или старшим человеком, лучше использовать вежливую форму.\n` +
      `Если говорим с близким другом, можно использовать простую разговорную форму.`)
  );
}
function generateMovementLevel2Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В этом вопросе ученики находятся наверху, на 5 этаже.\n` +
      `Они идут вниз на 1 этаж, то есть спускаются вниз от верхнего места.\n` +
      `Поэтому подходит «내려가요» — “спускаются вниз туда”.`,

    'main-2':
      `Говорящий ждёт на 1 этаже, а старший брат находится выше.\n` +
      `Брат спускается вниз к говорящему.\n` +
      `Поэтому нужен ответ «내려와요» — “спускается сюда”.`,

    'main-3':
      `Минсу стоит на одной стороне дороги, а школа находится на другой стороне.\n` +
      `Он переходит дорогу от своей стороны к другой стороне.\n` +
      `Поэтому подходит «건너가요» — “переходит туда, на другую сторону”.`,

    'main-4':
      `Говорящий ждёт на этой стороне моста.\n` +
      `Друг находится на другой стороне и идёт по мосту к говорящему.\n` +
      `Поэтому правильный ответ — «건너와요» — “переходит сюда”.`,

    'main-5':
      `Урок закончился, и говорящий уходит из школы домой.\n` +
      `Он возвращается домой от того места, где сейчас находится.\n` +
      `Поэтому подходит «돌아가요» — “возвращаюсь туда / домой”.`,

    'main-6':
      `Папа утром ушёл на работу, а вечером приходит обратно домой.\n` +
      `Дом — это место говорящего, поэтому движение направлено сюда.\n` +
      `Поэтому нужен ответ «돌아와요» — “возвращается сюда”.`,

    'main-7':
      `Люди стоят на остановке, а автобус проезжает мимо них.\n` +
      `Автобус проходит мимо и едет дальше.\n` +
      `Поэтому подходит «지나가요» — “проходит / проезжает мимо туда”.`,

    'main-8':
      `Говорящий ждёт у входа в парк.\n` +
      `Друг проходит через место в парке и приходит к говорящему.\n` +
      `Поэтому правильный ответ — «지나와요» — “проходит сюда”.`,

    'main-9':
      `Люди находятся наверху, на смотровой площадке.\n` +
      `Они спускаются вниз к парковке.\n` +
      `Поэтому подходит «내려가요» — движение вниз от верхнего места.`,

    'main-10':
      `Говорящий находится внизу у долины и зовёт младшего брата.\n` +
      `Брат спускается по горной дороге к говорящему.\n` +
      `Поэтому нужен ответ «내려와요» — “спускается сюда”.`,

    'remedial-1':
      `Лифт находится на 7 этаже и едет вниз на 1 этаж.\n` +
      `Движение идёт сверху вниз и не к говорящему.\n` +
      `Поэтому правильный ответ — «내려가요».`,

    'remedial-2':
      `Говорящий ждёт в лобби на 1 этаже.\n` +
      `Сестра спускается с 4 этажа в лобби, то есть к говорящему.\n` +
      `Поэтому подходит «내려와요».`,

    'remedial-3':
      `Лодка находится на этой стороне реки и движется на противоположную сторону.\n` +
      `Она пересекает реку в сторону от текущего места.\n` +
      `Поэтому нужен ответ «건너가요».`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать глагол движения.\n` +
      `Если движение идёт от говорящего, часто используется «가다».\n` +
      `Если движение идёт к говорящему, часто используется «오다».`)
  );
}
function generateMovementLevel3Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В этом вопросе ребёнок идёт ближе к собаке.\n` +
      `Движение направлено к объекту, но не к говорящему.\n` +
      `Поэтому подходит «다가가요» — “подходит туда, ближе к кому-то”.`,

    'main-2':
      `Говорящий стоит на станции и ждёт поезд.\n` +
      `Поезд движется к месту говорящего.\n` +
      `Поэтому нужен ответ «다가와요» — “приближается сюда”.`,

    'main-3':
      `В этом вопросе люди стоят слишком близко и отходят назад.\n` +
      `Они удаляются от прежнего места.\n` +
      `Поэтому подходит «물러가요» — “отступают туда / отходят назад”.`,

    'main-4':
      `Друг испугался мяча и отступает к говорящему.\n` +
      `Движение назад направлено в сторону говорящего.\n` +
      `Поэтому правильный ответ — «물러와요» — “отступает сюда”.`,

    'main-5':
      `Друг переезжает в другой город и покидает район.\n` +
      `Движение идёт прочь от этого места.\n` +
      `Поэтому подходит «떠나가요» — “уходит / уезжает прочь”.`,

    'main-6':
      `Говорящий раньше жил в Пусане, а теперь находится в Сеуле.\n` +
      `Он покинул родной город и пришёл в другое место, где сейчас находится.\n` +
      `Поэтому подходит «떠나왔어요» — “уехал оттуда сюда”.`,

    'main-7':
      `В этом вопросе говорится о воде в реке.\n` +
      `Вода течёт от горы в сторону моря, то есть дальше от текущего места.\n` +
      `Поэтому нужен ответ «흘러가요» — “течёт туда”.`,

    'main-8':
      `Музыка звучит в соседнем доме и доходит до комнаты говорящего.\n` +
      `Звук как будто “течёт” в сторону говорящего.\n` +
      `Поэтому подходит «흘러와요» — “доносится сюда”.`,

    'main-9':
      `Ребёнок осторожно приближается к уличной кошке.\n` +
      `Он идёт ближе к объекту, не к говорящему.\n` +
      `Поэтому правильный ответ — «다가가요».`,

    'main-10':
      `Говорящий стоит на платформе и слышит поезд.\n` +
      `Поезд движется к платформе, где находится говорящий.\n` +
      `Поэтому подходит «다가와요» — “приближается сюда”.`,

    'remedial-1':
      `Это дополнительный вопрос про приближение к объекту.\n` +
      `Младший брат идёт ближе к птице.\n` +
      `Поэтому нужен ответ «다가가요».`,

    'remedial-2':
      `Это дополнительный вопрос про движение к говорящему.\n` +
      `Автобус едет к остановке, где ждёт говорящий.\n` +
      `Поэтому подходит «다가와요».`,

    'remedial-3':
      `Это дополнительный вопрос про отступление.\n` +
      `Ученики отходят назад от сцены.\n` +
      `Поэтому правильный ответ — «물러가요».`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать глагол движения.\n` +
      `Если движение идёт к объекту или от места, часто используется «가다».\n` +
      `Если движение идёт к говорящему, часто используется «오다».`)
  );
}
function generateReasonLevel3Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В этом вопросе говорится, что из-за дождя учитель изменил расписание.\n` +
      `Ответ «오기 때문에» объясняет причину: “потому что идёт дождь”.\n` +
      `После этой причины идёт результат: занятие проходит в классе.`,

    'main-2':
      `Здесь Минсу объясняет, почему он отдыхал на уроке физкультуры.\n` +
      `«왜냐하면» начинает прямое объяснение причины.\n` +
      `После него идёт причина: он вчера повредил ногу.`,

    'main-3':
      `В библиотеке нужно говорить тихо.\n` +
      `«그렇기 때문에» значит “именно поэтому” и связывает правило с выводом.\n` +
      `Вывод такой: нельзя громко разговаривать.`,

    'main-4':
      `Здесь Джимин делает два действия почти одновременно.\n` +
      `Он объясняет презентацию и в это же время показывает фотографии.\n` +
      `Поэтому подходит «그러면서» — “при этом / одновременно”.`,

    'main-5':
      `Минхо сначала просто шёл по парку.\n` +
      `Во время этого действия вдруг зазвонил телефон.\n` +
      `«그러다가» показывает, что в процессе одного действия произошло другое событие.`,

    'main-6':
      `Здесь есть условие: если домашнее задание будет закончено.\n` +
      `«만약» значит “если” и помогает начать условное предложение.\n` +
      `После условия идёт просьба: напиши мне.`,

    'main-7':
      `Здесь говорящий думает о возможной ситуации в будущем.\n` +
      `«만약에» значит “если вдруг” и звучит немного мягче, чем просто «만약».\n` +
      `Если погода будет плохой, они будут смотреть фильм дома.`,

    'main-8':
      `Сначала говорящий соглашается, что времени мало.\n` +
      `«그렇다면» значит “если так, тогда”.\n` +
      `После этого идёт решение: сегодня нужно тренироваться недолго.`,

    'main-9':
      `В этом вопросе говорится о снеге и скользкой дороге.\n` +
      `«오기 때문에» объясняет причину: “потому что идёт снег”.\n` +
      `Из-за этой причины нужно идти медленно.`,

    'main-10':
      `Суджин объясняет, почему она отменила встречу.\n` +
      `«왜냐하면» начинает прямое объяснение причины.\n` +
      `Причина в том, что у неё неожиданно появились семейные дела.`,

    'remedial-1':
      `Это дополнительный вопрос про причину.\n` +
      `Из-за сильного дождя мероприятие перенесли в спортивный зал.\n` +
      `Поэтому подходит «오기 때문에» — “потому что идёт дождь”.`,

    'remedial-2':
      `Это дополнительный вопрос про объяснение причины.\n` +
      `Говорящий объясняет, почему он рано ушёл домой.\n` +
      `«왜냐하면» подходит, потому что после него сразу говорится причина.`,

    'remedial-3':
      `Это дополнительный вопрос про вывод из причины.\n` +
      `Если ученик ещё не знает много слов, ему нужно повторять материал.\n` +
      `«그렇기 때문에» значит “именно поэтому” и хорошо соединяет причину с выводом.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать выражение, которое связывает части текста.\n` +
      `Сначала найди причину, условие или событие.\n` +
      `Потом выбери выражение, которое подходит к смыслу всего текста.`)
  );
}
function generateReasonLevel2Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В этом вопросе человек опаздывает в школу.\n` +
      `Форма «늦었으니까» объясняет причину: “так как я опоздал”.\n` +
      `После причины идёт результат: поэтому человек берёт такси.`,

    'main-2':
      `Здесь сначала говорится, что времени почти нет.\n` +
      `«그러니까» значит “поэтому / значит”. Оно связывает ситуацию и вывод.\n` +
      `После него идёт действие: нужно быстро готовиться.`,

    'main-3':
      `Здесь человек объясняет, почему он немного опоздал.\n` +
      `«그래서요» звучит мягко в разговоре и значит “поэтому-то”.\n` +
      `Причина — автобус пришёл поздно, результат — человек опоздал.`,

    'main-4':
      `В этом вопросе нужно выбрать один из двух вариантов транспорта.\n` +
      `«또는» значит “или” и соединяет два выбора.\n` +
      `Здесь выбор такой: автобус или метро.`,

    'main-5':
      `Здесь есть условие: сначала нужно закончить домашнее задание.\n` +
      `«그러면» значит “тогда”. Оно показывает результат после условия.\n` +
      `Если человек закончит задание, тогда можно играть вместе.`,

    'main-6':
      `Фраза «그럼» — короткая разговорная форма слова «그러면».\n` +
      `Она значит “тогда / ну тогда”.\n` +
      `Здесь ситуация срочная: время фильма близко, тогда нужно выходить сейчас.`,

    'main-7':
      `В этом вопросе важен порядок действий.\n` +
      `«그리고 나서» значит “после этого”.\n` +
      `Сначала человек моет руки, а после этого ест перекус.`,

    'main-8':
      `Здесь первая мысль положительная: человек хочет пойти на пикник.\n` +
      `Но потом появляется противоположная ситуация: идёт сильный дождь.\n` +
      `Поэтому подходит «그런데» — “но / однако”.`,

    'main-9':
      `Здесь причина — сильные пробки на дороге.\n` +
      `Форма «늦었으니까» значит “так как я опоздал”.\n` +
      `После причины идёт действие: человек звонит родителям.`,

    'main-10':
      `Сначала говорится, что домашнего задания много.\n` +
      `«그러니까» помогает сделать вывод: поэтому нужно начать сразу дома.\n` +
      `Это слово часто используют, когда объясняют результат предыдущей ситуации.`,

    'remedial-1':
      `Это дополнительный вопрос про причину.\n` +
      `Человек пропустил автобус и из-за этого опаздывает в школу.\n` +
      `Поэтому подходит «늦었으니까» — “так как я опоздал”.`,

    'remedial-2':
      `Это дополнительный вопрос про вывод.\n` +
      `Идёт сильный дождь, значит нужно взять зонт.\n` +
      `«그러니까» значит “поэтому / значит” и соединяет причину с действием.`,

    'remedial-3':
      `Это дополнительный вопрос про мягкое объяснение результата.\n` +
      `Человек пошёл не туда, поэтому пришёл немного поздно.\n` +
      `«그래서요» значит “поэтому-то” и хорошо подходит для разговорного объяснения.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать слово, которое связывает две части предложения.\n` +
      `Сначала посмотри, где причина, а где результат.\n` +
      `Потом выбери союз или окончание, которое подходит по смыслу.`)
  );
}
function generateTargetExplanation(
  category: Exclude<GrammarCategory, 'counters'>,
  item: TargetItem,
  level?: UserLevel,
  order?: number,
  stage?: 'main' | 'remedial',
  correctAnswer?: string
): string {
  if (category === 'honorifics' && level === 1 && order && stage) {
    return generateHonorificLevel1Explanation(
      order,
      stage,
      correctAnswer ?? honorificSurface(item)
    );
  }
  if (category === 'honorifics' && level === 2 && order && stage) {
    return generateHonorificLevel2Explanation(
      order,
      stage,
      correctAnswer ?? honorificSurface(item)
    );
  }
  if (category === 'honorifics' && level === 3 && order && stage) {
    return generateHonorificLevel3Explanation(
      order,
      stage,
      correctAnswer ?? honorificSurface(item)
    );
  }
  if (category === 'movement' && level === 2 && order && stage) {
    return generateMovementLevel2Explanation(
      order,
      stage,
      correctAnswer ?? movementSurface(item.target, '')
    );
  }
  if (category === 'movement' && level === 3 && order && stage) {
    return generateMovementLevel3Explanation(
      order,
      stage,
      correctAnswer ?? movementSurface(item.target, '')
    );
  }
  if (category === 'reasons' && level === 2 && order && stage) {
    return generateReasonLevel2Explanation(
      order,
      stage,
      correctAnswer ?? item.target
    );
  }
  if (category === 'reasons' && level === 3 && order && stage) {
    return generateReasonLevel3Explanation(
      order,
      stage,
      correctAnswer ?? item.target
    );
  }
  const answer = `**Ответ: «${item.target}»** — ${item.meaning}`;
  if (category === 'movement') {
    const isGa =
      item.target.endsWith('가다') ||
      item.target === '이동하다' ||
      item.target === '출발하다' ||
      item.target === '도착하다';
    const dirNote = isGa
      ? 'глагол движения в направлении ОТ говорящего.'
      : 'глагол движения в направлении К говорящему.';
    return (
      `${answer}\n\n` +
      `В корейском языке глаголы движения делятся на два типа: «-가다» (движение от говорящего) и «-오다» (движение к говорящему). ` +
      `Составные глаголы объединяют способ перемещения (ходьба, бег, полёт, ползание и т.д.) с одним из этих направлений.\n` +
      `«${item.target}» — это ${dirNote} Глагол одновременно указывает на способ движения субъекта и его направление относительно говорящего.\n` +
      `При выборе глагола необходимо учитывать, находится ли говорящий в точке отправления или прибытия.`
    );
  }

  if (category === 'reasons') {
    const isEnding = item.target.startsWith('-');
    const typeNote = isEnding
      ? `соединительный суффикс (연결 어미), который присоединяется к основе глагола или прилагательного и связывает части предложения.`
      : `союз (접속사), который стоит между двумя самостоятельными предложениями.`;
    return (
      `${answer}\n\n` +
      `В корейском языке причинно-следственные, противительные и условные отношения передаются двумя способами: ` +
      `союзами (접속사), стоящими между предложениями, и соединительными суффиксами (연결 어미), присоединяемыми к основе глагола.\n` +
      `«${item.target}» — это ${typeNote} Значение «${item.meaning}» выражает логическую связь между частями высказывания.\n` +
      `Похожие по значению конструкции могут различаться по стилю (разговорный / письменный) и степени формальности — важно учитывать контекст.`
    );
  }

  // honorifics
  const isPolite = /вежлив|официал|почтит/.test(item.meaning);
  const isCasual = /разговорн/.test(item.meaning);
  const registerNote = isPolite
    ? `вежливая форма (존댓말), используемая со взрослыми, незнакомыми людьми и в официальных ситуациях.`
    : isCasual
    ? `разговорная форма (반말), используемая с близкими друзьями и теми, кто младше говорящего.`
    : `форма системы речевых уровней вежливости — её выбор зависит от контекста и отношений.`;
  return (
    `${answer}\n\n` +
    `Корейский язык строго разграничивает уровни вежливости в зависимости от возраста, статуса и степени знакомства собеседников. ` +
    `Различают формальный стиль (합쇼체 / 해요체) и неформальный разговорный стиль (반말 / 해체).\n` +
    `«${item.target}» — это ${registerNote} Соответствует значению «${item.meaning}».\n` +
    `Помимо окончаний, в корейском существуют особые почтительные слова (예: 먹다→드시다, 있다→계시다, 말하다→말씀하시다), ` +
    `поэтому систему вежливости рекомендуется изучать комплексно.`
  );
}

function makeTargetQuestion(
  category: Exclude<GrammarCategory, 'counters'>,
  level: UserLevel,
  order: number,
  stage: 'main' | 'remedial',
  bank: Record<UserLevel, TargetItem[]>
): Question {
  const item = bank[level][(order - 1) % bank[level].length];
  const type: QuestionType = stage === 'remedial' ? (order === 1 ? 'multiple' : 'short') : questionType(order, category);
  const blankPart = makeBlankPart(item.target, item.exampleKr);
  const coreBlank = blankPart.prompt;
  const coreFull = item.exampleKr;
  const ruHint = `Значение: «${item.meaning}».`;
  const contextSeed: QuestionContextSeed = {
    category,
    level,
    order,
    stage,
  };
  const context = trimQuestionContext(
    category === 'honorifics'
      ? honorificLevelContext(level, coreBlank, coreFull, ruHint, contextSeed)
      : category === 'movement' && level === 2
      ? movementLevel2Context(ruHint, contextSeed)
      : category === 'movement' && level === 3
      ? movementLevel3Context(ruHint, contextSeed)
      : category === 'reasons' && level === 2
      ? reasonLevel2Context(ruHint, contextSeed)
      : category === 'reasons' && level === 3
      ? reasonLevel3Context(ruHint, contextSeed)
      : levelContext(level, coreBlank, coreFull, ruHint, contextSeed)
  );
  const pool = bank[level].map(v => v.target);
  const surfacePool = targetChoiceTexts(category, level, item, bank[level], blankPart.answer);

  return {
    id: `${category.slice(0, 3)}-L${level}-${stage === 'main' ? 'M' : 'R'}${order}`,
    category,
    userLevel: level,
    stage,
    type,
    order,
    promptKr: context.promptKr,
    promptRu: context.promptRu,
    audioText: context.audioText,
    choices: type === 'multiple' ? choicesFromSurface(blankPart.answer, surfacePool, `${category}-${level}-${stage}-${order}`) : undefined,
    correctAnswer: blankPart.answer,
    acceptedAnswers: acceptedSurface(blankPart.answer),
    instructionRu: getInstructionRu(type, category),
    explanationRu: generateTargetExplanation(category, item, level, order, stage, blankPart.answer),
    exampleKr: item.exampleKr,
    exampleRu: item.exampleRu,
  };
}

function buildAllQuestions(): Question[] {
  const questions: Question[] = [];

  LEVELS.forEach(level => {
    CATEGORIES.forEach(category => {
      for (let order = 1; order <= 10; order += 1) {
        if (category === 'counters') {
          questions.push(makeCounterQuestion(level, order, 'main'));
        } else if (category === 'movement') {
          questions.push(makeTargetQuestion('movement', level, order, 'main', movementBank));
        } else if (category === 'reasons') {
          questions.push(makeTargetQuestion('reasons', level, order, 'main', reasonBank));
        } else {
          questions.push(makeTargetQuestion('honorifics', level, order, 'main', honorificBank));
        }
      }

      for (let order = 1; order <= 3; order += 1) {
        if (category === 'counters') {
          questions.push(makeCounterQuestion(level, order, 'remedial'));
        } else if (category === 'movement') {
          questions.push(makeTargetQuestion('movement', level, order, 'remedial', movementBank));
        } else if (category === 'reasons') {
          questions.push(makeTargetQuestion('reasons', level, order, 'remedial', reasonBank));
        } else {
          questions.push(makeTargetQuestion('honorifics', level, order, 'remedial', honorificBank));
        }
      }
    });
  });

  return questions;
}

export const allQuestions: Question[] = buildAllQuestions();
export const TOTAL_QUESTION_COUNT = 260;

export function getMainQuestions(
  category: GrammarCategory,
  level: UserLevel
): Question[] {
  return allQuestions
    .filter(q => q.category === category && q.userLevel === level && q.stage === 'main')
    .sort((a, b) => a.order - b.order);
}

export function getRemedialQuestions(
  category: GrammarCategory,
  level: UserLevel
): Question[] {
  return allQuestions
    .filter(q => q.category === category && q.userLevel === level && q.stage === 'remedial')
    .sort((a, b) => a.order - b.order);
}