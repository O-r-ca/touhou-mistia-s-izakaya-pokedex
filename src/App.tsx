import { useMemo, useState, useEffect } from 'react'
import './App.css'

import banner from './assets/Mystia-izakaya.webp'

import marisa from './assets/guests/marisa.png'
import tenshi from './assets/guests/tenshi.webp'
import suika from './assets/guests/suika.png'
import reimu from './assets/guests/reimu.png'
import rinnosuke from './assets/guests/rinnoske.webp'
import kasen from './assets/guests/kasen.png'
import akyuu from './assets/guests/aq.webp'
import keine from './assets/guests/keyne.png'
import rumia from './assets/guests/lumia.png'
import chen from './assets/guests/chen.png'
import wriggle from './assets/guests/nightburg.png'
import cirno from "./assets/guests/cirno.png"
import meiling from "./assets/guests/meiling.png"
import pachuri from "./assets/guests/pachuri.png"

type Guest = {
  name: string
  region: string
  image: string
  likes: string[]
  dislikes: string[]
  money: string
  foods: string[]
  drinks: string[]
  quotes: string[]
  materials: string[]
}

const guests: Guest[] = [
  {
    name: '리글 나이트버그',
    region: '요괴 짐승길',
    image: wriggle,
    likes: ['육류', '단 맛', '날 것', '이상함'],
    dislikes: ['채식', '담백함', '시원함'],
    money: '200 ~ 400',
    foods: [
      '칠성장어 구이 + 선호속성 2개 (돈가스 덮밥 해금 전)',
      '돈가스 덮밥',
      '소고기 덮밥',
    ],
    drinks: ['치', '과일 하이볼', '과일 사와'],
    quotes: [
      '달콤한 것이 좋으려나~ (단 맛)',
      '굽거나 삶은 고기보단 역시 날 것이지! (날 것)',
      '설마 소고기 먹을 때 바싹 구워 먹는 타입이야? (육류)',
      '이상한 음식이래도 거절하진 않는다구~ (이상함)',
    ],
    materials: ['벌꿀 (단 맛)', '계란 (날 것)', '매미 허물 (이상함)'],
  },
  {
    name: '첸',
    region: '요괴 짐승길',
    image: chen,
    likes: ['육류', '수산물', '기름짐', '단 맛', '구이류', '인기있음'],
    dislikes: ['채식', '따뜻함', '이상함', '인기없음'],
    money: '400 ~ 600',
    foods: [
      '칠성장어 구이 + 벌꿀 (초반 전용)',
      '장어 튀김 + 선호속성 1개',
      '돼지고기 송어 구이',
    ],
    drinks: ['과일 하이볼', '과일 사와', '치'],
    quotes: [
      '성장기의 소녀에게 고기는 필수지~ (육류)',
      '고양이니까 물고기도 먹을 수 있어! (수산물)',
      '기름기 없으면 도대체 뭔 맛으로 먹어? (기름짐)',
      '달콤한 게 좋아! (단 맛)',
      '고기를 꽂아서 구운게 먹고 싶어! (구이류)',
    ],
    materials: ['벌꿀 (단 맛)'],
  },
  {
    name: '루미아',
    region: '요괴 짐승길',
    image: rumia,
    likes: ['육류', '배부름', '날 것', '시그니처', '이상함', '인기있음'],
    dislikes: ['술과 어울림', '고가', '인기없음'],
    money: '150 ~ 350',
    foods: [
      '칠성장어 구이 + 선호속성 1개 (덮밥류 해금 전)',
      '돈가스 덮밥',
      '소고기 덮밥',
      '장어 튀김 + 선호속성 1개',
    ],
    drinks: ['치'],
    quotes: [
      '고~기~ 고기~ 고기~ (육류)',
      '고기는 날로 먹어야 가장 신선한 건가-? (날 것)',
      '인류가 이상하다고 생각하는 건 나는 좋을지도~ (이상함)',
      '배가 부르지 않으면 싫어~ (배부름)',
      '스페셜리티라고 할 만한 요리가 있는건가? (시그니처)',
    ],
    materials: ['칠성장어 (시그니처)', '매미 허물 (이상함)', '계란 (날 것)'],
  },
  {
    name: '카미시라사와 케이네',
    region: '인간 마을',
    image: keine,
    likes: ['채식', '가정식', '담백함', '일식', '중식', '문화적', '인기있음'],
    dislikes: ['기름짐', '짠맛', '대량', '인기없음'],
    money: '400 ~ 800',
    foods: [
      '취두부 + 선호속성 1개 (극초반 밤참새 / 은행조림 해금 전 중식 전용)',
      '두부 된장국',
      '은행 조림',
    ],
    drinks: ['매실주', '과일 사와', '일월성', '치', '수달의 향연 (예산 주의)'],
    quotes: [
      '중화 요리에 깃든 역사는 무슨 맛일지 궁금하군요. (중식)',
      '일본 요리에는 어떤 역사가 담겨 있는지 아십니까? (일식)',
      '가끔씩 채식 요리를 먹어서 건강을 챙기는 게 좋습니다. (채식)',
      '요근래 담백한 요리가 땡기는군요... (담백함)',
      '간단한 가정식이 먹고 싶습니다. (가정식)',
      '역사와 문화는 서로 연결되어 있죠. (문화적)',
    ],
    materials: ['없음'],
  },
  {
    name: '히에다노 아큐',
    region: '인간 마을',
    image: akyuu,
    likes: ['고급', '담백함', '일식', '단 맛', '문화적', '국류', '인기있음'],
    dislikes: ['기름짐', '짠 맛', '따뜻함', '인기없음'],
    money: '500 ~ 800',
    foods: [
      '미역 된장국 + 선호속성 1개 (극초반 밤참새 전용)',
      '두부 된장국',
      '은행 조림',
      '백설',
    ],
    drinks: ['일월성', '참새의 술', '수달의 향연'],
    quotes: [
      '청담하게 먹는 것이 장수의 비결이라고 들었어요. (담백함)',
      '히에다 가는 대대로 일식을 즐겼지요. (일식)',
      '단 음식은 몸에 안 좋아요... 그, 그래도 한 번 쯤은 괜찮겠지요...? (단 맛)',
      '요리에도 식문화와 역사가 깃들어 있지요. 본질적으론 제가 하는 일이랑 다를 게 없답니다. (문화적)',
      '히에다 가의 당주에 걸맞는, 품격 있는 요리를 부탁드립니다. (고급)',
      '콜록콜록... 몸 상태가 별로인걸요. 목넘기기 편한 국물 요리가 있을까요? (국류)',
    ],
    materials: ['벌꿀 (단 맛)', '연어 (고급)'],
  },
  {
    name: '이바라키 카센',
    region: '인간 마을',
    image: kasen,
    likes: ['가정식', '술과 어울림', '일식', '문화적'],
    dislikes: ['날 것', '저가', '매움'],
    money: '400 ~ 600',
    foods: [
      '냉두부 (초반 한정)',
      '두부 된장국',
      '은행 조림 + 무 (백설 해금 전)',
      '백설',
    ],
    drinks: ['일월성', '겨울꿀술', '수달의 향연 (예산 주의)'],
    quotes: [
      '선인은 음식을 먹을 때 맛을 중요시하는 것이 아니라 그 뒤에 숨은 문화를 중요시합니다. (문화적)',
      '선인들은 일식을 좋아합니다. (일식)',
      '선인이라고 고급진 요리만 찾진 않습니다. 평범한 가정식을 먹을 때도 많습니다. (가정식)',
      '술을 마실 땐 그에 걸맞는 안주 요리가 필요합니다. (술과 어울림)',
    ],
    materials: ['무 (술과 어울림)'],
  },
  {
    name: '모리치카 린노스케',
    region: '인간 마을',
    image: rinnosuke,
    likes: ['가정식', '배부름', '신선함', '인기있음'],
    dislikes: ['이상함', '술과 어울림', '기름짐', '인기없음'],
    money: '250 ~ 400',
    foods: ['주먹밥 + 양파', '돈가스 덮밥 + 양파'],
    drinks: ['초 ZUN 맥주', '과일 사와'],
    quotes: [
      '가정식은 겉보기엔 간단해 보여도 사실 간단하진 않지. 나랑 비슷하군. (가정식)',
      '성인 남성에게 적당한 양의 요리를 내줬으면 좋겠군. (배부름)',
      '나는 이래보여도 미식가지. 입에 닿는 순간 감칠맛 나는 것을 바로 알아챌 수 있어. (신선함)',
    ],
    materials: ['해초 (신선함)', '양파 (신선함)'],
  },
  {
    name: '하쿠레이 레이무',
    region: '하쿠레이 신사',
    image: reimu,
    likes: ['고급', '배부름', '저가', '단 맛', '불가사의함', '인기있음'],
    dislikes: ['술과 어울림', '고가', '인기없음'],
    money: '150 ~ 300',
    foods: [
      '주먹밥 + 선호 속성 1개',
      '곰 발바닥 + 선호 속성 1개 (새우와 복숭아 샐러드 해금 전)',
      '새우와 복숭아 샐러드 + 선호 속성 1개',
    ],
    drinks: ['도수 낮음을 포함한 음료', '라무네', '우유', '자몽 주스', '매실주', '겨울꿀술', '옥로'],
    quotes: [
      '예전엔 설탕도 귀중품이었다곤 해. 요즘은 쉽게 구할 수 있어서 얼마나 다행인지 뭐야! (단 맛)',
      '배가 안 부르면 무슨 소용이야... (배부름)',
      '돈이 얼마 없어서 비싼 건 못 먹어! (저가)',
      '내 이명에 걸맞는 요리같은게 있을까? (불가사의함)',
      '돈은 얼마 없지만... 고급진 걸 한 번 먹어볼 수 있을까? (고급)',
    ],
    materials: ['벌꿀 (단 맛)', '연어 (고급)', '호박 (배부름)'],
  },
  {
    name: '이부키 스이카',
    region: '하쿠레이 신사',
    image: suika,
    likes: ['육류', '술과 어울림', '일식', '작음', '힘이 넘침', '인기있음'],
    dislikes: ['기름짐', '인기없음'],
    money: '600 ~ 800',
    foods: ['고깃국', '냉두부', '두부 전골 + 무', '앵화낙설'],
    drinks: ['텐구오도리'],
    quotes: [
      '마음껏 고기 뜯고 술 마시고 삼키는게 좋지! (육류)',
      '오니라면 역시 일식 아니겠어~ (일식)',
      '술 마시는 데 딱 적당한 게 있었으면 좋겠네~ (술과 어울림)',
      '오니의 힘 자랑은 어중간하지가 않다고! (힘이 넘침)',
      '나는 밀도를 조작해 엄청 많은 분신을 만들어낼 수 있지. 이런 능력에 걸맞는 요리를 줘~ (작음)',
    ],
    materials: ['무 (술과 어울림)'],
  },
  {
    name: '히나나위 텐시',
    region: '하쿠레이 신사',
    image: tenshi,
    likes: ['채식', '전설적', '담백함', '단 맛', '사진빨을 받음', '고가', '과일맛', '인기없음'],
    dislikes: ['가정식', '육류', '기름짐', '인기있음'],
    money: '2000 ~ 3000',
    foods: [
      '야채 샐러드 (초반 한정)',
      '케다마 용암두부 (초반 한정, 콜라보 활성화 한정)',
      '순무 조각꽃',
      '복숭아꽃 스프',
      '새우와 복숭아 샐러드',
      '우담화 떡',
    ],
    drinks: ['갓 파더', '아카츠키', '불쥐의 웃옷', '네그로니', '카제하후리'],
    quotes: [
      '고기 냄새 좀 안 나게 해! (채식)',
      '진한 맛? 그런건 서민들이나 먹는 거잖아! (담백함)',
      '단 걸 싫어하는 사람이 이 세상에 어디 있겠나! (단 맛)',
      '하등한 서민들이나 먹는 요리를 감히 이 천인님에게 내보이지는 않겠지? (사진빨을 받음)',
      '전설적인 요리를 줘. 아 참, 이런 조그만 포장마차엔 그런게 있을 리가 없겠지... (전설적)',
      '돈은 차고 넘쳐난다고. 이 가게에서 가장 비싼 걸 내와! (고가)',
      '신선한 과일을 내 오도록. 아, 이런 저급한 가게에 그런 게 있던가? (과일맛)',
    ],
    materials: ['복숭아 (과일맛)', '포도 (과일맛)', '벌꿀 (단 맛)', '은행 (사진빨을 받음, 초반 한정)'],
  },
  {
    name: '키리사메 마리사',
    region: '모든 지역',
    image: marisa,
    likes: ['전설적', '일식', '기름짐', '균류', '인기 있음', '따뜻함'],
    dislikes: ['인기 없음', '이상함'],
    money: '3000 ~ 5000',
    foods: [
      '버섯 구이 (인간 마을 이전)',
      '주먹밥 + 선호 속성 1~2개 (인간 마을 이전)',
      '고깃국 + 선호 속성 1~2개 (인간 마을 이전)',
      '장어튀김 + 선호 속성 1~2개 (인간 마을 이전)',
      '유부 (인간 마을 이후)',
      '버섯 구이 (인간 마을 이후)',
      '백설 + 선호속성 1개 이상',
      '용암',
      '극광 만두 튀김',
    ],
    drinks: ['과일 하이볼', '과일 사와', '치', '초 ZUN 맥주', '스칼렛 데블', '수달의 향연', '보름전야', '아카츠키'],
    quotes: [
      '버섯이라면 얼마든지 먹을 수 있다구! (균류)',
      '오래되면 오래될수록 귀중한 건 진리라구! (전설적)',
      '지금까지 내가 먹어온 빵의 갯수는 쉽게 셀 수 있지, 나는 일식파라구! (일식)',
      '기름기 없이 담백한 건 별로라구! (기름짐)',
      '스펠 카드를 쓸 때 미니 팔괘로에서 내는 열기는 언제나 흥분된다구! (따뜻함)',
    ],
    materials: ['버섯 (균류)', '송로버섯 (균류, 전설적)', '버터 (기름짐)'],
  },
  // ── 홍마관 ──
  {
    name: '홍 메이링',
    region: '홍마관',
    image: meiling,
    likes: ['육류', '배부름', '중식', '힘이 넘침'],
    dislikes: ['양식', '이상함', '과일맛', '인기없음'],
    money: '200 ~ 400',
    foods: [
      '고깃국 (힘이 넘침, 육류)',
      '돈가스 덮밥 / 소고기 덮밥 (육류, 배부름)',
      '고기 볶음 (육류, 중식)',
    ],
    drinks: [
      '커피 (상쾌함, 따뜻하게 마심) — 홍마관 홍차 획득 전, DLC1 전용',
      '홍마관 홍차 (상쾌함, 따뜻하게 마심)',
      '겨울꿀술 (클래식, 따뜻하게 마심)',
      '옥로 (클래식, 따뜻하게 마심)',
    ],
    quotes: [
      '고향을 떠나 타향살이를 하다보니, 고향의 맛이 그리워지네요. (중식)',
      '만화처럼 먹기만 해도 힘이 생기는 그런 음식이 있나요? (힘이 넘침)',
      '역시 고기 요리가 가장 안정적이죠~ (육류)',
      '배가 꽉 차지 않으면 일을 할 수가 없어요... (배부름)',
    ],
    materials: ['호박 (배부름)'],
  },
  {
    name: '치르노',
    region: '홍마관',
    image: cirno,
    likes: ['단 맛', '사진빨을 받음', '이상함', '시원함'],
    dislikes: ['술과 어울림', '문화적', '고가', '인기없음'],
    money: '100 ~ 200',
    foods: [
      '순무 조각꽃 (시원함, 사진빨을 받음)',
    ],
    drinks: [
      '과일 하이볼 (시원하게 마심, 과일향, 스위트함)',
      '과일 사와 (시원하게 마심, 과일향, 스위트함)',
    ],
    quotes: [
      '얼음 요정은 얼음을 먹는게 당연하잖아! (시원함)',
      '달콤한 걸 먹으면 기분이 좋아져~ (단 맛)',
      '이상해 보이는 건 먹고 싶지 않아! (사진빨을 받음)',
      '진정한 용사라면 이상한 거라도 먹어야 한다구! (이상함)',
    ],
    materials: ['벌꿀 (단 맛)', '매미 허물 (이상함)'],
  },
  {
    name: '파츄리 널릿지',
    region: '홍마관',
    image: pachuri,
    likes: ['고급', '단 맛', '사진빨을 받음', '몽환적', '양식'],
    dislikes: ['날 것', '따뜻함', '이상함', '짠 맛'],
    money: '600 ~ 1000',
    foods: [
      '무의식 요괴의 무스 (고급, 양식, 단 맛, 사진빨을 받음, 몽환적) — 콜라보 전용',
      '순무 조각꽃 + 크림 (단 맛, 양식) — DLC1 전용',
      '머핀 (양식, 단 맛)',
      '복숭아꽃 스프 (단 맛, 사진빨을 받음)',
      '우담화 떡 (고급, 단 맛, 사진빨을 받음, 몽환적)',
    ],
    drinks: [
      '치 (탄산, 칵테일)',
      '매실주 (리큐어)',
    ],
    quotes: [
      '당신 같은 새대가리가 식문화의 차이를 이해할 수 있을지 모르겠네. (양식)',
      '단 맛은 마음에 스며드는 맛이지. (단 맛)',
      '정갈하게 차려진 음식은 사진으로만 봐도 식욕을 불러일으키지. (사진빨을 받음)',
      '현실에 꿈만 같은 요리가 정말로 존재한다면 한 번 먹어보고 싶네. (몽환적)',
      '고등급 마법은 쓰기 위해선 수많은 연습과 높은 실력이 필요해. 요리도 똑같지 않아? (고급)',
    ],
    materials: ['벌꿀 (단 맛)', '연어 (고급)'],
  },
]

