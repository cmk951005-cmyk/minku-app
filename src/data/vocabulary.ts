import { VocabWord, VocabTopic } from '../types';

// Vocabulary built from: 세종학당 한국어 1–4 (Russian ed.), Korean 보이는 Voca,
// 마인드맵으로 배우는 토픽 어휘 2300, 쏙쏙 한국어 중급 TOPIK II Vocabulary
// Words sorted easy→hard within each category (level 1 first, then 2, then 3)

export const TOPIC_META: Record<VocabTopic, { nameRu: string; nameKr: string; emoji: string }> = {
  family:    { nameRu: 'Семья',              nameKr: '가족',       emoji: '👨‍👩‍👧‍👦' },
  food:      { nameRu: 'Еда',                nameKr: '음식',       emoji: '🍜' },
  home:      { nameRu: 'Дом',                nameKr: '집·가정',    emoji: '🏠' },
  school:    { nameRu: 'Учёба',              nameKr: '공부·학교',  emoji: '📚' },
  places:    { nameRu: 'Места',              nameKr: '장소',       emoji: '📍' },
  daily:     { nameRu: 'Повседневная жизнь', nameKr: '일상',       emoji: '☀️' },
  body:      { nameRu: 'Тело и здоровье',    nameKr: '몸·건강',    emoji: '💪' },
  nature:    { nameRu: 'Природа',            nameKr: '자연',       emoji: '🌿' },
  transport: { nameRu: 'Транспорт',          nameKr: '교통',       emoji: '🚌' },
  emotions:  { nameRu: 'Чувства',            nameKr: '감정',       emoji: '💖' },
  numbers:   { nameRu: 'Числа и счёт',       nameKr: '수·숫자',    emoji: '🔢' },
  time:      { nameRu: 'Время',              nameKr: '시간',       emoji: '⏰' },
  shopping:  { nameRu: 'Покупки',            nameKr: '쇼핑',       emoji: '🛍️' },
  work:      { nameRu: 'Работа',             nameKr: '일·직업',    emoji: '💼' },
  cleaning:  { nameRu: 'Уборка',             nameKr: '청소',       emoji: '🧹' },
};

