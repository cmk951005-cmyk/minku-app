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
    { target: '다가가다', meaning: 'подходить ближе туда', hintKr: '대상에게 가까이 감', exampleKr: '학생이 안내견에게 다가갔어요.', exampleRu: 'Ученик подошёл к собаке-поводырю.' },
    { target: '다가오다', meaning: 'приближаться сюда', hintKr: '대상이 화자에게 가까이 옴', exampleKr: '버스가 정류장으로 다가올 거예요.', exampleRu: 'Автобус скоро приблизится к остановке.' },
    { target: '물러가다', meaning: 'отступать туда', hintKr: '뒤로 물러나 멀어짐', exampleKr: '관람객들이 안전선 밖으로 물러갔어요.', exampleRu: 'Зрители отступили за линию безопасности.' },
    { target: '물러오다', meaning: 'отступать сюда', hintKr: '뒤로 물러나 화자 쪽으로 옴', exampleKr: '동생이 놀라서 제 뒤로 물러와요.', exampleRu: 'Младший брат пугается и отступает ко мне за спину.' },
    { target: '떠나가다', meaning: 'уходить/уезжать прочь', hintKr: '어떤 곳을 떠나 멀어짐', exampleKr: '친구가 다음 주에 도시를 떠나갈 거예요.', exampleRu: 'Друг на следующей неделе уедет из города.' },
    { target: '떠나오다', meaning: 'покидать и приходить сюда', hintKr: '어떤 곳을 떠나 화자 쪽으로 옴', exampleKr: '저는 작년에 고향을 떠나왔어요.', exampleRu: 'В прошлом году я уехал из родного города сюда.' },
    { target: '흘러가다', meaning: 'течь туда/протекать', hintKr: '물이나 시간이 흘러 멀어짐', exampleKr: '강물이 바다 쪽으로 흘러가요.', exampleRu: 'Речная вода течёт в сторону моря.' },
    { target: '흘러오다', meaning: 'течь сюда', hintKr: '물이나 소리가 화자 쪽으로 옴', exampleKr: '노래 소리가 창문 안으로 흘러왔어요.', exampleRu: 'Звук песни донёсся в окно.' },
    { target: '물러오다', meaning: 'отступать сюда', hintKr: '뒤로 물러나 화자 쪽으로 옴', exampleKr: '아이들이 곧 안내 교사 쪽으로 물러올 거예요.', exampleRu: 'Дети скоро отступят к сопровождающему учителю.' },
    { target: '다가오다', meaning: 'приближаться сюда', hintKr: '대상이 화자에게 가까이 옴', exampleKr: '마감 시간이 빠르게 다가와요.', exampleRu: 'Срок быстро приближается.' },
  ],
  4: [
    { target: '굴러가다', meaning: 'катиться туда', hintKr: '둥근 물체가 굴러 멀어짐', exampleKr: '공이 운동장 끝으로 굴러갔어요.', exampleRu: 'Мяч укатился к краю площадки.' },
    { target: '굴러오다', meaning: 'катиться сюда', hintKr: '둥근 물체가 굴러 화자 쪽으로 옴', exampleKr: '동전이 제 발밑으로 굴러올 거예요.', exampleRu: 'Монета покатится к моим ногам.' },
    { target: '날아가다', meaning: 'улетать туда', hintKr: '공중으로 날아 멀어짐', exampleKr: '종이비행기가 운동장 밖으로 날아가요.', exampleRu: 'Бумажный самолётик улетает за площадку.' },
    { target: '날아오다', meaning: 'прилетать сюда', hintKr: '공중에서 화자 쪽으로 옴', exampleKr: '낙엽 한 장이 제 책상 위로 날아왔어요.', exampleRu: 'Один лист прилетел на мой стол.' },
    { target: '뛰어가다', meaning: 'бежать туда', hintKr: '뛰어서 멀어짐', exampleKr: '학생이 안내 방송을 듣고 정문으로 뛰어갈 거예요.', exampleRu: 'Ученик побежит к главному входу.' },
    { target: '뛰어오다', meaning: 'бежать сюда', hintKr: '뛰어서 화자 쪽으로 옴', exampleKr: '동생이 놀이터에서 제 쪽으로 뛰어와요.', exampleRu: 'Младший брат бежит ко мне с площадки.' },
    { target: '걸어가다', meaning: 'идти пешком туда', hintKr: '걸어서 멀어짐', exampleKr: '할머니가 천천히 시장 입구까지 걸어갔어요.', exampleRu: 'Бабушка медленно дошла до входа на рынок.' },
    { target: '걸어오다', meaning: 'идти пешком сюда', hintKr: '걸어서 화자 쪽으로 옴', exampleKr: '친구가 도서관 앞에서 우리 자리로 걸어올 거예요.', exampleRu: 'Друг подойдёт к нашему месту от библиотеки.' },
    { target: '기어가다', meaning: 'ползти туда', hintKr: '몸을 낮추고 기어서 멀어짐', exampleKr: '작은 거북이가 모래 언덕 쪽으로 기어가요.', exampleRu: 'Маленькая черепаха ползёт к песчаному холму.' },
    { target: '기어오다', meaning: 'ползти сюда', hintKr: '몸을 낮추고 기어서 화자 쪽으로 옴', exampleKr: '아기가 장난감을 보고 엄마 쪽으로 기어왔어요.', exampleRu: 'Малыш подполз к маме, увидев игрушку.' },
  ],
  5: [
    { target: '기어내려가다', meaning: 'сползать вниз туда', hintKr: '기어서 아래로 멀어짐', exampleKr: '곤충이 투명 관찰함 아래로 기어내려갔어요.', exampleRu: 'Насекомое сползло вниз по прозрачному контейнеру.' },
    { target: '기어올라오다', meaning: 'заползать вверх сюда', hintKr: '기어서 위로 화자 쪽에 옴', exampleKr: '고양이가 구조대가 있는 지붕 위로 기어올라올 거예요.', exampleRu: 'Кошка заползёт на крышу к спасателям.' },
    { target: '달려가다', meaning: 'мчаться/бежать туда', hintKr: '빠르게 뛰어서 멀어짐', exampleKr: '구조대원이 사고 현장으로 달려가요.', exampleRu: 'Спасатель бежит к месту происшествия.' },
    { target: '달려오다', meaning: 'мчаться/бежать сюда', hintKr: '빠르게 뛰어서 화자 쪽으로 옴', exampleKr: '담당 직원이 안내 데스크로 달려왔어요.', exampleRu: 'Ответственный сотрудник прибежал к стойке информации.' },
    { target: '헤엄쳐가다', meaning: 'плыть туда', hintKr: '헤엄쳐서 멀어짐', exampleKr: '선수가 안전선 반대편으로 헤엄쳐갈 거예요.', exampleRu: 'Спортсмен поплывёт к другой стороне линии безопасности.' },
    { target: '헤엄쳐오다', meaning: 'плыть сюда', hintKr: '헤엄쳐서 화자 쪽으로 옴', exampleKr: '오리가 관찰 지점 가까이 헤엄쳐와요.', exampleRu: 'Утка подплывает близко к месту наблюдения.' },
    { target: '옮겨가다', meaning: 'перемещаться туда', hintKr: '장소나 소속이 다른 곳으로 바뀜', exampleKr: '연구팀이 신규 실험실로 옮겨갔어요.', exampleRu: 'Исследовательская группа переехала в новую лабораторию.' },
    { target: '옮겨오다', meaning: 'перемещаться сюда', hintKr: '다른 곳에서 이쪽으로 이동함', exampleKr: '자료가 중앙 서버로 옮겨올 거예요.', exampleRu: 'Данные будут перенесены на центральный сервер.' },
    { target: '이동하다', meaning: 'перемещаться', hintKr: '장소를 바꿈', exampleKr: '참가자들이 임시 회의실로 이동해요.', exampleRu: 'Участники переходят во временную переговорную.' },
    { target: '출발하다', meaning: 'отправляться', hintKr: '어떤 곳에서 떠남', exampleKr: '버스가 정해진 시각에 출발했어요.', exampleRu: 'Автобус отправился в назначенное время.' },
    { target: '도착하다', meaning: 'прибывать', hintKr: '목적지에 이름', exampleKr: '기차가 다음 역에 도착했어요.', exampleRu: 'Поезд прибыл на следующую станцию.' },
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
    { target: '그렇지만', meaning: 'однако, но', hintKr: '반대 내용을 부드럽게 연결함', exampleKr: '연습 결과는 좋아졌어요. 그렇지만 듣기 문제는 아직 어려웠어요.', exampleRu: 'Результат практики стал лучше. Но задания на аудирование всё ещё были трудными.' },
    { target: '그러나', meaning: 'однако', hintKr: '글에서 반전을 공식적으로 말함', exampleKr: '도서관 안내는 쉬웠어요. 그러나 쉬는 공간은 부족했어요.', exampleRu: 'Объяснение в библиотеке было понятным. Однако места для отдыха не хватало.' },
    { target: '그런데도', meaning: 'несмотря на это', hintKr: '앞 상황과 다른 결과', exampleKr: '수아는 많이 연습했어요. 그런데도 첫 문장을 잊어버렸어요.', exampleRu: 'Суа много тренировалась. Но всё равно забыла первое предложение.' },
    { target: '또한', meaning: 'также', hintKr: '추가 정보를 더함', exampleKr: '문법을 배웠어요. 또한 새 단어도 함께 확인했어요.', exampleRu: 'Изучали грамматику. Также проверили новые слова.' },
    { target: '게다가', meaning: 'к тому же', hintKr: '추가 이유를 더함', exampleKr: '비가 왔어요. 게다가 바람도 세게 불었어요.', exampleRu: 'Шёл дождь. К тому же дул сильный ветер.' },
    { target: '더구나', meaning: 'более того', hintKr: '더 강한 추가 이유', exampleKr: '목이 아팠어요. 더구나 마이크도 켜지지 않았어요.', exampleRu: 'Болело горло. Более того, микрофон не включался.' },
    { target: '뿐만 아니라', meaning: 'не только, но и', hintKr: '두 가지를 함께 강조함', exampleKr: '한국 음식 뿐만 아니라 식사 예절도 소개했어요.', exampleRu: 'Представили не только корейскую еду, но и правила за столом.' },
    { target: '한편', meaning: 'с другой стороны, тем временем', hintKr: '다른 관점으로 넘어감', exampleKr: '카페는 메뉴를 늘렸어요. 한편 옆 가게는 조용한 분위기를 지켰어요.', exampleRu: 'Кафе расширило меню. А соседний магазин сохранил спокойную атмосферу.' },
    { target: '반면에', meaning: 'в то время как, наоборот', hintKr: '대조를 말함', exampleKr: '형은 계획을 먼저 세워요. 반면에 동생은 먼저 해 보고 고쳐요.', exampleRu: 'Старший брат сначала строит план. А младший сначала пробует и потом исправляет.' },
    { target: '오히려', meaning: 'наоборот, скорее', hintKr: '예상과 반대 결과', exampleKr: '문제를 작게 나누자 오히려 이해가 더 빨라졌어요.', exampleRu: 'Когда задачу разделили на части, понимать стало даже быстрее.' },
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
    { target: '-아/어야 해요', meaning: 'нужно сделать, вежливо', hintKr: '의무를 존댓말로 말함', exampleKr: '발표 준비를 끝내야 해요.', exampleRu: 'Нужно закончить подготовку к презентации.' },
    { target: '-아/어도 돼요', meaning: 'можно сделать, вежливо', hintKr: '허락을 존댓말로 말함', exampleKr: '사진을 찍어도 돼요?', exampleRu: 'Можно сделать фотографию?' },
    { target: '-(으)ㄹ까요?', meaning: 'может, сделаем?/мне сделать?', hintKr: '공손한 제안이나 질문', exampleKr: '같이 정리할까요?', exampleRu: 'Давайте уберём вместе?' },
    { target: '-을래요/ㄹ래요', meaning: 'хотите?/собираетесь?', hintKr: '의향을 물음', exampleKr: '따뜻한 차를 마실래요?', exampleRu: 'Хотите выпить тёплый чай?' },
    { target: '-아/어야 해', meaning: 'нужно сделать, разговорно', hintKr: '친구에게 의무', exampleKr: '자료를 다시 읽어야 해.', exampleRu: 'Нужно снова прочитать материалы.' },
    { target: '-아/어도 돼', meaning: 'можно сделать, разговорно', hintKr: '친구에게 허락', exampleKr: '여기 앉아도 돼.', exampleRu: 'Можно сесть здесь.' },
    { target: '-(으)ㄹ까?', meaning: 'может, сделаем?, разговорно', hintKr: '친구에게 제안', exampleKr: '잠깐 쉴까?', exampleRu: 'Может, немного отдохнём?' },
    { target: '-을래/ㄹ래', meaning: 'хочешь?, разговорно', hintKr: '친구에게 의향 질문', exampleKr: '떡볶이 먹을래?', exampleRu: 'Хочешь токпокки?' },
    { target: '-아/어야 해요', meaning: 'нужно было сделать, вежливо', hintKr: '지난 의무를 존댓말로 말함', exampleKr: '어제 시험 전에는 공부해야 했어요.', exampleRu: 'Вчера перед экзаменом нужно было учиться.' },
    { target: '-아/어도 돼요', meaning: 'можно было сделать, вежливо', hintKr: '지난 허락을 존댓말로 말함', exampleKr: '오늘은 먼저 쉬어도 됐어요.', exampleRu: 'Сегодня можно было сначала отдохнуть.' },
  ],
  4: [
    { target: '-겠습니다', meaning: 'официальное намерение / буду', hintKr: '공식 상황에서 자신의 의지나 미래 행동을 말함', exampleKr: '제가 행사 자료를 점검하겠습니다.', exampleRu: 'Я проверю материалы мероприятия.' },
    { target: '-ㅂ니다/습니다', meaning: 'официальное повествование', hintKr: '공식적으로 현재 사실이나 진행을 말함', exampleKr: '오늘 접수 창구가 매우 바쁩니다.', exampleRu: 'Сегодня окно регистрации очень занято.' },
    { target: '-입니까?', meaning: 'официальный вопрос с существительным', hintKr: '명사 뒤에서 격식 있게 질문함', exampleKr: '이분이 오늘 회의 담당자입니까?', exampleRu: 'Этот человек ответственный за сегодняшнее собрание?' },
    { target: '-습니까?', meaning: 'официальный вопрос', hintKr: '동사나 형용사로 격식 있게 질문함', exampleKr: '학생들은 아침마다 운동합니까?', exampleRu: 'Студенты тренируются каждое утро?' },
    { target: '-십시오', meaning: 'официальная просьба / указание', hintKr: '매우 공손하고 공식적인 지시', exampleKr: '마감 전까지 신청서를 제출하십시오.', exampleRu: 'Пожалуйста, подайте заявление до срока.' },
    { target: '-시-', meaning: 'почтительный суффикс', hintKr: '주어를 높여 말함', exampleKr: '교장님께서 회의에 참석하시고 자료를 검토합니다.', exampleRu: 'Директор присутствует на собрании и проверяет материалы.' },
    { target: '-(으)시다', meaning: 'почтительная словарная форма', hintKr: '높임 표현의 기본형', exampleKr: '원장님께서 새 계획을 승인하시다.', exampleRu: 'Директор утверждает новый план, почтительно.' },
    { target: '-십니다', meaning: 'официальная почтительная форма', hintKr: '높임과 격식체를 함께 사용함', exampleKr: '교수님께서 연구 방법을 설명하십니다.', exampleRu: 'Профессор объясняет метод исследования.' },
    { target: '-셨어요', meaning: 'почтительное прошедшее время', hintKr: '높임 표현의 과거', exampleKr: '선생님께서 어제 상담을 진행하셨어요.', exampleRu: 'Учитель вчера провёл консультацию.' },
    { target: '-겠습니다', meaning: 'официальное обещание / буду', hintKr: '공식 상황에서 자신의 약속을 말함', exampleKr: '제가 내일까지 결과를 보고하겠습니다.', exampleRu: 'Я доложу результаты до завтра.' },
  ],
  5: [
    { target: '-네요', meaning: 'замечание/удивление', hintKr: '새롭게 느낀 점', exampleKr: '오늘 위원님께서 정말 바쁘시네요.', exampleRu: 'Сегодня член комиссии, похоже, очень занят.' },
    { target: '-군요', meaning: 'осознание/понимание', hintKr: '알게 된 사실', exampleKr: '선생님께서 밤늦게까지 공부하셨군요.', exampleRu: 'Оказывается, учитель занимался до поздней ночи.' },
    { target: '-잖아요', meaning: 'ведь, же', hintKr: '상대도 아는 사실 확인', exampleKr: '코치님께서 매일 운동하시잖아요.', exampleRu: 'Тренер ведь тренируется каждый день.' },
    { target: '-지요/죠', meaning: 'не так ли?, ведь', hintKr: '확인이나 부드러운 동의', exampleKr: '오늘 발표 자료를 확인할 거죠?', exampleRu: 'Вы ведь проверите материалы презентации сегодня?' },
    { target: '-거예요/-(으)ㄹ 거예요', meaning: 'будущее/намерение', hintKr: '예정이나 추측', exampleKr: '다음 회의에서 세부 기준을 의논할 거예요.', exampleRu: 'На следующем собрании обсудят подробные критерии.' },
    { target: '-고 있었어요', meaning: 'действие продолжалось в прошлом', hintKr: '과거 진행', exampleKr: '연구진은 응답 자료를 분석하고 있었어요.', exampleRu: 'Исследователи анализировали ответы.' },
    { target: '-시겠어요', meaning: 'вежливое предложение/готовность', hintKr: '상대 의향을 공손히 물음', exampleKr: '위원님, 검토 의견을 공유하시겠어요?', exampleRu: 'Уважаемый член комиссии, поделитесь мнением по проверке?' },
    { target: '-시죠', meaning: 'вежливое предложение', hintKr: '공손하게 권유함', exampleKr: '자료실로 함께 이동하시죠.', exampleRu: 'Давайте вместе пройдём в архив материалов.' },
    { target: '-네요', meaning: 'мягкое замечание', hintKr: '새롭게 느낀 상태를 부드럽게 말함', exampleKr: '발표자께서 조금 피곤하시네요.', exampleRu: 'Докладчик, похоже, немного устал.' },
    { target: '-시겠어요', meaning: 'вежливая просьба о готовности', hintKr: '상대가 할 수 있는지 공손히 물음', exampleKr: '교수님, 토론에 참여하시겠어요?', exampleRu: 'Профессор, примете участие в обсуждении?' },
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
      blank: '아침에 아빠와 중고차 매장에 갔어요. 판매 직원이 차량 상태를 설명했어요. 계약서 옆 주차 칸에는 __BLANK__가 서 있었어요. 가족은 가격을 확인하고 구매를 결정했어요.',
      full: '아침에 아빠와 중고차 매장에 갔어요. 판매 직원이 차량 상태를 설명했어요. 계약서 옆 주차 칸에는 __FULL__가 서 있었어요. 가족은 가격을 확인하고 구매를 결정했어요.',
    },
    {
      blank: '방과 후 컴퓨터실에서 정보 수업이 열렸어요. 일부 모니터가 고장 나서 학생들이 기다렸어요. 기사님이 창고에서 __BLANK__를 더 가져왔어요. 수업은 조금 늦었지만 모두 실습을 마쳤어요.',
      full: '방과 후 컴퓨터실에서 정보 수업이 열렸어요. 일부 모니터가 고장 나서 학생들이 기다렸어요. 기사님이 창고에서 __FULL__를 더 가져왔어요. 수업은 조금 늦었지만 모두 실습을 마쳤어요.',
    },
    {
      blank: '점심시간에 한국 음식 체험 수업이 있었어요. 학생들은 메뉴판에서 비빔밥 사진을 골랐어요. 조리 선생님이 식탁 위에 __BLANK__을 올려놓았어요. 아이들은 고추장을 조금 넣고 맛을 보았어요.',
      full: '점심시간에 한국 음식 체험 수업이 있었어요. 학생들은 메뉴판에서 비빔밥 사진을 골랐어요. 조리 선생님이 식탁 위에 __FULL__을 올려놓았어요. 아이들은 고추장을 조금 넣고 맛을 보았어요.',
    },
    {
      blank: '비가 와서 야외 활동이 취소됐어요. 동생들은 집에서 따뜻한 라면을 먹고 싶어 했어요. 엄마가 큰 냄비에 __BLANK__을 끓였어요. 모두 식탁에 앉아 국물을 천천히 마셨어요.',
      full: '비가 와서 야외 활동이 취소됐어요. 동생들은 집에서 따뜻한 라면을 먹고 싶어 했어요. 엄마가 큰 냄비에 __FULL__을 끓였어요. 모두 식탁에 앉아 국물을 천천히 마셨어요.',
    },
    {
      blank: '겨울 김장 날에 친척들이 모두 모였어요. 할머니는 양념을 확인하고 냉장고 공간을 비웠어요. 우리는 완성한 __BLANK__에 나누어 담았어요. 마지막에는 보관 날짜를 종이에 적었어요.',
      full: '겨울 김장 날에 친척들이 모두 모였어요. 할머니는 양념을 확인하고 냉장고 공간을 비웠어요. 우리는 완성한 __FULL__에 나누어 담았어요. 마지막에는 보관 날짜를 종이에 적었어요.',
    },
    {
      blank: '운동회가 끝난 뒤 학생들이 매우 목말라했어요. 담임 선생님은 급수 장소를 안내했어요. 운동장 입구에는 __BLANK__이 준비되어 있었어요. 학생들은 줄을 서서 컵에 물을 받았어요.',
      full: '운동회가 끝난 뒤 학생들이 매우 목말라했어요. 담임 선생님은 급수 장소를 안내했어요. 운동장 입구에는 __FULL__이 준비되어 있었어요. 학생들은 줄을 서서 컵에 물을 받았어요.',
    },
    {
      blank: '겨울 방학 전에 귤 공동 구매를 했어요. 반 친구들은 주문 명단과 금액을 확인했어요. 학교 현관 옆에는 __BLANK__가 쌓여 있었어요. 학생들은 자기 이름표를 보고 귤을 가져갔어요.',
      full: '겨울 방학 전에 귤 공동 구매를 했어요. 반 친구들은 주문 명단과 금액을 확인했어요. 학교 현관 옆에는 __FULL__가 쌓여 있었어요. 학생들은 자기 이름표를 보고 귤을 가져갔어요.',
    },
    {
      blank: '도서관 이사 때문에 책 정리가 시작됐어요. 사서 선생님은 분야별 목록을 먼저 확인했어요. 복도에는 __BLANK__가 차례대로 놓여 있었어요. 학생 봉사자들은 번호를 보고 새 서가로 옮겼어요.',
      full: '도서관 이사 때문에 책 정리가 시작됐어요. 사서 선생님은 분야별 목록을 먼저 확인했어요. 복도에는 __FULL__가 차례대로 놓여 있었어요. 학생 봉사자들은 번호를 보고 새 서가로 옮겼어요.',
    },
    {
      blank: '수학여행 아침에 학생들이 학교 운동장에 모였어요. 인솔 교사는 반별 탑승 위치를 안내했어요. 정문 앞에는 __BLANK__가 줄지어 기다리고 있었어요. 학생들은 인원 확인 후 차례대로 올라탔어요.',
      full: '수학여행 아침에 학생들이 학교 운동장에 모였어요. 인솔 교사는 반별 탑승 위치를 안내했어요. 정문 앞에는 __FULL__가 줄지어 기다리고 있었어요. 학생들은 인원 확인 후 차례대로 올라탔어요.',
    },
    {
      blank: '마을 잔치에서 어르신들을 위한 점심을 준비했어요. 봉사자들은 접시와 젓가락 수를 먼저 확인했어요. 주방에서는 __BLANK__을 만들고 있었어요. 손님들은 공연이 끝난 뒤 천천히 식사했어요.',
      full: '마을 잔치에서 어르신들을 위한 점심을 준비했어요. 봉사자들은 접시와 젓가락 수를 먼저 확인했어요. 주방에서는 __FULL__을 만들고 있었어요. 손님들은 공연이 끝난 뒤 천천히 식사했어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '자동차 전시회에서 안내원이 차량 특징을 설명했어요. 민규는 사진을 찍기 전에 안내문을 읽었어요. 전시장 중앙에는 __BLANK__가 놓여 있었어요. 그는 차 번호와 색을 공책에 적었어요.',
      full: '자동차 전시회에서 안내원이 차량 특징을 설명했어요. 민규는 사진을 찍기 전에 안내문을 읽었어요. 전시장 중앙에는 __FULL__가 놓여 있었어요. 그는 차 번호와 색을 공책에 적었어요.',
    },
    {
      blank: '컴퓨터실에서 새 프로그램 설치 수업을 했어요. 두 학생이 한 모둠이 되어 작업했어요. 앞 책상에는 __BLANK__가 준비되어 있었어요. 선생님은 전원을 켜고 로그인 방법을 알려 주었어요.',
      full: '컴퓨터실에서 새 프로그램 설치 수업을 했어요. 두 학생이 한 모둠이 되어 작업했어요. 앞 책상에는 __FULL__가 준비되어 있었어요. 선생님은 전원을 켜고 로그인 방법을 알려 주었어요.',
    },
    {
      blank: '한국 음식점에서 친구들과 저녁을 먹었어요. 메뉴판에는 비빔밥 사진과 가격이 크게 보였어요. 우리는 먼저 __BLANK__을 주문했어요. 직원은 물과 반찬을 함께 가져다주었어요.',
      full: '한국 음식점에서 친구들과 저녁을 먹었어요. 메뉴판에는 비빔밥 사진과 가격이 크게 보였어요. 우리는 먼저 __FULL__을 주문했어요. 직원은 물과 반찬을 함께 가져다주었어요.',
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
function counterLevel4Context(
  blankPhrase: string,
  fullPhrase: string,
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '학교 축제 준비로 반 친구들이 작은 매점 일을 나누었어요. 행사 담당 선생님은 과자 수량을 먼저 확인하라고 했어요. 민아는 상자 안을 열고 봉투 모양을 하나씩 세었어요. 기록표 첫 줄에는 __BLANK__가 남았다고 썼어요. 그런데 다른 상자에는 음료와 종이컵만 있었어요. 그래서 민아는 과자를 더 주문해야 한다고 말했어요.',
      full: '학교 축제 준비로 반 친구들이 작은 매점 일을 나누었어요. 행사 담당 선생님은 과자 수량을 먼저 확인하라고 했어요. 민아는 상자 안을 열고 봉투 모양을 하나씩 세었어요. 기록표 첫 줄에는 __FULL__가 남았다고 썼어요. 그런데 다른 상자에는 음료와 종이컵만 있었어요. 그래서 민아는 과자를 더 주문해야 한다고 말했어요.',
    },
    {
      blank: '가족 여행 전날에 엄마가 식사 준비 목록을 확인했어요. 비가 오면 밖에서 밥을 사기 어려울 수 있었어요. 동생은 가방 안에 있는 라면 봉투를 세어 보았어요. 식탁 위 메모에는 __BLANK__가 필요하다고 적혀 있었어요. 아빠는 냄비와 물도 함께 챙기자고 했어요. 모두 짐을 나눈 뒤 출발 시간을 다시 정했어요.',
      full: '가족 여행 전날에 엄마가 식사 준비 목록을 확인했어요. 비가 오면 밖에서 밥을 사기 어려울 수 있었어요. 동생은 가방 안에 있는 라면 봉투를 세어 보았어요. 식탁 위 메모에는 __FULL__가 필요하다고 적혀 있었어요. 아빠는 냄비와 물도 함께 챙기자고 했어요. 모두 짐을 나눈 뒤 출발 시간을 다시 정했어요.',
    },
    {
      blank: '미술 대회가 끝난 뒤 교실 정리가 시작되었어요. 선생님은 남은 준비물을 종류별로 모으라고 했어요. 지우개와 색종이는 이미 상자에 넣어 두었어요. 은지는 책상 위에서 __BLANK__을 따로 묶었어요. 연필 끝이 부러지지 않게 작은 통에 넣었어요. 마지막으로 물품 기록장을 확인하고 불을 껐어요.',
      full: '미술 대회가 끝난 뒤 교실 정리가 시작되었어요. 선생님은 남은 준비물을 종류별로 모으라고 했어요. 지우개와 색종이는 이미 상자에 넣어 두었어요. 은지는 책상 위에서 __FULL__을 따로 묶었어요. 연필 끝이 부러지지 않게 작은 통에 넣었어요. 마지막으로 물품 기록장을 확인하고 불을 껐어요.',
    },
    {
      blank: '주민 센터에서는 주말 상담 행사를 열었어요. 안내 책상에는 신청서와 이름표가 놓여 있었어요. 방문자가 많아서 서명용 볼펜이 금방 부족해졌어요. 담당자는 서랍에서 __BLANK__을 더 꺼냈어요. 사람들은 차례를 기다리며 조용히 서류를 썼어요. 행사는 늦지 않게 잘 마무리되었어요.',
      full: '주민 센터에서는 주말 상담 행사를 열었어요. 안내 책상에는 신청서와 이름표가 놓여 있었어요. 방문자가 많아서 서명용 볼펜이 금방 부족해졌어요. 담당자는 서랍에서 __FULL__을 더 꺼냈어요. 사람들은 차례를 기다리며 조용히 서류를 썼어요. 행사는 늦지 않게 잘 마무리되었어요.',
    },
    {
      blank: '봄 소풍 날 아침에 학생들이 운동장에 모였어요. 학급 대표는 도시락 상자를 반별로 나누었어요. 과일과 물은 이미 버스 옆에 실려 있었어요. 선생님은 점심으로 __BLANK__을 준비했다고 말했어요. 학생들은 김밥이 눌리지 않게 상자를 조심히 들었어요. 공원에 도착한 뒤 모두 그늘에서 밥을 먹었어요.',
      full: '봄 소풍 날 아침에 학생들이 운동장에 모였어요. 학급 대표는 도시락 상자를 반별로 나누었어요. 과일과 물은 이미 버스 옆에 실려 있었어요. 선생님은 점심으로 __FULL__을 준비했다고 말했어요. 학생들은 김밥이 눌리지 않게 상자를 조심히 들었어요. 공원에 도착한 뒤 모두 그늘에서 밥을 먹었어요.',
    },
    {
      blank: '무대 공연 전날에 의상 점검 시간이 있었어요. 배우들은 옷과 장식을 자기 이름표 옆에 두었어요. 조명 담당 학생은 반짝이는 장신구가 필요하다고 했어요. 소품 상자 안에는 __BLANK__이 가지런히 놓여 있었어요. 선생님은 목걸이가 엉키지 않게 한 줄씩 걸어 두라고 했어요. 공연 당일에는 장식 덕분에 무대가 더 밝아 보였어요.',
      full: '무대 공연 전날에 의상 점검 시간이 있었어요. 배우들은 옷과 장식을 자기 이름표 옆에 두었어요. 조명 담당 학생은 반짝이는 장신구가 필요하다고 했어요. 소품 상자 안에는 __FULL__이 가지런히 놓여 있었어요. 선생님은 목걸이가 엉키지 않게 한 줄씩 걸어 두라고 했어요. 공연 당일에는 장식 덕분에 무대가 더 밝아 보였어요.',
    },
    {
      blank: '졸업식 아침에 꽃집은 아주 바빴어요. 손님들은 축하 편지와 꽃다발을 함께 주문했어요. 직원은 빨간 장미를 꺼내 길이를 맞추었어요. 주문서에는 __BLANK__를 넣어 달라고 적혀 있었어요. 직원은 꽃잎이 상하지 않게 포장지를 살짝 감쌌어요. 학생은 꽃다발을 들고 가족에게 고맙다고 말했어요.',
      full: '졸업식 아침에 꽃집은 아주 바빴어요. 손님들은 축하 편지와 꽃다발을 함께 주문했어요. 직원은 빨간 장미를 꺼내 길이를 맞추었어요. 주문서에는 __FULL__를 넣어 달라고 적혀 있었어요. 직원은 꽃잎이 상하지 않게 포장지를 살짝 감쌌어요. 학생은 꽃다발을 들고 가족에게 고맙다고 말했어요.',
    },
    {
      blank: '가을 꽃 전시회가 학교 강당에서 열렸어요. 학생들은 흰 국화를 낮은 꽃병에 꽂았어요. 담당 교사는 꽃의 색과 높이를 맞추라고 했어요. 중앙 탁자에는 __BLANK__가 먼저 놓였어요. 그 옆에는 노란 잎과 작은 돌 장식도 더했어요. 관람객들은 차분한 분위기가 좋다고 말했어요.',
      full: '가을 꽃 전시회가 학교 강당에서 열렸어요. 학생들은 흰 국화를 낮은 꽃병에 꽂았어요. 담당 교사는 꽃의 색과 높이를 맞추라고 했어요. 중앙 탁자에는 __FULL__가 먼저 놓였어요. 그 옆에는 노란 잎과 작은 돌 장식도 더했어요. 관람객들은 차분한 분위기가 좋다고 말했어요.',
    },
    {
      blank: '어린이 행사에서 작은 선물 나누기가 진행되었어요. 진행자는 참가자 수를 확인하고 바구니를 준비했어요. 젤리와 초콜릿은 이미 봉투 안에 들어 있었어요. 마지막 상자에는 __BLANK__가 따로 남아 있었어요. 아이들은 번호표 순서대로 선물을 받았어요. 남은 선물은 다음 주 독서 모임에 쓰기로 했어요.',
      full: '어린이 행사에서 작은 선물 나누기가 진행되었어요. 진행자는 참가자 수를 확인하고 바구니를 준비했어요. 젤리와 초콜릿은 이미 봉투 안에 들어 있었어요. 마지막 상자에는 __FULL__가 따로 남아 있었어요. 아이들은 번호표 순서대로 선물을 받았어요. 남은 선물은 다음 주 독서 모임에 쓰기로 했어요.',
    },
    {
      blank: '공예 수업에서 학생들은 작은 팔찌를 만들었어요. 선생님은 재료 상자를 열고 색깔별로 나누었어요. 투명한 진주는 긴 실에 꿰어 보관되어 있었어요. 작업대 위에는 __BLANK__이 준비되어 있었어요. 학생들은 필요한 길이만큼 조심히 잘라 썼어요. 수업이 끝나자 각자 만든 팔찌를 사진으로 기록했어요.',
      full: '공예 수업에서 학생들은 작은 팔찌를 만들었어요. 선생님은 재료 상자를 열고 색깔별로 나누었어요. 투명한 진주는 긴 실에 꿰어 보관되어 있었어요. 작업대 위에는 __FULL__이 준비되어 있었어요. 학생들은 필요한 길이만큼 조심히 잘라 썼어요. 수업이 끝나자 각자 만든 팔찌를 사진으로 기록했어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '친구 생일 모임을 위해 작은 과자 상자를 만들었어요. 엄마는 선물 수량을 먼저 세어 보라고 했어요. 사탕은 이미 다른 봉투에 담겨 있었어요. 민규는 책상 위에 __BLANK__를 올려두었어요. 그 봉투에는 감자 과자와 새우 과자가 함께 들어 있었어요. 친구들은 모임이 끝난 뒤 남은 과자를 나누어 가져갔어요.',
      full: '친구 생일 모임을 위해 작은 과자 상자를 만들었어요. 엄마는 선물 수량을 먼저 세어 보라고 했어요. 사탕은 이미 다른 봉투에 담겨 있었어요. 민규는 책상 위에 __FULL__를 올려두었어요. 그 봉투에는 감자 과자와 새우 과자가 함께 들어 있었어요. 친구들은 모임이 끝난 뒤 남은 과자를 나누어 가져갔어요.',
    },
    {
      blank: '비가 많이 와서 가족이 집에서 저녁을 먹기로 했어요. 냉장고 안에는 채소와 달걀이 조금 남아 있었어요. 아빠는 간단한 식사로 라면을 끓이자고 했어요. 찬장 안에는 __BLANK__가 남아 있었어요. 동생은 물을 먼저 냄비에 부었어요. 엄마는 다음 장보기 목록에 라면을 더 적었어요.',
      full: '비가 많이 와서 가족이 집에서 저녁을 먹기로 했어요. 냉장고 안에는 채소와 달걀이 조금 남아 있었어요. 아빠는 간단한 식사로 라면을 끓이자고 했어요. 찬장 안에는 __FULL__가 남아 있었어요. 동생은 물을 먼저 냄비에 부었어요. 엄마는 다음 장보기 목록에 라면을 더 적었어요.',
    },
    {
      blank: '새 학기 첫날에 선생님이 필통 점검을 했어요. 학생들은 지우개와 자를 책상 위에 꺼냈어요. 연필이 부족한 친구에게 나누어 줄 물품도 준비했어요. 교탁 위에는 __BLANK__이 가지런히 놓여 있었어요. 선생님은 필요한 학생에게 하나씩 가져가라고 했어요. 수업이 끝난 뒤 남은 연필은 학급 상자에 보관했어요.',
      full: '새 학기 첫날에 선생님이 필통 점검을 했어요. 학생들은 지우개와 자를 책상 위에 꺼냈어요. 연필이 부족한 친구에게 나누어 줄 물품도 준비했어요. 교탁 위에는 __FULL__이 가지런히 놓여 있었어요. 선생님은 필요한 학생에게 하나씩 가져가라고 했어요. 수업이 끝난 뒤 남은 연필은 학급 상자에 보관했어요.',
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


function counterLevel5Context(
  blankPhrase: string,
  fullPhrase: string,
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '지역 농산물 품질 조사 회의가 오전에 진행되었습니다. 생산 관리 담당자는 김장 재료의 수량 기준을 검토했습니다. 저장 창고의 온도와 습도 기록도 함께 확인했습니다. 배추 상태는 외관 검사와 중량 측정으로 분류되었습니다. 검수표 첫 항목에는 __BLANK__가 필요하다고 기록되었습니다. 이후 담당자는 배송 일정과 포장 단가를 다시 계산했습니다. 추가 주문 여부는 예산 승인 후 결정하기로 했습니다. 최종 보고서는 오후 행정 회의에서 공유되었습니다.',
      full: '지역 농산물 품질 조사 회의가 오전에 진행되었습니다. 생산 관리 담당자는 김장 재료의 수량 기준을 검토했습니다. 저장 창고의 온도와 습도 기록도 함께 확인했습니다. 배추 상태는 외관 검사와 중량 측정으로 분류되었습니다. 검수표 첫 항목에는 __FULL__가 필요하다고 기록되었습니다. 이후 담당자는 배송 일정과 포장 단가를 다시 계산했습니다. 추가 주문 여부는 예산 승인 후 결정하기로 했습니다. 최종 보고서는 오후 행정 회의에서 공유되었습니다.',
    },
    {
      blank: '급식 지원 센터에서는 겨울 식단 개선 회의를 열었습니다. 영양 교사는 국물 요리에 필요한 재료 목록을 제출했습니다. 조리 책임자는 무의 신선도와 저장 상태를 세부적으로 점검했습니다. 공급 업체의 납품 시간도 운영 계획에 반영되었습니다. 재료 명세서에는 __BLANK__가 우선 확보 대상으로 표시되었습니다. 재고 관리자는 남은 채소와 신규 발주량을 비교했습니다. 비용 절감을 위해 공동 구매 방식도 검토되었습니다. 회의 결과는 학교 행정실에 즉시 전달되었습니다.',
      full: '급식 지원 센터에서는 겨울 식단 개선 회의를 열었습니다. 영양 교사는 국물 요리에 필요한 재료 목록을 제출했습니다. 조리 책임자는 무의 신선도와 저장 상태를 세부적으로 점검했습니다. 공급 업체의 납품 시간도 운영 계획에 반영되었습니다. 재료 명세서에는 __FULL__가 우선 확보 대상으로 표시되었습니다. 재고 관리자는 남은 채소와 신규 발주량을 비교했습니다. 비용 절감을 위해 공동 구매 방식도 검토되었습니다. 회의 결과는 학교 행정실에 즉시 전달되었습니다.',
    },
    {
      blank: '요리 연구 동아리는 향토 음식 분석 활동을 준비했습니다. 학생들은 조리 순서와 재료 비율을 표준 양식에 정리했습니다. 담당 학생은 양파의 크기와 상태를 관찰 기록으로 남겼습니다. 실습실 위생 기준에 따라 모든 재료는 세척 후 분류되었습니다. 조리대 중앙에는 __BLANK__이 별도 용기에 보관되었습니다. 발표 자료에는 양파의 향과 단맛 변화도 포함되었습니다. 평가자는 재료 선택 이유와 조리 결과를 비교했습니다. 수업 종료 후 학생들은 실험 내용을 보고서로 제출했습니다.',
      full: '요리 연구 동아리는 향토 음식 분석 활동을 준비했습니다. 학생들은 조리 순서와 재료 비율을 표준 양식에 정리했습니다. 담당 학생은 양파의 크기와 상태를 관찰 기록으로 남겼습니다. 실습실 위생 기준에 따라 모든 재료는 세척 후 분류되었습니다. 조리대 중앙에는 __FULL__이 별도 용기에 보관되었습니다. 발표 자료에는 양파의 향과 단맛 변화도 포함되었습니다. 평가자는 재료 선택 이유와 조리 결과를 비교했습니다. 수업 종료 후 학생들은 실험 내용을 보고서로 제출했습니다.',
    },
    {
      blank: '식품 안전 교육에서는 향신 재료 관리 방법을 학습했습니다. 강사는 마늘 보관 온도와 건조 조건을 구체적으로 설명했습니다. 참여 학생들은 작은 재료도 정확한 단위로 기록해야 한다고 배웠습니다. 실습 전에는 도마와 칼의 위생 상태를 점검했습니다. 준비 목록에는 __BLANK__이 실습 기본 수량으로 적혀 있었습니다. 조리 과정에서는 마늘의 향이 음식 전체에 미치는 영향도 관찰했습니다. 학생들은 결과 사진과 평가 의견을 개인 파일에 저장했습니다. 마지막에는 재료 관리 원칙을 짧은 발표로 정리했습니다.',
      full: '식품 안전 교육에서는 향신 재료 관리 방법을 학습했습니다. 강사는 마늘 보관 온도와 건조 조건을 구체적으로 설명했습니다. 참여 학생들은 작은 재료도 정확한 단위로 기록해야 한다고 배웠습니다. 실습 전에는 도마와 칼의 위생 상태를 점검했습니다. 준비 목록에는 __FULL__이 실습 기본 수량으로 적혀 있었습니다. 조리 과정에서는 마늘의 향이 음식 전체에 미치는 영향도 관찰했습니다. 학생들은 결과 사진과 평가 의견을 개인 파일에 저장했습니다. 마지막에는 재료 관리 원칙을 짧은 발표로 정리했습니다.',
    },
    {
      blank: '전통 건축 보존 수업에서 학생들은 한옥 마을 자료를 분석했습니다. 담당 교수는 건물 구조와 역사적 가치를 함께 설명했습니다. 조사 팀은 지붕 형태와 기둥 배열을 사진 자료로 기록했습니다. 문화재 관리 문서에는 보수 대상 건축물이 세부 번호로 정리되어 있었습니다. 현장 조사표에는 __BLANK__가 우선 검토 항목으로 표시되었습니다. 학생들은 각 건물의 공간 구성과 생활 방식을 비교했습니다. 이후 복원 예산과 안전 관리 기준도 토론했습니다. 발표 시간에는 전통 주거 문화의 의미를 중심으로 정리했습니다.',
      full: '전통 건축 보존 수업에서 학생들은 한옥 마을 자료를 분석했습니다. 담당 교수는 건물 구조와 역사적 가치를 함께 설명했습니다. 조사 팀은 지붕 형태와 기둥 배열을 사진 자료로 기록했습니다. 문화재 관리 문서에는 보수 대상 건축물이 세부 번호로 정리되어 있었습니다. 현장 조사표에는 __FULL__가 우선 검토 항목으로 표시되었습니다. 학생들은 각 건물의 공간 구성과 생활 방식을 비교했습니다. 이후 복원 예산과 안전 관리 기준도 토론했습니다. 발표 시간에는 전통 주거 문화의 의미를 중심으로 정리했습니다.',
    },
    {
      blank: '도시 재생 프로젝트 회의에서는 노후 주택 현황을 검토했습니다. 행정 담당자는 주민 안전과 생활 환경 개선을 핵심 과제로 제시했습니다. 조사원들은 골목별 주거 상태와 전기 시설 위험도를 기록했습니다. 건축 전문가는 수리 가능성과 철거 필요성을 구분했습니다. 조사 목록에는 __BLANK__가 긴급 관리 대상으로 올라왔습니다. 주민 대표는 임시 거주 지원과 보상 절차를 질문했습니다. 시청 관계자는 예산 배정과 공사 순서를 설명했습니다. 회의 후 자료는 지역 공개 게시판에 등록되었습니다.',
      full: '도시 재생 프로젝트 회의에서는 노후 주택 현황을 검토했습니다. 행정 담당자는 주민 안전과 생활 환경 개선을 핵심 과제로 제시했습니다. 조사원들은 골목별 주거 상태와 전기 시설 위험도를 기록했습니다. 건축 전문가는 수리 가능성과 철거 필요성을 구분했습니다. 조사 목록에는 __FULL__가 긴급 관리 대상으로 올라왔습니다. 주민 대표는 임시 거주 지원과 보상 절차를 질문했습니다. 시청 관계자는 예산 배정과 공사 순서를 설명했습니다. 회의 후 자료는 지역 공개 게시판에 등록되었습니다.',
    },
    {
      blank: '해양 역사 박물관에서는 조선 시대 무역 자료를 전시했습니다. 안내 해설사는 항구 운영 방식과 선박 종류를 설명했습니다. 관람 학생들은 지도와 항로 기록을 비교하며 이동 경로를 분석했습니다. 전시 기록에는 당시 물품 운송에 사용된 배의 수량도 포함되었습니다. 설명판 중앙에는 __BLANK__이 무역 활동 사례로 제시되었습니다. 학생들은 배의 크기와 목적에 따라 명칭이 달라진다는 점을 확인했습니다. 이후 모둠별로 해상 교류의 경제적 의미를 토론했습니다. 마지막 활동에서는 전시 내용을 요약 카드로 작성했습니다.',
      full: '해양 역사 박물관에서는 조선 시대 무역 자료를 전시했습니다. 안내 해설사는 항구 운영 방식과 선박 종류를 설명했습니다. 관람 학생들은 지도와 항로 기록을 비교하며 이동 경로를 분석했습니다. 전시 기록에는 당시 물품 운송에 사용된 배의 수량도 포함되었습니다. 설명판 중앙에는 __FULL__이 무역 활동 사례로 제시되었습니다. 학생들은 배의 크기와 목적에 따라 명칭이 달라진다는 점을 확인했습니다. 이후 모둠별로 해상 교류의 경제적 의미를 토론했습니다. 마지막 활동에서는 전시 내용을 요약 카드로 작성했습니다.',
    },
    {
      blank: '전통 놀이 연구반은 방과 후 장기 대회를 운영했습니다. 학생 대표는 참가 신청서와 경기 순서를 전산 파일로 정리했습니다. 심판 역할을 맡은 학생은 규칙 설명과 시간 관리를 담당했습니다. 예선 결과는 승패 기록표에 정확히 입력되었습니다. 오후 일정에는 __BLANK__이 공식 경기 수로 배정되었습니다. 참가자들은 전략 차이와 판단 과정을 서로 비교했습니다. 지도 교사는 예절과 집중력도 평가 요소라고 설명했습니다. 대회 종료 후 우수 사례는 학급 신문에 실렸습니다.',
      full: '전통 놀이 연구반은 방과 후 장기 대회를 운영했습니다. 학생 대표는 참가 신청서와 경기 순서를 전산 파일로 정리했습니다. 심판 역할을 맡은 학생은 규칙 설명과 시간 관리를 담당했습니다. 예선 결과는 승패 기록표에 정확히 입력되었습니다. 오후 일정에는 __FULL__이 공식 경기 수로 배정되었습니다. 참가자들은 전략 차이와 판단 과정을 서로 비교했습니다. 지도 교사는 예절과 집중력도 평가 요소라고 설명했습니다. 대회 종료 후 우수 사례는 학급 신문에 실렸습니다.',
    },
    {
      blank: '식품 가공 실습에서 학생들은 단백질 재료의 보관 기준을 배웠습니다. 담당 교사는 고기의 온도 관리와 위생 포장 절차를 강조했습니다. 조리 전에는 재료 무게와 절단 상태를 검사표에 입력했습니다. 각 조는 조리 방식에 따라 필요한 분량을 별도로 분리했습니다. 냉장 작업대에는 __BLANK__가 실습용 재료로 준비되었습니다. 학생들은 지방 함량과 식감 변화를 관찰하며 기록했습니다. 조리 결과는 색, 향, 안전 기준에 따라 평가되었습니다. 실습 후 남은 재료는 폐기 규정에 맞게 처리되었습니다.',
      full: '식품 가공 실습에서 학생들은 단백질 재료의 보관 기준을 배웠습니다. 담당 교사는 고기의 온도 관리와 위생 포장 절차를 강조했습니다. 조리 전에는 재료 무게와 절단 상태를 검사표에 입력했습니다. 각 조는 조리 방식에 따라 필요한 분량을 별도로 분리했습니다. 냉장 작업대에는 __FULL__가 실습용 재료로 준비되었습니다. 학생들은 지방 함량과 식감 변화를 관찰하며 기록했습니다. 조리 결과는 색, 향, 안전 기준에 따라 평가되었습니다. 실습 후 남은 재료는 폐기 규정에 맞게 처리되었습니다.',
    },
    {
      blank: '과학 체험관에서는 냉각 실험 프로그램이 진행되었습니다. 강사는 온도 변화와 상태 변화의 관계를 설명했습니다. 학생들은 투명한 용기에 물을 얼린 뒤 모양 변화를 관찰했습니다. 실험 안전 규칙에 따라 장갑과 보호 안경도 착용했습니다. 보관 상자 안에는 __BLANK__가 비교 실험 재료로 준비되었습니다. 학생들은 얼음의 크기와 녹는 시간을 표로 기록했습니다. 결과 분석에서는 표면적과 주변 온도의 영향도 확인했습니다. 수업 마지막에는 실험 결론을 모둠 보고서로 제출했습니다.',
      full: '과학 체험관에서는 냉각 실험 프로그램이 진행되었습니다. 강사는 온도 변화와 상태 변화의 관계를 설명했습니다. 학생들은 투명한 용기에 물을 얼린 뒤 모양 변화를 관찰했습니다. 실험 안전 규칙에 따라 장갑과 보호 안경도 착용했습니다. 보관 상자 안에는 __FULL__가 비교 실험 재료로 준비되었습니다. 학생들은 얼음의 크기와 녹는 시간을 표로 기록했습니다. 결과 분석에서는 표면적과 주변 온도의 영향도 확인했습니다. 수업 마지막에는 실험 결론을 모둠 보고서로 제출했습니다.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '지역 복지관에서는 김장 나눔 행사를 준비했습니다. 자원봉사자는 기부 물품의 수량과 품질을 먼저 확인했습니다. 배추는 크기별로 분류되어 임시 저장 공간에 놓였습니다. 담당자는 조리 일정과 포장 인원을 다시 계산했습니다. 작업 명세서에는 __BLANK__가 기본 배정량으로 적혀 있었습니다. 이후 소금과 양념 재료의 재고도 함께 점검했습니다. 운영 책임자는 부족한 물품을 즉시 구매하라고 지시했습니다. 행사 계획서는 최종 승인 후 참여자에게 공지되었습니다.',
      full: '지역 복지관에서는 김장 나눔 행사를 준비했습니다. 자원봉사자는 기부 물품의 수량과 품질을 먼저 확인했습니다. 배추는 크기별로 분류되어 임시 저장 공간에 놓였습니다. 담당자는 조리 일정과 포장 인원을 다시 계산했습니다. 작업 명세서에는 __FULL__가 기본 배정량으로 적혀 있었습니다. 이후 소금과 양념 재료의 재고도 함께 점검했습니다. 운영 책임자는 부족한 물품을 즉시 구매하라고 지시했습니다. 행사 계획서는 최종 승인 후 참여자에게 공지되었습니다.',
    },
    {
      blank: '학교 식생활 교육에서는 전통 국물 요리 조사를 진행했습니다. 학생들은 재료별 기능과 영양 정보를 발표 자료로 정리했습니다. 무는 시원한 맛을 내는 재료로 설명되었습니다. 조리 담당 조는 재료 손질 순서와 보관 방법을 기록했습니다. 실습 계획표에는 __BLANK__가 필수 재료로 표시되었습니다. 다른 조는 파와 고추의 사용량을 비교했습니다. 선생님은 정확한 단위 표현이 보고서의 신뢰도를 높인다고 말했습니다. 수업 후 학생들은 결과를 온라인 게시판에 제출했습니다.',
      full: '학교 식생활 교육에서는 전통 국물 요리 조사를 진행했습니다. 학생들은 재료별 기능과 영양 정보를 발표 자료로 정리했습니다. 무는 시원한 맛을 내는 재료로 설명되었습니다. 조리 담당 조는 재료 손질 순서와 보관 방법을 기록했습니다. 실습 계획표에는 __FULL__가 필수 재료로 표시되었습니다. 다른 조는 파와 고추의 사용량을 비교했습니다. 선생님은 정확한 단위 표현이 보고서의 신뢰도를 높인다고 말했습니다. 수업 후 학생들은 결과를 온라인 게시판에 제출했습니다.',
    },
    {
      blank: '소규모 요리 실험반은 양념 비율 분석 활동을 했습니다. 연구 담당 학생은 양파의 당도와 향 변화를 관찰했습니다. 재료는 실험 조건에 따라 같은 크기로 절단되었습니다. 위생 담당자는 용기 번호와 재료 상태를 검사표에 기록했습니다. 분석 대상에는 __BLANK__이 기본 표본으로 포함되었습니다. 학생들은 익힌 양파와 생양파의 차이를 비교했습니다. 실험 결과는 그래프와 설명 문장으로 정리되었습니다. 마지막 보고서에는 단위명사 사용 이유도 함께 작성되었습니다.',
      full: '소규모 요리 실험반은 양념 비율 분석 활동을 했습니다. 연구 담당 학생은 양파의 당도와 향 변화를 관찰했습니다. 재료는 실험 조건에 따라 같은 크기로 절단되었습니다. 위생 담당자는 용기 번호와 재료 상태를 검사표에 기록했습니다. 분석 대상에는 __FULL__이 기본 표본으로 포함되었습니다. 학생들은 익힌 양파와 생양파의 차이를 비교했습니다. 실험 결과는 그래프와 설명 문장으로 정리되었습니다. 마지막 보고서에는 단위명사 사용 이유도 함께 작성되었습니다.',
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
      blank: '공원에서 안내견 체험 행사가 열렸어요. 학생들은 진행자의 지시를 듣고 조용히 줄을 섰어요. 한 학생이 손등을 보이며 강아지 쪽으로 천천히 ___. 강아지가 놀라지 않아서 모두 안심했어요.',
      full: '공원에서 안내견 체험 행사가 열렸어요. 학생들은 진행자의 지시를 듣고 조용히 줄을 섰어요. 한 학생이 손등을 보이며 강아지 쪽으로 천천히 다가갔어요. 강아지가 놀라지 않아서 모두 안심했어요.',
    },
    {
      blank: '버스 정류장 앞에서 반 친구들이 견학 차량을 기다렸어요. 전광판에는 도착 시간이 곧 바뀐다고 나왔어요. 담임 선생님은 버스가 우리 쪽으로 ___. 학생들은 교통 카드를 미리 꺼냈어요.',
      full: '버스 정류장 앞에서 반 친구들이 견학 차량을 기다렸어요. 전광판에는 도착 시간이 곧 바뀐다고 나왔어요. 담임 선생님은 버스가 우리 쪽으로 다가올 거예요. 학생들은 교통 카드를 미리 꺼냈어요.',
    },
    {
      blank: '전시관 입구에 관람객이 너무 가까이 모였어요. 안전 요원이 사진 촬영 구역을 다시 설명했어요. 사람들은 안내선을 보고 뒤쪽으로 ___. 그 뒤에 아이들이 편하게 작품을 볼 수 있었어요.',
      full: '전시관 입구에 관람객이 너무 가까이 모였어요. 안전 요원이 사진 촬영 구역을 다시 설명했어요. 사람들은 안내선을 보고 뒤쪽으로 물러갔어요. 그 뒤에 아이들이 편하게 작품을 볼 수 있었어요.',
    },
    {
      blank: '놀이터에서 공이 갑자기 크게 튀었어요. 동생은 공이 자기 발 앞으로 오는 것을 보고 놀랐어요. 그는 바로 제 뒤쪽으로 ___. 저는 괜찮다고 말하며 공을 주워 왔어요.',
      full: '놀이터에서 공이 갑자기 크게 튀었어요. 동생은 공이 자기 발 앞으로 오는 것을 보고 놀랐어요. 그는 바로 제 뒤쪽으로 물러와요. 저는 괜찮다고 말하며 공을 주워 왔어요.',
    },
    {
      blank: '친구 가족은 다음 주에 다른 도시로 이사해요. 우리는 마지막 수업 후 작은 편지를 준비했어요. 친구는 곧 우리 동네를 ___. 그래서 반 친구들은 마지막 사진을 함께 찍었어요.',
      full: '친구 가족은 다음 주에 다른 도시로 이사해요. 우리는 마지막 수업 후 작은 편지를 준비했어요. 친구는 곧 우리 동네를 떠나갈 거예요. 그래서 반 친구들은 마지막 사진을 함께 찍었어요.',
    },
    {
      blank: '저는 작년에 바닷가 마을에서 서울로 이사했어요. 처음에는 가족과 떨어져 지내는 것이 힘들었어요. 대학 입학 때문에 고향을 ___. 지금은 새 기숙사 생활에 조금 익숙해졌어요.',
      full: '저는 작년에 바닷가 마을에서 서울로 이사했어요. 처음에는 가족과 떨어져 지내는 것이 힘들었어요. 대학 입학 때문에 고향을 떠나왔어요. 지금은 새 기숙사 생활에 조금 익숙해졌어요.',
    },
    {
      blank: '비가 많이 온 뒤 계곡 물이 빠르게 불었어요. 관리 직원은 아이들에게 물가에 가까이 가지 말라고 했어요. 강물이 산 아래에서 바다 쪽으로 ___. 학생들은 물의 방향을 지도에 표시했어요.',
      full: '비가 많이 온 뒤 계곡 물이 빠르게 불었어요. 관리 직원은 아이들에게 물가에 가까이 가지 말라고 했어요. 강물이 산 아래에서 바다 쪽으로 흘러가요. 학생들은 물의 방향을 지도에 표시했어요.',
    },
    {
      blank: '음악실 창문이 조금 열려 있었어요. 옆 반에서는 졸업식 노래 연습이 진행됐어요. 부드러운 노래 소리가 우리 교실 안으로 ___. 학생들은 잠시 조용히 그 소리를 들었어요.',
      full: '음악실 창문이 조금 열려 있었어요. 옆 반에서는 졸업식 노래 연습이 진행됐어요. 부드러운 노래 소리가 우리 교실 안으로 흘러왔어요. 학생들은 잠시 조용히 그 소리를 들었어요.',
    },
    {
      blank: '소방 훈련 중 학생들이 건물 입구에 너무 가까이 섰어요. 담당 교사는 안전 구역 안쪽으로 이동하라고 말했어요. 아이들은 잠시 뒤 안내 교사 쪽으로 ___. 훈련은 차분하게 계속 진행됐어요.',
      full: '소방 훈련 중 학생들이 건물 입구에 너무 가까이 섰어요. 담당 교사는 안전 구역 안쪽으로 이동하라고 말했어요. 아이들은 잠시 뒤 안내 교사 쪽으로 물러올 거예요. 훈련은 차분하게 계속 진행됐어요.',
    },
    {
      blank: '프로젝트 제출일이 이번 주 금요일이에요. 팀원들은 남은 자료와 발표 순서를 점검했어요. 마감 시간이 빠르게 ___. 그래서 우리는 오늘 회의에서 역할을 다시 나누었어요.',
      full: '프로젝트 제출일이 이번 주 금요일이에요. 팀원들은 남은 자료와 발표 순서를 점검했어요. 마감 시간이 빠르게 다가와요. 그래서 우리는 오늘 회의에서 역할을 다시 나누었어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '동생이 작은 새를 보고 발걸음을 멈췄어요. 새가 놀라지 않도록 목소리를 낮췄어요. 동생은 새 쪽으로 천천히 ___. 새는 잠시 뒤 나뭇가지 위로 날아갔어요.',
      full: '동생이 작은 새를 보고 발걸음을 멈췄어요. 새가 놀라지 않도록 목소리를 낮췄어요. 동생은 새 쪽으로 천천히 다가갔어요. 새는 잠시 뒤 나뭇가지 위로 날아갔어요.',
    },
    {
      blank: '저는 정류장에서 친구와 버스를 기다렸어요. 멀리서 버스 번호가 보이기 시작했어요. 버스가 우리 쪽으로 ___. 우리는 가방을 들고 승차 준비를 했어요.',
      full: '저는 정류장에서 친구와 버스를 기다렸어요. 멀리서 버스 번호가 보이기 시작했어요. 버스가 우리 쪽으로 다가올 거예요. 우리는 가방을 들고 승차 준비를 했어요.',
    },
    {
      blank: '학생들이 무대 앞에 너무 가까이 모였어요. 선생님은 사진 촬영 후 조금 뒤로 가라고 했어요. 학생들은 표시된 선 밖으로 ___. 그다음 다른 반 학생들이 무대에 올라왔어요.',
      full: '학생들이 무대 앞에 너무 가까이 모였어요. 선생님은 사진 촬영 후 조금 뒤로 가라고 했어요. 학생들은 표시된 선 밖으로 물러갔어요. 그다음 다른 반 학생들이 무대에 올라왔어요.',
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
function movementLevel4Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '체육 시간에 학생들이 운동장 정리 활동을 했어요. 축구공은 골대 옆에 놓여 있었어요. 바람이 불자 공이 천천히 움직이기 시작했어요. 잠시 뒤 공이 운동장 끝으로 ___. 담당 학생은 공을 다시 주우러 갔어요. 선생님은 안전 구역 안에서만 뛰라고 안내했어요.',
      full: '체육 시간에 학생들이 운동장 정리 활동을 했어요. 축구공은 골대 옆에 놓여 있었어요. 바람이 불자 공이 천천히 움직이기 시작했어요. 잠시 뒤 공이 운동장 끝으로 굴러갔어요. 담당 학생은 공을 다시 주우러 갔어요. 선생님은 안전 구역 안에서만 뛰라고 안내했어요.',
    },
    {
      blank: '과학 수업에서 학생들은 작은 동전의 움직임을 관찰했어요. 책상 한쪽을 살짝 높여 경사면을 만들었어요. 민지는 아래쪽에서 결과를 기록하고 있었어요. 선생님이 손을 놓으면 동전이 민지 발밑으로 ___. 학생들은 속도 변화를 표에 적을 거예요. 실험 뒤에는 책상을 원래대로 정리할 거예요.',
      full: '과학 수업에서 학생들은 작은 동전의 움직임을 관찰했어요. 책상 한쪽을 살짝 높여 경사면을 만들었어요. 민지는 아래쪽에서 결과를 기록하고 있었어요. 선생님이 손을 놓으면 동전이 민지 발밑으로 굴러올 거예요. 학생들은 속도 변화를 표에 적을 거예요. 실험 뒤에는 책상을 원래대로 정리할 거예요.',
    },
    {
      blank: '운동장 한쪽에서 종이비행기 대회가 열렸어요. 학생들은 날개 각도를 조금씩 다르게 접었어요. 지훈이는 출발선에서 멀리 던질 준비를 했어요. 그의 종이비행기가 운동장 밖으로 ___. 친구들은 이동 방향과 거리를 함께 확인했어요. 마지막에는 가장 멀리 간 비행기를 기록했어요.',
      full: '운동장 한쪽에서 종이비행기 대회가 열렸어요. 학생들은 날개 각도를 조금씩 다르게 접었어요. 지훈이는 출발선에서 멀리 던질 준비를 했어요. 그의 종이비행기가 운동장 밖으로 날아가요. 친구들은 이동 방향과 거리를 함께 확인했어요. 마지막에는 가장 멀리 간 비행기를 기록했어요.',
    },
    {
      blank: '가을 독서 시간에 창문이 조금 열려 있었어요. 바깥 복도에서는 낙엽이 바람에 흔들렸어요. 학생들은 조용히 책을 읽고 있었어요. 갑자기 낙엽 한 장이 제 책상 위로 ___. 저는 책갈피처럼 보이는 그 잎을 조심히 치웠어요. 선생님은 창문을 조금 닫아 주셨어요.',
      full: '가을 독서 시간에 창문이 조금 열려 있었어요. 바깥 복도에서는 낙엽이 바람에 흔들렸어요. 학생들은 조용히 책을 읽고 있었어요. 갑자기 낙엽 한 장이 제 책상 위로 날아왔어요. 저는 책갈피처럼 보이는 그 잎을 조심히 치웠어요. 선생님은 창문을 조금 닫아 주셨어요.',
    },
    {
      blank: '아침 조회 전에 학교 정문이 붐볐어요. 안내 방송에서 버스 도착 시간이 바뀌었다고 나왔어요. 현우는 친구에게 급히 손을 흔들었어요. 잠시 뒤 현우가 정문으로 ___. 그는 안내 표지판을 다시 확인할 거예요. 친구들은 늦지 않게 줄을 맞추기로 했어요.',
      full: '아침 조회 전에 학교 정문이 붐볐어요. 안내 방송에서 버스 도착 시간이 바뀌었다고 나왔어요. 현우는 친구에게 급히 손을 흔들었어요. 잠시 뒤 현우가 정문으로 뛰어갈 거예요. 그는 안내 표지판을 다시 확인할 거예요. 친구들은 늦지 않게 줄을 맞추기로 했어요.',
    },
    {
      blank: '놀이터에서 동생이 모래 놀이를 하고 있었어요. 저는 벤치에 앉아 물병과 가방을 지켰어요. 갑자기 비가 조금씩 내리기 시작했어요. 동생이 놀이터에서 제 쪽으로 ___. 저는 우산을 펴고 동생의 손을 잡았어요. 우리는 젖기 전에 집으로 돌아갔어요.',
      full: '놀이터에서 동생이 모래 놀이를 하고 있었어요. 저는 벤치에 앉아 물병과 가방을 지켰어요. 갑자기 비가 조금씩 내리기 시작했어요. 동생이 놀이터에서 제 쪽으로 뛰어와요. 저는 우산을 펴고 동생의 손을 잡았어요. 우리는 젖기 전에 집으로 돌아갔어요.',
    },
    {
      blank: '주말 아침에 할머니는 시장에 가려고 준비했어요. 버스가 늦어서 조금 걸어가기로 했어요. 저는 할머니 가방을 대신 들어 드렸어요. 할머니가 천천히 시장 입구까지 ___. 길에는 사람이 많아서 조심히 움직였어요. 장을 본 뒤 우리는 집으로 택시를 탔어요.',
      full: '주말 아침에 할머니는 시장에 가려고 준비했어요. 버스가 늦어서 조금 걸어가기로 했어요. 저는 할머니 가방을 대신 들어 드렸어요. 할머니가 천천히 시장 입구까지 걸어갔어요. 길에는 사람이 많아서 조심히 움직였어요. 장을 본 뒤 우리는 집으로 택시를 탔어요.',
    },
    {
      blank: '도서관 모둠 학습 시간이 곧 시작될 예정이에요. 친구는 자료실에서 지도 책을 찾고 있어요. 우리는 창가 자리에 앉아 발표 순서를 정했어요. 잠시 후 친구가 도서관 앞에서 우리 자리로 ___. 그 친구가 오면 역할 분담표를 완성할 거예요. 발표 연습은 조용한 방에서 진행될 거예요.',
      full: '도서관 모둠 학습 시간이 곧 시작될 예정이에요. 친구는 자료실에서 지도 책을 찾고 있어요. 우리는 창가 자리에 앉아 발표 순서를 정했어요. 잠시 후 친구가 도서관 앞에서 우리 자리로 걸어올 거예요. 그 친구가 오면 역할 분담표를 완성할 거예요. 발표 연습은 조용한 방에서 진행될 거예요.',
    },
    {
      blank: '생태 체험 시간에 작은 거북이를 관찰했어요. 학생들은 안전선을 넘지 않고 조용히 앉았어요. 거북이는 모래 위에서 머리를 내밀었어요. 잠시 뒤 작은 거북이가 모래 언덕 쪽으로 ___. 기록 담당은 이동 시간을 초 단위로 적었어요. 수업 후에는 거북이를 원래 장소에 두었어요.',
      full: '생태 체험 시간에 작은 거북이를 관찰했어요. 학생들은 안전선을 넘지 않고 조용히 앉았어요. 거북이는 모래 위에서 머리를 내밀었어요. 잠시 뒤 작은 거북이가 모래 언덕 쪽으로 기어가요. 기록 담당은 이동 시간을 초 단위로 적었어요. 수업 후에는 거북이를 원래 장소에 두었어요.',
    },
    {
      blank: '아기 발달 상담실에는 부드러운 매트가 깔려 있었어요. 상담사는 장난감을 엄마 옆에 놓았어요. 아기는 처음에는 낯선 공간을 바라보기만 했어요. 잠시 뒤 아기가 장난감을 보고 엄마 쪽으로 ___. 엄마는 그 모습을 보고 마음이 놓였어요. 상담사는 자연스러운 움직임을 칭찬했어요.',
      full: '아기 발달 상담실에는 부드러운 매트가 깔려 있었어요. 상담사는 장난감을 엄마 옆에 놓았어요. 아기는 처음에는 낯선 공간을 바라보기만 했어요. 잠시 뒤 아기가 장난감을 보고 엄마 쪽으로 기어왔어요. 엄마는 그 모습을 보고 마음이 놓였어요. 상담사는 자연스러운 움직임을 칭찬했어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '체육 창고 앞에 작은 공이 놓여 있었어요. 문을 여는 순간 바람이 세게 들어왔어요. 공은 바닥 위에서 천천히 움직였어요. 결국 공이 복도 끝으로 ___. 학생은 공을 주워 창고 안에 다시 넣었어요. 선생님은 창고 문을 꼭 닫으라고 했어요.',
      full: '체육 창고 앞에 작은 공이 놓여 있었어요. 문을 여는 순간 바람이 세게 들어왔어요. 공은 바닥 위에서 천천히 움직였어요. 결국 공이 복도 끝으로 굴러갔어요. 학생은 공을 주워 창고 안에 다시 넣었어요. 선생님은 창고 문을 꼭 닫으라고 했어요.',
    },
    {
      blank: '수학 수업에서 둥근 구슬 실험을 했어요. 책상 위에는 짧은 경사판이 놓여 있었어요. 저는 경사판 아래에서 구슬을 기다렸어요. 잠시 후 구슬이 제 손가락 쪽으로 ___. 친구는 시간을 재고 결과를 공책에 썼어요. 모두 같은 방법으로 한 번 더 실험했어요.',
      full: '수학 수업에서 둥근 구슬 실험을 했어요. 책상 위에는 짧은 경사판이 놓여 있었어요. 저는 경사판 아래에서 구슬을 기다렸어요. 잠시 후 구슬이 제 손가락 쪽으로 굴러올 거예요. 친구는 시간을 재고 결과를 공책에 썼어요. 모두 같은 방법으로 한 번 더 실험했어요.',
    },
    {
      blank: '미술 시간에 학생들은 종이비행기를 꾸몄어요. 각자 이름표와 색종이를 붙였어요. 지민이는 완성한 비행기를 창가 쪽에서 던졌어요. 종이비행기가 복도 방향으로 ___. 친구들은 비행기가 간 길을 웃으며 따라갔어요. 선생님은 던질 때 사람을 향하지 말라고 했어요.',
      full: '미술 시간에 학생들은 종이비행기를 꾸몄어요. 각자 이름표와 색종이를 붙였어요. 지민이는 완성한 비행기를 창가 쪽에서 던졌어요. 종이비행기가 복도 방향으로 날아가요. 친구들은 비행기가 간 길을 웃으며 따라갔어요. 선생님은 던질 때 사람을 향하지 말라고 했어요.',
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

function movementLevel5Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '생물 관찰 실험실에서는 곤충 이동 반응 분석이 진행되었습니다. 담당 교사는 투명 관찰함의 습도와 조도 조건을 먼저 확인했습니다. 학생들은 표본 위치를 지도처럼 그려 관찰 기록표에 표시했습니다. 실험 시작 후 곤충이 투명 관찰함 아래로 ___. 연구 조교는 이동 시간과 경로 변화를 초 단위로 입력했습니다. 갑작스러운 진동을 줄이기 위해 주변 장비 전원도 잠시 낮추었습니다. 학생들은 환경 조건이 행동 변화에 미치는 영향을 토론했습니다. 실험 종료 후 개체는 원래 서식 공간으로 안전하게 옮겨졌습니다.',
      full: '생물 관찰 실험실에서는 곤충 이동 반응 분석이 진행되었습니다. 담당 교사는 투명 관찰함의 습도와 조도 조건을 먼저 확인했습니다. 학생들은 표본 위치를 지도처럼 그려 관찰 기록표에 표시했습니다. 실험 시작 후 곤충이 투명 관찰함 아래로 기어내려갔어요. 연구 조교는 이동 시간과 경로 변화를 초 단위로 입력했습니다. 갑작스러운 진동을 줄이기 위해 주변 장비 전원도 잠시 낮추었습니다. 학생들은 환경 조건이 행동 변화에 미치는 영향을 토론했습니다. 실험 종료 후 개체는 원래 서식 공간으로 안전하게 옮겨졌습니다.',
    },
    {
      blank: '도심 구조 훈련에서는 지붕 위 동물 구조 상황을 가정했습니다. 안전 책임자는 사다리 고정 상태와 접근 통제선을 확인했습니다. 작은 고양이는 아래 난간에서 움직이지 않고 주변을 살폈습니다. 구조대가 간식을 보이면 고양이가 지붕 위로 ___. 현장 요원은 동물의 공포 반응을 줄이기 위해 소음을 제한했습니다. 주민들은 통제선 밖에서 조용히 결과를 기다렸습니다. 구조 과정은 안전 교육 영상 자료로 기록될 예정입니다. 훈련 뒤에는 장비 점검 보고서가 작성될 것입니다.',
      full: '도심 구조 훈련에서는 지붕 위 동물 구조 상황을 가정했습니다. 안전 책임자는 사다리 고정 상태와 접근 통제선을 확인했습니다. 작은 고양이는 아래 난간에서 움직이지 않고 주변을 살폈습니다. 구조대가 간식을 보이면 고양이가 지붕 위로 기어올라올 거예요. 현장 요원은 동물의 공포 반응을 줄이기 위해 소음을 제한했습니다. 주민들은 통제선 밖에서 조용히 결과를 기다렸습니다. 구조 과정은 안전 교육 영상 자료로 기록될 예정입니다. 훈련 뒤에는 장비 점검 보고서가 작성될 것입니다.',
    },
    {
      blank: '지역 축제 현장에서는 전기 장치 이상으로 안전 방송이 나왔습니다. 운영 본부는 관람객 동선을 분리하고 대피 구역을 지정했습니다. 의료 지원팀은 무대 뒤에서 응급 장비를 준비했습니다. 그 순간 구조대원이 사고 현장으로 ___. 행사 책임자는 참가자에게 침착하게 이동하라고 안내했습니다. 자원봉사자는 어린이와 노약자를 먼저 보호 구역으로 데려갔습니다. 기술팀은 전원 차단 원인을 세부적으로 조사했습니다. 최종 결과는 다음 운영 회의에서 보고될 예정입니다.',
      full: '지역 축제 현장에서는 전기 장치 이상으로 안전 방송이 나왔습니다. 운영 본부는 관람객 동선을 분리하고 대피 구역을 지정했습니다. 의료 지원팀은 무대 뒤에서 응급 장비를 준비했습니다. 그 순간 구조대원이 사고 현장으로 달려가요. 행사 책임자는 참가자에게 침착하게 이동하라고 안내했습니다. 자원봉사자는 어린이와 노약자를 먼저 보호 구역으로 데려갔습니다. 기술팀은 전원 차단 원인을 세부적으로 조사했습니다. 최종 결과는 다음 운영 회의에서 보고될 예정입니다.',
    },
    {
      blank: '국제 학술 세미나 접수대에는 참가자 문의가 계속 이어졌습니다. 외국인 발표자는 회의실 위치를 찾지 못해 일정 지연을 걱정했습니다. 안내 직원은 무전기로 담당자를 즉시 호출했습니다. 몇 초 뒤 담당 직원이 안내 데스크로 ___. 그는 발표자의 신분 확인과 자료 배부를 빠르게 처리했습니다. 통역 봉사자는 이동 경로를 한국어와 영어로 다시 설명했습니다. 운영팀은 유사 상황을 대비해 안내 표지를 추가하기로 했습니다. 세미나는 예정 시간에 맞춰 정상적으로 시작되었습니다.',
      full: '국제 학술 세미나 접수대에는 참가자 문의가 계속 이어졌습니다. 외국인 발표자는 회의실 위치를 찾지 못해 일정 지연을 걱정했습니다. 안내 직원은 무전기로 담당자를 즉시 호출했습니다. 몇 초 뒤 담당 직원이 안내 데스크로 달려왔어요. 그는 발표자의 신분 확인과 자료 배부를 빠르게 처리했습니다. 통역 봉사자는 이동 경로를 한국어와 영어로 다시 설명했습니다. 운영팀은 유사 상황을 대비해 안내 표지를 추가하기로 했습니다. 세미나는 예정 시간에 맞춰 정상적으로 시작되었습니다.',
    },
    {
      blank: '수영 대회 결승전은 안전 요원의 감독 아래 진행될 예정입니다. 선수들은 출발 전 심박수와 컨디션을 의료 기록표로 확인했습니다. 심판은 수로 방향과 제한 구역을 반복해서 설명했습니다. 신호가 울리면 선수가 안전선 반대편으로 ___. 코치는 호흡 조절과 팔 동작을 마지막으로 점검했습니다. 관중석에서는 학교 대표팀을 응원하는 소리가 커졌습니다. 경기 기록은 전자 계측 시스템에 자동 저장될 것입니다. 결과 발표 후 선수들은 회복 구역에서 휴식할 예정입니다.',
      full: '수영 대회 결승전은 안전 요원의 감독 아래 진행될 예정입니다. 선수들은 출발 전 심박수와 컨디션을 의료 기록표로 확인했습니다. 심판은 수로 방향과 제한 구역을 반복해서 설명했습니다. 신호가 울리면 선수가 안전선 반대편으로 헤엄쳐갈 거예요. 코치는 호흡 조절과 팔 동작을 마지막으로 점검했습니다. 관중석에서는 학교 대표팀을 응원하는 소리가 커졌습니다. 경기 기록은 전자 계측 시스템에 자동 저장될 것입니다. 결과 발표 후 선수들은 회복 구역에서 휴식할 예정입니다.',
    },
    {
      blank: '환경 교육 수업에서 학생들은 강가 생태계 자료를 분석했습니다. 지도 교사는 물새 행동과 서식 환경의 관계를 설명했습니다. 관찰 지점 주변에는 소음 방지 표지와 안전선이 설치되었습니다. 잠시 뒤 오리가 관찰 지점 가까이 ___. 학생들은 놀라지 않도록 목소리를 낮추고 움직임을 줄였습니다. 기록 담당은 이동 거리와 방향을 관찰표에 적었습니다. 사진 자료는 위치 정보와 개인 정보를 제외하고 저장되었습니다. 활동 후 학생들은 생태 보호 필요성을 발표했습니다.',
      full: '환경 교육 수업에서 학생들은 강가 생태계 자료를 분석했습니다. 지도 교사는 물새 행동과 서식 환경의 관계를 설명했습니다. 관찰 지점 주변에는 소음 방지 표지와 안전선이 설치되었습니다. 잠시 뒤 오리가 관찰 지점 가까이 헤엄쳐와요. 학생들은 놀라지 않도록 목소리를 낮추고 움직임을 줄였습니다. 기록 담당은 이동 거리와 방향을 관찰표에 적었습니다. 사진 자료는 위치 정보와 개인 정보를 제외하고 저장되었습니다. 활동 후 학생들은 생태 보호 필요성을 발표했습니다.',
    },
    {
      blank: '대학 연구팀은 노후 분석 장비 교체 계획을 확정했습니다. 기존 실험실은 공간이 좁고 환기 시설도 부족했습니다. 신규 실험실에는 안전 장치와 정밀 분석 장비가 추가되었습니다. 지난주부터 연구팀이 신규 실험실로 ___. 행정 담당자는 장비 이전 일정과 책임자를 문서로 정리했습니다. 학생 연구원들은 시료 보관 위치를 다시 확인했습니다. 이전 과정 중 데이터 손실을 막기 위해 백업도 진행되었습니다. 다음 달부터 모든 실험은 새 공간에서 운영될 예정입니다.',
      full: '대학 연구팀은 노후 분석 장비 교체 계획을 확정했습니다. 기존 실험실은 공간이 좁고 환기 시설도 부족했습니다. 신규 실험실에는 안전 장치와 정밀 분석 장비가 추가되었습니다. 지난주부터 연구팀이 신규 실험실로 옮겨갔어요. 행정 담당자는 장비 이전 일정과 책임자를 문서로 정리했습니다. 학생 연구원들은 시료 보관 위치를 다시 확인했습니다. 이전 과정 중 데이터 손실을 막기 위해 백업도 진행되었습니다. 다음 달부터 모든 실험은 새 공간에서 운영될 예정입니다.',
    },
    {
      blank: '기관의 디지털 전환 사업은 단계별 일정에 따라 추진되고 있습니다. 기존 자료는 여러 서버에 나뉘어 저장되어 있었습니다. 보안 담당자는 접근 권한과 저장 용량을 먼저 점검했습니다. 다음 주에 자료가 중앙 서버로 ___. 개발팀은 이전 과정에서 오류 기록을 실시간으로 확인할 예정입니다. 운영 부서는 사용자 접속 중단 시간을 최소화하려고 합니다. 이전 완료 후에는 검색 속도와 안정성을 비교 분석합니다. 최종 보고서는 관리자 회의에서 공유될 것입니다.',
      full: '기관의 디지털 전환 사업은 단계별 일정에 따라 추진되고 있습니다. 기존 자료는 여러 서버에 나뉘어 저장되어 있었습니다. 보안 담당자는 접근 권한과 저장 용량을 먼저 점검했습니다. 다음 주에 자료가 중앙 서버로 옮겨올 거예요. 개발팀은 이전 과정에서 오류 기록을 실시간으로 확인할 예정입니다. 운영 부서는 사용자 접속 중단 시간을 최소화하려고 합니다. 이전 완료 후에는 검색 속도와 안정성을 비교 분석합니다. 최종 보고서는 관리자 회의에서 공유될 것입니다.',
    },
    {
      blank: '전시회 참가자들은 본관 공사로 인해 임시 회의실을 사용했습니다. 운영 요원은 입구에서 출입 명단과 좌석 배치를 확인했습니다. 발표 자료는 이미 이동식 화면에 연결되어 있었습니다. 안내 방송 후 참가자들이 임시 회의실로 ___. 진행자는 이동이 끝난 뒤 발표 순서를 다시 설명했습니다. 보안 담당자는 비상구 위치와 안전 규정을 안내했습니다. 회의 내용은 기록 시스템에 자동 저장되었습니다. 참가자들은 종료 후 설문 조사에도 응답했습니다.',
      full: '전시회 참가자들은 본관 공사로 인해 임시 회의실을 사용했습니다. 운영 요원은 입구에서 출입 명단과 좌석 배치를 확인했습니다. 발표 자료는 이미 이동식 화면에 연결되어 있었습니다. 안내 방송 후 참가자들이 임시 회의실로 이동해요. 진행자는 이동이 끝난 뒤 발표 순서를 다시 설명했습니다. 보안 담당자는 비상구 위치와 안전 규정을 안내했습니다. 회의 내용은 기록 시스템에 자동 저장되었습니다. 참가자들은 종료 후 설문 조사에도 응답했습니다.',
    },
    {
      blank: '시외 버스 터미널에서는 주말 임시 노선이 운영되었습니다. 교통 관리자는 승객 수와 차량 배차표를 계속 확인했습니다. 안내 화면에는 출발 시각과 탑승 구역이 크게 표시되었습니다. 버스가 정해진 시각에 ___. 승객들은 좌석 번호와 안전벨트를 다시 확인했습니다. 직원은 지연 문의를 줄이기 위해 방송을 반복했습니다. 운행 기록은 교통 관리 시스템에 저장되었습니다. 다음 노선은 기상 상황에 따라 조정될 예정입니다.',
      full: '시외 버스 터미널에서는 주말 임시 노선이 운영되었습니다. 교통 관리자는 승객 수와 차량 배차표를 계속 확인했습니다. 안내 화면에는 출발 시각과 탑승 구역이 크게 표시되었습니다. 버스가 정해진 시각에 출발했어요. 승객들은 좌석 번호와 안전벨트를 다시 확인했습니다. 직원은 지연 문의를 줄이기 위해 방송을 반복했습니다. 운행 기록은 교통 관리 시스템에 저장되었습니다. 다음 노선은 기상 상황에 따라 조정될 예정입니다.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '철도 관제실에서는 아침 운행 상황을 실시간으로 분석했습니다. 안내 직원은 다음 정차역과 환승 정보를 방송했습니다. 승객들은 승강장 안전선 뒤에서 차분히 기다렸습니다. 몇 분 뒤 기차가 다음 역에 ___. 역무원은 하차 인원을 확인하고 안내 표지를 정리했습니다. 지연 기록은 교통 관리 시스템에 자동 저장되었습니다. 다음 열차의 배차 간격도 함께 조정되었습니다. 승객 안내 문자는 곧 발송될 예정입니다.',
      full: '철도 관제실에서는 아침 운행 상황을 실시간으로 분석했습니다. 안내 직원은 다음 정차역과 환승 정보를 방송했습니다. 승객들은 승강장 안전선 뒤에서 차분히 기다렸습니다. 몇 분 뒤 기차가 다음 역에 도착했어요. 역무원은 하차 인원을 확인하고 안내 표지를 정리했습니다. 지연 기록은 교통 관리 시스템에 자동 저장되었습니다. 다음 열차의 배차 간격도 함께 조정되었습니다. 승객 안내 문자는 곧 발송될 예정입니다.',
    },
    {
      blank: '생물 실습반은 비가 온 뒤 곤충 이동 경로를 조사했습니다. 나무 기둥에는 물방울이 남아 있어 표면이 조금 미끄러웠습니다. 학생들은 확대경과 기록지를 준비하고 조용히 관찰했습니다. 잠시 후 곤충이 나무 아래쪽으로 ___. 지도 교사는 방향 변화와 이동 속도를 따로 기록하라고 했습니다. 학생들은 주변 온도와 습도도 함께 측정했습니다. 관찰 결과는 다음 과학 발표 자료에 포함됩니다. 실습 뒤에는 주변 환경을 원래 상태로 정리했습니다.',
      full: '생물 실습반은 비가 온 뒤 곤충 이동 경로를 조사했습니다. 나무 기둥에는 물방울이 남아 있어 표면이 조금 미끄러웠습니다. 학생들은 확대경과 기록지를 준비하고 조용히 관찰했습니다. 잠시 후 곤충이 나무 아래쪽으로 기어내려갔어요. 지도 교사는 방향 변화와 이동 속도를 따로 기록하라고 했습니다. 학생들은 주변 온도와 습도도 함께 측정했습니다. 관찰 결과는 다음 과학 발표 자료에 포함됩니다. 실습 뒤에는 주변 환경을 원래 상태로 정리했습니다.',
    },
    {
      blank: '안전 훈련에서는 높은 구조물 접근 상황을 가정했습니다. 구조대는 장비 점검표와 통신 상태를 먼저 확인했습니다. 작은 고양이는 낮은 난간에서 위쪽을 바라보고 있었습니다. 구조 요원이 손을 내밀면 고양이가 지붕 위로 ___. 현장 책임자는 불필요한 소음을 줄이라고 지시했습니다. 학생 참관단은 안전선 밖에서 구조 절차를 관찰했습니다. 훈련 영상은 동물 구조 교육 자료로 활용될 것입니다. 종료 후 모든 장비는 보관실로 이동합니다.',
      full: '안전 훈련에서는 높은 구조물 접근 상황을 가정했습니다. 구조대는 장비 점검표와 통신 상태를 먼저 확인했습니다. 작은 고양이는 낮은 난간에서 위쪽을 바라보고 있었습니다. 구조 요원이 손을 내밀면 고양이가 지붕 위로 기어올라올 거예요. 현장 책임자는 불필요한 소음을 줄이라고 지시했습니다. 학생 참관단은 안전선 밖에서 구조 절차를 관찰했습니다. 훈련 영상은 동물 구조 교육 자료로 활용될 것입니다. 종료 후 모든 장비는 보관실로 이동합니다.',
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
      blank: '내일 야외 관찰 수업이 예정되어 있어요. 기상 정보에서 오후에 비가 많이 온다고 했어요. 비가 많이 ___ 선생님이 체험 장소를 교실로 바꾸었어요. 학생들은 준비물을 다시 확인했어요.',
      full: '내일 야외 관찰 수업이 예정되어 있어요. 기상 정보에서 오후에 비가 많이 온다고 했어요. 비가 많이 오기 때문에 선생님이 체험 장소를 교실로 바꾸었어요. 학생들은 준비물을 다시 확인했어요.',
    },
    {
      blank: '민수는 체육 시간에 벤치에 앉아 있었어요. 친구가 왜 뛰지 않느냐고 물었어요. 민수는 “___ 어제 발목을 다쳤기 때문이야”라고 설명했어요. 친구는 보건실에 같이 가자고 했어요.',
      full: '민수는 체육 시간에 벤치에 앉아 있었어요. 친구가 왜 뛰지 않느냐고 물었어요. 민수는 “왜냐하면 어제 발목을 다쳤기 때문이야”라고 설명했어요. 친구는 보건실에 같이 가자고 했어요.',
    },
    {
      blank: '학교 도서관에는 조용히 책을 읽는 학생들이 많아요. 안내문에도 큰 소리로 말하지 말라고 적혀 있어요. ___ 우리는 휴대전화 통화도 밖에서 해야 해요. 민지는 고개를 끄덕이고 복도로 나갔어요.',
      full: '학교 도서관에는 조용히 책을 읽는 학생들이 많아요. 안내문에도 큰 소리로 말하지 말라고 적혀 있어요. 그렇기 때문에 우리는 휴대전화 통화도 밖에서 해야 해요. 민지는 고개를 끄덕이고 복도로 나갔어요.',
    },
    {
      blank: '지민이는 역사 발표를 시작했어요. 그는 화면의 사진을 손가락으로 가리켰어요. ___ 친구들에게 당시 생활 모습을 설명했어요. 선생님은 자료 연결이 자연스럽다고 칭찬했어요.',
      full: '지민이는 역사 발표를 시작했어요. 그는 화면의 사진을 손가락으로 가리켰어요. 그러면서 친구들에게 당시 생활 모습을 설명했어요. 선생님은 자료 연결이 자연스럽다고 칭찬했어요.',
    },
    {
      blank: '민호는 공원 산책길을 천천히 걷고 있었어요. 갑자기 휴대전화 알림이 크게 울렸어요. ___ 오랜만에 유학 간 친구의 전화를 받았어요. 민호는 벤치에 앉아 짧게 이야기를 나눴어요.',
      full: '민호는 공원 산책길을 천천히 걷고 있었어요. 갑자기 휴대전화 알림이 크게 울렸어요. 그러다가 오랜만에 유학 간 친구의 전화를 받았어요. 민호는 벤치에 앉아 짧게 이야기를 나눴어요.',
    },
    {
      blank: '내일 오후에 시간이 남을 수도 있어요. 우리는 도서관에서 과제를 같이 끝낼 수 있어요. ___ 숙제가 끝나면 나에게 메시지를 보내요. 그러면 내가 자리를 미리 잡아 둘게요.',
      full: '내일 오후에 시간이 남을 수도 있어요. 우리는 도서관에서 과제를 같이 끝낼 수 있어요. 만약 숙제가 끝나면 나에게 메시지를 보내요. 그러면 내가 자리를 미리 잡아 둘게요.',
    },
    {
      blank: '주말 소풍 날에 비가 올 수도 있어요. 비가 오면 운동장 활동은 어렵게 돼요. ___ 날씨가 나쁘면 실내 박물관에 가요. 반장은 두 가지 일정을 모두 공지했어요.',
      full: '주말 소풍 날에 비가 올 수도 있어요. 비가 오면 운동장 활동은 어렵게 돼요. 만약에 날씨가 나쁘면 실내 박물관에 가요. 반장은 두 가지 일정을 모두 공지했어요.',
    },
    {
      blank: '네 말처럼 오늘 시간이 정말 부족해요. 긴 회의까지 하면 연습을 못 할 것 같아요. ___ 오늘은 핵심 문장만 짧게 연습해요. 나머지 예문은 내일 다시 확인해요.',
      full: '네 말처럼 오늘 시간이 정말 부족해요. 긴 회의까지 하면 연습을 못 할 것 같아요. 그렇다면 오늘은 핵심 문장만 짧게 연습해요. 나머지 예문은 내일 다시 확인해요.',
    },
    {
      blank: '오늘 아침부터 눈이 계속 내려요. 학교 앞 계단이 미끄러울 수 있어요. 눈이 많이 ___ 천천히 걸어가야 해요. 선생님은 학생들에게 난간을 잡으라고 안내했어요.',
      full: '오늘 아침부터 눈이 계속 내려요. 학교 앞 계단이 미끄러울 수 있어요. 눈이 많이 오기 때문에 천천히 걸어가야 해요. 선생님은 학생들에게 난간을 잡으라고 안내했어요.',
    },
    {
      blank: '수진이는 약속 시간을 갑자기 바꿨어요. 친구는 무슨 일이 있는지 걱정했어요. 수진이는 “___ 가족 일정이 생겼기 때문이야”라고 말했어요. 친구는 괜찮다며 다음 주에 보자고 했어요.',
      full: '수진이는 약속 시간을 갑자기 바꿨어요. 친구는 무슨 일이 있는지 걱정했어요. 수진이는 “왜냐하면 가족 일정이 생겼기 때문이야”라고 말했어요. 친구는 괜찮다며 다음 주에 보자고 했어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '운동장 행사가 오후에 열릴 예정이었어요. 그런데 점심 후에 비가 세게 내리기 시작했어요. 비가 많이 ___ 체육관으로 장소를 바꿨어요. 학생들은 실내화로 갈아 신었어요.',
      full: '운동장 행사가 오후에 열릴 예정이었어요. 그런데 점심 후에 비가 세게 내리기 시작했어요. 비가 많이 오기 때문에 체육관으로 장소를 바꿨어요. 학생들은 실내화로 갈아 신었어요.',
    },
    {
      blank: '저는 수업이 끝나기 전에 먼저 집에 갔어요. 친구가 왜 일찍 갔는지 물었어요. 저는 “___ 머리가 아프기 때문이야”라고 말했어요. 친구는 푹 쉬라고 답장했어요.',
      full: '저는 수업이 끝나기 전에 먼저 집에 갔어요. 친구가 왜 일찍 갔는지 물었어요. 저는 “왜냐하면 머리가 아프기 때문이야”라고 말했어요. 친구는 푹 쉬라고 답장했어요.',
    },
    {
      blank: '시험 전에는 짧은 복습도 중요해요. 아직 모르는 단어가 여러 개 남아 있어요. ___ 오늘 저녁에 다시 공부해야 해요. 민지는 단어장을 먼저 펴고 읽기 시작했어요.',
      full: '시험 전에는 짧은 복습도 중요해요. 아직 모르는 단어가 여러 개 남아 있어요. 그렇기 때문에 오늘 저녁에 다시 공부해야 해요. 민지는 단어장을 먼저 펴고 읽기 시작했어요.',
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
function reasonLevel4Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '민수는 방학 동안 매일 한국어 단어를 외웠어요. 시험 전에 복습 계획도 스스로 세웠어요. 모의 시험 결과는 예상보다 좋아졌어요. ___ 듣기 문제에서는 아직 실수가 많았어요. 그래서 선생님은 매일 짧은 방송을 듣자고 했어요. 민수는 다음 평가 전까지 계속 연습하기로 했어요.',
      full: '민수는 방학 동안 매일 한국어 단어를 외웠어요. 시험 전에 복습 계획도 스스로 세웠어요. 모의 시험 결과는 예상보다 좋아졌어요. 그렇지만 듣기 문제에서는 아직 실수가 많았어요. 그래서 선생님은 매일 짧은 방송을 듣자고 했어요. 민수는 다음 평가 전까지 계속 연습하기로 했어요.',
    },
    {
      blank: '마을 도서관은 새 책을 많이 들여왔어요. 어린이실 책상도 밝은 색으로 바꾸었어요. 이용자 반응은 대체로 좋았어요. ___ 밤늦게 여는 날은 아직 부족했어요. 주민들은 퇴근 뒤에도 책을 빌리고 싶다고 말했어요. 관장은 다음 달 운영 시간을 다시 논의할 거예요.',
      full: '마을 도서관은 새 책을 많이 들여왔어요. 어린이실 책상도 밝은 색으로 바꾸었어요. 이용자 반응은 대체로 좋았어요. 그러나 밤늦게 여는 날은 아직 부족했어요. 주민들은 퇴근 뒤에도 책을 빌리고 싶다고 말했어요. 관장은 다음 달 운영 시간을 다시 논의할 거예요.',
    },
    {
      blank: '수아는 발표 전날까지 여러 번 연습했어요. 가족 앞에서 목소리와 손짓도 확인했어요. 친구들은 준비가 충분하다고 응원했어요. ___ 무대에 서자 처음 문장을 잊어버렸어요. 수아는 잠깐 숨을 고르고 다시 말하기 시작했어요. 발표가 끝난 뒤 선생님은 포기하지 않은 점을 칭찬했어요.',
      full: '수아는 발표 전날까지 여러 번 연습했어요. 가족 앞에서 목소리와 손짓도 확인했어요. 친구들은 준비가 충분하다고 응원했어요. 그런데도 무대에 서자 처음 문장을 잊어버렸어요. 수아는 잠깐 숨을 고르고 다시 말하기 시작했어요. 발표가 끝난 뒤 선생님은 포기하지 않은 점을 칭찬했어요.',
    },
    {
      blank: '한국어 수업에서는 문법 설명을 먼저 들었어요. 학생들은 짧은 예문을 소리 내어 읽었어요. 선생님은 발음 연습도 함께 넣었어요. ___ 새 단어를 그림 카드로 확인했어요. 수업이 끝난 뒤 학생들은 배운 표현을 짝과 말했어요. 이런 순서 덕분에 내용이 더 쉽게 기억됐어요.',
      full: '한국어 수업에서는 문법 설명을 먼저 들었어요. 학생들은 짧은 예문을 소리 내어 읽었어요. 선생님은 발음 연습도 함께 넣었어요. 또한 새 단어를 그림 카드로 확인했어요. 수업이 끝난 뒤 학생들은 배운 표현을 짝과 말했어요. 이런 순서 덕분에 내용이 더 쉽게 기억됐어요.',
    },
    {
      blank: '아침부터 하늘이 어두웠어요. 운동장 바닥도 이미 많이 젖어 있었어요. 선생님은 밖에서 행사를 하기 어렵다고 말했어요. ___ 바람까지 세게 불기 시작했어요. 결국 반 친구들은 체육관으로 장소를 옮겼어요. 실내 행사는 조금 좁았지만 안전하게 끝났어요.',
      full: '아침부터 하늘이 어두웠어요. 운동장 바닥도 이미 많이 젖어 있었어요. 선생님은 밖에서 행사를 하기 어렵다고 말했어요. 게다가 바람까지 세게 불기 시작했어요. 결국 반 친구들은 체육관으로 장소를 옮겼어요. 실내 행사는 조금 좁았지만 안전하게 끝났어요.',
    },
    {
      blank: '지호는 감기에 걸려 목이 아팠어요. 아침 회의에서 발표 순서도 갑자기 앞당겨졌어요. 그는 짧게 말하려고 종이를 다시 정리했어요. ___ 마이크까지 제대로 켜지지 않았어요. 친구가 급히 장비를 확인해 주었어요. 지호는 천천히 다시 시작해서 발표를 마쳤어요.',
      full: '지호는 감기에 걸려 목이 아팠어요. 아침 회의에서 발표 순서도 갑자기 앞당겨졌어요. 그는 짧게 말하려고 종이를 다시 정리했어요. 더구나 마이크까지 제대로 켜지지 않았어요. 친구가 급히 장비를 확인해 주었어요. 지호는 천천히 다시 시작해서 발표를 마쳤어요.',
    },
    {
      blank: '우리 반은 한국 음식 주제로 작은 전시를 준비했어요. 학생들은 김치와 비빔밥 사진을 붙였어요. 음식 이름의 뜻도 쉬운 말로 설명했어요. 우리는 한국 음식 ___ 식사 예절도 함께 소개했어요. 방문한 학부모들은 여러 자료를 보며 질문했어요. 전시가 끝나자 학생들은 문화 표현을 더 잘 알게 되었어요.',
      full: '우리 반은 한국 음식 주제로 작은 전시를 준비했어요. 학생들은 김치와 비빔밥 사진을 붙였어요. 음식 이름의 뜻도 쉬운 말로 설명했어요. 우리는 한국 음식 뿐만 아니라 식사 예절도 함께 소개했어요. 방문한 학부모들은 여러 자료를 보며 질문했어요. 전시가 끝나자 학생들은 문화 표현을 더 잘 알게 되었어요.',
    },
    {
      blank: '학교 앞 카페는 학생 손님이 많아졌어요. 점심시간에는 줄이 길게 생겼어요. 주인은 간단한 음료 메뉴를 더 늘렸어요. ___ 옆 가게는 조용한 분위기를 살리기로 했어요. 두 가게는 서로 다른 방식으로 손님을 맞이했어요. 학생들은 상황에 따라 편한 곳을 골랐어요.',
      full: '학교 앞 카페는 학생 손님이 많아졌어요. 점심시간에는 줄이 길게 생겼어요. 주인은 간단한 음료 메뉴를 더 늘렸어요. 한편 옆 가게는 조용한 분위기를 살리기로 했어요. 두 가게는 서로 다른 방식으로 손님을 맞이했어요. 학생들은 상황에 따라 편한 곳을 골랐어요.',
    },
    {
      blank: '형은 계획표를 자세히 쓰는 편이에요. 숙제 시간과 쉬는 시간도 미리 정해요. 덕분에 시험 전에도 크게 당황하지 않아요. ___ 동생은 먼저 해 보고 나중에 고치는 것을 좋아해요. 두 사람은 공부 방법은 다르지만 서로 도움을 줘요. 엄마는 각자에게 맞는 방식을 찾는 것이 중요하다고 말해요.',
      full: '형은 계획표를 자세히 쓰는 편이에요. 숙제 시간과 쉬는 시간도 미리 정해요. 덕분에 시험 전에도 크게 당황하지 않아요. 반면에 동생은 먼저 해 보고 나중에 고치는 것을 좋아해요. 두 사람은 공부 방법은 다르지만 서로 도움을 줘요. 엄마는 각자에게 맞는 방식을 찾는 것이 중요하다고 말해요.',
    },
    {
      blank: '유나는 어려운 문법 문제를 보고 겁을 냈어요. 처음에는 오래 걸릴 것 같다고 생각했어요. 선생님은 예문을 나누어 천천히 읽게 했어요. 그런데 문제를 작게 나누자 ___ 이해가 더 빨라졌어요. 유나는 같은 방법으로 다른 문제도 풀어 보았어요. 마지막에는 친구에게 풀이 순서까지 설명했어요.',
      full: '유나는 어려운 문법 문제를 보고 겁을 냈어요. 처음에는 오래 걸릴 것 같다고 생각했어요. 선생님은 예문을 나누어 천천히 읽게 했어요. 그런데 문제를 작게 나누자 오히려 이해가 더 빨라졌어요. 유나는 같은 방법으로 다른 문제도 풀어 보았어요. 마지막에는 친구에게 풀이 순서까지 설명했어요.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '민지는 새 단어를 많이 외웠어요. 공책에 뜻과 예문도 정리했어요. 읽기 문제는 전보다 더 잘 풀었어요. ___ 말하기 시간에는 아직 자주 멈췄어요. 선생님은 짧은 문장을 먼저 말해 보라고 했어요. 민지는 집에서 거울을 보며 다시 연습했어요.',
      full: '민지는 새 단어를 많이 외웠어요. 공책에 뜻과 예문도 정리했어요. 읽기 문제는 전보다 더 잘 풀었어요. 그렇지만 말하기 시간에는 아직 자주 멈췄어요. 선생님은 짧은 문장을 먼저 말해 보라고 했어요. 민지는 집에서 거울을 보며 다시 연습했어요.',
    },
    {
      blank: '박물관 안내문은 글자가 커서 읽기 쉬웠어요. 입구 직원도 친절하게 길을 설명했어요. 관람 순서도 그림으로 잘 표시되어 있었어요. ___ 어린아이들이 쉴 공간은 많지 않았어요. 부모들은 잠시 앉을 의자가 더 필요하다고 말했어요. 담당자는 다음 전시 때 의자를 늘리겠다고 했어요.',
      full: '박물관 안내문은 글자가 커서 읽기 쉬웠어요. 입구 직원도 친절하게 길을 설명했어요. 관람 순서도 그림으로 잘 표시되어 있었어요. 그러나 어린아이들이 쉴 공간은 많지 않았어요. 부모들은 잠시 앉을 의자가 더 필요하다고 말했어요. 담당자는 다음 전시 때 의자를 늘리겠다고 했어요.',
    },
    {
      blank: '준서는 받아쓰기 연습을 여러 번 했어요. 어려운 받침 단어도 따로 적어 보았어요. 시험 전에는 친구와 서로 문제를 냈어요. ___ 실제 시험에서 쉬운 단어 하나를 틀렸어요. 준서는 아쉬웠지만 틀린 이유를 바로 확인했어요. 다음 날에는 같은 실수를 하지 않았어요.',
      full: '준서는 받아쓰기 연습을 여러 번 했어요. 어려운 받침 단어도 따로 적어 보았어요. 시험 전에는 친구와 서로 문제를 냈어요. 그런데도 실제 시험에서 쉬운 단어 하나를 틀렸어요. 준서는 아쉬웠지만 틀린 이유를 바로 확인했어요. 다음 날에는 같은 실수를 하지 않았어요.',
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


function reasonLevel5Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '학습 지원 센터는 새 교육 프로그램의 만족도 조사를 실시했습니다. 초급 학습자는 문법 설명보다 예문 비교에서 더 높은 이해도를 보였습니다. 담당 교사는 오류 유형을 분석한 뒤 복습 자료를 개인별로 제공했습니다. 학생들은 반복 과제보다 상황별 대화 과제에 더 적극적으로 참여했습니다. 선생님 ___ 복잡한 조사 사용도 비교적 쉽게 이해했습니다. 이후 참여율과 과제 제출률도 안정적으로 상승했습니다. 운영진은 이 결과를 다음 학기 추천 시스템 설계에 반영했습니다. 최종 보고서에서는 교사의 맞춤 피드백을 핵심 성공 요인으로 정리했습니다.',
      full: '학습 지원 센터는 새 교육 프로그램의 만족도 조사를 실시했습니다. 초급 학습자는 문법 설명보다 예문 비교에서 더 높은 이해도를 보였습니다. 담당 교사는 오류 유형을 분석한 뒤 복습 자료를 개인별로 제공했습니다. 학생들은 반복 과제보다 상황별 대화 과제에 더 적극적으로 참여했습니다. 선생님 덕분에 복잡한 조사 사용도 비교적 쉽게 이해했습니다. 이후 참여율과 과제 제출률도 안정적으로 상승했습니다. 운영진은 이 결과를 다음 학기 추천 시스템 설계에 반영했습니다. 최종 보고서에서는 교사의 맞춤 피드백을 핵심 성공 요인으로 정리했습니다.',
    },
    {
      blank: '지역 축제 운영 위원회는 행사 지연 원인을 분석했습니다. 자원봉사자 명단은 충분했지만 물품 검수 과정에서 오류가 발생했습니다. 안내 표지판 일부도 잘못 인쇄되어 현장 배치가 늦어졌습니다. 방문객은 입구에서 대기 시간이 길어졌다고 불편을 제기했습니다. 준비 실수 ___ 전체 일정이 예정보다 늦어졌습니다. 담당자는 다음 행사부터 확인 절차를 두 단계로 늘리겠다고 말했습니다. 예산 담당자는 추가 인력 배치 비용도 검토했습니다. 회의록에는 책임 소재보다 재발 방지 대책이 더 중요하다고 기록되었습니다.',
      full: '지역 축제 운영 위원회는 행사 지연 원인을 분석했습니다. 자원봉사자 명단은 충분했지만 물품 검수 과정에서 오류가 발생했습니다. 안내 표지판 일부도 잘못 인쇄되어 현장 배치가 늦어졌습니다. 방문객은 입구에서 대기 시간이 길어졌다고 불편을 제기했습니다. 준비 실수 탓에 전체 일정이 예정보다 늦어졌습니다. 담당자는 다음 행사부터 확인 절차를 두 단계로 늘리겠다고 말했습니다. 예산 담당자는 추가 인력 배치 비용도 검토했습니다. 회의록에는 책임 소재보다 재발 방지 대책이 더 중요하다고 기록되었습니다.',
    },
    {
      blank: '연구 보조 학생은 발표 전날까지 자료 정리를 맡았습니다. 통계 표와 인터뷰 기록을 하나의 문서로 통합해야 했습니다. 교수는 아침 회의 전에 최종 파일을 보내 달라고 요청했습니다. 그러나 학생은 밤늦게까지 행정 문서를 수정했습니다. 일하느라고 지도 교수의 전화를 받지 못했습니다. 그 결과 발표 순서와 수정 방향을 바로 확인하지 못했습니다. 학생은 다음 날 사과하고 연락 가능 시간을 따로 공유했습니다. 교수는 중요한 일정 전에는 연락 체계를 미리 정하자고 조언했습니다.',
      full: '연구 보조 학생은 발표 전날까지 자료 정리를 맡았습니다. 통계 표와 인터뷰 기록을 하나의 문서로 통합해야 했습니다. 교수는 아침 회의 전에 최종 파일을 보내 달라고 요청했습니다. 그러나 학생은 밤늦게까지 행정 문서를 수정했습니다. 일하느라고 지도 교수의 전화를 받지 못했습니다. 그 결과 발표 순서와 수정 방향을 바로 확인하지 못했습니다. 학생은 다음 날 사과하고 연락 가능 시간을 따로 공유했습니다. 교수는 중요한 일정 전에는 연락 체계를 미리 정하자고 조언했습니다.',
    },
    {
      blank: '문화 산업 분석 수업에서 학생들은 온라인 공연 플랫폼을 조사했습니다. 한 조는 이용자 수, 결제 방식, 추천 알고리즘을 비교했습니다. 다른 조는 팬 커뮤니티의 참여 방식과 홍보 효과를 설명했습니다. 교수는 두 자료가 모두 같은 핵심 현상을 가리킨다고 말했습니다. ___ 디지털 플랫폼은 콘텐츠 유통 방식과 소비 습관을 동시에 바꾸고 있습니다. 학생들은 이 문장을 중심으로 발표 구조를 다시 정리했습니다. 이후 토론에서는 기술 변화와 문화 경험의 관계가 주요 쟁점이 되었습니다. 최종 과제에는 사례 분석과 개념 정의를 함께 넣기로 했습니다.',
      full: '문화 산업 분석 수업에서 학생들은 온라인 공연 플랫폼을 조사했습니다. 한 조는 이용자 수, 결제 방식, 추천 알고리즘을 비교했습니다. 다른 조는 팬 커뮤니티의 참여 방식과 홍보 효과를 설명했습니다. 교수는 두 자료가 모두 같은 핵심 현상을 가리킨다고 말했습니다. 즉 디지털 플랫폼은 콘텐츠 유통 방식과 소비 습관을 동시에 바꾸고 있습니다. 학생들은 이 문장을 중심으로 발표 구조를 다시 정리했습니다. 이후 토론에서는 기술 변화와 문화 경험의 관계가 주요 쟁점이 되었습니다. 최종 과제에는 사례 분석과 개념 정의를 함께 넣기로 했습니다.',
    },
    {
      blank: '도시 교통 정책 회의에서는 버스 노선 개편안을 검토했습니다. 담당 부서는 출퇴근 시간대의 혼잡도와 환승 거리를 분석했습니다. 주민 의견 조사에서는 배차 간격보다 정류장 접근성이 더 큰 문제로 나타났습니다. 전문가들은 노선 수를 늘리는 것만으로는 해결이 어렵다고 설명했습니다. ___ 핵심 과제는 차량 증가가 아니라 이동 동선의 효율화입니다. 이 설명을 들은 위원들은 자료 해석 방향을 다시 조정했습니다. 이후 시범 구간을 선정하고 효과 측정 기준을 마련했습니다. 최종 결정은 예산 심사와 주민 공청회 이후에 진행하기로 했습니다.',
      full: '도시 교통 정책 회의에서는 버스 노선 개편안을 검토했습니다. 담당 부서는 출퇴근 시간대의 혼잡도와 환승 거리를 분석했습니다. 주민 의견 조사에서는 배차 간격보다 정류장 접근성이 더 큰 문제로 나타났습니다. 전문가들은 노선 수를 늘리는 것만으로는 해결이 어렵다고 설명했습니다. 다시 말하면 핵심 과제는 차량 증가가 아니라 이동 동선의 효율화입니다. 이 설명을 들은 위원들은 자료 해석 방향을 다시 조정했습니다. 이후 시범 구간을 선정하고 효과 측정 기준을 마련했습니다. 최종 결정은 예산 심사와 주민 공청회 이후에 진행하기로 했습니다.',
    },
    {
      blank: '건강 교육 시간에 학생들은 생활 습관 개선 방법을 발표했습니다. 발표자는 수면, 식사, 운동이 서로 연결되어 있다고 설명했습니다. 단순한 지식보다 실제 행동 계획이 더 중요하다는 점도 강조했습니다. 선생님은 구체적인 사례가 있으면 이해가 쉬워진다고 말했습니다. ___ 하루 활동량을 기록하고 계단 이용 횟수를 늘리는 방법이 있습니다. 학생들은 자신의 생활표에 적용 가능한 목표를 하나씩 적었습니다. 이후 한 달 동안 변화 기록을 관찰하기로 했습니다. 결과 발표에서는 실천 가능성과 지속성이 중요한 평가 기준이 되었습니다.',
      full: '건강 교육 시간에 학생들은 생활 습관 개선 방법을 발표했습니다. 발표자는 수면, 식사, 운동이 서로 연결되어 있다고 설명했습니다. 단순한 지식보다 실제 행동 계획이 더 중요하다는 점도 강조했습니다. 선생님은 구체적인 사례가 있으면 이해가 쉬워진다고 말했습니다. 예를 들면 하루 활동량을 기록하고 계단 이용 횟수를 늘리는 방법이 있습니다. 학생들은 자신의 생활표에 적용 가능한 목표를 하나씩 적었습니다. 이후 한 달 동안 변화 기록을 관찰하기로 했습니다. 결과 발표에서는 실천 가능성과 지속성이 중요한 평가 기준이 되었습니다.',
    },
    {
      blank: '환경 연구 동아리는 학교 쓰레기 배출량을 조사했습니다. 학생들은 급식실, 교실, 운동장의 자료를 분리하여 측정했습니다. 분석 결과 일회용품 사용량이 전체 폐기물의 큰 비율을 차지했습니다. 대체 용기 사용 실험에서는 쓰레기 양이 눈에 띄게 줄었습니다. ___ 다음 학기부터 다회용 컵 사용 캠페인을 확대해야 합니다. 동아리 대표는 이 결론을 학생회 회의에서 발표했습니다. 교사는 정책 제안서에 수치 자료와 사진 증거를 함께 넣으라고 했습니다. 학생회는 실행 일정과 홍보 방식을 추가로 논의했습니다.',
      full: '환경 연구 동아리는 학교 쓰레기 배출량을 조사했습니다. 학생들은 급식실, 교실, 운동장의 자료를 분리하여 측정했습니다. 분석 결과 일회용품 사용량이 전체 폐기물의 큰 비율을 차지했습니다. 대체 용기 사용 실험에서는 쓰레기 양이 눈에 띄게 줄었습니다. 그러므로 다음 학기부터 다회용 컵 사용 캠페인을 확대해야 합니다. 동아리 대표는 이 결론을 학생회 회의에서 발표했습니다. 교사는 정책 제안서에 수치 자료와 사진 증거를 함께 넣으라고 했습니다. 학생회는 실행 일정과 홍보 방식을 추가로 논의했습니다.',
    },
    {
      blank: '외국인 학습자 상담 기록을 분석한 결과 발음 불안이 가장 자주 나타났습니다. 상담 교사는 학생별 강점과 약점을 표로 정리했습니다. 말하기 연습에서는 짧은 문장 반복보다 실제 대화 상황이 더 효과적이었습니다. 한 학생은 매주 피드백을 받은 뒤 발표 자신감이 크게 높아졌습니다. 상담 교사 ___ 학습자는 자신의 오류를 긍정적으로 바라보게 되었습니다. 이후 그는 토론 수업에서도 먼저 질문하는 모습을 보였습니다. 운영진은 이 사례를 우수 지원 모델로 저장했습니다. 다음 학기에는 같은 방식의 상담 시간을 확대할 예정입니다.',
      full: '외국인 학습자 상담 기록을 분석한 결과 발음 불안이 가장 자주 나타났습니다. 상담 교사는 학생별 강점과 약점을 표로 정리했습니다. 말하기 연습에서는 짧은 문장 반복보다 실제 대화 상황이 더 효과적이었습니다. 한 학생은 매주 피드백을 받은 뒤 발표 자신감이 크게 높아졌습니다. 상담 교사 덕분에 학습자는 자신의 오류를 긍정적으로 바라보게 되었습니다. 이후 그는 토론 수업에서도 먼저 질문하는 모습을 보였습니다. 운영진은 이 사례를 우수 지원 모델로 저장했습니다. 다음 학기에는 같은 방식의 상담 시간을 확대할 예정입니다.',
    },
    {
      blank: '온라인 시험 시스템은 오전부터 접속자가 급격히 증가했습니다. 관리자는 서버 상태와 로그인 오류 기록을 동시에 확인했습니다. 일부 학생은 답안을 저장하지 못해 다시 제출해야 했습니다. 조사 결과 사전 점검 과정에서 부하 테스트가 충분히 진행되지 않았습니다. 관리 부실 탓에 시험 진행이 여러 차례 중단되었습니다. 학교는 피해 학생에게 추가 제출 시간을 제공했습니다. 기술팀은 장애 원인과 보완 계획을 보고서로 작성했습니다. 이후 모든 평가 전에 예비 서버를 준비하기로 결정했습니다.',
      full: '온라인 시험 시스템은 오전부터 접속자가 급격히 증가했습니다. 관리자는 서버 상태와 로그인 오류 기록을 동시에 확인했습니다. 일부 학생은 답안을 저장하지 못해 다시 제출해야 했습니다. 조사 결과 사전 점검 과정에서 부하 테스트가 충분히 진행되지 않았습니다. 관리 부실 탓에 시험 진행이 여러 차례 중단되었습니다. 학교는 피해 학생에게 추가 제출 시간을 제공했습니다. 기술팀은 장애 원인과 보완 계획을 보고서로 작성했습니다. 이후 모든 평가 전에 예비 서버를 준비하기로 결정했습니다.',
    },
    {
      blank: '졸업 전시 준비 기간에 디자인 조는 포스터와 안내 영상을 맡았습니다. 팀장은 작품 설명 문구와 QR 코드 연결을 밤새 확인했습니다. 다른 조원들은 전시장 동선과 조명 배치를 점검했습니다. 개막식 직전 교수는 수정 의견을 전화로 전달하려고 했습니다. 팀장은 일하느라고 교수의 전화를 바로 받지 못했습니다. 결국 수정 사항 일부는 전시 시작 후에야 반영되었습니다. 팀장은 이후 연락 담당자를 따로 정하자고 제안했습니다. 조원들은 역할 분담표를 새로 작성해 남은 일정을 관리했습니다.',
      full: '졸업 전시 준비 기간에 디자인 조는 포스터와 안내 영상을 맡았습니다. 팀장은 작품 설명 문구와 QR 코드 연결을 밤새 확인했습니다. 다른 조원들은 전시장 동선과 조명 배치를 점검했습니다. 개막식 직전 교수는 수정 의견을 전화로 전달하려고 했습니다. 팀장은 일하느라고 교수의 전화를 바로 받지 못했습니다. 결국 수정 사항 일부는 전시 시작 후에야 반영되었습니다. 팀장은 이후 연락 담당자를 따로 정하자고 제안했습니다. 조원들은 역할 분담표를 새로 작성해 남은 일정을 관리했습니다.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '지역 한국어 교실에서는 말하기 자신감 향상 프로그램을 운영했습니다. 담당 교사는 매 수업 후 짧은 개인 피드백을 제공했습니다. 학생들은 발음 오류를 부끄러워하기보다 수정 과정으로 이해하기 시작했습니다. 대화 활동에서는 실생활 표현을 반복적으로 사용했습니다. 선생님 ___ 참여 학생들의 발표 태도가 눈에 띄게 안정되었습니다. 학부모도 수업 후 학생의 자신감 변화를 긍정적으로 평가했습니다. 운영 기록에는 피드백 방식의 효과가 자세히 정리되었습니다. 다음 달부터 같은 프로그램을 초급반에도 적용하기로 했습니다.',
      full: '지역 한국어 교실에서는 말하기 자신감 향상 프로그램을 운영했습니다. 담당 교사는 매 수업 후 짧은 개인 피드백을 제공했습니다. 학생들은 발음 오류를 부끄러워하기보다 수정 과정으로 이해하기 시작했습니다. 대화 활동에서는 실생활 표현을 반복적으로 사용했습니다. 선생님 덕분에 참여 학생들의 발표 태도가 눈에 띄게 안정되었습니다. 학부모도 수업 후 학생의 자신감 변화를 긍정적으로 평가했습니다. 운영 기록에는 피드백 방식의 효과가 자세히 정리되었습니다. 다음 달부터 같은 프로그램을 초급반에도 적용하기로 했습니다.',
    },
    {
      blank: '도서관 독서 행사는 사전 신청자가 많아 기대를 모았습니다. 그러나 담당자는 좌석 배치와 입장 동선을 충분히 확인하지 못했습니다. 행사 당일에는 대기 줄이 길어져 참가자 불만이 커졌습니다. 일부 가족은 안내 부족으로 다른 강의실에 잘못 들어갔습니다. 운영 실수 탓에 프로그램 시작 시간이 크게 늦어졌습니다. 관장은 참가자에게 사과하고 다음 행사 개선안을 약속했습니다. 직원들은 체크리스트와 안내 인력을 추가하기로 했습니다. 회의 결과는 내부 운영 지침에 반영되었습니다.',
      full: '도서관 독서 행사는 사전 신청자가 많아 기대를 모았습니다. 그러나 담당자는 좌석 배치와 입장 동선을 충분히 확인하지 못했습니다. 행사 당일에는 대기 줄이 길어져 참가자 불만이 커졌습니다. 일부 가족은 안내 부족으로 다른 강의실에 잘못 들어갔습니다. 운영 실수 탓에 프로그램 시작 시간이 크게 늦어졌습니다. 관장은 참가자에게 사과하고 다음 행사 개선안을 약속했습니다. 직원들은 체크리스트와 안내 인력을 추가하기로 했습니다. 회의 결과는 내부 운영 지침에 반영되었습니다.',
    },
    {
      blank: '학생회 회계 담당자는 축제 예산 정산을 맡았습니다. 영수증 번호와 지출 항목을 하나씩 확인해야 했습니다. 회장은 저녁 회의 전에 중간 결과를 공유해 달라고 부탁했습니다. 그러나 담당자는 자료 입력과 금액 검산을 계속했습니다. 일하느라고 회장의 메시지를 제때 확인하지 못했습니다. 회의에서는 예산 현황 설명이 잠시 지연되었습니다. 담당자는 이후 알림 설정을 켜 두겠다고 말했습니다. 학생회는 중요한 업무에는 예비 담당자를 두기로 했습니다.',
      full: '학생회 회계 담당자는 축제 예산 정산을 맡았습니다. 영수증 번호와 지출 항목을 하나씩 확인해야 했습니다. 회장은 저녁 회의 전에 중간 결과를 공유해 달라고 부탁했습니다. 그러나 담당자는 자료 입력과 금액 검산을 계속했습니다. 일하느라고 회장의 메시지를 제때 확인하지 못했습니다. 회의에서는 예산 현황 설명이 잠시 지연되었습니다. 담당자는 이후 알림 설정을 켜 두겠다고 말했습니다. 학생회는 중요한 업무에는 예비 담당자를 두기로 했습니다.',
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


function honorificLevel4Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '행사 준비 회의에서 자료 점검 역할이 정해졌습니다. 담당 학생은 일정표와 사진 파일을 다시 확인했습니다. 선생님은 최종 자료를 누가 맡을지 물었습니다. 학생은 정중하게 “제가 행사 자료를 ___”라고 말했습니다. 친구들은 발표 순서와 제출 시간을 함께 확인했습니다. 회의 후 모든 파일은 공유 폴더에 저장되었습니다.',
      full: '행사 준비 회의에서 자료 점검 역할이 정해졌습니다. 담당 학생은 일정표와 사진 파일을 다시 확인했습니다. 선생님은 최종 자료를 누가 맡을지 물었습니다. 학생은 정중하게 “제가 행사 자료를 점검하겠습니다”라고 말했습니다. 친구들은 발표 순서와 제출 시간을 함께 확인했습니다. 회의 후 모든 파일은 공유 폴더에 저장되었습니다.',
    },
    {
      blank: '학교 설명회 당일 접수 창구에 사람들이 많이 모였습니다. 학부모들은 신청서와 신분 확인표를 들고 줄을 섰습니다. 직원들은 번호표를 나누어 주며 순서를 안내했습니다. 한 학생은 “오늘 접수 창구가 매우 ___”라고 말했습니다. 담당자는 대기 시간을 줄이기 위해 책상을 하나 더 열었습니다. 설명회는 예정 시간에 맞춰 시작되었습니다.',
      full: '학교 설명회 당일 접수 창구에 사람들이 많이 모였습니다. 학부모들은 신청서와 신분 확인표를 들고 줄을 섰습니다. 직원들은 번호표를 나누어 주며 순서를 안내했습니다. 한 학생은 “오늘 접수 창구가 매우 바쁩니다”라고 말했습니다. 담당자는 대기 시간을 줄이기 위해 책상을 하나 더 열었습니다. 설명회는 예정 시간에 맞춰 시작되었습니다.',
    },
    {
      blank: '지역 문화 행사 접수대에는 여러 직원이 앉아 있었습니다. 방문객은 신청서 제출 장소를 정확히 알고 싶었습니다. 안내판에는 담당 부서 이름만 적혀 있었습니다. 방문객은 조용히 “이분이 오늘 회의 ___”라고 물었습니다. 직원은 담당자 이름과 상담 시간을 알려 주었습니다. 방문객은 고맙다고 인사하고 대기실로 이동했습니다.',
      full: '지역 문화 행사 접수대에는 여러 직원이 앉아 있었습니다. 방문객은 신청서 제출 장소를 정확히 알고 싶었습니다. 안내판에는 담당 부서 이름만 적혀 있었습니다. 방문객은 조용히 “이분이 오늘 회의 담당자입니까”라고 물었습니다. 직원은 담당자 이름과 상담 시간을 알려 주었습니다. 방문객은 고맙다고 인사하고 대기실로 이동했습니다.',
    },
    {
      blank: '건강 교육 프로그램에서 아침 활동 조사가 진행되었습니다. 교사는 학생들의 운동 습관을 공식 질문지로 확인했습니다. 몇몇 학생은 매일 걷기와 달리기를 한다고 대답했습니다. 담당자는 “학생들은 아침마다 ___?”라고 물었습니다. 학생들은 자신의 활동 시간을 표에 적었습니다. 결과는 다음 보건 수업 자료로 쓰였습니다.',
      full: '건강 교육 프로그램에서 아침 활동 조사가 진행되었습니다. 교사는 학생들의 운동 습관을 공식 질문지로 확인했습니다. 몇몇 학생은 매일 걷기와 달리기를 한다고 대답했습니다. 담당자는 “학생들은 아침마다 운동합니까?”라고 물었습니다. 학생들은 자신의 활동 시간을 표에 적었습니다. 결과는 다음 보건 수업 자료로 쓰였습니다.',
    },
    {
      blank: '장학 신청 마감일이 가까워졌습니다. 행정실은 제출 서류와 파일 이름 기준을 다시 공지했습니다. 학생들은 성적 증명서와 활동 보고서를 준비했습니다. 안내문에는 “마감 전까지 신청서를 ___”라고 적혀 있었습니다. 담당자는 늦은 접수는 어렵다고 다시 설명했습니다. 학생들은 제출 여부를 시스템에서 확인했습니다.',
      full: '장학 신청 마감일이 가까워졌습니다. 행정실은 제출 서류와 파일 이름 기준을 다시 공지했습니다. 학생들은 성적 증명서와 활동 보고서를 준비했습니다. 안내문에는 “마감 전까지 신청서를 제출하십시오”라고 적혀 있었습니다. 담당자는 늦은 접수는 어렵다고 다시 설명했습니다. 학생들은 제출 여부를 시스템에서 확인했습니다.',
    },
    {
      blank: '교육 기관 월례 회의가 강당에서 열렸습니다. 직원들은 좌석 배치와 자료 순서를 미리 정리했습니다. 학생 대표는 회의록 양식을 준비했습니다. 잠시 뒤 교장님께서 회의에 ___ 자료를 검토합니다. 참석자들은 자리에서 조용히 인사했습니다. 회의는 운영 계획과 예산 내용을 중심으로 진행되었습니다.',
      full: '교육 기관 월례 회의가 강당에서 열렸습니다. 직원들은 좌석 배치와 자료 순서를 미리 정리했습니다. 학생 대표는 회의록 양식을 준비했습니다. 잠시 뒤 교장님께서 회의에 참석하시고 자료를 검토합니다. 참석자들은 자리에서 조용히 인사했습니다. 회의는 운영 계획과 예산 내용을 중심으로 진행되었습니다.',
    },
    {
      blank: '한국어 문법 사전 제작 수업에서 높임 표현을 배웠습니다. 학생들은 일반 동사와 높임 동사의 차이를 비교했습니다. 선생님은 기본형도 정확히 알아야 한다고 설명했습니다. 예문 표에는 원장님께서 새 계획을 ___라고 적었습니다. 학생들은 “시”가 주어를 높이는 역할을 한다고 이해했습니다. 마지막에는 각자 새 예문을 만들어 발표했습니다.',
      full: '한국어 문법 사전 제작 수업에서 높임 표현을 배웠습니다. 학생들은 일반 동사와 높임 동사의 차이를 비교했습니다. 선생님은 기본형도 정확히 알아야 한다고 설명했습니다. 예문 표에는 원장님께서 새 계획을 승인하시다라고 적었습니다. 학생들은 “시”가 주어를 높이는 역할을 한다고 이해했습니다. 마지막에는 각자 새 예문을 만들어 발표했습니다.',
    },
    {
      blank: '대학 공개 강의에서 연구 방법 토론이 시작되었습니다. 학생들은 질문 내용을 노트에 정리했습니다. 사회자는 발언 순서를 차례대로 안내했습니다. 교수님께서 먼저 연구 방법을 ___. 학생들은 중요한 개념과 사례를 함께 기록했습니다. 강의 후 질의응답 내용은 학과 자료실에 저장되었습니다.',
      full: '대학 공개 강의에서 연구 방법 토론이 시작되었습니다. 학생들은 질문 내용을 노트에 정리했습니다. 사회자는 발언 순서를 차례대로 안내했습니다. 교수님께서 먼저 연구 방법을 설명하십니다. 학생들은 중요한 개념과 사례를 함께 기록했습니다. 강의 후 질의응답 내용은 학과 자료실에 저장되었습니다.',
    },
    {
      blank: '어제 진로 상담실에서 개인 상담 일정이 진행되었습니다. 담임 선생님은 학생의 관심 분야와 성적 변화를 살펴보았습니다. 학생은 대학 전공 선택 때문에 고민이 많았습니다. 선생님께서 어제 상담을 ___. 상담 뒤 학생은 목표 대학 자료를 다시 확인했습니다. 다음 상담 날짜는 학기 말 평가 이후로 정해졌습니다.',
      full: '어제 진로 상담실에서 개인 상담 일정이 진행되었습니다. 담임 선생님은 학생의 관심 분야와 성적 변화를 살펴보았습니다. 학생은 대학 전공 선택 때문에 고민이 많았습니다. 선생님께서 어제 상담을 진행하셨어요. 상담 뒤 학생은 목표 대학 자료를 다시 확인했습니다. 다음 상담 날짜는 학기 말 평가 이후로 정해졌습니다.',
    },
    {
      blank: '다음 날 운영 회의 전까지 결과 보고가 필요했습니다. 팀원들은 통계 자료와 사진 자료를 나누어 정리했습니다. 담당 학생은 부족한 표를 밤에 다시 만들었습니다. 그는 선생님께 “제가 내일까지 결과를 ___”라고 말했습니다. 선생님은 책임자를 정한 뒤 제출 방법을 안내했습니다. 보고서는 다음 회의에서 함께 검토될 예정입니다.',
      full: '다음 날 운영 회의 전까지 결과 보고가 필요했습니다. 팀원들은 통계 자료와 사진 자료를 나누어 정리했습니다. 담당 학생은 부족한 표를 밤에 다시 만들었습니다. 그는 선생님께 “제가 내일까지 결과를 보고하겠습니다”라고 말했습니다. 선생님은 책임자를 정한 뒤 제출 방법을 안내했습니다. 보고서는 다음 회의에서 함께 검토될 예정입니다.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '동아리 발표 전날에 자료 검토 시간이 있었습니다. 사진 자료와 활동 기록은 아직 정리되지 않았습니다. 담당 학생은 자신이 마지막 확인을 맡겠다고 했습니다. 그는 선생님께 “제가 행사 자료를 ___”라고 말했습니다. 선생님은 제출 양식을 다시 알려 주었습니다. 학생은 파일 이름과 제출 시간을 확인했습니다.',
      full: '동아리 발표 전날에 자료 검토 시간이 있었습니다. 사진 자료와 활동 기록은 아직 정리되지 않았습니다. 담당 학생은 자신이 마지막 확인을 맡겠다고 했습니다. 그는 선생님께 “제가 행사 자료를 점검하겠습니다”라고 말했습니다. 선생님은 제출 양식을 다시 알려 주었습니다. 학생은 파일 이름과 제출 시간을 확인했습니다.',
    },
    {
      blank: '도서관 행사 날에는 대출 창구와 상담 창구가 모두 열렸습니다. 새 이용 규정 때문에 질문하는 학생이 많았습니다. 직원들은 번호표와 안내문을 나누어 주었습니다. 사서가 “오늘 접수 창구가 매우 ___”라고 말했습니다. 학생들은 순서를 기다리며 자료를 읽었습니다. 변경된 규정은 다음 달 평가에도 반영됩니다.',
      full: '도서관 행사 날에는 대출 창구와 상담 창구가 모두 열렸습니다. 새 이용 규정 때문에 질문하는 학생이 많았습니다. 직원들은 번호표와 안내문을 나누어 주었습니다. 사서가 “오늘 접수 창구가 매우 바쁩니다”라고 말했습니다. 학생들은 순서를 기다리며 자료를 읽었습니다. 변경된 규정은 다음 달 평가에도 반영됩니다.',
    },
    {
      blank: '학교 설명회 접수 장소에 학부모들이 모였습니다. 한 학부모는 상담 순서와 담당 교사를 확인하고 싶었습니다. 안내 책상에는 여러 명의 직원이 앉아 있었습니다. 학부모는 조용히 “이분이 오늘 회의 ___”라고 물었습니다. 직원은 담당 부서와 상담 시간을 알려 주었습니다. 학부모는 감사 인사를 하고 대기실로 이동했습니다.',
      full: '학교 설명회 접수 장소에 학부모들이 모였습니다. 한 학부모는 상담 순서와 담당 교사를 확인하고 싶었습니다. 안내 책상에는 여러 명의 직원이 앉아 있었습니다. 학부모는 조용히 “이분이 오늘 회의 담당자입니까”라고 물었습니다. 직원은 담당 부서와 상담 시간을 알려 주었습니다. 학부모는 감사 인사를 하고 대기실로 이동했습니다.',
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

function honorificLevel5Context(
  ruHint: string,
  seed: QuestionContextSeed
): { promptKr: string; audioText: string; promptRu: string } {
  const starter = questionContextStarter(seed);

  const mainTemplates = [
    {
      blank: '교육 성과 평가 회의에서 위원들은 반별 자료를 비교했습니다. 상담 일정과 과제 제출률도 함께 분석했습니다. 한 위원은 오전부터 여러 보고서를 검토하고 있었습니다. 동료가 “오늘 위원님께서 정말 ___”라고 말했습니다. 위원은 잠시 웃으며 다음 자료를 넘겼습니다. 기록 담당자는 핵심 의견을 회의록에 정리했습니다. 다음 단계에서는 듣기 평가 결과도 추가로 확인할 예정입니다. 회의 내용은 교육 개선 보고서에 반영됩니다.',
      full: '교육 성과 평가 회의에서 위원들은 반별 자료를 비교했습니다. 상담 일정과 과제 제출률도 함께 분석했습니다. 한 위원은 오전부터 여러 보고서를 검토하고 있었습니다. 동료가 “오늘 위원님께서 정말 바쁘시네요”라고 말했습니다. 위원은 잠시 웃으며 다음 자료를 넘겼습니다. 기록 담당자는 핵심 의견을 회의록에 정리했습니다. 다음 단계에서는 듣기 평가 결과도 추가로 확인할 예정입니다. 회의 내용은 교육 개선 보고서에 반영됩니다.',
    },
    {
      blank: '연구 발표가 끝난 뒤 학생들은 지도 선생님께 감사 인사를 드렸습니다. 발표 자료에는 밤늦게 수정한 표와 그래프가 포함되어 있었습니다. 선생님은 피곤해 보였지만 설명은 매우 차분했습니다. 한 학생이 “선생님께서 밤늦게까지 ___”라고 말했습니다. 선생님은 준비 과정이 중요했다고 대답했습니다. 학생들은 수정 방향을 다시 메모했습니다. 다음 수정본은 학과 시스템에 제출될 예정입니다. 전체 토론은 예정 시간 안에 마무리되었습니다.',
      full: '연구 발표가 끝난 뒤 학생들은 지도 선생님께 감사 인사를 드렸습니다. 발표 자료에는 밤늦게 수정한 표와 그래프가 포함되어 있었습니다. 선생님은 피곤해 보였지만 설명은 매우 차분했습니다. 한 학생이 “선생님께서 밤늦게까지 공부하셨군요”라고 말했습니다. 선생님은 준비 과정이 중요했다고 대답했습니다. 학생들은 수정 방향을 다시 메모했습니다. 다음 수정본은 학과 시스템에 제출될 예정입니다. 전체 토론은 예정 시간 안에 마무리되었습니다.',
    },
    {
      blank: '체육 동아리 회의에서 훈련 계획표를 다시 확인했습니다. 코치는 매일 아침 학생들과 함께 기본 동작을 점검했습니다. 몇몇 신입생은 훈련이 너무 많다고 걱정했습니다. 선배가 “코치님께서 매일 ___”라고 말했습니다. 신입생들은 코치가 직접 실천한다는 점을 이해했습니다. 이후 각자 가능한 운동 시간을 기록했습니다. 운영진은 부상 방지 교육도 추가하기로 했습니다. 다음 주부터 새 훈련표가 적용될 예정입니다.',
      full: '체육 동아리 회의에서 훈련 계획표를 다시 확인했습니다. 코치는 매일 아침 학생들과 함께 기본 동작을 점검했습니다. 몇몇 신입생은 훈련이 너무 많다고 걱정했습니다. 선배가 “코치님께서 매일 운동하시잖아요”라고 말했습니다. 신입생들은 코치가 직접 실천한다는 점을 이해했습니다. 이후 각자 가능한 운동 시간을 기록했습니다. 운영진은 부상 방지 교육도 추가하기로 했습니다. 다음 주부터 새 훈련표가 적용될 예정입니다.',
    },
    {
      blank: '발표 전날 팀원들은 자료집 최종본을 함께 검토했습니다. 그래프 제목과 표 번호도 다시 확인했습니다. 담당자는 내일 아침까지 인쇄소에 파일을 보내야 했습니다. 그래서 팀장은 “오늘 발표 자료를 ___?”라고 물었습니다. 다른 팀원은 이미 절반을 검토했다고 대답했습니다. 남은 부분은 밤까지 공동 문서에서 수정됩니다. 발표자는 질문 예상 목록도 추가로 정리할 예정입니다. 모든 준비가 끝나면 팀 채팅방에 완료 표시를 남깁니다.',
      full: '발표 전날 팀원들은 자료집 최종본을 함께 검토했습니다. 그래프 제목과 표 번호도 다시 확인했습니다. 담당자는 내일 아침까지 인쇄소에 파일을 보내야 했습니다. 그래서 팀장은 “오늘 발표 자료를 확인할 거죠?”라고 물었습니다. 다른 팀원은 이미 절반을 검토했다고 대답했습니다. 남은 부분은 밤까지 공동 문서에서 수정됩니다. 발표자는 질문 예상 목록도 추가로 정리할 예정입니다. 모든 준비가 끝나면 팀 채팅방에 완료 표시를 남깁니다.',
    },
    {
      blank: '교육 서비스 운영팀은 다음 학기 추천 기준을 논의했습니다. 기존 기준은 초급 학습자에게 지나치게 어려웠습니다. 데이터 담당자는 오답률과 복습 시간을 함께 비교했습니다. 다음 회의에서 세부 기준을 ___. 개발자는 변경 내용을 테스트 서버에 먼저 적용할 예정입니다. 교사는 실제 수업 사례와 비교해 보겠다고 말했습니다. 사용자 반응은 설문 결과로 다시 확인됩니다. 최종 기준은 전체 회의 후 확정될 것입니다.',
      full: '교육 서비스 운영팀은 다음 학기 추천 기준을 논의했습니다. 기존 기준은 초급 학습자에게 지나치게 어려웠습니다. 데이터 담당자는 오답률과 복습 시간을 함께 비교했습니다. 다음 회의에서 세부 기준을 의논할 거예요. 개발자는 변경 내용을 테스트 서버에 먼저 적용할 예정입니다. 교사는 실제 수업 사례와 비교해 보겠다고 말했습니다. 사용자 반응은 설문 결과로 다시 확인됩니다. 최종 기준은 전체 회의 후 확정될 것입니다.',
    },
    {
      blank: '연구실에서는 온라인 설문 응답을 밤늦게까지 정리했습니다. 일부 답변은 의미가 모호해서 재분류가 필요했습니다. 책임 연구자는 중복 응답과 결측 자료를 먼저 제거했습니다. 그때 연구진은 응답 자료를 분석하고 ___. 조교는 분석 기준을 문서로 남기고 있었습니다. 다음 날 회의에서는 그래프 해석을 중심으로 토론했습니다. 교수는 결과보다 과정의 정확성이 중요하다고 강조했습니다. 최종 데이터는 보안 폴더에 따로 저장되었습니다.',
      full: '연구실에서는 온라인 설문 응답을 밤늦게까지 정리했습니다. 일부 답변은 의미가 모호해서 재분류가 필요했습니다. 책임 연구자는 중복 응답과 결측 자료를 먼저 제거했습니다. 그때 연구진은 응답 자료를 분석하고 있었어요. 조교는 분석 기준을 문서로 남기고 있었습니다. 다음 날 회의에서는 그래프 해석을 중심으로 토론했습니다. 교수는 결과보다 과정의 정확성이 중요하다고 강조했습니다. 최종 데이터는 보안 폴더에 따로 저장되었습니다.',
    },
    {
      blank: '위원회 회의에서는 새 교육 정책 검토가 진행되었습니다. 발표자는 핵심 쟁점을 세 가지로 나누어 설명했습니다. 참석자들은 각 항목의 장점과 위험을 차례로 확인했습니다. 사회자는 “위원님, 검토 의견을 ___?”라고 정중히 물었습니다. 위원은 학생 부담을 줄이는 방향이 필요하다고 답했습니다. 기록 담당은 발언 내용을 회의록에 빠짐없이 적었습니다. 추가 질문은 다음 회의 안건으로 넘기기로 했습니다. 회의는 공식 절차에 따라 종료되었습니다.',
      full: '위원회 회의에서는 새 교육 정책 검토가 진행되었습니다. 발표자는 핵심 쟁점을 세 가지로 나누어 설명했습니다. 참석자들은 각 항목의 장점과 위험을 차례로 확인했습니다. 사회자는 “위원님, 검토 의견을 공유하시겠어요?”라고 정중히 물었습니다. 위원은 학생 부담을 줄이는 방향이 필요하다고 답했습니다. 기록 담당은 발언 내용을 회의록에 빠짐없이 적었습니다. 추가 질문은 다음 회의 안건으로 넘기기로 했습니다. 회의는 공식 절차에 따라 종료되었습니다.',
    },
    {
      blank: '자료 보관실은 본관 지하에 있어서 처음 방문한 사람은 찾기 어려웠습니다. 담당자는 출입 기록을 확인한 뒤 방문증을 건넸습니다. 연구원들은 오래된 문서와 사진 자료를 함께 보러 왔습니다. 관리자는 “자료실로 함께 ___”라고 공손하게 안내했습니다. 모두 조용히 이동하며 보안 규정을 확인했습니다. 내부에서는 촬영 제한과 열람 절차를 다시 설명받았습니다. 필요한 자료는 신청서 작성 후 열람할 수 있었습니다. 방문 기록은 전산 시스템에 자동 저장되었습니다.',
      full: '자료 보관실은 본관 지하에 있어서 처음 방문한 사람은 찾기 어려웠습니다. 담당자는 출입 기록을 확인한 뒤 방문증을 건넸습니다. 연구원들은 오래된 문서와 사진 자료를 함께 보러 왔습니다. 관리자는 “자료실로 함께 이동하시죠”라고 공손하게 안내했습니다. 모두 조용히 이동하며 보안 규정을 확인했습니다. 내부에서는 촬영 제한과 열람 절차를 다시 설명받았습니다. 필요한 자료는 신청서 작성 후 열람할 수 있었습니다. 방문 기록은 전산 시스템에 자동 저장되었습니다.',
    },
    {
      blank: '졸업 심사 전날 발표자는 마지막 리허설을 마쳤습니다. 목소리는 조금 낮아졌고 표정도 지쳐 보였습니다. 팀원들은 자료 순서와 질문 예상표를 다시 확인했습니다. 조원이 “발표자께서 조금 ___”라고 조심스럽게 말했습니다. 발표자는 잠깐 쉬고 물을 마셨습니다. 지도 교수는 무리하지 말고 핵심만 말하라고 조언했습니다. 다음 날 발표는 오전 첫 순서로 배정되었습니다. 팀원들은 일찍 도착해 장비를 확인할 예정입니다.',
      full: '졸업 심사 전날 발표자는 마지막 리허설을 마쳤습니다. 목소리는 조금 낮아졌고 표정도 지쳐 보였습니다. 팀원들은 자료 순서와 질문 예상표를 다시 확인했습니다. 조원이 “발표자께서 조금 피곤하시네요”라고 조심스럽게 말했습니다. 발표자는 잠깐 쉬고 물을 마셨습니다. 지도 교수는 무리하지 말고 핵심만 말하라고 조언했습니다. 다음 날 발표는 오전 첫 순서로 배정되었습니다. 팀원들은 일찍 도착해 장비를 확인할 예정입니다.',
    },
    {
      blank: '다음 학과 토론회에서는 교육 앱 개선 방향을 다룰 예정입니다. 여러 교수와 학생 대표가 기능 우선순위를 함께 논의합니다. 사회자는 참석 가능 여부를 미리 확인해야 했습니다. 그래서 교수님께 “토론에 ___?”라고 여쭈었습니다. 교수님은 일정표를 확인한 뒤 가능하다고 답했습니다. 행정실은 참석자 명단과 좌석 배치를 다시 조정했습니다. 토론 자료는 전날까지 온라인 시스템에 등록될 예정입니다. 최종 의견은 다음 개발 회의에 반영됩니다.',
      full: '다음 학과 토론회에서는 교육 앱 개선 방향을 다룰 예정입니다. 여러 교수와 학생 대표가 기능 우선순위를 함께 논의합니다. 사회자는 참석 가능 여부를 미리 확인해야 했습니다. 그래서 교수님께 “토론에 참여하시겠어요?”라고 여쭈었습니다. 교수님은 일정표를 확인한 뒤 가능하다고 답했습니다. 행정실은 참석자 명단과 좌석 배치를 다시 조정했습니다. 토론 자료는 전날까지 온라인 시스템에 등록될 예정입니다. 최종 의견은 다음 개발 회의에 반영됩니다.',
    },
  ];

  const remedialTemplates = [
    {
      blank: '회의 시작 전부터 위원은 여러 서류를 빠르게 살폈습니다. 행정팀은 예산표와 일정표를 차례로 전달했습니다. 옆에 있던 직원은 그 모습을 보고 놀랐습니다. 직원이 “오늘 위원님께서 정말 ___”라고 말했습니다. 위원은 웃으며 중요한 안건부터 보겠다고 했습니다. 기록 담당은 발언 순서를 다시 정리했습니다. 회의는 예정된 시간 안에 마무리되었습니다. 검토 결과는 오후에 공유될 예정입니다.',
      full: '회의 시작 전부터 위원은 여러 서류를 빠르게 살폈습니다. 행정팀은 예산표와 일정표를 차례로 전달했습니다. 옆에 있던 직원은 그 모습을 보고 놀랐습니다. 직원이 “오늘 위원님께서 정말 바쁘시네요”라고 말했습니다. 위원은 웃으며 중요한 안건부터 보겠다고 했습니다. 기록 담당은 발언 순서를 다시 정리했습니다. 회의는 예정된 시간 안에 마무리되었습니다. 검토 결과는 오후에 공유될 예정입니다.',
    },
    {
      blank: '한국어 말하기 발표가 끝난 뒤 학생들은 피드백을 들었습니다. 선생님은 어젯밤에도 발음 자료를 다시 검토했습니다. 한 학생은 선생님의 노력을 뒤늦게 알게 되었습니다. 학생은 “선생님께서 밤늦게까지 ___”라고 말했습니다. 선생님은 꾸준한 연습이 더 중요하다고 답했습니다. 학생들은 다음 발표에서 고칠 부분을 적었습니다. 피드백 자료는 개인 파일에 저장되었습니다. 다음 수업에서는 억양 연습을 진행할 예정입니다.',
      full: '한국어 말하기 발표가 끝난 뒤 학생들은 피드백을 들었습니다. 선생님은 어젯밤에도 발음 자료를 다시 검토했습니다. 한 학생은 선생님의 노력을 뒤늦게 알게 되었습니다. 학생은 “선생님께서 밤늦게까지 공부하셨군요”라고 말했습니다. 선생님은 꾸준한 연습이 더 중요하다고 답했습니다. 학생들은 다음 발표에서 고칠 부분을 적었습니다. 피드백 자료는 개인 파일에 저장되었습니다. 다음 수업에서는 억양 연습을 진행할 예정입니다.',
    },
    {
      blank: '축구부 훈련 계획을 두고 신입생들이 걱정했습니다. 코치는 매일 먼저 운동장에 나와 준비 운동을 했습니다. 선배는 코치의 생활 습관을 예로 들었습니다. 선배가 “코치님께서 매일 ___”라고 설명했습니다. 신입생들은 훈련 이유를 이해하고 고개를 끄덕였습니다. 이후 각자 가능한 연습 시간을 표에 적었습니다. 부상 방지 교육도 다음 주에 진행됩니다. 새 훈련 계획은 월요일부터 적용됩니다.',
      full: '축구부 훈련 계획을 두고 신입생들이 걱정했습니다. 코치는 매일 먼저 운동장에 나와 준비 운동을 했습니다. 선배는 코치의 생활 습관을 예로 들었습니다. 선배가 “코치님께서 매일 운동하시잖아요”라고 설명했습니다. 신입생들은 훈련 이유를 이해하고 고개를 끄덕였습니다. 이후 각자 가능한 연습 시간을 표에 적었습니다. 부상 방지 교육도 다음 주에 진행됩니다. 새 훈련 계획은 월요일부터 적용됩니다.',
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
      '문화 발표 준비 시간이 거의 끝났어요. 선생님은 내일 오전까지 자료를 제출하라고 했어요. 저는 아직 사진 정리를 못 했어요. 그래서 오늘 밤 발표 준비를 ___.',
      '박물관 입구에서 학생들이 전시 설명을 듣고 있어요. 안내 직원은 사진 촬영 규정을 먼저 확인하라고 했어요. 민수는 선생님께 예의 있게 묻고 싶어요. 그래서 “선생님, 여기서 사진을 ___”라고 물어요.',
      '청소 시간이 끝나 가는데 칠판 주변이 아직 어수선해요. 친구들은 책상 배치를 마치고 교실 뒤에 모였어요. 저는 모두에게 부드럽게 제안하고 싶어요. 그래서 “우리 같이 ___”라고 말해요.',
      '수업 후 상담실에서 선배님이 조금 피곤해 보여요. 저는 따뜻한 차가 도움이 될 것 같다고 생각했어요. 그래서 정중하게 권하고 싶어요. “선배님, 따뜻한 차를 ___”라고 물어요.',
      '내일 자료 검사 시간이 있어. 친구는 아직 문서를 제대로 보지 못했어. 나는 친구가 놓친 부분이 있을까 봐 걱정돼. 그래서 “너 오늘 자료를 다시 ___”라고 말해.',
      '친구가 교실 뒤 빈자리를 가리켰어. 수업은 아직 시작되지 않았고 의자는 비어 있었어. 나는 친구에게 편하게 허락해 주고 싶어. 그래서 “응, 여기 ___”라고 말해.',
      '오후 회의가 길어져서 모두 조금 지쳤어. 친구들은 계속 문제를 풀고 있었어. 나는 잠깐 쉬자고 가볍게 제안하고 싶어. 그래서 “우리 잠깐 ___”라고 물어봐.',
      '친구가 분식집 메뉴판을 오래 보고 있어. 나는 친구가 무엇을 먹고 싶은지 궁금해. 떡볶이가 오늘 추천 메뉴라고 적혀 있어. 그래서 “너 떡볶이 ___”라고 물어봐.',
      '어제는 시험 전날이라 분위기가 진지했어요. 선생님은 기본 문제부터 다시 풀라고 했어요. 저는 약속을 취소하고 집에 있었어요. 그래서 밤늦게까지 ___.',
      '오늘 체육 활동 후 모두 많이 피곤했어요. 선생님은 컨디션이 안 좋은 학생은 먼저 쉬라고 했어요. 저는 보건실에서 잠깐 앉아 있었어요. 그래서 오늘은 먼저 ___.',
    ];
  
    const level3MainFullAnswers = [
      '끝내야 해요',
      '찍어도 돼요',
      '정리할까요',
      '마실래요',
      '읽어야 해',
      '앉아도 돼',
      '쉴까',
      '먹을래',
      '공부해야 했어요',
      '쉬어도 됐어요',
    ];
  
    const level3RemedialTemplates = [
      '내일 말하기 발표가 있어요. 아직 사진 자료와 예문을 정리하지 못했어요. 선생님 말씀을 생각하니 오늘 끝내는 게 좋아요. 그래서 발표 준비를 ___.',
      '교실 벽에 새 포스터가 붙어 있어요. 저는 숙제 자료로 사진을 남기고 싶어요. 그래도 먼저 선생님께 허락을 받고 싶어요. 그래서 “선생님, 사진을 ___”라고 물어요.',
      '점심 후 책상이 조금 어질러져 있어요. 친구들은 각자 가방을 정리하고 있어요. 저는 모두가 함께하면 빨리 끝날 것 같아요. 그래서 “우리 같이 ___”라고 말해요.',
    ];
  
    const level3RemedialFullAnswers = [
      '끝내야 해요',
      '찍어도 돼요',
      '정리할까요',
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
  if (level === 4) {
    return honorificLevel4Context(ruHint, seed);
  }
  if (level === 5) {
    return honorificLevel5Context(ruHint, seed);
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

function conjugatePastYo(target: string): string {
  const stem = target.replace(/다$/, '');
  if (stem.endsWith('가')) return `${stem.slice(0, -1)}갔어요`;
  if (stem.endsWith('오')) return `${stem.slice(0, -1)}왔어요`;
  if (stem.endsWith('하')) return `${stem.slice(0, -1)}했어요`;
  return `${stem}${hasBatchim(stem) ? '었어요' : '았어요'}`;
}

function conjugateFutureYo(target: string): string {
  const stem = target.replace(/다$/, '');
  if (stem.endsWith('가')) return `${stem.slice(0, -1)}갈 거예요`;
  if (stem.endsWith('오')) return `${stem.slice(0, -1)}올 거예요`;
  if (stem.endsWith('하')) return `${stem.slice(0, -1)}할 거예요`;
  return `${stem}${hasBatchim(stem) ? '을' : 'ㄹ'} 거예요`;
}

function isPastMovementSurface(answer: string): boolean {
  return answer.endsWith('갔어요') ||
    answer.endsWith('왔어요') ||
    answer.endsWith('했어요') ||
    answer.endsWith('았어요') ||
    answer.endsWith('었어요');
}

function movementSurface(target: string, correctAnswer: string): string {
  const normalizedAnswer = normalizeAnswer(correctAnswer);
  if (normalizedAnswer.endsWith('거예요')) return conjugateFutureYo(target);
  if (isPastMovementSurface(normalizedAnswer)) return conjugatePastYo(target);
  if (normalizedAnswer.endsWith('세요')) return conjugateHonorificYo(target);
  if (normalizedAnswer.endsWith('습니다') || normalizedAnswer.endsWith('합니다')) {
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

  if (answer === '끝내야 해요') return [answer, '끝내도 돼요', '끝낼까요', '끝낼래요'];
  if (answer === '찍어도 돼요') return [answer, '찍어야 해요', '찍을까요', '찍을래요'];
  if (answer === '정리할까요') return [answer, '정리해야 해요', '정리해도 돼요', '정리할래요'];
  if (answer === '마실래요') return [answer, '마셔도 돼요', '마셔야 해요', '마실까요'];
  if (answer === '읽어야 해') return [answer, '읽어도 돼', '읽을까', '읽을래'];
  if (answer === '앉아도 돼') return [answer, '앉아야 해', '앉을까', '앉을래'];
  if (answer === '쉴까') return [answer, '쉬어야 해', '쉬어도 돼', '쉴래'];
  if (answer === '먹을래') return [answer, '먹어야 해', '먹어도 돼', '먹을까'];
  if (answer === '공부해야 했어요') return [answer, '공부해도 됐어요', '공부할까요', '공부할래요'];
  if (answer === '쉬어도 됐어요') return [answer, '쉬어야 했어요', '쉴까요', '쉴래요'];

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

function movementMixedTenseChoiceTexts(pool: TargetItem[], correctAnswer: string): string[] {
  const normalizedAnswer = normalizeAnswer(correctAnswer);
  const tenseMakers = [
    conjugateYo,
    conjugatePastYo,
    conjugateFutureYo,
  ];
  const distractors: string[] = [];

  pool.forEach((candidate, idx) => {
    const surface = tenseMakers[idx % tenseMakers.length](candidate.target);
    if (normalizeAnswer(surface) !== normalizedAnswer) {
      distractors.push(surface);
    }
  });

  return [normalizedAnswer, ...distractors];
}

function targetChoiceTexts(
  category: Exclude<GrammarCategory, 'counters'>,
  level: UserLevel,
  item: TargetItem,
  pool: TargetItem[],
  correctAnswer: string
): string[] {
  if (category === 'movement') {
    if (level >= 3) {
      return movementMixedTenseChoiceTexts(pool, correctAnswer);
    }
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
        .replace(/-$/, '')              // trailing dash in forms like -시-
        .replace(/\(으\)/g, '')         // (으) optional
        .replace(/\([^)]*\)/g, '')      // any other parenthetical
        .trim()
    )
    .filter(v => v.length > 0);

  if (target.includes('어야 해요')) {
    cleanVariants.unshift(
      '해야 했어요', '아야 했어요', '어야 했어요',
      '해야 할 거예요', '아야 할 거예요', '어야 할 거예요',
      '해야 해요', '아야 해요', '어야 해요'
    );
  } else if (target.includes('어야 해')) {
    cleanVariants.unshift('해야 했어', '아야 했어', '어야 했어', '해야 할 거야', '아야 할 거야', '어야 할 거야', '해야 해', '아야 해', '어야 해');
  }

  if (target.includes('어도 돼요')) {
    cleanVariants.unshift(
      '해도 됐어요', '아도 됐어요', '어도 됐어요',
      '해도 될 거예요', '아도 될 거예요', '어도 될 거예요',
      '해도 돼요', '아도 돼요', '어도 돼요'
    );
  } else if (target.includes('어도 돼')) {
    cleanVariants.unshift('해도 됐어', '아도 됐어', '어도 됐어', '해도 될 거야', '아도 될 거야', '어도 될 거야', '해도 돼', '아도 돼', '어도 돼');
  }

  // ════════════════════════════════════════════════════════════════
  // CASE 1 — GRAMMATICAL ENDINGS  (target starts with -)
  // Strategy: scan space-separated tokens; find one whose clean form
  // ends with any variant (progressive shorter suffix as fallback).
  // Then fall back to plain indexOf for multi-word endings.
  // ════════════════════════════════════════════════════════════════
  if (isEnding) {
    const tokens = exampleKr.split(' ');

    // Special case: future/confirmation endings such as "확인할 거죠?" and "의논할 거예요".
    // The old logic blanked only "거죠" or "거예요", so choices became too short.
    // Here we blank the preceding verb phrase together with the ending.
    if (target.includes('거예요')) {
      for (let i = 1; i < tokens.length; i++) {
        const tokenClean = tokens[i].replace(/[.!?,。]/g, '');
        if (tokenClean === '거예요') {
          const punct = tokens[i].slice(tokenClean.length);
          const result = [...tokens];
          result.splice(i - 1, 2, '___' + punct);
          return result.join(' ');
        }
      }
    }

    if (target.includes('지요') || target.includes('죠')) {
      for (let i = 1; i < tokens.length; i++) {
        const tokenClean = tokens[i].replace(/[.!?,。]/g, '');
        if (tokenClean === '거죠' || tokenClean === '거지요') {
          const punct = tokens[i].slice(tokenClean.length);
          const result = [...tokens];
          result.splice(i - 1, 2, '___' + punct);
          return result.join(' ');
        }
      }
    }

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

    // 가 → 갔 / 갈  (가다 compounds: 기어가다→기어갔어요, 기어갈 거예요)
    if (stem.endsWith('가')) {
      const pre = stem.slice(0, -1);
      candidates.push(pre + '갔', pre + '갈');
    }

    // 오 → 와 / 왔 / 올  (오다 compounds: 기어오다→기어와요, 기어왔어요, 기어올 거예요)
    if (stem.endsWith('오')) {
      const pre = stem.slice(0, -1);
      candidates.push(pre + '와', pre + '왔', pre + '올');
    }

    // 하 → 합 / 해 / 했 / 할  (하다 compounds: 이동합니다, 이동해요, 이동했어요, 이동할 거예요)
    if (stem.endsWith('하')) {
      const pre = stem.slice(0, -1);
      candidates.push(pre + '합', pre + '해', pre + '했', pre + '할');
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
        let end = wEnd(exampleKr, idx + form.length);
        if (exampleKr.slice(end).startsWith(' 거예요')) {
          end += ' 거예요'.length;
        }
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
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 자동차 — машину как транспорт |
| Почему так | Для машин, техники и транспорта используют **대**. Здесь считают одну машину на стоянке, поэтому правильный ответ — **대**. |`,
    'main-2': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 컴퓨터 — компьютеры как технику |
| Почему так | Компьютер — это техника. Для такой техники в корейском подходит счётное слово **대**. |`,
    'main-3': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 비빔밥 — порции еды в мисках |
| Почему так | Еду, которую подают в миске, считают словом **그릇**. Поэтому для пибимпапа в этой ситуации нужен ответ **그릇**. |`,
    'main-4': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 라면 — порции рамена в посуде |
| Почему так | Когда рамен уже приготовлен как порция в миске, используют **그릇**. Здесь считают именно готовые миски рамена. |`,
    'main-5': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 김치 — контейнеры с кимчи |
| Почему так | Кимчи часто хранят в контейнерах. Для контейнеров или больших ёмкостей подходит **통**. |`,
    'main-6': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 물통 — большие ёмкости с водой |
| Почему так | Слово **통** используют для канистр, баков и контейнеров. В тексте считают ёмкости с водой. |`,
    'main-7': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 귤 — коробки с мандаринами |
| Почему так | Если мандарины лежат в коробках, считают не отдельные фрукты, а коробки. Поэтому подходит **상자**. |`,
    'main-8': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 책 — коробки с книгами |
| Почему так | Во время переезда книги упакованы в коробки. Для коробок используют счётное слово **상자**. |`,
    'main-9': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 버스 — автобусы как транспорт |
| Почему так | Автобус — это транспортное средство. Для транспорта и машин используют **대**. |`,
    'main-10': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 국수 — порции лапши в мисках |
| Почему так | Готовую лапшу в миске считают словом **그릇**. Поэтому правильное выражение — **${fullPhrase}**. |`,
    'remedial-1': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 자동차 — одну машину |
| Почему так | Машины считают словом **대**. Это счётное слово для транспорта и техники. |`,
    'remedial-2': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 컴퓨터 — два компьютера |
| Почему так | Компьютеры относятся к технике, поэтому нужно использовать **대**. |`,
    'remedial-3': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 비빔밥 — три порции в мисках |
| Почему так | Для еды в миске подходит **그릇**. Здесь считают не продукты отдельно, а готовые порции. |`,
  };

  return explanations[key] ?? `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | ${item.meaning} |
| Почему так | Нужно выбрать счётное слово по типу предмета. В этом вопросе подходит **${item.unit}**. |`;
}

function generateCounterLevel4Explanation(
  order: number,
  stage: 'main' | 'remedial',
  item: CounterItem,
  fullPhrase: string
): string {
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 과자 — пакеты снэков |
| Почему так | Снэки лежат в пакете, поэтому используют **봉지**. Здесь важно не количество отдельных снэков, а количество пакетов. |`,
    'main-2': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 라면 — упаковки рамена |
| Почему так | Рамен до приготовления находится в пакете. Для таких упаковок подходит счётное слово **봉지**. |`,
    'main-3': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 연필 — тонкие палочки/карандаши |
| Почему так | Для длинных тонких предметов, похожих на палочки, можно использовать **봉**. Поэтому для карандашей подходит **봉**. |`,
    'main-4': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 볼펜 — ручки как тонкие предметы |
| Почему так | Ручка длинная и тонкая, поэтому в этом наборе используется **봉**. |`,
    'main-5': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 김밥 — длинные рулеты/ряды кимбапа |
| Почему так | Кимбап имеет длинную форму. Для длинных линий или рулетов используют **줄**. |`,
    'main-6': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 목걸이 — ожерелья как длинные линии |
| Почему так | Ожерелье похоже на длинную нить. Поэтому подходит счётное слово **줄**. |`,
    'main-7': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 장미 — отдельные цветки розы |
| Почему так | Для отдельных цветков используют **송이**. Здесь считают не букет, а цветки розы. |`,
    'main-8': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 국화 — отдельные цветки хризантемы |
| Почему так | Хризантемы как отдельные цветы считают словом **송이**. |`,
    'main-9': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 사탕 — пакеты конфет |
| Почему так | Если конфеты лежат в пакетах, считают пакеты. Поэтому подходит **봉지**. |`,
    'main-10': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 진주 — нити жемчуга |
| Почему так | Жемчуг нанизан в длинную линию. Для нити или ряда используют **줄**. |`,
    'remedial-1': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 과자 — пакеты снэков |
| Почему так | В дополнительном вопросе снэки лежат в пакете. Значит, нужен ответ **봉지**. |`,
    'remedial-2': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 라면 — пакеты рамена |
| Почему так | Рамен в упаковке считают словом **봉지**. |`,
    'remedial-3': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 연필 — тонкие карандаши |
| Почему так | Карандаш — длинный тонкий предмет, поэтому подходит **봉**. |`,
  };

  return explanations[key] ?? `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | ${item.meaning} |
| Почему так | Нужно выбрать счётное слово по типу предмета. В этом вопросе подходит **${item.unit}**. |`;
}


function generateCounterLevel5Explanation(
  order: number,
  stage: 'main' | 'remedial',
  item: CounterItem,
  fullPhrase: string
): string {
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 배추 — пекинскую капусту как целое растение/кочан |
| Почему так | Для капусты и похожих растений используют счётное слово **포기**. Здесь считают один целый кочан, а не листы. |`,
    'main-2': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 무 — редьку как целое растение |
| Почему так | **포기** подходит для растений или крупных овощей, которые считают целиком. Поэтому для редьки в этой ситуации нужен тот же тип счётного слова. |`,
    'main-3': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 양파 — отдельные головки лука |
| Почему так | **알** используют для маленьких круглых единиц, например головок лука. Здесь важна не упаковка, а отдельные штуки. |`,
    'main-4': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 마늘 — отдельные зубчики/головки чеснока |
| Почему так | Для маленьких округлых частей чеснока подходит **알**. Поэтому ответ не «개» и не «봉지», а именно **알**. |`,
    'main-5': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 한옥 — традиционные дома/здания |
| Почему так | Для домов и зданий в корейском используют счётное слово **채**. Здесь считают отдельные здания 한옥. |`,
    'main-6': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 집 — дома как отдельные здания |
| Почему так | **채** используют, когда считают дома или здания. В тексте речь идёт о нескольких домах в проекте управления жильём. |`,
    'main-7': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 배 — суда/корабли |
| Почему так | Для кораблей и судов используют счётное слово **척**. Поэтому в музейном тексте правильно сказать **배 일곱 척**. |`,
    'main-8': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 장기 — партии корейских шахмат |
| Почему так | Для партий игры используют **판**. Здесь считают не доски и не людей, а официальные игровые партии. |`,
    'main-9': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 고기 — куски мяса |
| Почему так | **덩어리** используют для кусков или глыб. В тексте мясо подготовлено как отдельные куски для практики. |`,
    'main-10': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 얼음 — куски льда |
| Почему так | Для кусков льда подходит **덩어리**, потому что лёд воспринимается как отдельная глыба или кусок. |`,
    'remedial-1': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 배추 — один кочан/растение |
| Почему так | В дополнительном вопросе снова считают целую пекинскую капусту. Для такого предмета используется **포기**. |`,
    'remedial-2': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 무 — целую редьку |
| Почему так | Редьку считают как растение/крупный овощ, поэтому подходит **포기**. |`,
    'remedial-3': `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | 양파 — отдельные головки лука |
| Почему так | Для лука как отдельных округлых штук используют **알**. Поэтому правильный ответ — **알**. |`,
  };

  return explanations[key] ?? `| 항목 | 설명 |
|---|---|
| Ответ | **${item.unit}** |
| Полное выражение | **${fullPhrase}** |
| Что считают | ${item.meaning} |
| Почему так | Нужно выбрать счётное слово по типу предмета. В этом вопросе подходит **${item.unit}**. |`;
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
      : level === 4
      ? counterLevel4Context(blankPhrase, fullPhrase, ruHint, contextSeed)
      : level === 5
      ? counterLevel5Context(blankPhrase, fullPhrase, ruHint, contextSeed)
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
    level === 4
      ? generateCounterLevel4Explanation(order, stage, item, fullPhrase)
      : level === 5
      ? generateCounterLevel5Explanation(order, stage, item, fullPhrase)
      : level === 3
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
      `Ученик говорит вежливо о том, что подготовку нужно закончить.
` +
      `Ситуация связана с учителем и сроком сдачи.
` +
      `«끝내야 해요» значит “нужно закончить”.
` +
      `Окончание «요» делает фразу вежливой.`,

    'main-2':
      `Минсу спрашивает у учителя разрешение фотографировать.
` +
      `Когда спрашиваем учителя, лучше использовать вежливую форму.
` +
      `«찍어도 돼요?» значит “можно фотографировать?”.
` +
      `Форма «-아/어도 돼요» показывает разрешение.`,

    'main-3':
      `Говорящий предлагает всем вместе убрать класс.
` +
      `Форма «정리할까요?» звучит мягко и вежливо.
` +
      `Она значит “давайте уберём?” или “уберём вместе?”.
` +
      `Поэтому она подходит для предложения группе.`,

    'main-4':
      `Говорящий обращается к старшему человеку — 선배님.
` +
      `Он вежливо спрашивает, хочет ли тот выпить чай.
` +
      `«마실래요?» значит “хотите выпить?”.
` +
      `Окончание «요» делает вопрос более вежливым.`,

    'main-5':
      `Здесь человек говорит с близким другом.
` +
      `Он говорит, что другу нужно снова прочитать материалы.
` +
      `«읽어야 해» — разговорная форма “нужно прочитать”.
` +
      `Без «요» она подходит для 친구.`,

    'main-6':
      `Говорящий разрешает другу сесть на свободное место.
` +
      `С другом можно говорить просто, без вежливого окончания.
` +
      `«앉아도 돼» значит “можно сесть”.
` +
      `Форма «-아/어도 돼» показывает разрешение в 반말.`,

    'main-7':
      `Все устали после долгой встречи.
` +
      `Говорящий мягко предлагает другу немного отдохнуть.
` +
      `«쉴까?» значит “может, отдохнём?”.
` +
      `Это дружеское предложение без «요».`,

    'main-8':
      `Говорящий спрашивает друга, хочет ли тот съесть токпокки.
` +
      `Между друзьями можно использовать 반말.
` +
      `«먹을래?» значит “хочешь съесть?”.
` +
      `Это вопрос о желании в разговорной форме.`,

    'main-9':
      `Вчера был день перед экзаменом.
` +
      `Говорящий объясняет, что нужно было учиться.
` +
      `«공부해야 했어요» значит “нужно было учиться”.
` +
      `Это вежливая прошедшая форма обязанности.`,

    'main-10':
      `После физической активности ученику разрешили сначала отдохнуть.
` +
      `«쉬어도 됐어요» значит “можно было отдохнуть”.
` +
      `Это прошедшая вежливая форма разрешения.
` +
      `Она подходит, потому что ситуация уже произошла.`,

    'remedial-1':
      `Это дополнительный вопрос про обязанность.
` +
      `Подготовку к выступлению нужно закончить.
` +
      `«끝내야 해요» значит “нужно закончить”.
` +
      `Форма вежливая, потому что есть окончание «요».`,

    'remedial-2':
      `Это дополнительный вопрос про разрешение.
` +
      `Ученик хочет сфотографировать плакат и спрашивает учителя.
` +
      `«찍어도 돼요?» значит “можно фотографировать?”.
` +
      `С учителем такая форма звучит вежливо.`,

    'remedial-3':
      `Это дополнительный вопрос про предложение.
` +
      `Говорящий предлагает вместе убрать столы.
` +
      `«정리할까요?» значит “давайте уберём?”.
` +
      `Форма подходит для мягкого вежливого предложения.`,
  };

  return (
    `${answer}

` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать форму речи по ситуации.
` +
      `Если говорим с учителем или старшим человеком, лучше использовать вежливую форму.
` +
      `Если говорим с близким другом, можно использовать простую разговорную форму.`)
  );
}

function generateHonorificLevel4Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `Ученик говорит учителю, что сам проверит материалы.
` +
      `Форма «-겠습니다» звучит официально и показывает обещание или намерение сделать действие.
` +
      `Поэтому «점검하겠습니다» подходит для ответственной ситуации.`,
    'main-2':
      `Здесь говорится о состоянии регистрационного окна сейчас.
` +
      `«바쁩니다» — официальная форма настоящего времени от «바쁘다».
` +
      `Такую форму часто используют в объявлениях и официальной речи.`,
    'main-3':
      `Посетитель спрашивает о человеке через существительное «담당자».
` +
      `После существительного в официальном вопросе используется «입니까?».
` +
      `Поэтому правильный ответ — «담당자입니까».`,
    'main-4':
      `В анкете задают официальный вопрос о действии.
` +
      `«운동합니까?» — официальный вопрос с окончанием «습니까?» без уважительного элемента «시».
` +
      `Так можно официально спросить о привычке группы людей.`,
    'main-5':
      `В инструкции просят подать заявление до срока.
` +
      `«제출하십시오» — очень вежливая официальная просьба или указание.
` +
      `Эта форма подходит для объявлений, правил и документов.`,
    'main-6':
      `В предложении говорится о директоре школы.
` +
      `Часть «시» показывает уважение к человеку, который выполняет действие.
` +
      `Поэтому «참석하시고» правильно подчёркивает уважение к директору.`,
    'main-7':
      `Это пример словарной уважительной формы.
` +
      `«승인하시다» — форма с «시», которая уважительно описывает действие директора.
` +
      `Она нужна, когда мы изучаем или записываем базовую форму 높임말.`,
    'main-8':
      `Профессор является уважаемым лицом в ситуации лекции.
` +
      `«설명하십니다» соединяет уважение «시» и официальное окончание «습니다».
` +
      `Поэтому форма звучит вежливо и официально.`,
    'main-9':
      `В тексте говорится о том, что учитель уже провёл консультацию вчера.
` +
      `«진행하셨어요» — уважительная форма прошедшего времени.
` +
      `Она показывает и прошлое действие, и уважение к учителю.`,
    'main-10':
      `Ученик обещает доложить результат до завтра.
` +
      `«보고하겠습니다» — официальное обещание выполнить действие в будущем.
` +
      `Так говорят в ответственной учебной или рабочей ситуации.`,
    'remedial-1':
      `В дополнительном вопросе ученик снова обещает проверить материалы.
` +
      `«점검하겠습니다» показывает официальное намерение: “я проверю”.
` +
      `Форма подходит для разговора с учителем.`,
    'remedial-2':
      `Здесь сотрудник говорит о том, что окно регистрации занято.
` +
      `«바쁩니다» — официальная форма от «바쁘다».
` +
      `Она звучит аккуратно и подходит для рабочей ситуации.`,
    'remedial-3':
      `Родитель спрашивает, является ли этот человек ответственным.
` +
      `После существительного «담당자» используется официальный вопрос «입니까?».
` +
      `Поэтому правильная форма — «담당자입니까».`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать форму речи по ситуации.\n` +
      `Официальные формы используют с учителями, сотрудниками и в документах.\n` +
      `Смотри, нужно ли сказать обещание, вопрос, просьбу, уважение или прошлое действие.`)
  );
}

function generateHonorificLevel5Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `Говорящий замечает, что уважаемый человек сегодня очень занят.
` +
      `«바쁘시네요» содержит уважительное «시» и окончание «네요».
` +
      `Эта форма подходит, когда мы мягко говорим о новом впечатлении.`,
    'main-2':
      `Студент понял, что учитель занимался до поздней ночи.
` +
      `«공부하셨군요» показывает уважение, прошедшее время и новое понимание.
` +
      `Окончание «군요» часто выражает: “теперь я понял”.`,
    'main-3':
      `Старший напоминает факт, который все уже знают.
` +
      `«운동하시잖아요» значит “ведь тренируется”.
` +
      `Окончание «잖아요» удобно, когда собеседник тоже знает эту информацию.`,
    'main-4':
      `Тимлид мягко проверяет, будет ли команда смотреть материалы.
` +
      `«확인할 거죠?» — это вопрос-подтверждение о будущем действии.
` +
      `Форма «죠?» звучит мягче, чем прямой официальный вопрос.`,
    'main-5':
      `Здесь речь идёт о будущем плане.
` +
      `«의논할 거예요» значит “будут обсуждать”.
` +
      `Форма «-(으)ㄹ 거예요» показывает будущее или намерение.`,
    'main-6':
      `В предложении действие продолжалось в прошлом.
` +
      `«분석하고 있었어요» значит “анализировали в тот момент”.
` +
      `Форма «-고 있었어요» показывает процесс, который шёл раньше.`,
    'main-7':
      `Социальный ведущий вежливо просит у члена комиссии мнение.
` +
      `«공유하시겠어요?» — очень мягкая форма просьбы или предложения.
` +
      `Она подходит, когда мы уважаем собеседника.`,
    'main-8':
      `Сотрудник предлагает всем пройти в архив материалов.
` +
      `«이동하시죠» звучит как вежливое приглашение: “давайте пройдём”.
` +
      `Форма «시죠» помогает говорить мягко и уважительно.`,
    'main-9':
      `Команда заметила, что докладчик выглядит уставшим.
` +
      `«피곤하시네요» мягко описывает новое наблюдение о состоянии человека.
` +
      `Уважительное «시» показывает аккуратное отношение к докладчику.`,
    'main-10':
      `Социальный ведущий спрашивает профессора о готовности участвовать.
` +
      `«참여하시겠어요?» — вежливый вопрос о желании или возможности.
` +
      `Так можно мягко обратиться к старшему или уважаемому человеку.`,
    'remedial-1':
      `В дополнительном вопросе сотрудник замечает, что член комиссии занят.
` +
      `«바쁘시네요» выражает уважение и новое впечатление.
` +
      `Эта форма звучит мягко и не слишком прямо.`,
    'remedial-2':
      `Студент понял, что учитель долго готовился.
` +
      `«공부하셨군요» показывает уважение и прошедшее действие.
` +
      `Окончание «군요» помогает сказать: “теперь я понял”.`,
    'remedial-3':
      `Старший напоминает новичкам известный факт о тренере.
` +
      `«운동하시잖아요» значит “ведь тренируется”.
` +
      `Форма «잖아요» подходит, когда информация уже знакома собеседнику.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать форму, которая подходит к настроению и ситуации.\n` +
      `Посмотри: говорящий удивляется, подтверждает факт, говорит о будущем или вежливо предлагает действие.\n` +
      `Также важно понять, нужно ли уважение к человеку.`)
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
      `Ученик осторожно подошёл к собаке-поводырю.
` +
      `Движение идёт к объекту, а не к месту говорящего.
` +
      `Поэтому подходит «다가갔어요»: он подошёл ближе туда.
` +
      `Форма прошедшая, потому что действие уже произошло.`,

    'main-2':
      `Ученики ждут автобус на остановке.
` +
      `Автобус будет двигаться к месту, где стоят говорящие.
` +
      `Поэтому нужен ответ «다가올 거예요» — “приблизится сюда”.
` +
      `Форма будущего времени подходит, потому что автобус ещё не приехал.`,

    'main-3':
      `Зрители стояли слишком близко к входу в выставочный зал.
` +
      `Они отошли назад за линию безопасности.
` +
      `Здесь движение идёт от опасного места, поэтому используется «물러갔어요».
` +
      `Это прошедшее время: люди уже отступили.`,

    'main-4':
      `Младший брат испугался мяча и отходит к говорящему.
` +
      `Так как движение направлено к стороне говорящего, нужна часть «오다».
` +
      `Поэтому правильный ответ — «물러와요».
` +
      `Это значит: он отступает сюда.`,

    'main-5':
      `Друг скоро переедет в другой город.
` +
      `Он покинет район, где сейчас находятся друзья.
` +
      `Поэтому подходит «떠나갈 거예요» — “уедет прочь”.
` +
      `Форма будущего времени показывает, что это случится позже.`,

    'main-6':
      `Говорящий раньше жил в родном городе, а теперь находится в Сеуле.
` +
      `Он покинул одно место и оказался здесь.
` +
      `Поэтому нужен ответ «떠나왔어요».
` +
      `Эта форма показывает движение оттуда к нынешнему месту говорящего.`,

    'main-7':
      `В тексте говорится о воде в реке.
` +
      `Вода течёт от гор к морю, то есть дальше по направлению.
` +
      `Поэтому подходит «흘러가요».
` +
      `Глагол с «가다» показывает движение дальше от исходной точки.`,

    'main-8':
      `Песня звучала в соседнем классе и дошла до комнаты говорящего.
` +
      `Звук как будто “течёт” к говорящему.
` +
      `Поэтому правильный ответ — «흘러왔어요».
` +
      `Это прошедшее время: звук уже донёсся сюда.`,

    'main-9':
      `Во время тренировки дети должны вернуться в безопасную зону.
` +
      `Они будут отступать в сторону учителя, то есть сюда.
` +
      `Поэтому подходит «물러올 거예요».
` +
      `Будущее время показывает действие, которое скоро произойдёт.`,

    'main-10':
      `Срок проекта становится всё ближе.
` +
      `Здесь речь не о человеке, а о времени, которое приближается.
` +
      `Для такого смысла подходит «다가와요».
` +
      `Это значит, что момент становится ближе к нам.`,

    'remedial-1':
      `Младший брат осторожно подошёл к маленькой птице.
` +
      `Он двигался к объекту, поэтому используется «다가갔어요».
` +
      `Это прошедшее время.
` +
      `Главная идея: приблизиться к кому-то — 다가가다.`,

    'remedial-2':
      `Говорящий ждёт автобус на остановке.
` +
      `Автобус скоро приблизится к нему.
` +
      `Поэтому нужен ответ «다가올 거예요».
` +
      `Часть «오다» показывает движение к говорящему.`,

    'remedial-3':
      `Ученики стояли слишком близко к сцене.
` +
      `Учитель попросил их отойти назад.
` +
      `Поэтому подходит «물러갔어요».
` +
      `Это значит, что они отступили назад от сцены.`,
  };

  return (
    `${answer}

` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать глагол движения.
` +
      `Если движение идёт к объекту или от места, часто используется «가다».
` +
      `Если движение идёт к говорящему, часто используется «오다».`)
  );
}

function generateMovementLevel4Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `Мяч уже укатился от учеников к краю площадки.
` +
      `«굴러가다» значит “катиться туда, от говорящего”.
` +
      `Форма «굴러갔어요» показывает прошедшее время.`,
    'main-2':
      `Монета ещё не докатилась, но покатится к человеку, который ждёт внизу.
` +
      `«굴러오다» значит “катиться сюда, к говорящему”.
` +
      `Форма «굴러올 거예요» показывает будущее.`,
    'main-3':
      `Бумажный самолётик летит от места броска наружу.
` +
      `«날아가다» значит “улетать туда, дальше от говорящего”.
` +
      `Поэтому подходит настоящее «날아가요».`,
    'main-4':
      `Лист прилетел снаружи прямо к столу говорящего.
` +
      `«날아오다» значит “прилетать сюда”.
` +
      `«날아왔어요» показывает, что это уже произошло.`,
    'main-5':
      `Ученик собирается быстро побежать к главному входу.
` +
      `«뛰어가다» значит “бежать туда, от текущего места”.
` +
      `Форма «뛰어갈 거예요» говорит о будущем действии.`,
    'main-6':
      `Младший брат бежит с площадки к говорящему.
` +
      `«뛰어오다» значит “бежать сюда, к нам”.
` +
      `Поэтому правильная форма — «뛰어와요».`,
    'main-7':
      `Бабушка уже дошла пешком до входа на рынок.
` +
      `«걸어가다» значит “идти пешком туда”.
` +
      `«걸어갔어요» показывает прошедшее время.`,
    'main-8':
      `Друг скоро подойдёт пешком к месту, где сидит группа.
` +
      `«걸어오다» значит “идти пешком сюда”.
` +
      `Форма «걸어올 거예요» показывает будущее.`,
    'main-9':
      `Черепаха ползёт от места наблюдения к песчаному холму.
` +
      `«기어가다» значит “ползти туда”.
` +
      `Здесь подходит настоящее «기어가요».`,
    'main-10':
      `Малыш уже подполз к маме.
` +
      `«기어오다» значит “ползти сюда, к человеку”.
` +
      `«기어왔어요» показывает прошедшее действие.`,
    'remedial-1':
      `В дополнительном вопросе мяч укатился по коридору от места, где он лежал.
` +
      `Направление идёт дальше от говорящего, поэтому нужен глагол «굴러가다».
` +
      `Так как действие уже случилось, форма — «굴러갔어요».`,
    'remedial-2':
      `Здесь шарик должен покатиться к человеку, который ждёт внизу.
` +
      `Направление идёт к говорящему, поэтому нужен «굴러오다».
` +
      `Будущее время выражено формой «굴러올 거예요».`,
    'remedial-3':
      `Бумажный самолётик летит в сторону коридора, то есть дальше от места броска.
` +
      `Для такого движения подходит «날아가다».
` +
      `В предложении используется настоящее время «날아가요».`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе важно понять направление движения.\n` +
      `«가다» обычно показывает движение туда, дальше от говорящего.\n` +
      `«오다» показывает движение сюда, к говорящему или к месту наблюдения.`)
  );
}

function generateMovementLevel5Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `Насекомое двигалось вниз по контейнеру, ползком и от верхней точки.
` +
      `«기어내려가다» значит “сползать вниз туда”.
` +
      `Форма «기어내려갔어요» показывает, что действие уже произошло.`,
    'main-2':
      `Кошка будет подниматься ползком к спасателям наверху.
` +
      `«기어올라오다» значит “заползать вверх сюда”.
` +
      `«기어올라올 거예요» показывает будущее.`,
    'main-3':
      `Спасатель быстро бежит к месту происшествия.
` +
      `«달려가다» значит “побежать туда, от текущего места”.
` +
      `Поэтому подходит форма «달려가요».`,
    'main-4':
      `Сотрудник прибежал к стойке информации, то есть к месту ожидания.
` +
      `«달려오다» значит “бежать сюда”.
` +
      `Форма «달려왔어요» показывает прошлое действие.`,
    'main-5':
      `Пловец поплывёт к другой стороне линии безопасности.
` +
      `«헤엄쳐가다» значит “плыть туда”.
` +
      `Будущее выражено формой «헤엄쳐갈 거예요».`,
    'main-6':
      `Утка плывёт к месту, где наблюдают ученики.
` +
      `«헤엄쳐오다» значит “плыть сюда”.
` +
      `Поэтому правильный ответ — «헤엄쳐와요».`,
    'main-7':
      `Исследовательская группа уже переехала в новую лабораторию.
` +
      `«옮겨가다» значит “переместиться туда, в другое место”.
` +
      `Прошедшее время — «옮겨갔어요».`,
    'main-8':
      `Данные будут перенесены к центральному серверу.
` +
      `«옮겨오다» значит “переместиться сюда, к нужному центру”.
` +
      `Форма «옮겨올 거예요» показывает будущее.`,
    'main-9':
      `Участники меняют место и переходят во временную переговорную.
` +
      `«이동하다» просто значит “перемещаться”.
` +
      `В предложении используется настоящее «이동해요».`,
    'main-10':
      `Автобус уже отправился в назначенное время.
` +
      `«출발하다» значит “отправляться, начинать путь”.
` +
      `Прошедшая форма — «출발했어요».`,
    'remedial-1':
      `Поезд уже прибыл на следующую станцию.
` +
      `«도착하다» значит “прибывать в пункт назначения”.
` +
      `Форма «도착했어요» показывает прошедшее время.`,
    'remedial-2':
      `Насекомое сползло вниз по дереву.
` +
      `Движение идёт вниз и дальше от верхней точки, поэтому нужен «기어내려가다».
` +
      `Правильная форма — «기어내려갔어요».`,
    'remedial-3':
      `Кошка должна подняться вверх к спасателю.
` +
      `Для ползущего движения вверх сюда подходит «기어올라오다».
` +
      `Будущее время — «기어올라올 거예요».`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать глагол движения.\n` +
      `Смотри на способ движения: ползти, бежать, плыть, перемещаться, отправляться или прибывать.\n` +
      `Также проверь направление: туда или сюда.`)
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
      `В тексте говорится о сильном дожде.
` +
      `Дождь стал причиной изменения места занятия.
` +
      `«오기 때문에» значит “потому что идёт”.
` +
      `После причины идёт результат: занятие перенесли в класс.`,

    'main-2':
      `Минсу объясняет другу причину, почему он не бегает.
` +
      `Слово «왜냐하면» начинает прямое объяснение причины.
` +
      `После него говорится: он вчера повредил лодыжку.
` +
      `Поэтому ответ «왜냐하면» подходит к диалогу.`,

    'main-3':
      `В библиотеке много людей читают тихо.
` +
      `Из этого правила делается вывод: говорить по телефону нужно снаружи.
` +
      `«그렇기 때문에» значит “именно поэтому”.
` +
      `Оно хорошо соединяет причину и вывод.`,

    'main-4':
      `Джимин показывает фотографию и одновременно объясняет её.
` +
      `Два действия происходят вместе.
` +
      `«그러면서» значит “при этом / одновременно”.
` +
      `Поэтому это выражение подходит к ситуации презентации.`,

    'main-5':
      `Минхо сначала просто гулял в парке.
` +
      `Во время этого действия неожиданно зазвонил телефон.
` +
      `«그러다가» показывает событие, которое случилось в процессе другого действия.
` +
      `Поэтому оно подходит перед звонком друга.`,

    'main-6':
      `Здесь есть условие: если домашнее задание будет закончено.
` +
      `После условия идёт просьба отправить сообщение.
` +
      `«만약» значит “если”.
` +
      `Это слово помогает начать условное предложение.`,

    'main-7':
      `Класс заранее думает о плохой погоде.
` +
      `Это возможная ситуация, которая может случиться в будущем.
` +
      `«만약에» значит “если вдруг”.
` +
      `Оно звучит мягко и подходит для плана на случай дождя.`,

    'main-8':
      `Сначала человек соглашается, что времени мало.
` +
      `Потом он предлагает решение: тренироваться коротко.
` +
      `«그렇다면» значит “если так, тогда”.
` +
      `Поэтому это выражение связывает ситуацию и решение.`,

    'main-9':
      `В тексте говорится о снеге и скользких ступеньках.
` +
      `Снег — причина, по которой нужно идти медленно.
` +
      `«오기 때문에» объясняет эту причину.
` +
      `Значит, после него естественно идёт совет быть осторожным.`,

    'main-10':
      `Суджин объясняет, почему изменила время встречи.
` +
      `Она прямо начинает объяснение причины.
` +
      `Для такого начала подходит «왜냐하면».
` +
      `После него идёт сама причина: появились семейные дела.`,

    'remedial-1':
      `Мероприятие перенесли из-за сильного дождя.
` +
      `Ответ «오기 때문에» объясняет причину.
` +
      `После него идёт результат: место поменяли на спортзал.
` +
      `Это простая связь “причина → результат”.`,

    'remedial-2':
      `Говорящий объясняет, почему он ушёл домой раньше.
` +
      `После «왜냐하면» сразу называется причина.
` +
      `Причина простая: болела голова.
` +
      `Поэтому это слово подходит для ответа.`,

    'remedial-3':
      `Перед экзаменом ещё остались незнакомые слова.
` +
      `Из этой причины появляется вывод: нужно снова учиться.
` +
      `«그렇기 때문에» значит “именно поэтому”.
` +
      `Оно помогает связать проблему и решение.`,
  };

  return (
    `${answer}

` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать выражение, которое связывает части текста.
` +
      `Сначала найди причину, условие или событие.
` +
      `Потом выбери выражение, которое подходит к смыслу всего текста.`)
  );
}