const FAVORITES_KEY = 'touhou-izakaya-favorites'

function App() {
  const [search, setSearch] = useState('')
  const [likeSearch, setLikeSearch] = useState('')
  const [dislikeSearch, setDislikeSearch] = useState('')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })
  const [showFavOnly, setShowFavOnly] = useState(false)

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]))
  }, [favorites])

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const toggleOpen = (name: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const filtered = useMemo(() => {
    const result = guests.filter((g) => {
      const commonText = [
        g.name,
        g.region,
        ...g.foods,
        ...g.drinks,
        ...g.quotes,
        ...g.materials,
      ].join(' ')

      const commonOk = search.trim() === '' || commonText.includes(search)
      const likeOk = likeSearch.trim() === '' || g.likes.some((v) => v.includes(likeSearch))
      const dislikeOk =
        dislikeSearch.trim() === '' || g.dislikes.some((v) => v.includes(dislikeSearch))
      const favOk = !showFavOnly || favorites.has(g.name)

      return commonOk && likeOk && dislikeOk && favOk
    })
    result.sort((a, b) => {
      const aFav = favorites.has(a.name) ? 0 : 1
      const bFav = favorites.has(b.name) ? 0 : 1
      return aFav - bFav
    })
    return result
  }, [search, likeSearch, dislikeSearch, showFavOnly, favorites])

  const regionClass = (value: string) => {
    if (value === '요괴 짐승길') return 'green'
    if (value === '인간 마을') return 'orange'
    if (value === '하쿠레이 신사') return 'red'
    if (value === '홍마관') return 'purple'
    return 'gray'
  }

  return (
    <div className="app">
      <img src={banner} className="banner" alt="Mystia Izakaya" />

      <h1>동방야작식당 희귀 손님 도감</h1>

      <div className="searchArea">
        <input
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="이름 / 지역 / 음식 / 주류 / 주문 대사 / 재료 검색"
        />
        <input
          className="search"
          value={likeSearch}
          onChange={(e) => setLikeSearch(e.target.value)}
          placeholder="선호 태그 검색"
        />
        <input
          className="search"
          value={dislikeSearch}
          onChange={(e) => setDislikeSearch(e.target.value)}
          placeholder="불호 태그 검색"
        />
      </div>

      <div className="favBar">
        <button
          className={`favFilter ${showFavOnly ? 'favFilterActive' : ''}`}
          onClick={() => setShowFavOnly((v) => !v)}
        >
          {showFavOnly ? '★ 즐겨찾기만 보는 중' : '☆ 즐겨찾기만 보기'}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">검색 결과가 없습니다.</div>
      ) : (
        <div className="grid">
          {filtered.map((guest) => {
            const isOpen = open.has(guest.name)
            const isFav = favorites.has(guest.name)

            return (
              <div className="card" key={guest.name}>
                <img src={guest.image} className="portrait" alt={guest.name} />

                <div className="info">
                  <div className="cardHeader">
                    <span className={`region ${regionClass(guest.region)}`}>{guest.region}</span>
                    <button
                      className={`favBtn ${isFav ? 'favBtnActive' : ''}`}
                      onClick={() => toggleFavorite(guest.name)}
                      title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                    >
                      {isFav ? '★' : '☆'}
                    </button>
                  </div>
                  <h2>{guest.name}</h2>

                  <button onClick={() => toggleOpen(guest.name)}>
                    {isOpen ? '접기' : '상세 보기'}
                  </button>

                  <div className={`detail ${isOpen ? 'detailOpen' : ''}`}>
                    <div className="detailInner">
                      <p><b>선호 태그</b></p>
                      <div className="tags">
                        {guest.likes.map((v) => (
                          <span className="tag like" key={v}>{v}</span>
                        ))}
                      </div>

                      <p><b>불호 태그</b></p>
                      <div className="tags">
                        {guest.dislikes.map((v) => (
                          <span className="tag hate" key={v}>{v}</span>
                        ))}
                      </div>

                      <p><b>소지금</b></p>
                      <div className="tags">
                        <span className="tag money">{guest.money}</span>
                      </div>

                      <p><b>추천 음식</b></p>
                      <ul className="detailList">
                        {guest.foods.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>

                      <p><b>추천 주류</b></p>
                      <ul className="detailList">
                        {guest.drinks.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>

                      <p><b>주문 대사</b></p>
                      <ul className="detailList">
                        {guest.quotes.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>

                      <p><b>추천 재료</b></p>
                      <ul className="detailList">
                        {guest.materials.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
