import React, { useState } from 'react'

const EMOJIS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍑']

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createCards() {
  return shuffle([...EMOJIS, ...EMOJIS]).map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }))
}

function App() {
  const [cards, setCards] = useState(createCards)
  const [flippedIds, setFlippedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const matchedCount = cards.filter((c) => c.matched).length / 2
  const isWin = matchedCount === EMOJIS.length

  function restart() {
    setCards(createCards())
    setFlippedIds([])
    setMoves(0)
    setLocked(false)
  }

  function handleCardClick(id) {
    if (locked) return
    const card = cards.find((c) => c.id === id)
    if (!card || card.flipped || card.matched) return
    if (flippedIds.length === 2) return

    const newFlipped = [...flippedIds, id]
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    )
    setFlippedIds(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)
      setLocked(true)

      const [firstId, secondId] = newFlipped
      const first = cards.find((c) => c.id === firstId)
      const second = cards.find((c) => c.id === id)

      if (first && second && first.emoji === second.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, matched: true, flipped: true }
              : c
          )
        )
        setFlippedIds([])
        setLocked(false)
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, flipped: false }
                : c
            )
          )
          setFlippedIds([])
          setLocked(false)
        }, 700)
      }
    }
  }

  return (
    <div className="memory-container">
      <h1 className="memory-title">Игра «Память» (React)</h1>
      <div className="memory-info">
        <span>
          Ходы: <strong>{moves}</strong>
        </span>
        <span>
          Пары: <strong>{matchedCount}</strong> / {EMOJIS.length}
        </span>
        <button className="memory-btn" onClick={restart}>
          Заново
        </button>
      </div>

      <div className="memory-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card${card.flipped || card.matched ? ' flipped' : ''}${card.matched ? ' matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="memory-card-front">?</div>
            <div className="memory-card-back">{card.emoji}</div>
          </div>
        ))}
      </div>

      {isWin && (
        <div className="memory-win">
          <p>Победа! 🎉</p>
          <p>
            Ходов: <span>{moves}</span>
          </p>
          <button className="memory-btn" onClick={restart}>
            Играть снова
          </button>
        </div>
      )}
    </div>
  )
}

export default App