export const VOCABULARY: VocabWord[] = [

  // ══════════════════════════════════════════════════════════════════
  // FAMILY 가족  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'fam-01', korean:'가족',     russian:'семья',                      romanization:'gajok',     topic:'family', level:1, emoji:'👨‍👩‍👧', exampleKr:'우리 가족은 네 명이에요.', exampleRu:'В нашей семье четыре человека.' },
  { id:'fam-02', korean:'엄마',     russian:'мама (разг.)',               romanization:'eomma',     topic:'family', level:1, emoji:'👩', exampleKr:'엄마, 배고파요!', exampleRu:'Мама, я хочу есть!' },
  { id:'fam-03', korean:'아빠',     russian:'папа (разг.)',               romanization:'appa',      topic:'family', level:1, emoji:'👨', exampleKr:'아빠가 운전해요.', exampleRu:'Папа едет за рулём.' },
  { id:'fam-04', korean:'형',       russian:'старший брат (у мужчины)',   romanization:'hyeong',    topic:'family', level:1, emoji:'👦', exampleKr:'형이 공부해요.', exampleRu:'Старший брат учится.' },
  { id:'fam-05', korean:'오빠',     russian:'старший брат (у женщины)',   romanization:'oppa',      topic:'family', level:1, emoji:'👦', exampleKr:'오빠가 음악을 들어요.', exampleRu:'Брат слушает музыку.' },
  { id:'fam-06', korean:'언니',     russian:'старшая сестра (у женщины)', romanization:'eonni',     topic:'family', level:1, emoji:'👧', exampleKr:'언니가 예뻐요.', exampleRu:'Старшая сестра красивая.' },
  { id:'fam-07', korean:'누나',     russian:'старшая сестра (у мужчины)', romanization:'nuna',      topic:'family', level:1, emoji:'👧', exampleKr:'누나가 친절해요.', exampleRu:'Сестра добрая.' },
  { id:'fam-08', korean:'동생',     russian:'младший брат или сестра',    romanization:'dongsaeng', topic:'family', level:1, emoji:'🧒', exampleKr:'동생이 귀여워요.', exampleRu:'Младший такой милый.' },
  { id:'fam-09', korean:'할머니',   russian:'бабушка',                    romanization:'halmeoni',  topic:'family', level:1, emoji:'👵', exampleKr:'할머니가 주무세요.', exampleRu:'Бабушка спит.' },
  { id:'fam-10', korean:'할아버지', russian:'дедушка',                    romanization:'harabeoji', topic:'family', level:1, emoji:'👴', exampleKr:'할아버지가 공원에 가요.', exampleRu:'Дедушка идёт в парк.' },
  { id:'fam-11', korean:'어머니',   russian:'мама / мать (вежл.)',        romanization:'eomeoni',   topic:'family', level:1, emoji:'👩', exampleKr:'어머니가 요리해요.', exampleRu:'Мама готовит еду.' },
  { id:'fam-12', korean:'아버지',   russian:'папа / отец (вежл.)',        romanization:'abeoji',    topic:'family', level:1, emoji:'👨', exampleKr:'아버지가 회사에 가요.', exampleRu:'Папа идёт на работу.' },
  { id:'fam-13', korean:'남편',     russian:'муж',                        romanization:'nampyeon',  topic:'family', level:2, emoji:'💍', exampleKr:'남편이 요리해요.', exampleRu:'Муж готовит еду.' },
  { id:'fam-14', korean:'아내',     russian:'жена',                       romanization:'anae',      topic:'family', level:2, emoji:'💍', exampleKr:'아내가 웃어요.', exampleRu:'Жена улыбается.' },
  { id:'fam-15', korean:'아들',     russian:'сын',                        romanization:'adeul',     topic:'family', level:2, emoji:'👦', exampleKr:'아들이 학교에 가요.', exampleRu:'Сын идёт в школу.' },
  { id:'fam-16', korean:'딸',       russian:'дочь',                       romanization:'ttal',      topic:'family', level:2, emoji:'👧', exampleKr:'딸이 피아노를 쳐요.', exampleRu:'Дочь играет на пианино.' },
  { id:'fam-17', korean:'아기',     russian:'младенец / малыш',           romanization:'agi',       topic:'family', level:2, emoji:'👶', exampleKr:'아기가 자요.', exampleRu:'Малыш спит.' },
  { id:'fam-18', korean:'삼촌',     russian:'дядя (по отцу)',             romanization:'samchon',   topic:'family', level:2, emoji:'👨', exampleKr:'삼촌이 선물을 줬어요.', exampleRu:'Дядя подарил подарок.' },
  { id:'fam-19', korean:'이모',     russian:'тётя (сестра матери)',       romanization:'imo',       topic:'family', level:2, emoji:'👩', exampleKr:'이모 집에 가요.', exampleRu:'Еду к тёте.' },
  { id:'fam-20', korean:'고모',     russian:'тётя (сестра отца)',         romanization:'gomo',      topic:'family', level:2, emoji:'👩', exampleKr:'고모가 서울에 살아요.', exampleRu:'Тётя живёт в Сеуле.' },
  { id:'fam-21', korean:'사촌',     russian:'двоюродный брат/сестра',     romanization:'sachon',    topic:'family', level:3, emoji:'👫', exampleKr:'사촌이 부산에 살아요.', exampleRu:'Двоюродный брат живёт в Пусане.' },
  { id:'fam-22', korean:'조카',     russian:'племянник / племянница',     romanization:'joka',      topic:'family', level:3, emoji:'🧒', exampleKr:'조카가 다섯 살이에요.', exampleRu:'Племяннику пять лет.' },
  { id:'fam-23', korean:'외할머니', russian:'бабушка по материнской линии', romanization:'oehalmeoni', topic:'family', level:3, emoji:'👵', exampleKr:'외할머니가 시골에 사세요.', exampleRu:'Бабушка по маме живёт в деревне.' },
  { id:'fam-24', korean:'외할아버지',russian:'дедушка по материнской линии', romanization:'oeharabeoji', topic:'family', level:3, emoji:'👴', exampleKr:'외할아버지를 뵈러 가요.', exampleRu:'Еду навестить дедушку по маме.' },
  { id:'fam-25', korean:'친척',     russian:'родственники',               romanization:'chincheok', topic:'family', level:3, emoji:'👨‍👩‍👧‍👦', exampleKr:'명절에 친척이 모여요.', exampleRu:'На праздники собираются родственники.' },

  // ══════════════════════════════════════════════════════════════════
  // FOOD 음식  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'food-01', korean:'밥',      russian:'рис (варёный) / еда',    romanization:'bap',      topic:'food', level:1, emoji:'🍚', exampleKr:'밥을 먹어요.', exampleRu:'Ем рис.' },
  { id:'food-02', korean:'물',      russian:'вода',                   romanization:'mul',      topic:'food', level:1, emoji:'💧', exampleKr:'물을 마셔요.', exampleRu:'Пью воду.' },
  { id:'food-03', korean:'커피',    russian:'кофе',                   romanization:'keopi',    topic:'food', level:1, emoji:'☕', exampleKr:'커피 한 잔 마셔요.', exampleRu:'Пью одну чашку кофе.' },
  { id:'food-04', korean:'빵',      russian:'хлеб / булка',           romanization:'ppang',    topic:'food', level:1, emoji:'🍞', exampleKr:'빵을 먹어요.', exampleRu:'Ем хлеб.' },
  { id:'food-05', korean:'우유',    russian:'молоко',                 romanization:'uyu',      topic:'food', level:1, emoji:'🥛', exampleKr:'우유를 마셔요.', exampleRu:'Пью молоко.' },
  { id:'food-06', korean:'사과',    russian:'яблоко',                 romanization:'sagwa',    topic:'food', level:1, emoji:'🍎', exampleKr:'사과를 먹어요.', exampleRu:'Ем яблоко.' },
  { id:'food-07', korean:'바나나',  russian:'банан',                  romanization:'banana',   topic:'food', level:1, emoji:'🍌', exampleKr:'바나나가 달아요.', exampleRu:'Банан сладкий.' },
  { id:'food-08', korean:'김치',    russian:'кимчи',                  romanization:'gimchi',   topic:'food', level:1, emoji:'🥬', exampleKr:'김치가 맛있어요.', exampleRu:'Кимчи вкусное.' },
  { id:'food-09', korean:'라면',    russian:'рамён',                  romanization:'ramyeon',  topic:'food', level:1, emoji:'🍜', exampleKr:'라면을 끓여요.', exampleRu:'Варю рамён.' },
  { id:'food-10', korean:'과일',    russian:'фрукты',                 romanization:'gwail',    topic:'food', level:1, emoji:'🍓', exampleKr:'과일을 좋아해요.', exampleRu:'Люблю фрукты.' },
  { id:'food-11', korean:'채소',    russian:'овощи',                  romanization:'chaeso',   topic:'food', level:2, emoji:'🥦', exampleKr:'채소를 많이 먹어요.', exampleRu:'Ем много овощей.' },
  { id:'food-12', korean:'고기',    russian:'мясо',                   romanization:'gogi',     topic:'food', level:2, emoji:'🥩', exampleKr:'고기를 구워요.', exampleRu:'Жарю мясо.' },
  { id:'food-13', korean:'생선',    russian:'рыба',                   romanization:'saengseon',topic:'food', level:2, emoji:'🐟', exampleKr:'생선을 먹어요.', exampleRu:'Ем рыбу.' },
  { id:'food-14', korean:'계란',    russian:'яйцо',                   romanization:'gyeran',   topic:'food', level:2, emoji:'🥚', exampleKr:'계란을 삶아요.', exampleRu:'Варю яйцо.' },
  { id:'food-15', korean:'비빔밥',  russian:'пибимпап',               romanization:'bibimbap', topic:'food', level:2, emoji:'🥗', exampleKr:'비빔밥이 맛있어요.', exampleRu:'Пибимпап очень вкусный.' },
  { id:'food-16', korean:'불고기',  russian:'пулькоги (жареное мясо)',romanization:'bulgogi',  topic:'food', level:2, emoji:'🍖', exampleKr:'불고기가 유명해요.', exampleRu:'Пулькоги очень известное блюдо.' },
  { id:'food-17', korean:'국',      russian:'суп',                    romanization:'guk',      topic:'food', level:2, emoji:'🍲', exampleKr:'국이 뜨거워요.', exampleRu:'Суп горячий.' },
  { id:'food-18', korean:'찌개',    russian:'острый суп / тушёное',   romanization:'jjigae',   topic:'food', level:2, emoji:'🫕', exampleKr:'찌개가 맵지만 맛있어요.', exampleRu:'Острый суп, но вкусный.' },
  { id:'food-19', korean:'떡볶이',  russian:'токпокки',               romanization:'tteokbokki',topic:'food', level:2, emoji:'🌶️', exampleKr:'떡볶이가 매워요.', exampleRu:'Токпокки острые.' },
  { id:'food-20', korean:'삼겹살',  russian:'самгёпсаль (бекон)',     romanization:'samgyeopsal',topic:'food', level:2, emoji:'🥓', exampleKr:'삼겹살을 구워요.', exampleRu:'Жарю самгёпсаль.' },
  { id:'food-21', korean:'된장',    russian:'твенджан (паста)',       romanization:'doenjang',  topic:'food', level:3, emoji:'🫙', exampleKr:'된장찌개를 끓여요.', exampleRu:'Варю суп твенджан.' },
  { id:'food-22', korean:'간장',    russian:'соевый соус',            romanization:'ganjang',   topic:'food', level:3, emoji:'🫙', exampleKr:'간장을 넣어요.', exampleRu:'Добавляю соевый соус.' },
  { id:'food-23', korean:'두부',    russian:'тофу',                   romanization:'dubu',      topic:'food', level:3, emoji:'🧀', exampleKr:'두부가 부드러워요.', exampleRu:'Тофу мягкое.' },
  { id:'food-24', korean:'잡채',    russian:'чапчэ (лапша с овощами)',romanization:'japchae',   topic:'food', level:3, emoji:'🍝', exampleKr:'잡채를 만들어요.', exampleRu:'Готовлю чапчэ.' },
  { id:'food-25', korean:'순두부찌개',russian:'суп с мягким тофу',   romanization:'sundubu jjigae',topic:'food', level:3, emoji:'🍲', exampleKr:'순두부찌개가 부드러워요.', exampleRu:'Суп с мягким тофу нежный.' },
  { id:'food-26', korean:'해물',    russian:'морепродукты',           romanization:'haemul',    topic:'food', level:3, emoji:'🦐', exampleKr:'해물 요리를 좋아해요.', exampleRu:'Люблю блюда из морепродуктов.' },
  { id:'food-27', korean:'새우',    russian:'креветки',               romanization:'saeu',      topic:'food', level:3, emoji:'🦐', exampleKr:'새우를 구워요.', exampleRu:'Жарю креветки.' },
  { id:'food-28', korean:'오징어',  russian:'кальмар',                romanization:'ojingeo',   topic:'food', level:3, emoji:'🦑', exampleKr:'오징어가 쫄깃해요.', exampleRu:'Кальмар жевательный.' },

  // ══════════════════════════════════════════════════════════════════
  // HOME 집·가정  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'home-01', korean:'집',      russian:'дом / квартира',         romanization:'jip',       topic:'home', level:1, emoji:'🏠', exampleKr:'집에 가요.', exampleRu:'Иду домой.' },
  { id:'home-02', korean:'방',      russian:'комната',                romanization:'bang',      topic:'home', level:1, emoji:'🚪', exampleKr:'방이 깨끗해요.', exampleRu:'Комната чистая.' },
  { id:'home-03', korean:'문',      russian:'дверь',                  romanization:'mun',       topic:'home', level:1, emoji:'🚪', exampleKr:'문을 닫아요.', exampleRu:'Закрываю дверь.' },
  { id:'home-04', korean:'창문',    russian:'окно',                   romanization:'changmun',  topic:'home', level:1, emoji:'🪟', exampleKr:'창문을 열어요.', exampleRu:'Открываю окно.' },
  { id:'home-05', korean:'침대',    russian:'кровать',                romanization:'chimdae',   topic:'home', level:1, emoji:'🛏️', exampleKr:'침대에서 자요.', exampleRu:'Сплю на кровати.' },
  { id:'home-06', korean:'의자',    russian:'стул',                   romanization:'uija',      topic:'home', level:1, emoji:'🪑', exampleKr:'의자에 앉아요.', exampleRu:'Сижу на стуле.' },
  { id:'home-07', korean:'책상',    russian:'письменный стол',        romanization:'chaeksang', topic:'home', level:1, emoji:'🗂️', exampleKr:'책상에서 공부해요.', exampleRu:'Учусь за столом.' },
  { id:'home-08', korean:'화장실',  russian:'туалет',                 romanization:'hwajangsil',topic:'home', level:1, emoji:'🚽', exampleKr:'화장실이 어디예요?', exampleRu:'Где туалет?' },
  { id:'home-09', korean:'욕실',    russian:'ванная',                 romanization:'yoksil',    topic:'home', level:1, emoji:'🛁', exampleKr:'욕실에서 샤워해요.', exampleRu:'Принимаю душ в ванной.' },
  { id:'home-10', korean:'부엌',    russian:'кухня',                  romanization:'bueok',     topic:'home', level:1, emoji:'🍳', exampleKr:'부엌에서 요리해요.', exampleRu:'Готовлю на кухне.' },
  { id:'home-11', korean:'거실',    russian:'гостиная',               romanization:'geosil',    topic:'home', level:2, emoji:'🛋️', exampleKr:'거실에서 TV를 봐요.', exampleRu:'Смотрю телевизор в гостиной.' },
  { id:'home-12', korean:'소파',    russian:'диван',                  romanization:'sopa',      topic:'home', level:2, emoji:'🛋️', exampleKr:'소파에 앉아요.', exampleRu:'Сижу на диване.' },
  { id:'home-13', korean:'텔레비전',russian:'телевизор',              romanization:'tellebijeon',topic:'home', level:2, emoji:'📺', exampleKr:'텔레비전을 봐요.', exampleRu:'Смотрю телевизор.' },
  { id:'home-14', korean:'냉장고',  russian:'холодильник',            romanization:'naengjanggo',topic:'home', level:2, emoji:'🧊', exampleKr:'냉장고에 음식이 있어요.', exampleRu:'В холодильнике есть еда.' },
  { id:'home-15', korean:'세탁기',  russian:'стиральная машина',      romanization:'saetaggi',  topic:'home', level:2, emoji:'🫧', exampleKr:'세탁기를 돌려요.', exampleRu:'Запускаю стиральную машину.' },
  { id:'home-16', korean:'현관',    russian:'прихожая / вход',        romanization:'hyeongwan', topic:'home', level:2, emoji:'🚪', exampleKr:'현관에서 신발을 벗어요.', exampleRu:'Снимаю обувь в прихожей.' },
  { id:'home-17', korean:'전등',    russian:'лампа / свет',           romanization:'jeondeung', topic:'home', level:2, emoji:'💡', exampleKr:'전등을 켜요.', exampleRu:'Включаю свет.' },
  { id:'home-18', korean:'에어컨',  russian:'кондиционер',            romanization:'eeokon',    topic:'home', level:2, emoji:'❄️', exampleKr:'에어컨을 틀어요.', exampleRu:'Включаю кондиционер.' },
  { id:'home-19', korean:'베란다',  russian:'балкон / веранда',       romanization:'beranda',   topic:'home', level:3, emoji:'🌿', exampleKr:'베란다에서 빨래를 말려요.', exampleRu:'Сушу бельё на балконе.' },
  { id:'home-20', korean:'옷장',    russian:'платяной шкаф',          romanization:'otjang',    topic:'home', level:3, emoji:'🚪', exampleKr:'옷장에 옷을 넣어요.', exampleRu:'Убираю одежду в шкаф.' },
  { id:'home-21', korean:'식탁',    russian:'обеденный стол',         romanization:'siktak',    topic:'home', level:3, emoji:'🪑', exampleKr:'식탁에서 밥을 먹어요.', exampleRu:'Ем за обеденным столом.' },
  { id:'home-22', korean:'전자레인지',russian:'микроволновка',        romanization:'jeonja reinji',topic:'home', level:3, emoji:'📟', exampleKr:'전자레인지로 데워요.', exampleRu:'Разогреваю в микроволновке.' },
  { id:'home-23', korean:'세면대',  russian:'умывальник / раковина',  romanization:'semyeondae',topic:'home', level:3, emoji:'🪥', exampleKr:'세면대에서 세수해요.', exampleRu:'Умываюсь у раковины.' },
  { id:'home-24', korean:'욕조',    russian:'ванна',                  romanization:'yokjo',     topic:'home', level:3, emoji:'🛁', exampleKr:'욕조에 물을 받아요.', exampleRu:'Набираю воду в ванну.' },
  { id:'home-25', korean:'싱크대',  russian:'кухонная мойка',         romanization:'singkdae',  topic:'home', level:3, emoji:'🍽️', exampleKr:'싱크대에서 설거지해요.', exampleRu:'Мою посуду в мойке.' },

  // ══════════════════════════════════════════════════════════════════
  // SCHOOL 공부·학교  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'sch-01', korean:'학교',    russian:'школа',                  romanization:'hakgyo',    topic:'school', level:1, emoji:'🏫', exampleKr:'학교에 가요.', exampleRu:'Иду в школу.' },
  { id:'sch-02', korean:'선생님',  russian:'учитель',                romanization:'seonsaengnim',topic:'school', level:1, emoji:'👩‍🏫', exampleKr:'선생님이 가르쳐요.', exampleRu:'Учитель объясняет.' },
  { id:'sch-03', korean:'학생',    russian:'ученик / студент',       romanization:'haksaeng',  topic:'school', level:1, emoji:'🧑‍🎓', exampleKr:'학생이 공부해요.', exampleRu:'Ученик учится.' },
  { id:'sch-04', korean:'책',      russian:'книга',                  romanization:'chaek',     topic:'school', level:1, emoji:'📖', exampleKr:'책을 읽어요.', exampleRu:'Читаю книгу.' },
  { id:'sch-05', korean:'연필',    russian:'карандаш',               romanization:'yeonpil',   topic:'school', level:1, emoji:'✏️', exampleKr:'연필로 써요.', exampleRu:'Пишу карандашом.' },
  { id:'sch-06', korean:'공책',    russian:'тетрадь',                romanization:'gongchaek', topic:'school', level:1, emoji:'📓', exampleKr:'공책에 적어요.', exampleRu:'Записываю в тетрадь.' },
  { id:'sch-07', korean:'가방',    russian:'сумка / рюкзак',         romanization:'gabang',    topic:'school', level:1, emoji:'🎒', exampleKr:'가방을 매요.', exampleRu:'Надеваю рюкзак.' },
  { id:'sch-08', korean:'숙제',    russian:'домашнее задание',       romanization:'sukje',     topic:'school', level:1, emoji:'📝', exampleKr:'숙제를 해요.', exampleRu:'Делаю домашнее задание.' },
  { id:'sch-09', korean:'교실',    russian:'классная комната',       romanization:'gyosil',    topic:'school', level:1, emoji:'🏫', exampleKr:'교실에 들어가요.', exampleRu:'Захожу в класс.' },
  { id:'sch-10', korean:'시험',    russian:'экзамен / тест',         romanization:'siheom',    topic:'school', level:2, emoji:'📋', exampleKr:'시험을 봐요.', exampleRu:'Сдаю экзамен.' },
  { id:'sch-11', korean:'수업',    russian:'урок / занятие',         romanization:'sueop',     topic:'school', level:2, emoji:'📚', exampleKr:'수업이 재미있어요.', exampleRu:'Урок интересный.' },
  { id:'sch-12', korean:'지우개',  russian:'ластик',                 romanization:'jiugae',    topic:'school', level:2, emoji:'🧹', exampleKr:'지우개로 지워요.', exampleRu:'Стираю ластиком.' },
  { id:'sch-13', korean:'볼펜',    russian:'ручка (шариковая)',       romanization:'bolpen',    topic:'school', level:2, emoji:'🖊️', exampleKr:'볼펜으로 써요.', exampleRu:'Пишу шариковой ручкой.' },
  { id:'sch-14', korean:'도서관',  russian:'библиотека',             romanization:'doseogwan', topic:'school', level:2, emoji:'📚', exampleKr:'도서관에서 공부해요.', exampleRu:'Учусь в библиотеке.' },
  { id:'sch-15', korean:'칠판',    russian:'доска (классная)',       romanization:'chilpan',   topic:'school', level:2, emoji:'🖊️', exampleKr:'칠판에 써요.', exampleRu:'Пишу на доске.' },
  { id:'sch-16', korean:'사전',    russian:'словарь',                romanization:'sajeon',    topic:'school', level:2, emoji:'📖', exampleKr:'사전을 찾아요.', exampleRu:'Смотрю в словарь.' },
  { id:'sch-17', korean:'색연필',  russian:'цветные карандаши',      romanization:'saengnyeonpil',topic:'school', level:2, emoji:'🖍️', exampleKr:'색연필로 그려요.', exampleRu:'Рисую цветными карандашами.' },
  { id:'sch-18', korean:'성적',    russian:'оценка / успеваемость',  romanization:'seongjeok', topic:'school', level:3, emoji:'📊', exampleKr:'성적이 올랐어요.', exampleRu:'Оценки улучшились.' },
  { id:'sch-19', korean:'졸업',    russian:'выпуск / окончание',     romanization:'joreobeop', topic:'school', level:3, emoji:'🎓', exampleKr:'내년에 졸업해요.', exampleRu:'В следующем году заканчиваю учёбу.' },
  { id:'sch-20', korean:'입학',    russian:'поступление',            romanization:'iphak',     topic:'school', level:3, emoji:'🏫', exampleKr:'대학교에 입학했어요.', exampleRu:'Поступил в университет.' },
  { id:'sch-21', korean:'교과서',  russian:'учебник',                romanization:'gyogwaseo', topic:'school', level:3, emoji:'📘', exampleKr:'교과서를 펴요.', exampleRu:'Открываю учебник.' },
  { id:'sch-22', korean:'발표',    russian:'презентация / доклад',   romanization:'baltyo',    topic:'school', level:3, emoji:'🎤', exampleKr:'발표를 준비해요.', exampleRu:'Готовлю презентацию.' },
  { id:'sch-23', korean:'장학금',  russian:'стипендия',              romanization:'janghakgeum',topic:'school', level:3, emoji:'💰', exampleKr:'장학금을 받았어요.', exampleRu:'Получил стипендию.' },

  // ══════════════════════════════════════════════════════════════════
  // PLACES 장소  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'plc-01', korean:'병원',    russian:'больница / клиника',     romanization:'byeongwon', topic:'places', level:1, emoji:'🏥', exampleKr:'병원에 가요.', exampleRu:'Иду в больницу.' },
  { id:'plc-02', korean:'은행',    russian:'банк',                   romanization:'eunhaeng',  topic:'places', level:1, emoji:'🏦', exampleKr:'은행에서 돈을 찾아요.', exampleRu:'Снимаю деньги в банке.' },
  { id:'plc-03', korean:'공원',    russian:'парк',                   romanization:'gongwon',   topic:'places', level:1, emoji:'🌳', exampleKr:'공원에서 산책해요.', exampleRu:'Гуляю в парке.' },
  { id:'plc-04', korean:'시장',    russian:'рынок',                  romanization:'sijang',    topic:'places', level:1, emoji:'🏪', exampleKr:'시장에서 사요.', exampleRu:'Покупаю на рынке.' },
  { id:'plc-05', korean:'식당',    russian:'ресторан / кафе',        romanization:'sikdang',   topic:'places', level:1, emoji:'🍽️', exampleKr:'식당에서 먹어요.', exampleRu:'Ем в ресторане.' },
  { id:'plc-06', korean:'마트',    russian:'супермаркет',            romanization:'mateu',     topic:'places', level:1, emoji:'🛒', exampleKr:'마트에서 장을 봐요.', exampleRu:'Хожу в супермаркет за продуктами.' },
  { id:'plc-07', korean:'카페',    russian:'кафе',                   romanization:'kape',      topic:'places', level:1, emoji:'☕', exampleKr:'카페에서 커피를 마셔요.', exampleRu:'Пью кофе в кафе.' },
  { id:'plc-08', korean:'우체국',  russian:'почта',                  romanization:'ucheguk',   topic:'places', level:2, emoji:'📮', exampleKr:'우체국에서 소포를 보내요.', exampleRu:'Отправляю посылку на почте.' },
  { id:'plc-09', korean:'약국',    russian:'аптека',                 romanization:'yakguk',    topic:'places', level:2, emoji:'💊', exampleKr:'약국에서 약을 사요.', exampleRu:'Покупаю лекарства в аптеке.' },
  { id:'plc-10', korean:'도서관',  russian:'библиотека',             romanization:'doseogwan', topic:'places', level:2, emoji:'📚', exampleKr:'도서관에서 책을 빌려요.', exampleRu:'Беру книги в библиотеке.' },
  { id:'plc-11', korean:'백화점',  russian:'универмаг',              romanization:'baekwhajeom',topic:'places', level:2, emoji:'🏬', exampleKr:'백화점에서 쇼핑해요.', exampleRu:'Хожу по магазинам в универмаге.' },
  { id:'plc-12', korean:'영화관',  russian:'кинотеатр',              romanization:'yeonghwagwan',topic:'places', level:2, emoji:'🎬', exampleKr:'영화관에서 영화를 봐요.', exampleRu:'Смотрю фильм в кинотеатре.' },
  { id:'plc-13', korean:'미용실',  russian:'парикмахерская',         romanization:'miyongsil',  topic:'places', level:2, emoji:'💇', exampleKr:'미용실에서 머리를 잘라요.', exampleRu:'Стригусь в парикмахерской.' },
  { id:'plc-14', korean:'경찰서',  russian:'полицейский участок',    romanization:'gyeongchalseo',topic:'places', level:2, emoji:'👮', exampleKr:'경찰서에 신고해요.', exampleRu:'Подаю заявление в полицию.' },
  { id:'plc-15', korean:'주유소',  russian:'заправочная станция',    romanization:'juyuso',     topic:'places', level:3, emoji:'⛽', exampleKr:'주유소에서 기름을 넣어요.', exampleRu:'Заправляю машину на заправке.' },
  { id:'plc-16', korean:'박물관',  russian:'музей',                  romanization:'bangmulgwan',topic:'places', level:3, emoji:'🏛️', exampleKr:'박물관에서 역사를 배워요.', exampleRu:'Изучаю историю в музее.' },
  { id:'plc-17', korean:'미술관',  russian:'галерея / музей искусства',romanization:'misulgwan', topic:'places', level:3, emoji:'🎨', exampleKr:'미술관에서 그림을 봐요.', exampleRu:'Смотрю картины в галерее.' },
  { id:'plc-18', korean:'수영장',  russian:'бассейн',                romanization:'suyeongjang',topic:'places', level:3, emoji:'🏊', exampleKr:'수영장에서 수영해요.', exampleRu:'Плаваю в бассейне.' },
  { id:'plc-19', korean:'공항',    russian:'аэропорт',               romanization:'gonghang',   topic:'places', level:3, emoji:'✈️', exampleKr:'공항에서 비행기를 타요.', exampleRu:'Сажусь на самолёт в аэропорту.' },
  { id:'plc-20', korean:'기차역',  russian:'железнодорожная станция', romanization:'gichayeok',  topic:'places', level:3, emoji:'🚉', exampleKr:'기차역에서 기다려요.', exampleRu:'Жду на вокзале.' },

  // ══════════════════════════════════════════════════════════════════
  // DAILY 일상  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'day-01', korean:'아침',    russian:'утро / завтрак',         romanization:'achim',     topic:'daily', level:1, emoji:'🌅', exampleKr:'아침을 먹어요.', exampleRu:'Ем завтрак.' },
  { id:'day-02', korean:'점심',    russian:'обед',                   romanization:'jeomsim',   topic:'daily', level:1, emoji:'🌞', exampleKr:'점심을 먹어요.', exampleRu:'Ем обед.' },
  { id:'day-03', korean:'저녁',    russian:'вечер / ужин',           romanization:'jeonyeok',  topic:'daily', level:1, emoji:'🌆', exampleKr:'저녁을 먹어요.', exampleRu:'Ем ужин.' },
  { id:'day-04', korean:'잠',      russian:'сон',                    romanization:'jam',       topic:'daily', level:1, emoji:'😴', exampleKr:'잠을 자요.', exampleRu:'Сплю.' },
  { id:'day-05', korean:'운동',    russian:'спорт / зарядка',        romanization:'undong',    topic:'daily', level:1, emoji:'🏃', exampleKr:'운동을 해요.', exampleRu:'Занимаюсь спортом.' },
  { id:'day-06', korean:'요리',    russian:'готовка / кулинария',    romanization:'yori',      topic:'daily', level:1, emoji:'👨‍🍳', exampleKr:'요리를 해요.', exampleRu:'Готовлю еду.' },
  { id:'day-07', korean:'쇼핑',    russian:'шопинг',                 romanization:'syoping',   topic:'daily', level:1, emoji:'🛍️', exampleKr:'쇼핑을 해요.', exampleRu:'Хожу по магазинам.' },
  { id:'day-08', korean:'산책',    russian:'прогулка',               romanization:'sanchek',   topic:'daily', level:1, emoji:'🚶', exampleKr:'공원에서 산책해요.', exampleRu:'Гуляю в парке.' },
  { id:'day-09', korean:'샤워',    russian:'душ',                    romanization:'syawo',     topic:'daily', level:2, emoji:'🚿', exampleKr:'샤워를 해요.', exampleRu:'Принимаю душ.' },
  { id:'day-10', korean:'세수',    russian:'умывание',               romanization:'sesu',      topic:'daily', level:2, emoji:'🚿', exampleKr:'세수를 해요.', exampleRu:'Умываюсь.' },
  { id:'day-11', korean:'양치질',  russian:'чистка зубов',           romanization:'yangchijil',topic:'daily', level:2, emoji:'🪥', exampleKr:'양치질을 해요.', exampleRu:'Чищу зубы.' },
  { id:'day-12', korean:'설거지',  russian:'мытьё посуды',           romanization:'seolgeoji', topic:'daily', level:2, emoji:'🍽️', exampleKr:'설거지를 해요.', exampleRu:'Мою посуду.' },
  { id:'day-13', korean:'독서',    russian:'чтение (книг)',          romanization:'dokseo',    topic:'daily', level:2, emoji:'📖', exampleKr:'독서를 즐겨요.', exampleRu:'Люблю читать.' },
  { id:'day-14', korean:'약속',    russian:'встреча / договорённость',romanization:'yaksok',    topic:'daily', level:2, emoji:'🤝', exampleKr:'약속이 있어요.', exampleRu:'У меня назначена встреча.' },
  { id:'day-15', korean:'취미',    russian:'хобби',                  romanization:'chwimi',    topic:'daily', level:2, emoji:'🎨', exampleKr:'취미가 뭐예요?', exampleRu:'Какое у вас хобби?' },
  { id:'day-16', korean:'여가',    russian:'свободное время / досуг',romanization:'yeoga',     topic:'daily', level:3, emoji:'😌', exampleKr:'여가 시간에 음악을 들어요.', exampleRu:'В свободное время слушаю музыку.' },
  { id:'day-17', korean:'일정',    russian:'расписание / план',      romanization:'iljeong',   topic:'daily', level:3, emoji:'📅', exampleKr:'일정을 확인해요.', exampleRu:'Проверяю расписание.' },
  { id:'day-18', korean:'습관',    russian:'привычка',               romanization:'seupgwan',  topic:'daily', level:3, emoji:'🔄', exampleKr:'좋은 습관을 만들어요.', exampleRu:'Формирую хорошие привычки.' },
  { id:'day-19', korean:'명상',    russian:'медитация',              romanization:'myeongsang',topic:'daily', level:3, emoji:'🧘', exampleKr:'명상을 해요.', exampleRu:'Медитирую.' },

  // ══════════════════════════════════════════════════════════════════
  // BODY 몸·건강  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'body-01', korean:'눈',     russian:'глаз / глаза',          romanization:'nun',       topic:'body', level:1, emoji:'👁️', exampleKr:'눈이 커요.', exampleRu:'Глаза большие.' },
  { id:'body-02', korean:'코',     russian:'нос',                   romanization:'ko',        topic:'body', level:1, emoji:'👃', exampleKr:'코가 막혀요.', exampleRu:'Нос заложен.' },
  { id:'body-03', korean:'입',     russian:'рот',                   romanization:'ip',        topic:'body', level:1, emoji:'👄', exampleKr:'입을 벌려요.', exampleRu:'Открываю рот.' },
  { id:'body-04', korean:'귀',     russian:'ухо / уши',             romanization:'gwi',       topic:'body', level:1, emoji:'👂', exampleKr:'귀가 아파요.', exampleRu:'Ухо болит.' },
  { id:'body-05', korean:'손',     russian:'рука (кисть)',          romanization:'son',       topic:'body', level:1, emoji:'✋', exampleKr:'손을 씻어요.', exampleRu:'Мою руки.' },
  { id:'body-06', korean:'발',     russian:'нога (стопа)',          romanization:'bal',       topic:'body', level:1, emoji:'🦶', exampleKr:'발이 아파요.', exampleRu:'Нога болит.' },
  { id:'body-07', korean:'머리',   russian:'голова / волосы',       romanization:'meori',     topic:'body', level:1, emoji:'🧠', exampleKr:'머리가 아파요.', exampleRu:'Голова болит.' },
  { id:'body-08', korean:'얼굴',   russian:'лицо',                  romanization:'eolgul',    topic:'body', level:1, emoji:'😊', exampleKr:'얼굴이 예뻐요.', exampleRu:'Лицо красивое.' },
  { id:'body-09', korean:'배',     russian:'живот',                 romanization:'bae',       topic:'body', level:2, emoji:'🫃', exampleKr:'배가 아파요.', exampleRu:'Живот болит.' },
  { id:'body-10', korean:'등',     russian:'спина',                 romanization:'deung',     topic:'body', level:2, emoji:'🦴', exampleKr:'등이 아파요.', exampleRu:'Спина болит.' },
  { id:'body-11', korean:'어깨',   russian:'плечо',                 romanization:'eokkae',    topic:'body', level:2, emoji:'💪', exampleKr:'어깨가 뭉쳐요.', exampleRu:'Плечо затекло.' },
  { id:'body-12', korean:'무릎',   russian:'колено',                romanization:'mureup',    topic:'body', level:2, emoji:'🦵', exampleKr:'무릎이 아파요.', exampleRu:'Колено болит.' },
  { id:'body-13', korean:'팔',     russian:'рука (от плеча)',       romanization:'pal',       topic:'body', level:2, emoji:'💪', exampleKr:'팔이 길어요.', exampleRu:'Руки длинные.' },
  { id:'body-14', korean:'다리',   russian:'нога (от бедра)',       romanization:'dari',      topic:'body', level:2, emoji:'🦵', exampleKr:'다리가 길어요.', exampleRu:'Ноги длинные.' },
  { id:'body-15', korean:'목',     russian:'шея / горло',           romanization:'mok',       topic:'body', level:2, emoji:'🦒', exampleKr:'목이 아파요.', exampleRu:'Горло болит.' },
  { id:'body-16', korean:'허리',   russian:'поясница / талия',      romanization:'heori',     topic:'body', level:2, emoji:'🦴', exampleKr:'허리가 아파요.', exampleRu:'Поясница болит.' },
  { id:'body-17', korean:'손가락', russian:'палец (руки)',          romanization:'songarak',  topic:'body', level:3, emoji:'☝️', exampleKr:'손가락이 열 개예요.', exampleRu:'На руках десять пальцев.' },
  { id:'body-18', korean:'발가락', russian:'палец (ноги)',          romanization:'balgarak',  topic:'body', level:3, emoji:'🦶', exampleKr:'발가락이 아파요.', exampleRu:'Болит палец на ноге.' },
  { id:'body-19', korean:'이마',   russian:'лоб',                   romanization:'ima',       topic:'body', level:3, emoji:'😐', exampleKr:'이마가 뜨거워요.', exampleRu:'Лоб горячий.' },
  { id:'body-20', korean:'턱',     russian:'подбородок',            romanization:'teok',      topic:'body', level:3, emoji:'😤', exampleKr:'턱을 괴어요.', exampleRu:'Подпираю подбородок.' },

  // ══════════════════════════════════════════════════════════════════
  // NATURE 자연  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'nat-01', korean:'하늘',   russian:'небо',                   romanization:'haneul',    topic:'nature', level:1, emoji:'🌤️', exampleKr:'하늘이 파래요.', exampleRu:'Небо голубое.' },
  { id:'nat-02', korean:'땅',     russian:'земля',                  romanization:'ttang',     topic:'nature', level:1, emoji:'🌍', exampleKr:'땅이 넓어요.', exampleRu:'Земля широкая.' },
  { id:'nat-03', korean:'산',     russian:'гора',                   romanization:'san',       topic:'nature', level:1, emoji:'⛰️', exampleKr:'산에 올라가요.', exampleRu:'Поднимаюсь в гору.' },
  { id:'nat-04', korean:'강',     russian:'река',                   romanization:'gang',      topic:'nature', level:1, emoji:'🌊', exampleKr:'강이 흘러요.', exampleRu:'Река течёт.' },
  { id:'nat-05', korean:'바다',   russian:'море',                   romanization:'bada',      topic:'nature', level:1, emoji:'🌊', exampleKr:'바다가 깊어요.', exampleRu:'Море глубокое.' },
  { id:'nat-06', korean:'나무',   russian:'дерево',                 romanization:'namu',      topic:'nature', level:1, emoji:'🌳', exampleKr:'나무가 높아요.', exampleRu:'Дерево высокое.' },
  { id:'nat-07', korean:'꽃',     russian:'цветок',                 romanization:'kkot',      topic:'nature', level:1, emoji:'🌸', exampleKr:'꽃이 예뻐요.', exampleRu:'Цветок красивый.' },
  { id:'nat-08', korean:'비',     russian:'дождь',                  romanization:'bi',        topic:'nature', level:1, emoji:'🌧️', exampleKr:'비가 와요.', exampleRu:'Идёт дождь.' },
  { id:'nat-09', korean:'눈',     russian:'снег',                   romanization:'nun',       topic:'nature', level:1, emoji:'❄️', exampleKr:'눈이 와요.', exampleRu:'Идёт снег.' },
  { id:'nat-10', korean:'바람',   russian:'ветер',                  romanization:'baram',     topic:'nature', level:2, emoji:'🌬️', exampleKr:'바람이 강해요.', exampleRu:'Ветер сильный.' },
  { id:'nat-11', korean:'구름',   russian:'облако',                 romanization:'gureum',    topic:'nature', level:2, emoji:'☁️', exampleKr:'구름이 많아요.', exampleRu:'Много облаков.' },
  { id:'nat-12', korean:'태양',   russian:'солнце',                 romanization:'taeyang',   topic:'nature', level:2, emoji:'☀️', exampleKr:'태양이 뜨거워요.', exampleRu:'Солнце горячее.' },
  { id:'nat-13', korean:'달',     russian:'луна',                   romanization:'dal',       topic:'nature', level:2, emoji:'🌙', exampleKr:'달이 밝아요.', exampleRu:'Луна яркая.' },
  { id:'nat-14', korean:'별',     russian:'звезда',                 romanization:'byeol',     topic:'nature', level:2, emoji:'⭐', exampleKr:'별이 반짝여요.', exampleRu:'Звёзды мерцают.' },
  { id:'nat-15', korean:'숲',     russian:'лес',                    romanization:'sup',       topic:'nature', level:2, emoji:'🌲', exampleKr:'숲이 조용해요.', exampleRu:'Лес тихий.' },
  { id:'nat-16', korean:'호수',   russian:'озеро',                  romanization:'hosu',      topic:'nature', level:3, emoji:'🏞️', exampleKr:'호수가 아름다워요.', exampleRu:'Озеро красивое.' },
  { id:'nat-17', korean:'폭포',   russian:'водопад',                romanization:'pokpo',     topic:'nature', level:3, emoji:'🌊', exampleKr:'폭포가 웅장해요.', exampleRu:'Водопад величественный.' },
  { id:'nat-18', korean:'섬',     russian:'остров',                 romanization:'seom',      topic:'nature', level:3, emoji:'🏝️', exampleKr:'섬에 여행 가요.', exampleRu:'Еду путешествовать на остров.' },
  { id:'nat-19', korean:'사막',   russian:'пустыня',                romanization:'samak',     topic:'nature', level:3, emoji:'🏜️', exampleKr:'사막이 건조해요.', exampleRu:'В пустыне сухо.' },

  // ══════════════════════════════════════════════════════════════════
  // TRANSPORT 교통  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'trn-01', korean:'버스',    russian:'автобус',               romanization:'beoseu',    topic:'transport', level:1, emoji:'🚌', exampleKr:'버스를 타요.', exampleRu:'Еду на автобусе.' },
  { id:'trn-02', korean:'지하철',  russian:'метро',                 romanization:'jihacheol', topic:'transport', level:1, emoji:'🚇', exampleKr:'지하철을 타요.', exampleRu:'Еду на метро.' },
  { id:'trn-03', korean:'택시',    russian:'такси',                 romanization:'taeksi',    topic:'transport', level:1, emoji:'🚕', exampleKr:'택시를 불러요.', exampleRu:'Вызываю такси.' },
  { id:'trn-04', korean:'기차',    russian:'поезд',                 romanization:'gicha',     topic:'transport', level:1, emoji:'🚂', exampleKr:'기차를 타요.', exampleRu:'Еду на поезде.' },
  { id:'trn-05', korean:'비행기',  russian:'самолёт',               romanization:'bihaenggi', topic:'transport', level:1, emoji:'✈️', exampleKr:'비행기를 타요.', exampleRu:'Лечу на самолёте.' },
  { id:'trn-06', korean:'자동차',  russian:'автомобиль',            romanization:'jadongcha', topic:'transport', level:1, emoji:'🚗', exampleKr:'자동차로 가요.', exampleRu:'Еду на машине.' },
  { id:'trn-07', korean:'자전거',  russian:'велосипед',             romanization:'jajeongeeo',topic:'transport', level:1, emoji:'🚲', exampleKr:'자전거를 타요.', exampleRu:'Катаюсь на велосипеде.' },
  { id:'trn-08', korean:'배',      russian:'корабль / лодка',       romanization:'bae',       topic:'transport', level:2, emoji:'🚢', exampleKr:'배를 타요.', exampleRu:'Плыву на корабле.' },
  { id:'trn-09', korean:'오토바이',russian:'мотоцикл',              romanization:'otobai',    topic:'transport', level:2, emoji:'🏍️', exampleKr:'오토바이를 타요.', exampleRu:'Еду на мотоцикле.' },
  { id:'trn-10', korean:'정류장',  russian:'остановка',             romanization:'jeongnyujang',topic:'transport', level:2, emoji:'🚏', exampleKr:'정류장에서 기다려요.', exampleRu:'Жду на остановке.' },
  { id:'trn-11', korean:'기차역',  russian:'вокзал / ж/д станция',  romanization:'gichayeok', topic:'transport', level:2, emoji:'🚉', exampleKr:'기차역에서 만나요.', exampleRu:'Встречаемся на вокзале.' },
  { id:'trn-12', korean:'신호등',  russian:'светофор',              romanization:'sinhodeung',topic:'transport', level:2, emoji:'🚦', exampleKr:'신호등이 빨개요.', exampleRu:'Светофор красный.' },
  { id:'trn-13', korean:'횡단보도',russian:'пешеходный переход',    romanization:'hoengdanbodo',topic:'transport', level:3, emoji:'🚸', exampleKr:'횡단보도를 건너요.', exampleRu:'Перехожу по пешеходному переходу.' },
  { id:'trn-14', korean:'고속도로',russian:'автострада / шоссе',    romanization:'gosokdoro', topic:'transport', level:3, emoji:'🛣️', exampleKr:'고속도로로 가요.', exampleRu:'Еду по шоссе.' },
  { id:'trn-15', korean:'교통체증',russian:'пробка / затор',        romanization:'gyotong chejeung',topic:'transport', level:3, emoji:'🚗', exampleKr:'교통체증이 심해요.', exampleRu:'Большие пробки.' },
  { id:'trn-16', korean:'KTX',     russian:'КТХ (скоростной поезд)',romanization:'keiteuegseu',topic:'transport', level:3, emoji:'🚄', exampleKr:'KTX가 빨라요.', exampleRu:'КТХ очень быстрый.' },

  // ══════════════════════════════════════════════════════════════════
  // EMOTIONS 감정  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'emo-01', korean:'기쁘다',   russian:'радоваться / быть радостным', romanization:'gippeuda', topic:'emotions', level:1, emoji:'😊', exampleKr:'오늘 기뻐요!', exampleRu:'Сегодня я рад!' },
  { id:'emo-02', korean:'슬프다',   russian:'грустить / быть грустным',    romanization:'seulpeuda',topic:'emotions', level:1, emoji:'😢', exampleKr:'슬퍼요.', exampleRu:'Мне грустно.' },
  { id:'emo-03', korean:'화나다',   russian:'злиться / сердиться',        romanization:'hwanada',  topic:'emotions', level:1, emoji:'😠', exampleKr:'화났어요.', exampleRu:'Я злюсь.' },
  { id:'emo-04', korean:'무섭다',   russian:'бояться / быть страшным',    romanization:'museopda', topic:'emotions', level:1, emoji:'😨', exampleKr:'무서워요.', exampleRu:'Страшно.' },
  { id:'emo-05', korean:'좋다',     russian:'нравиться / любить',         romanization:'jota',     topic:'emotions', level:1, emoji:'😍', exampleKr:'한국어가 좋아요.', exampleRu:'Мне нравится корейский язык.' },
  { id:'emo-06', korean:'싫다',     russian:'не нравиться / не любить',   romanization:'silta',    topic:'emotions', level:1, emoji:'😒', exampleKr:'이게 싫어요.', exampleRu:'Мне это не нравится.' },
  { id:'emo-07', korean:'행복하다', russian:'быть счастливым',            romanization:'haengbokhada',topic:'emotions', level:1, emoji:'😄', exampleKr:'행복해요!', exampleRu:'Я счастлив!' },
  { id:'emo-08', korean:'걱정하다', russian:'беспокоиться / волноваться', romanization:'geokjeonghada',topic:'emotions', level:2, emoji:'😟', exampleKr:'걱정하지 마세요.', exampleRu:'Не беспокойтесь.' },
  { id:'emo-09', korean:'긴장하다', russian:'нервничать / напрягаться',   romanization:'ginjang hada',topic:'emotions', level:2, emoji:'😬', exampleKr:'긴장했어요.', exampleRu:'Я нервничал.' },
  { id:'emo-10', korean:'설레다',   russian:'трепетать / волноваться (хорошо)', romanization:'seolleda',topic:'emotions', level:2, emoji:'💓', exampleKr:'설레어요.', exampleRu:'Сердце трепещет.' },
  { id:'emo-11', korean:'외롭다',   russian:'быть одиноким',              romanization:'oeropda',  topic:'emotions', level:2, emoji:'😔', exampleKr:'외로워요.', exampleRu:'Мне одиноко.' },
  { id:'emo-12', korean:'부끄럽다', russian:'стесняться / быть стыдно',   romanization:'bukkeureupda',topic:'emotions', level:2, emoji:'😳', exampleKr:'부끄러워요.', exampleRu:'Мне стыдно.' },
  { id:'emo-13', korean:'고맙다',   russian:'быть благодарным',          romanization:'gomapda',  topic:'emotions', level:2, emoji:'🙏', exampleKr:'고마워요.', exampleRu:'Спасибо!' },
  { id:'emo-14', korean:'미안하다', russian:'сожалеть / извиняться',      romanization:'mianhada', topic:'emotions', level:2, emoji:'😔', exampleKr:'미안해요.', exampleRu:'Мне жаль / Извините.' },
  { id:'emo-15', korean:'뿌듯하다', russian:'гордиться / испытывать удовлетворение', romanization:'ppudeutada', topic:'emotions', level:3, emoji:'😤', exampleKr:'뿌듯해요.', exampleRu:'Чувствую гордость.' },
  { id:'emo-16', korean:'억울하다', russian:'чувствовать несправедливость', romanization:'eogurhada',topic:'emotions', level:3, emoji:'😤', exampleKr:'억울해요.', exampleRu:'Мне обидно — это несправедливо.' },
  { id:'emo-17', korean:'아쉽다',   russian:'жалеть / сожалеть',         romanization:'asipda',   topic:'emotions', level:3, emoji:'😞', exampleKr:'아쉬워요.', exampleRu:'Жаль.' },

  // ══════════════════════════════════════════════════════════════════
  // NUMBERS 수·숫자  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'num-01', korean:'하나',    russian:'один (корейск.)',        romanization:'hana',      topic:'numbers', level:1, emoji:'1️⃣', exampleKr:'하나를 주세요.', exampleRu:'Дайте одно, пожалуйста.' },
  { id:'num-02', korean:'둘',      russian:'два (корейск.)',         romanization:'dul',       topic:'numbers', level:1, emoji:'2️⃣', exampleKr:'둘이에요.', exampleRu:'Их двое.' },
  { id:'num-03', korean:'셋',      russian:'три (корейск.)',         romanization:'set',       topic:'numbers', level:1, emoji:'3️⃣', exampleKr:'셋이에요.', exampleRu:'Их трое.' },
  { id:'num-04', korean:'넷',      russian:'четыре (корейск.)',      romanization:'net',       topic:'numbers', level:1, emoji:'4️⃣', exampleKr:'넷이에요.', exampleRu:'Их четверо.' },
  { id:'num-05', korean:'다섯',    russian:'пять (корейск.)',        romanization:'daseot',    topic:'numbers', level:1, emoji:'5️⃣', exampleKr:'다섯 명이에요.', exampleRu:'Нас пятеро.' },
  { id:'num-06', korean:'일',      russian:'один (китайск.)',        romanization:'il',        topic:'numbers', level:1, emoji:'1️⃣', exampleKr:'일 층이에요.', exampleRu:'Это первый этаж.' },
  { id:'num-07', korean:'이',      russian:'два (китайск.)',         romanization:'i',         topic:'numbers', level:1, emoji:'2️⃣', exampleKr:'이 번이에요.', exampleRu:'Это второй номер.' },
  { id:'num-08', korean:'삼',      russian:'три (китайск.)',         romanization:'sam',       topic:'numbers', level:1, emoji:'3️⃣', exampleKr:'삼 층이에요.', exampleRu:'Это третий этаж.' },
  { id:'num-09', korean:'백',      russian:'сто',                   romanization:'baek',      topic:'numbers', level:2, emoji:'💯', exampleKr:'백 원이에요.', exampleRu:'Это сто вон.' },
  { id:'num-10', korean:'천',      russian:'тысяча',                romanization:'cheon',     topic:'numbers', level:2, emoji:'🔢', exampleKr:'천 원이에요.', exampleRu:'Это тысяча вон.' },
  { id:'num-11', korean:'만',      russian:'десять тысяч',          romanization:'man',       topic:'numbers', level:2, emoji:'🔢', exampleKr:'만 원이에요.', exampleRu:'Это десять тысяч вон.' },
  { id:'num-12', korean:'몇',      russian:'сколько / несколько',   romanization:'myeot',     topic:'numbers', level:2, emoji:'❓', exampleKr:'몇 시예요?', exampleRu:'Который час?' },
  { id:'num-13', korean:'첫째',    russian:'первый (порядк.)',       romanization:'cheotje',   topic:'numbers', level:3, emoji:'🥇', exampleKr:'첫째 딸이에요.', exampleRu:'Это первая дочь.' },
  { id:'num-14', korean:'반',      russian:'половина',              romanization:'ban',       topic:'numbers', level:3, emoji:'½', exampleKr:'반이에요.', exampleRu:'Это половина.' },

  // ══════════════════════════════════════════════════════════════════
  // TIME 시간  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'time-01', korean:'오늘',   russian:'сегодня',               romanization:'oneul',     topic:'time', level:1, emoji:'📅', exampleKr:'오늘 날씨가 좋아요.', exampleRu:'Сегодня хорошая погода.' },
  { id:'time-02', korean:'내일',   russian:'завтра',                romanization:'naeil',     topic:'time', level:1, emoji:'📅', exampleKr:'내일 만나요.', exampleRu:'Встретимся завтра.' },
  { id:'time-03', korean:'어제',   russian:'вчера',                 romanization:'eoje',      topic:'time', level:1, emoji:'📅', exampleKr:'어제 공부했어요.', exampleRu:'Вчера учился / учалась.' },
  { id:'time-04', korean:'지금',   russian:'сейчас',                romanization:'jigeum',    topic:'time', level:1, emoji:'⏰', exampleKr:'지금 바빠요.', exampleRu:'Сейчас я занят.' },
  { id:'time-05', korean:'아침',   russian:'утро',                  romanization:'achim',     topic:'time', level:1, emoji:'🌅', exampleKr:'아침에 일어나요.', exampleRu:'Встаю утром.' },
  { id:'time-06', korean:'낮',     russian:'день (дневное время)',  romanization:'nat',       topic:'time', level:1, emoji:'🌞', exampleKr:'낮에 외출해요.', exampleRu:'Выхожу днём.' },
  { id:'time-07', korean:'밤',     russian:'ночь',                  romanization:'bam',       topic:'time', level:1, emoji:'🌙', exampleKr:'밤에 자요.', exampleRu:'Сплю ночью.' },
  { id:'time-08', korean:'봄',     russian:'весна',                 romanization:'bom',       topic:'time', level:2, emoji:'🌸', exampleKr:'봄에 꽃이 피어요.', exampleRu:'Весной цветут цветы.' },
  { id:'time-09', korean:'여름',   russian:'лето',                  romanization:'yeoreum',   topic:'time', level:2, emoji:'☀️', exampleKr:'여름에 더워요.', exampleRu:'Летом жарко.' },
  { id:'time-10', korean:'가을',   russian:'осень',                 romanization:'gaeul',     topic:'time', level:2, emoji:'🍂', exampleKr:'가을에 단풍이 들어요.', exampleRu:'Осенью краснеют листья.' },
  { id:'time-11', korean:'겨울',   russian:'зима',                  romanization:'gyeoul',    topic:'time', level:2, emoji:'❄️', exampleKr:'겨울에 추워요.', exampleRu:'Зимой холодно.' },
  { id:'time-12', korean:'월요일', russian:'понедельник',           romanization:'woryoil',   topic:'time', level:2, emoji:'📆', exampleKr:'월요일에 일해요.', exampleRu:'В понедельник работаю.' },
  { id:'time-13', korean:'금요일', russian:'пятница',               romanization:'geumyoil',  topic:'time', level:2, emoji:'📆', exampleKr:'금요일에 쉬어요.', exampleRu:'В пятницу отдыхаю.' },
  { id:'time-14', korean:'주말',   russian:'выходные',              romanization:'jumal',     topic:'time', level:2, emoji:'🎉', exampleKr:'주말에 쉬어요.', exampleRu:'В выходные отдыхаю.' },
  { id:'time-15', korean:'작년',   russian:'прошлый год',           romanization:'jangnyeon', topic:'time', level:3, emoji:'📅', exampleKr:'작년에 한국에 갔어요.', exampleRu:'В прошлом году ездил в Корею.' },
  { id:'time-16', korean:'내년',   russian:'следующий год',         romanization:'naenyeon',  topic:'time', level:3, emoji:'📅', exampleKr:'내년에 졸업해요.', exampleRu:'В следующем году заканчиваю учёбу.' },
  { id:'time-17', korean:'새벽',   russian:'ранее утро (до рассвета)', romanization:'saebyeok',topic:'time', level:3, emoji:'🌃', exampleKr:'새벽에 공부해요.', exampleRu:'Учусь ранним утром.' },
  { id:'time-18', korean:'오전',   russian:'первая половина дня',   romanization:'ojeon',     topic:'time', level:3, emoji:'🌤️', exampleKr:'오전에 회의가 있어요.', exampleRu:'Утром есть совещание.' },
  { id:'time-19', korean:'오후',   russian:'вторая половина дня',   romanization:'ohu',       topic:'time', level:3, emoji:'🌇', exampleKr:'오후에 쉬어요.', exampleRu:'После обеда отдыхаю.' },

  // ══════════════════════════════════════════════════════════════════
  // SHOPPING 쇼핑  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'shp-01', korean:'돈',      russian:'деньги',                romanization:'don',       topic:'shopping', level:1, emoji:'💰', exampleKr:'돈이 없어요.', exampleRu:'У меня нет денег.' },
  { id:'shp-02', korean:'카드',    russian:'карта (банковская)',     romanization:'kadeu',     topic:'shopping', level:1, emoji:'💳', exampleKr:'카드로 내요.', exampleRu:'Плачу картой.' },
  { id:'shp-03', korean:'가격',    russian:'цена',                  romanization:'gagyeok',   topic:'shopping', level:1, emoji:'🏷️', exampleKr:'가격이 비싸요.', exampleRu:'Цена высокая.' },
  { id:'shp-04', korean:'싸다',    russian:'дёшево / недорого',     romanization:'ssada',     topic:'shopping', level:1, emoji:'🤑', exampleKr:'이게 싸요.', exampleRu:'Это дёшево.' },
  { id:'shp-05', korean:'비싸다',  russian:'дорого',                romanization:'bissada',   topic:'shopping', level:1, emoji:'💸', exampleKr:'이게 비싸요.', exampleRu:'Это дорого.' },
  { id:'shp-06', korean:'사다',    russian:'купить / покупать',     romanization:'sada',      topic:'shopping', level:1, emoji:'🛒', exampleKr:'옷을 사요.', exampleRu:'Покупаю одежду.' },
  { id:'shp-07', korean:'영수증',  russian:'чек / квитанция',       romanization:'yeongsujeung',topic:'shopping', level:2, emoji:'🧾', exampleKr:'영수증 주세요.', exampleRu:'Дайте чек, пожалуйста.' },
  { id:'shp-08', korean:'할인',    russian:'скидка',                romanization:'harin',     topic:'shopping', level:2, emoji:'🏷️', exampleKr:'할인이 있어요?', exampleRu:'Есть скидка?' },
  { id:'shp-09', korean:'교환',    russian:'обмен товара',          romanization:'gyohwan',   topic:'shopping', level:2, emoji:'🔄', exampleKr:'교환할 수 있어요?', exampleRu:'Можно обменять?' },
  { id:'shp-10', korean:'환불',    russian:'возврат денег',         romanization:'hwanbul',   topic:'shopping', level:2, emoji:'💰', exampleKr:'환불해 주세요.', exampleRu:'Верните деньги, пожалуйста.' },
  { id:'shp-11', korean:'배달',    russian:'доставка',              romanization:'baedal',    topic:'shopping', level:2, emoji:'📦', exampleKr:'배달 시켜요.', exampleRu:'Заказываю доставку.' },
  { id:'shp-12', korean:'택배',    russian:'курьерская доставка',   romanization:'taekbae',   topic:'shopping', level:2, emoji:'📬', exampleKr:'택배가 왔어요.', exampleRu:'Пришла посылка.' },
  { id:'shp-13', korean:'품절',    russian:'нет в наличии',         romanization:'pumjeol',   topic:'shopping', level:3, emoji:'❌', exampleKr:'품절이에요.', exampleRu:'Нет в наличии.' },
  { id:'shp-14', korean:'재고',    russian:'остаток / запас',       romanization:'jaego',     topic:'shopping', level:3, emoji:'📦', exampleKr:'재고가 없어요.', exampleRu:'Запасов нет.' },
  { id:'shp-15', korean:'결제',    russian:'оплата / платёж',       romanization:'gyeolje',   topic:'shopping', level:3, emoji:'💳', exampleKr:'결제 완료됐어요.', exampleRu:'Оплата прошла.' },

  // ══════════════════════════════════════════════════════════════════
  // WORK 일·직업  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'wrk-01', korean:'일',      russian:'работа / труд',         romanization:'il',        topic:'work', level:1, emoji:'💼', exampleKr:'일을 해요.', exampleRu:'Работаю.' },
  { id:'wrk-02', korean:'직업',    russian:'профессия / работа',    romanization:'jigeop',    topic:'work', level:1, emoji:'🔖', exampleKr:'직업이 뭐예요?', exampleRu:'Кто вы по профессии?' },
  { id:'wrk-03', korean:'회사',    russian:'компания / фирма',      romanization:'hoesa',     topic:'work', level:1, emoji:'🏢', exampleKr:'회사에 가요.', exampleRu:'Иду в офис.' },
  { id:'wrk-04', korean:'돈',      russian:'деньги',                romanization:'don',       topic:'work', level:1, emoji:'💰', exampleKr:'돈을 벌어요.', exampleRu:'Зарабатываю деньги.' },
  { id:'wrk-05', korean:'월급',    russian:'зарплата',              romanization:'wolgeup',   topic:'work', level:1, emoji:'💵', exampleKr:'월급을 받아요.', exampleRu:'Получаю зарплату.' },
  { id:'wrk-06', korean:'직원',    russian:'сотрудник / работник',  romanization:'jigwon',    topic:'work', level:2, emoji:'👔', exampleKr:'직원이 친절해요.', exampleRu:'Сотрудник вежливый.' },
  { id:'wrk-07', korean:'출근',    russian:'приход на работу',      romanization:'chulgeun',  topic:'work', level:2, emoji:'🚀', exampleKr:'출근해요.', exampleRu:'Иду на работу.' },
  { id:'wrk-08', korean:'퇴근',    russian:'уход с работы',         romanization:'toegeun',   topic:'work', level:2, emoji:'🏠', exampleKr:'퇴근해요.', exampleRu:'Ухожу с работы.' },
  { id:'wrk-09', korean:'회의',    russian:'совещание / встреча',   romanization:'hoeui',     topic:'work', level:2, emoji:'📋', exampleKr:'회의가 있어요.', exampleRu:'Есть совещание.' },
  { id:'wrk-10', korean:'휴가',    russian:'отпуск / каникулы',     romanization:'hyuga',     topic:'work', level:2, emoji:'🏖️', exampleKr:'휴가를 받아요.', exampleRu:'Беру отпуск.' },
  { id:'wrk-11', korean:'야근',    russian:'сверхурочная работа',   romanization:'yageun',    topic:'work', level:2, emoji:'🌙', exampleKr:'야근을 해요.', exampleRu:'Работаю сверхурочно.' },
  { id:'wrk-12', korean:'업무',    russian:'деловые обязанности',   romanization:'eommu',     topic:'work', level:3, emoji:'📊', exampleKr:'업무를 처리해요.', exampleRu:'Выполняю рабочие обязанности.' },
  { id:'wrk-13', korean:'보고서',  russian:'отчёт / доклад',        romanization:'bogoeo',    topic:'work', level:3, emoji:'📄', exampleKr:'보고서를 써요.', exampleRu:'Пишу отчёт.' },
  { id:'wrk-14', korean:'마감',    russian:'дедлайн / срок сдачи',  romanization:'magam',     topic:'work', level:3, emoji:'⏰', exampleKr:'마감이 내일이에요.', exampleRu:'Дедлайн завтра.' },
  { id:'wrk-15', korean:'출장',    russian:'командировка',          romanization:'chuljang',  topic:'work', level:3, emoji:'✈️', exampleKr:'출장을 가요.', exampleRu:'Еду в командировку.' },
  { id:'wrk-16', korean:'승진',    russian:'повышение по службе',   romanization:'seungjin',  topic:'work', level:3, emoji:'⬆️', exampleKr:'승진했어요!', exampleRu:'Меня повысили!' },

  // ══════════════════════════════════════════════════════════════════
  // CLEANING 청소  (easy → hard)
  // ══════════════════════════════════════════════════════════════════
  { id:'cln-01', korean:'청소',    russian:'уборка / чистка',       romanization:'cheongso',  topic:'cleaning', level:1, emoji:'🧹', exampleKr:'청소를 해요.', exampleRu:'Делаю уборку.' },
  { id:'cln-02', korean:'빨래',    russian:'стирка',                romanization:'bbalae',    topic:'cleaning', level:1, emoji:'👕', exampleKr:'빨래를 해요.', exampleRu:'Стираю бельё.' },
  { id:'cln-03', korean:'쓰레기',  russian:'мусор',                 romanization:'sseuaegi',  topic:'cleaning', level:1, emoji:'🗑️', exampleKr:'쓰레기를 버려요.', exampleRu:'Выбрасываю мусор.' },
  { id:'cln-04', korean:'비',      russian:'метла',                 romanization:'bi',        topic:'cleaning', level:1, emoji:'🧹', exampleKr:'비로 쓸어요.', exampleRu:'Подметаю метлой.' },
  { id:'cln-05', korean:'걸레',    russian:'тряпка / швабра',       romanization:'geolle',    topic:'cleaning', level:1, emoji:'🫧', exampleKr:'걸레로 닦아요.', exampleRu:'Вытираю тряпкой.' },
  { id:'cln-06', korean:'세제',    russian:'моющее средство',       romanization:'seoje',     topic:'cleaning', level:2, emoji:'🧴', exampleKr:'세제를 넣어요.', exampleRu:'Добавляю моющее средство.' },
  { id:'cln-07', korean:'청소기',  russian:'пылесос',               romanization:'cheongsogi',topic:'cleaning', level:2, emoji:'🌪️', exampleKr:'청소기를 돌려요.', exampleRu:'Пылесошу.' },
  { id:'cln-08', korean:'쓰레기통',russian:'мусорное ведро',        romanization:'sseuaegitong',topic:'cleaning', level:2, emoji:'🗑️', exampleKr:'쓰레기통을 비워요.', exampleRu:'Опустошаю мусорное ведро.' },
  { id:'cln-09', korean:'재활용',  russian:'переработка / recycling', romanization:'jaehwaryong',topic:'cleaning', level:2, emoji:'♻️', exampleKr:'재활용해요.', exampleRu:'Сдаю на переработку.' },
  { id:'cln-10', korean:'분리수거',russian:'раздельный сбор мусора',romanization:'bullisugeo', topic:'cleaning', level:3, emoji:'♻️', exampleKr:'분리수거를 해요.', exampleRu:'Собираю мусор раздельно.' },
  { id:'cln-11', korean:'표백제',  russian:'отбеливатель',          romanization:'pyobaekje',  topic:'cleaning', level:3, emoji:'🧴', exampleKr:'표백제를 써요.', exampleRu:'Использую отбеливатель.' },
  { id:'cln-12', korean:'소독',    russian:'дезинфекция',           romanization:'sodok',      topic:'cleaning', level:3, emoji:'🧪', exampleKr:'소독을 해요.', exampleRu:'Провожу дезинфекцию.' },
  { id:'cln-13', korean:'행주',   russian:'кухонная тряпка',       romanization:'haengju',    topic:'cleaning', level:2, emoji:'🫧', exampleKr:'행주로 닦아요.', exampleRu:'Вытираю кухонной тряпкой.' },
  { id:'cln-14', korean:'수세미', russian:'губка для посуды',      romanization:'susemi',     topic:'cleaning', level:2, emoji:'🧽', exampleKr:'수세미로 씻어요.', exampleRu:'Мою губкой.' },
  { id:'cln-15', korean:'빗자루', russian:'метла / веник',         romanization:'bitjaru',    topic:'cleaning', level:2, emoji:'🧹', exampleKr:'빗자루로 쓸어요.', exampleRu:'Подметаю веником.' },
  { id:'cln-16', korean:'대걸레', russian:'швабра',                romanization:'daegeolle',  topic:'cleaning', level:2, emoji:'🪣', exampleKr:'대걸레로 닦아요.', exampleRu:'Мою пол шваброй.' },
  { id:'cln-17', korean:'세탁기', russian:'стиральная машина',     romanization:'setakgi',    topic:'cleaning', level:2, emoji:'🫧', exampleKr:'세탁기를 돌려요.', exampleRu:'Включаю стиральную машину.' },
  { id:'cln-18', korean:'건조기', russian:'сушильная машина',      romanization:'geonjogi',   topic:'cleaning', level:3, emoji:'🌬️', exampleKr:'건조기에 넣어요.', exampleRu:'Кладу в сушилку.' },
  { id:'cln-19', korean:'정리',   russian:'уборка / наведение порядка', romanization:'jeongni', topic:'cleaning', level:2, emoji:'🗂️', exampleKr:'방을 정리해요.', exampleRu:'Привожу комнату в порядок.' },
  { id:'cln-20', korean:'향기',   russian:'аромат / запах',        romanization:'hyanggi',    topic:'cleaning', level:3, emoji:'🌸', exampleKr:'집에서 향기가 나요.', exampleRu:'В доме приятный запах.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA FAMILY 가족 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'fam-26', korean:'쌍둥이',   russian:'близнецы',              romanization:'ssangdungi', topic:'family', level:2, emoji:'👫', exampleKr:'쌍둥이예요.', exampleRu:'Они близнецы.' },
  { id:'fam-27', korean:'외동',     russian:'единственный ребёнок', romanization:'oidong',     topic:'family', level:3, emoji:'🧒', exampleKr:'저는 외동이에요.', exampleRu:'Я единственный ребёнок.' },
  { id:'fam-28', korean:'부모님',   russian:'родители',             romanization:'bumonim',    topic:'family', level:1, emoji:'👨‍👩‍👧', exampleKr:'부모님이 오세요.', exampleRu:'Родители приезжают.' },
  { id:'fam-29', korean:'형제',     russian:'братья / братья и сёстры', romanization:'hyeongje', topic:'family', level:2, emoji:'👬', exampleKr:'형제가 셋이에요.', exampleRu:'Нас три брата.' },
  { id:'fam-30', korean:'자녀',     russian:'дети (сын и дочь)',    romanization:'janyeo',     topic:'family', level:2, emoji:'👧👦', exampleKr:'자녀가 둘이에요.', exampleRu:'У нас двое детей.' },
  { id:'fam-31', korean:'친척',     russian:'родственник',          romanization:'chincheok',  topic:'family', level:2, emoji:'👨‍👩‍👧‍👦', exampleKr:'친척들이 모였어요.', exampleRu:'Родственники собрались.' },
  { id:'fam-32', korean:'가정',     russian:'домашнее хозяйство / семья', romanization:'gajeong', topic:'family', level:2, emoji:'🏠', exampleKr:'행복한 가정이에요.', exampleRu:'Счастливая семья.' },
  { id:'fam-33', korean:'결혼',     russian:'брак / свадьба',       romanization:'gyeolhon',   topic:'family', level:2, emoji:'💒', exampleKr:'결혼했어요.', exampleRu:'Поженились.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA FOOD 음식 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'food-29', korean:'과자',    russian:'печенье / чипсы / снеки', romanization:'gwaja',   topic:'food', level:1, emoji:'🍪', exampleKr:'과자를 먹어요.', exampleRu:'Ем снеки.' },
  { id:'food-30', korean:'사탕',    russian:'конфета / леденец',    romanization:'satang',     topic:'food', level:1, emoji:'🍬', exampleKr:'사탕을 먹어요.', exampleRu:'Ем конфету.' },
  { id:'food-31', korean:'초콜릿',  russian:'шоколад',              romanization:'chokollit',  topic:'food', level:1, emoji:'🍫', exampleKr:'초콜릿을 좋아해요.', exampleRu:'Люблю шоколад.' },
  { id:'food-32', korean:'아이스크림', russian:'мороженое',         romanization:'aiseukeurim', topic:'food', level:1, emoji:'🍦', exampleKr:'아이스크림을 먹어요.', exampleRu:'Ем мороженое.' },
  { id:'food-33', korean:'케이크',  russian:'торт / пирог',         romanization:'keikeu',     topic:'food', level:1, emoji:'🎂', exampleKr:'케이크를 잘라요.', exampleRu:'Режу торт.' },
  { id:'food-34', korean:'소고기',  russian:'говядина',             romanization:'sogogi',     topic:'food', level:2, emoji:'🥩', exampleKr:'소고기를 구워요.', exampleRu:'Жарю говядину.' },
  { id:'food-35', korean:'돼지고기', russian:'свинина',             romanization:'dwaeijigogi', topic:'food', level:2, emoji:'🐷', exampleKr:'돼지고기를 삶아요.', exampleRu:'Варю свинину.' },
  { id:'food-36', korean:'닭고기',  russian:'курятина / курица',    romanization:'dakgogi',    topic:'food', level:2, emoji:'🐔', exampleKr:'닭고기를 볶아요.', exampleRu:'Жарю курицу.' },
  { id:'food-37', korean:'두부',    russian:'тофу',                 romanization:'dubu',       topic:'food', level:2, emoji:'⬜', exampleKr:'두부를 넣어요.', exampleRu:'Добавляю тофу.' },
  { id:'food-38', korean:'간장',    russian:'соевый соус',          romanization:'ganjang',    topic:'food', level:2, emoji:'🧂', exampleKr:'간장을 넣어요.', exampleRu:'Добавляю соевый соус.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA HOME 집 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'hom-26', korean:'창문',    russian:'окно',                  romanization:'changmun',   topic:'home', level:1, emoji:'🪟', exampleKr:'창문을 열어요.', exampleRu:'Открываю окно.' },
  { id:'hom-27', korean:'문',      russian:'дверь',                 romanization:'mun',        topic:'home', level:1, emoji:'🚪', exampleKr:'문을 닫아요.', exampleRu:'Закрываю дверь.' },
  { id:'hom-28', korean:'바닥',    russian:'пол',                   romanization:'badak',      topic:'home', level:1, emoji:'🏠', exampleKr:'바닥을 닦아요.', exampleRu:'Мою пол.' },
  { id:'hom-29', korean:'천장',    russian:'потолок',               romanization:'cheonjang',  topic:'home', level:2, emoji:'⬆️', exampleKr:'천장이 높아요.', exampleRu:'Потолок высокий.' },
  { id:'hom-30', korean:'벽',      russian:'стена',                 romanization:'byeok',      topic:'home', level:1, emoji:'🧱', exampleKr:'벽에 그림이 있어요.', exampleRu:'На стене картина.' },
  { id:'hom-31', korean:'전등',    russian:'лампа / светильник',    romanization:'jeondeung',  topic:'home', level:2, emoji:'💡', exampleKr:'전등을 켜요.', exampleRu:'Включаю свет.' },
  { id:'hom-32', korean:'에어컨',  russian:'кондиционер',           romanization:'eeokon',     topic:'home', level:2, emoji:'❄️', exampleKr:'에어컨을 틀어요.', exampleRu:'Включаю кондиционер.' },
  { id:'hom-33', korean:'보일러',  russian:'котёл / отопление',     romanization:'boilleo',    topic:'home', level:2, emoji:'🔥', exampleKr:'보일러를 켜요.', exampleRu:'Включаю отопление.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA SCHOOL 학교 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'sch-24', korean:'필통',   russian:'пенал',                  romanization:'piltong',    topic:'school', level:1, emoji:'🖊️', exampleKr:'필통에 연필이 있어요.', exampleRu:'В пенале есть карандаши.' },
  { id:'sch-25', korean:'지우개', russian:'ластик',                 romanization:'jiugae',     topic:'school', level:1, emoji:'🩹', exampleKr:'지우개로 지워요.', exampleRu:'Стираю ластиком.' },
  { id:'sch-26', korean:'자',     russian:'линейка',                romanization:'ja',         topic:'school', level:1, emoji:'📏', exampleKr:'자로 재요.', exampleRu:'Измеряю линейкой.' },
  { id:'sch-27', korean:'칠판',   russian:'доска (классная)',       romanization:'chilpan',    topic:'school', level:1, emoji:'🟩', exampleKr:'칠판에 써요.', exampleRu:'Пишу на доске.' },
  { id:'sch-28', korean:'분필',   russian:'мел',                    romanization:'bunpil',     topic:'school', level:2, emoji:'🖍️', exampleKr:'분필로 써요.', exampleRu:'Пишу мелом.' },
  { id:'sch-29', korean:'과목',   russian:'учебный предмет',        romanization:'gwamok',     topic:'school', level:2, emoji:'📖', exampleKr:'좋아하는 과목이 뭐예요?', exampleRu:'Какой предмет любите?' },
  { id:'sch-30', korean:'성적',   russian:'оценки / успеваемость',  romanization:'seongjeok',  topic:'school', level:2, emoji:'📊', exampleKr:'성적이 좋아요.', exampleRu:'Хорошие оценки.' },
  { id:'sch-31', korean:'방학',   russian:'каникулы',               romanization:'banghak',    topic:'school', level:1, emoji:'🎉', exampleKr:'방학이에요!', exampleRu:'Каникулы!' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA PLACES 장소 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'plc-21', korean:'동물원',  russian:'зоопарк',              romanization:'dongmurwon', topic:'places', level:1, emoji:'🦁', exampleKr:'동물원에 가요.', exampleRu:'Иду в зоопарк.' },
  { id:'plc-22', korean:'수영장',  russian:'бассейн',              romanization:'suyeongjang', topic:'places', level:1, emoji:'🏊', exampleKr:'수영장에서 수영해요.', exampleRu:'Плаваю в бассейне.' },
  { id:'plc-23', korean:'미용실',  russian:'парикмахерская / салон', romanization:'miyongshil', topic:'places', level:2, emoji:'💇', exampleKr:'미용실에 가요.', exampleRu:'Иду в парикмахерскую.' },
  { id:'plc-24', korean:'세탁소',  russian:'прачечная',            romanization:'setakso',    topic:'places', level:2, emoji:'👕', exampleKr:'세탁소에 맡겨요.', exampleRu:'Сдаю в прачечную.' },
  { id:'plc-25', korean:'경찰서',  russian:'полицейский участок',  romanization:'gyeongchalseo', topic:'places', level:2, emoji:'🚔', exampleKr:'경찰서에 신고해요.', exampleRu:'Обращаюсь в полицию.' },
  { id:'plc-26', korean:'소방서',  russian:'пожарная часть',       romanization:'sobangseo',  topic:'places', level:2, emoji:'🚒', exampleKr:'소방서에 전화해요.', exampleRu:'Звоню в пожарную.' },
  { id:'plc-27', korean:'시청',    russian:'мэрия / ратуша',       romanization:'sicheong',   topic:'places', level:3, emoji:'🏛️', exampleKr:'시청에 가요.', exampleRu:'Иду в мэрию.' },
  { id:'plc-28', korean:'대사관',  russian:'посольство',           romanization:'daesagwan',  topic:'places', level:3, emoji:'🏴', exampleKr:'대사관에 가요.', exampleRu:'Иду в посольство.' },
  { id:'plc-29', korean:'공항',    russian:'аэропорт',             romanization:'gonghang',   topic:'places', level:1, emoji:'✈️', exampleKr:'공항에 도착했어요.', exampleRu:'Прибыл в аэропорт.' },
  { id:'plc-30', korean:'항구',    russian:'порт / гавань',        romanization:'hanggu',     topic:'places', level:3, emoji:'⚓', exampleKr:'항구에서 배가 떠나요.', exampleRu:'Из порта отходит корабль.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA DAILY 일상 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'dly-20', korean:'약속',    russian:'встреча / договорённость', romanization:'yakssok', topic:'daily', level:2, emoji:'🤝', exampleKr:'약속이 있어요.', exampleRu:'У меня встреча.' },
  { id:'dly-21', korean:'계획',    russian:'план',                  romanization:'gyehoek',    topic:'daily', level:2, emoji:'📋', exampleKr:'계획을 세워요.', exampleRu:'Составляю план.' },
  { id:'dly-22', korean:'습관',    russian:'привычка',              romanization:'seupgwan',   topic:'daily', level:3, emoji:'🔄', exampleKr:'좋은 습관이 있어요.', exampleRu:'У меня хорошая привычка.' },
  { id:'dly-23', korean:'취미',    russian:'хобби',                 romanization:'chwimi',     topic:'daily', level:2, emoji:'🎯', exampleKr:'취미가 뭐예요?', exampleRu:'Какое у вас хобби?' },
  { id:'dly-24', korean:'이메일',  russian:'электронная почта',     romanization:'imeil',      topic:'daily', level:1, emoji:'📧', exampleKr:'이메일을 보내요.', exampleRu:'Отправляю электронное письмо.' },
  { id:'dly-25', korean:'문자',    russian:'СМС / текстовое сообщение', romanization:'munja', topic:'daily', level:1, emoji:'💬', exampleKr:'문자를 보내요.', exampleRu:'Отправляю СМС.' },
  { id:'dly-26', korean:'일기',    russian:'дневник',               romanization:'ilgi',       topic:'daily', level:2, emoji:'📔', exampleKr:'일기를 써요.', exampleRu:'Пишу дневник.' },
  { id:'dly-27', korean:'독서',    russian:'чтение книг',           romanization:'dokseo',     topic:'daily', level:2, emoji:'📚', exampleKr:'독서를 해요.', exampleRu:'Читаю книги.' },
  { id:'dly-28', korean:'산책',    russian:'прогулка',              romanization:'sanchek',    topic:'daily', level:1, emoji:'🚶', exampleKr:'산책을 해요.', exampleRu:'Гуляю.' },
  { id:'dly-29', korean:'낮잠',    russian:'дневной сон',           romanization:'natjam',     topic:'daily', level:2, emoji:'😴', exampleKr:'낮잠을 자요.', exampleRu:'Сплю днём.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA BODY 몸 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'bdy-21', korean:'피',      russian:'кровь',                 romanization:'pi',         topic:'body', level:2, emoji:'🩸', exampleKr:'피가 나요.', exampleRu:'Идёт кровь.' },
  { id:'bdy-22', korean:'뼈',      russian:'кость',                 romanization:'ppyeo',      topic:'body', level:2, emoji:'🦴', exampleKr:'뼈가 아파요.', exampleRu:'Болит кость.' },
  { id:'bdy-23', korean:'피부',    russian:'кожа',                  romanization:'pibu',       topic:'body', level:2, emoji:'🙂', exampleKr:'피부가 건조해요.', exampleRu:'Кожа сухая.' },
  { id:'bdy-24', korean:'손톱',    russian:'ноготь (на руке)',      romanization:'sontop',     topic:'body', level:2, emoji:'💅', exampleKr:'손톱을 깎아요.', exampleRu:'Стригу ногти.' },
  { id:'bdy-25', korean:'발톱',    russian:'ноготь (на ноге)',      romanization:'baltop',     topic:'body', level:2, emoji:'🦶', exampleKr:'발톱을 깎아요.', exampleRu:'Стригу ногти на ногах.' },
  { id:'bdy-26', korean:'심장',    russian:'сердце',                romanization:'simjang',    topic:'body', level:3, emoji:'❤️', exampleKr:'심장이 뛰어요.', exampleRu:'Сердце бьётся.' },
  { id:'bdy-27', korean:'폐',      russian:'лёгкие',                romanization:'pye',        topic:'body', level:3, emoji:'🫁', exampleKr:'폐가 안 좋아요.', exampleRu:'Лёгкие нехорошие.' },
  { id:'bdy-28', korean:'위',      russian:'желудок',               romanization:'wi',         topic:'body', level:3, emoji:'🫀', exampleKr:'위가 아파요.', exampleRu:'Болит желудок.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA NATURE 자연 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'nat-20', korean:'파도',    russian:'волна',                 romanization:'pado',       topic:'nature', level:2, emoji:'🌊', exampleKr:'파도가 높아요.', exampleRu:'Волны высокие.' },
  { id:'nat-21', korean:'폭포',    russian:'водопад',               romanization:'pokpo',      topic:'nature', level:2, emoji:'💦', exampleKr:'폭포가 아름다워요.', exampleRu:'Водопад красивый.' },
  { id:'nat-22', korean:'사막',    russian:'пустыня',               romanization:'samak',      topic:'nature', level:3, emoji:'🏜️', exampleKr:'사막이 더워요.', exampleRu:'В пустыне жарко.' },
  { id:'nat-23', korean:'숲',      russian:'лес',                   romanization:'sup',        topic:'nature', level:1, emoji:'🌲', exampleKr:'숲에서 걸어요.', exampleRu:'Гуляю в лесу.' },
  { id:'nat-24', korean:'들판',    russian:'поле / луг',            romanization:'deulpan',    topic:'nature', level:2, emoji:'🌾', exampleKr:'들판이 넓어요.', exampleRu:'Поле широкое.' },
  { id:'nat-25', korean:'동물',    russian:'животное',              romanization:'dongmul',    topic:'nature', level:1, emoji:'🐾', exampleKr:'동물을 좋아해요.', exampleRu:'Люблю животных.' },
  { id:'nat-26', korean:'식물',    russian:'растение',              romanization:'singmul',    topic:'nature', level:2, emoji:'🌱', exampleKr:'식물을 키워요.', exampleRu:'Выращиваю растения.' },
  { id:'nat-27', korean:'하늘',    russian:'небо',                  romanization:'haneul',     topic:'nature', level:1, emoji:'☁️', exampleKr:'하늘이 맑아요.', exampleRu:'Небо ясное.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA TRANSPORT 교통 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'trn-17', korean:'표',      russian:'билет',                 romanization:'pyo',        topic:'transport', level:1, emoji:'🎫', exampleKr:'표를 사요.', exampleRu:'Покупаю билет.' },
  { id:'trn-18', korean:'요금',    russian:'тариф / стоимость проезда', romanization:'yogeum', topic:'transport', level:2, emoji:'💳', exampleKr:'요금이 얼마예요?', exampleRu:'Сколько стоит проезд?' },
  { id:'trn-19', korean:'환승',    russian:'пересадка / трансфер',  romanization:'hwanseung',  topic:'transport', level:2, emoji:'🔄', exampleKr:'환승해요.', exampleRu:'Делаю пересадку.' },
  { id:'trn-20', korean:'정류장',  russian:'остановка автобуса',    romanization:'jeongnugjang', topic:'transport', level:2, emoji:'🚏', exampleKr:'정류장에서 기다려요.', exampleRu:'Жду на остановке.' },
  { id:'trn-21', korean:'출구',    russian:'выход',                 romanization:'chulgu',     topic:'transport', level:1, emoji:'🚪', exampleKr:'출구로 나가요.', exampleRu:'Выхожу через выход.' },
  { id:'trn-22', korean:'입구',    russian:'вход',                  romanization:'ipgu',       topic:'transport', level:1, emoji:'🚪', exampleKr:'입구로 들어가요.', exampleRu:'Вхожу через вход.' },
  { id:'trn-23', korean:'승강장',  russian:'платформа (ж/д)',       romanization:'seunggjangjang', topic:'transport', level:3, emoji:'🚉', exampleKr:'승강장에서 기다려요.', exampleRu:'Жду на платформе.' },
  { id:'trn-24', korean:'도로',    russian:'дорога / шоссе',        romanization:'doro',       topic:'transport', level:2, emoji:'🛣️', exampleKr:'도로가 막혀요.', exampleRu:'Дорога заблокирована.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA EMOTIONS 감정 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'emo-18', korean:'설레다', russian:'трепетать / волноваться (приятно)', romanization:'seolleda', topic:'emotions', level:3, emoji:'🦋', exampleKr:'내일이 설레요.', exampleRu:'Завтра трепещу (предвкушаю).' },
  { id:'emo-19', korean:'후회하다', russian:'сожалеть / раскаиваться', romanization:'huhoeada', topic:'emotions', level:3, emoji:'😔', exampleKr:'후회해요.', exampleRu:'Сожалею.' },
  { id:'emo-20', korean:'당황하다', russian:'растеряться / смутиться', romanization:'danghwanghada', topic:'emotions', level:3, emoji:'😳', exampleKr:'당황했어요.', exampleRu:'Растерялся.' },
  { id:'emo-21', korean:'부끄럽다', russian:'стыдиться / смущаться',  romanization:'bukkeureobda', topic:'emotions', level:2, emoji:'😳', exampleKr:'부끄러워요.', exampleRu:'Мне стыдно.' },
  { id:'emo-22', korean:'그립다',   russian:'скучать (по кому-то)',  romanization:'geurippda',  topic:'emotions', level:3, emoji:'🥺', exampleKr:'친구가 그리워요.', exampleRu:'Скучаю по другу.' },
  { id:'emo-23', korean:'지치다',   russian:'уставать / изматываться', romanization:'jichida',  topic:'emotions', level:3, emoji:'😫', exampleKr:'너무 지쳤어요.', exampleRu:'Очень устал.' },
  { id:'emo-24', korean:'즐겁다',   russian:'весёлый / радостный',  romanization:'jeulgeobda', topic:'emotions', level:2, emoji:'😄', exampleKr:'즐거운 시간이에요.', exampleRu:'Весёлое время.' },
  { id:'emo-25', korean:'편하다',   russian:'комфортный / удобный', romanization:'pyeonhada',  topic:'emotions', level:2, emoji:'😌', exampleKr:'편해요.', exampleRu:'Удобно / Комфортно.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA NUMBERS 수 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'num-15', korean:'백만',    russian:'миллион',               romanization:'baengman',   topic:'numbers', level:3, emoji:'💯', exampleKr:'백만 원이에요.', exampleRu:'Миллион вон.' },
  { id:'num-16', korean:'반',      russian:'половина / полу-',      romanization:'ban',        topic:'numbers', level:2, emoji:'½', exampleKr:'반이에요.', exampleRu:'Это половина.' },
  { id:'num-17', korean:'몇',      russian:'несколько / сколько',   romanization:'myeot',      topic:'numbers', level:1, emoji:'❓', exampleKr:'몇 명이에요?', exampleRu:'Сколько человек?' },
  { id:'num-18', korean:'모두',    russian:'все / всего',           romanization:'modu',       topic:'numbers', level:1, emoji:'👥', exampleKr:'모두 다섯이에요.', exampleRu:'Всего пятеро.' },
  { id:'num-19', korean:'처음',    russian:'первый / первый раз',   romanization:'cheoeum',    topic:'numbers', level:2, emoji:'1️⃣', exampleKr:'처음이에요.', exampleRu:'Первый раз.' },
  { id:'num-20', korean:'마지막',  russian:'последний / конец',     romanization:'majimak',    topic:'numbers', level:2, emoji:'🏁', exampleKr:'마지막이에요.', exampleRu:'Последний раз.' },
  { id:'num-21', korean:'번째',    russian:'-(н)ый (порядковый суффикс)', romanization:'beonjjae', topic:'numbers', level:2, emoji:'🔢', exampleKr:'첫 번째예요.', exampleRu:'Это первый.' },
  { id:'num-22', korean:'정도',    russian:'около / примерно',      romanization:'jeongdo',    topic:'numbers', level:2, emoji:'≈', exampleKr:'열 명 정도예요.', exampleRu:'Примерно десять человек.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA TIME 시간 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'tim-20', korean:'새벽',    russian:'раннее утро / предрассветные часы', romanization:'saebyeok', topic:'time', level:2, emoji:'🌙', exampleKr:'새벽에 일어나요.', exampleRu:'Встаю рано утром.' },
  { id:'tim-21', korean:'평일',    russian:'рабочий день / будни',  romanization:'pyeongil',   topic:'time', level:2, emoji:'📅', exampleKr:'평일에 일해요.', exampleRu:'По будням работаю.' },
  { id:'tim-22', korean:'공휴일',  russian:'государственный праздник', romanization:'gonghyuil', topic:'time', level:3, emoji:'🎉', exampleKr:'공휴일이에요.', exampleRu:'Государственный праздник.' },
  { id:'tim-23', korean:'작년',    russian:'в прошлом году',        romanization:'jangnyeon',  topic:'time', level:2, emoji:'📅', exampleKr:'작년에 한국에 갔어요.', exampleRu:'В прошлом году ездил в Корею.' },
  { id:'tim-24', korean:'내년',    russian:'в следующем году',      romanization:'naenyeon',   topic:'time', level:2, emoji:'📅', exampleKr:'내년에 졸업해요.', exampleRu:'В следующем году окончу учёбу.' },
  { id:'tim-25', korean:'항상',    russian:'всегда',                romanization:'hangsang',   topic:'time', level:1, emoji:'🔄', exampleKr:'항상 행복해요.', exampleRu:'Всегда счастлив.' },
  { id:'tim-26', korean:'가끔',    russian:'иногда',                romanization:'gakkeum',    topic:'time', level:1, emoji:'🔀', exampleKr:'가끔 운동해요.', exampleRu:'Иногда занимаюсь спортом.' },
  { id:'tim-27', korean:'자주',    russian:'часто',                 romanization:'jaju',       topic:'time', level:1, emoji:'🔁', exampleKr:'자주 여기 와요.', exampleRu:'Часто сюда прихожу.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA SHOPPING 쇼핑 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'shp-16', korean:'지갑',    russian:'кошелёк',               romanization:'jigap',      topic:'shopping', level:1, emoji:'👛', exampleKr:'지갑을 잃어버렸어요.', exampleRu:'Потерял кошелёк.' },
  { id:'shp-17', korean:'카드',    russian:'карта (кредитная)',      romanization:'kadeu',      topic:'shopping', level:1, emoji:'💳', exampleKr:'카드로 결제해요.', exampleRu:'Оплачиваю картой.' },
  { id:'shp-18', korean:'현금',    russian:'наличные деньги',       romanization:'hyeongeum',  topic:'shopping', level:1, emoji:'💵', exampleKr:'현금으로 내요.', exampleRu:'Плачу наличными.' },
  { id:'shp-19', korean:'영수증',  russian:'квитанция / чек',       romanization:'yeongsujeung', topic:'shopping', level:2, emoji:'🧾', exampleKr:'영수증을 주세요.', exampleRu:'Дайте чек, пожалуйста.' },
  { id:'shp-20', korean:'쇼핑백',  russian:'пакет для покупок',     romanization:'syopingbaek', topic:'shopping', level:2, emoji:'🛍️', exampleKr:'쇼핑백을 받아요.', exampleRu:'Беру пакет.' },
  { id:'shp-21', korean:'택배',    russian:'посылка / доставка',    romanization:'taekbae',    topic:'shopping', level:2, emoji:'📦', exampleKr:'택배가 왔어요.', exampleRu:'Пришла посылка.' },
  { id:'shp-22', korean:'반품',    russian:'возврат товара',        romanization:'banpum',     topic:'shopping', level:3, emoji:'↩️', exampleKr:'반품하고 싶어요.', exampleRu:'Хочу вернуть товар.' },
  { id:'shp-23', korean:'교환',    russian:'обмен товара',          romanization:'gyohwan',    topic:'shopping', level:3, emoji:'🔄', exampleKr:'교환할 수 있어요?', exampleRu:'Можно обменять?' },
  { id:'shp-24', korean:'할인권',  russian:'купон на скидку',       romanization:'halinkwon',  topic:'shopping', level:3, emoji:'🏷️', exampleKr:'할인권을 써요.', exampleRu:'Использую купон.' },
  { id:'shp-25', korean:'장바구니', russian:'корзина (покупок)',    romanization:'jangbaguni', topic:'shopping', level:2, emoji:'🛒', exampleKr:'장바구니에 담아요.', exampleRu:'Кладу в корзину.' },

  // ══════════════════════════════════════════════════════════════════
  // EXTRA WORK 직업 (additions)
  // ══════════════════════════════════════════════════════════════════
  { id:'wrk-17', korean:'계약',    russian:'контракт / договор',    romanization:'gyeyak',     topic:'work', level:3, emoji:'📝', exampleKr:'계약을 해요.', exampleRu:'Заключаю контракт.' },
  { id:'wrk-18', korean:'면접',    russian:'собеседование',         romanization:'myeonjeop',  topic:'work', level:2, emoji:'👔', exampleKr:'면접을 봐요.', exampleRu:'Прохожу собеседование.' },
  { id:'wrk-19', korean:'이력서',  russian:'резюме',                romanization:'iryeokseo',  topic:'work', level:3, emoji:'📄', exampleKr:'이력서를 써요.', exampleRu:'Пишу резюме.' },
  { id:'wrk-20', korean:'부서',    russian:'отдел / подразделение', romanization:'buseo',      topic:'work', level:3, emoji:'🏢', exampleKr:'어느 부서예요?', exampleRu:'В каком отделе?' },
  { id:'wrk-21', korean:'팀장',    russian:'руководитель группы',   romanization:'timjang',    topic:'work', level:3, emoji:'👑', exampleKr:'팀장이에요.', exampleRu:'Я руководитель группы.' },
  { id:'wrk-22', korean:'인턴',    russian:'стажёр / интерн',       romanization:'inteon',     topic:'work', level:2, emoji:'🎓', exampleKr:'인턴을 해요.', exampleRu:'Работаю стажёром.' },
  { id:'wrk-23', korean:'프로젝트', russian:'проект',               romanization:'peurojekteu', topic:'work', level:2, emoji:'📊', exampleKr:'프로젝트를 맡아요.', exampleRu:'Веду проект.' },
  { id:'wrk-24', korean:'발표',    russian:'презентация / доклад',  romanization:'balpyo',     topic:'work', level:2, emoji:'📢', exampleKr:'발표를 해요.', exampleRu:'Делаю презентацию.' },
];

// ── Helpers ───────────────────────────────────────────────────────────
export function getWordsByTopic(topic: VocabTopic): VocabWord[] {
  return VOCABULARY
    .filter(w => w.topic === topic)
    .sort((a, b) => a.level - b.level);
}

export function getWordsByLevel(level: number): VocabWord[] {
  return VOCABULARY.filter(w => w.level <= level);
}

export function getWordById(id: string): VocabWord | undefined {
  return VOCABULARY.find(w => w.id === id);
}

export function getAllWords(): VocabWord[] {
  return VOCABULARY;
}