function generateReasonLevel5Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `В тексте говорится, что ученики лучше поняли сложную грамматику из-за помощи учителя.\n` +
      `Это хорошая причина, поэтому подходит «덕분에» — “благодаря”.\n` +
      `Так говорят, когда результат стал лучше из-за человека, помощи или хорошего действия.`,
    'main-2':
      `Здесь расписание задержалось из-за ошибки при подготовке.\n` +
      `Причина плохая, поэтому нужно «탓에» — “из-за / по вине”.\n` +
      `Это слово часто показывает неприятную причину и плохой результат.`,
    'main-3':
      `Студент был занят работой и поэтому не смог ответить на звонок.\n` +
      `«일하느라고» значит “потому что был занят работой”.\n` +
      `Эта форма показывает, что одно действие помешало сделать другое.`,
    'main-4':
      `Перед этим в тексте было несколько данных про цифровые платформы.\n` +
      `Потом автор коротко объясняет главную мысль.\n` +
      `Поэтому подходит «즉» — “то есть”.`,
    'main-5':
      `Здесь эксперт объясняет ту же мысль другими словами.\n` +
      `Сначала говорится, что одной прибавки автобусов мало.\n` +
      `«다시 말하면» помогает переформулировать мысль: “другими словами”.`,
    'main-6':
      `Учитель просит дать конкретный пример.\n` +
      `После пустого места идут примеры: записывать активность и чаще пользоваться лестницей.\n` +
      `Поэтому нужен ответ «예를 들면» — “например”.`,
    'main-7':
      `Сначала в тексте есть данные: много мусора получается из одноразовых вещей.\n` +
      `Потом идёт логический вывод: нужно расширить кампанию с многоразовыми стаканами.\n` +
      `«그러므로» значит “следовательно / поэтому” и подходит для вывода.`,
    'main-8':
      `Консультант помог ученику спокойно относиться к ошибкам.\n` +
      `Результат положительный: ученик стал увереннее.\n` +
      `Поэтому подходит «덕분에» — “благодаря”.`,
    'main-9':
      `Экзамен остановился из-за плохой подготовки системы.\n` +
      `Причина негативная, поэтому подходит «탓에».\n` +
      `Это слово показывает, что проблема появилась по чьей-то ошибке или из-за плохой ситуации.`,
    'main-10':
      `Руководитель был занят работой и поэтому не увидел звонок.\n` +
      `«일하느라고» показывает: человек делал одно дело, и из-за этого не смог сделать другое.\n` +
      `Это не просто причина, а причина-помеха.`,
    'remedial-1':
      `Учитель помог ученикам стать увереннее.\n` +
      `Это хорошая причина и хороший результат.\n` +
      `Поэтому правильный ответ — «덕분에».`,
    'remedial-2':
      `Программа началась поздно из-за ошибки в организации.\n` +
      `Результат плохой, поэтому нужно «탓에».\n` +
      `Так можно сказать: “из-за ошибки”.`,
    'remedial-3':
      `Казначей был занят подсчётом денег и поэтому не прочитал сообщение вовремя.\n` +
      `«일하느라고» значит, что работа помешала другому действию.\n` +
      `Поэтому этот ответ лучше всего подходит к ситуации.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно понять связь между двумя частями текста.\n` +
      `Сначала найди причину или объяснение.\n` +
      `Потом выбери выражение, которое лучше всего передаёт эту связь.`)
  );
}

