import { useMemo, useState, useEffect } from 'react'
import './App.css'

import banner from './assets/Mystia-izakaya.webp'
import { guests } from './data/guests'
import GuestCard from './components/GuestCard'

const FAVORITES_KEY = 'touhou-izakaya-favorites'

function App() {
  const [search, setSearch] = useState('')
  const [likeSearch, setLikeSearch] = useState('')
  const [dislikeSearch, setDislikeSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [debouncedLike, setDebouncedLike] = useState('')
  const [debouncedDislike, setDebouncedDislike] = useState('')
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
  const [regionFilter, setRegionFilter] = useState('전체')

  const regions = ['전체', '요괴 짐승길', '인간 마을', '하쿠레이 신사', '홍마관', '미혹의 죽림', '모든 지역']

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedLike(likeSearch), 300)
    return () => clearTimeout(timer)
  }, [likeSearch])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedDislike(dislikeSearch), 300)
    return () => clearTimeout(timer)
  }, [dislikeSearch])

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

  const normalize = (str: string) => str.replace(/\s/g, '').toLowerCase()

  const filtered = useMemo(() => {
    const result = guests.filter((g) => {
      const commonText = normalize([
        g.name,
        g.region,
        ...g.foods,
        ...g.drinks,
        ...g.quotes,
        ...g.materials,
      ].join(' '))

      const normalizedSearch = normalize(debouncedSearch)
      const normalizedLike = normalize(debouncedLike)
      const normalizedDislike = normalize(debouncedDislike)

      const commonOk = normalizedSearch === '' || commonText.includes(normalizedSearch)
      const likeOk = normalizedLike === '' || g.likes.some((v) => normalize(v).includes(normalizedLike))
      const dislikeOk = normalizedDislike === '' || g.dislikes.some((v) => normalize(v).includes(normalizedDislike))
      const regionOk = regionFilter === '전체' || g.region === regionFilter
      const favOk = !showFavOnly || favorites.has(g.name)

      return commonOk && likeOk && dislikeOk && regionOk && favOk
    })
    result.sort((a, b) => {
      const aFav = favorites.has(a.name) ? 0 : 1
      const bFav = favorites.has(b.name) ? 0 : 1
      return aFav - bFav
    })
    return result
  }, [debouncedSearch, debouncedLike, debouncedDislike, regionFilter, showFavOnly, favorites])

  const regionClass = (value: string) => {
    if (value === '요괴 짐승길') return 'yellow'
    if (value === '인간 마을') return 'orange'
    if (value === '하쿠레이 신사') return 'red'
    if (value === '홍마관') return 'purple'
    if (value === '미혹의 죽림') return 'green'
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

      <div className="regionBar">
        {regions.map((r) => (
          <button
            key={r}
            className={`regionBtn ${regionClass(r)} ${regionFilter === r ? 'regionBtnActive' : ''}`}
            onClick={() => setRegionFilter(r)}
          >
            {r}
          </button>
        ))}
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
          {filtered.map((guest) => (
            <GuestCard
              key={guest.name}
              guest={guest}
              isOpen={open.has(guest.name)}
              isFav={favorites.has(guest.name)}
              onToggleOpen={toggleOpen}
              onToggleFav={toggleFavorite}
              regionClass={regionClass}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
