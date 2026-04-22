import type { Guest } from '../types/guest'

type Props = {
  guest: Guest
  isOpen: boolean
  isFav: boolean
  onToggleOpen: (name: string) => void
  onToggleFav: (name: string) => void
  regionClass: (region: string) => string
}

export default function GuestCard({
  guest,
  isOpen,
  isFav,
  onToggleOpen,
  onToggleFav,
  regionClass,
}: Props) {
  return (
    <div className="card">
      <img
        src={guest.image}
        className="portrait"
        alt={guest.name}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/fallback.png'
        }}
      />

      <div className="info">
        <div className="cardHeader">
          <span className={`region ${regionClass(guest.region)}`}>{guest.region}</span>
          <button
            className={`favBtn ${isFav ? 'favBtnActive' : ''}`}
            onClick={() => onToggleFav(guest.name)}
            title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          >
            {isFav ? '★' : '☆'}
          </button>
        </div>

        <h2>{guest.name}</h2>

        <button onClick={() => onToggleOpen(guest.name)}>
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
}