function generateReasonLevel4Explanation(
  order: number,
  stage: 'main' | 'remedial',
  correctAnswer: string
): string {
  const answer = `**Ответ: «${correctAnswer}»**`;
  const key = `${stage}-${order}`;

  const explanations: Record<string, string> = {
    'main-1':
      `Здесь сначала говорится, что Минсу стал лучше учиться.\n` +
      `Но потом появляется противоположная мысль: аудирование всё ещё трудное.\n` +
      `Поэтому подходит «그렇지만» — “но / однако”.`,

    'main-2':
      `В этом тексте у библиотеки есть хорошие стороны.\n` +
      `После этого говорится о минусе: вечером она открыта мало.\n` +
      `«그러나» хорошо подходит для такого официального противопоставления.`,

    'main-3':
      `Суа много готовилась к выступлению.\n` +
      `Несмотря на это, на сцене она забыла первое предложение.\n` +
      `Поэтому нужен ответ «그런데도» — “и всё равно / несмотря на это”.`,

    'main-4':
      `В этом вопросе к грамматике добавляют ещё одно действие.\n` +
      `Ученики не только читают примеры, но ещё проверяют новые слова.\n` +
      `«또한» значит “также” и добавляет новую информацию.`,

    'main-5':
      `Сначала уже есть плохая причина: площадка мокрая.\n` +
      `Потом добавляется ещё одна причина: сильный ветер.\n` +
      `Поэтому подходит «게다가» — “к тому же”.`,

    'main-6':
      `У Джихо уже болит горло, и порядок выступления изменился.\n` +
      `Потом появляется ещё более неприятная проблема: микрофон не работает.\n` +
      `«더구나» значит “более того” и усиливает ситуацию.`,

    'main-7':
      `Здесь нужно подчеркнуть две вещи вместе.\n` +
      `Класс показывает не только корейскую еду, но и правила поведения за столом.\n` +
      `Поэтому подходит «뿐만 아니라» — “не только, но и”.`,

    'main-8':
      `В тексте сначала говорится об одном кафе.\n` +
      `Потом автор переходит к другому магазину рядом.\n` +
      `«한편» помогает перейти к другой стороне или другой ситуации.`,

    'main-9':
      `Здесь сравниваются два разных способа учиться.\n` +
      `Старший брат всё планирует, а младший сначала пробует.\n` +
      `Для такого сравнения подходит «반면에» — “в то время как / наоборот”.`,

    'main-10':
      `Юна думала, что задача будет трудной.\n` +
      `Но когда задачу разделили, понимать стало даже легче.\n` +
      `«오히려» показывает неожиданный обратный результат: “наоборот / даже”.`,

    'remedial-1':
      `Минджи хорошо выучила слова и стала лучше читать.\n` +
      `Но в разговоре она всё ещё часто останавливается.\n` +
      `Поэтому правильный ответ — «그렇지만».`,

    'remedial-2':
      `В музее много удобных вещей: крупный текст, помощь сотрудника, понятная схема.\n` +
      `После этого говорится о недостатке: мало мест для отдыха.\n` +
      `Поэтому подходит «그러나» — “однако”.`,

    'remedial-3':
      `Джунсо много тренировался перед диктантом.\n` +
      `Но всё равно ошибся в одном лёгком слове.\n` +
      `«그런데도» значит “несмотря на это / всё равно”.`,
  };

  return (
    `${answer}\n\n` +
    (explanations[key] ??
      `В этом вопросе нужно выбрать слово, которое связывает две мысли.\n` +
      `Сначала найди первую ситуацию, потом посмотри, что изменилось дальше.\n` +
      `Так легче понять нужный союз.`)
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
  if (category === 'honorifics' && level === 4 && order && stage) {
    return generateHonorificLevel4Explanation(
      order,
      stage,
      correctAnswer ?? honorificSurface(item)
    );
  }
  if (category === 'honorifics' && level === 5 && order && stage) {
    return generateHonorificLevel5Explanation(
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
  if (category === 'movement' && level === 4 && order && stage) {
    return generateMovementLevel4Explanation(
      order,
      stage,
      correctAnswer ?? movementSurface(item.target, '')
    );
  }
  if (category === 'movement' && level === 5 && order && stage) {
    return generateMovementLevel5Explanation(
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
  if (category === 'reasons' && level === 4 && order && stage) {
    return generateReasonLevel4Explanation(
      order,
      stage,
      correctAnswer ?? item.target
    );
  }
  if (category === 'reasons' && level === 5 && order && stage) {
    return generateReasonLevel5Explanation(
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
  let item = bank[level][(order - 1) % bank[level].length];
  if (category === 'movement' && level === 5 && stage === 'remedial') {
    item = bank[level][(order + 9) % bank[level].length] ?? item;
  }
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
      : category === 'movement' && level === 4
      ? movementLevel4Context(ruHint, contextSeed)
      : category === 'movement' && level === 5
      ? movementLevel5Context(ruHint, contextSeed)
      : category === 'reasons' && level === 2
      ? reasonLevel2Context(ruHint, contextSeed)
      : category === 'reasons' && level === 3
      ? reasonLevel3Context(ruHint, contextSeed)
      : category === 'reasons' && level === 4
      ? reasonLevel4Context(ruHint, contextSeed)
      : category === 'reasons' && level === 5
      ? reasonLevel5Context(ruHint, contextSeed)
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
