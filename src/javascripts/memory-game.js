import '../stylesheets/style.css'
import '../stylesheets/memory-game.css'

const EMOJIS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍑']

let cards = []
let flipped = []
let matched = 0
let moves = 0
let locked = false

const board = document.getElementById('board')
const movesEl = document.getElementById('moves')
const pairsEl = document.getElementById('pairs')
const winMessage = document.getElementById('win-message')
const finalMoves = document.getElementById('final-moves')

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createBoard() {
  board.innerHTML = ''
  cards = shuffle([...EMOJIS, ...EMOJIS])
  flipped = []
  matched = 0
  moves = 0
  locked = false
  movesEl.textContent = '0'
  pairsEl.textContent = '0'
  winMessage.classList.add('hidden')

  cards.forEach((emoji, index) => {
    const card = document.createElement('div')
    card.className = 'memory-card'
    card.dataset.index = index
    card.dataset.emoji = emoji

    const front = document.createElement('div')
    front.className = 'memory-card-front'
    front.textContent = '?'

    const back = document.createElement('div')
    back.className = 'memory-card-back'
    back.textContent = emoji

    card.appendChild(front)
    card.appendChild(back)
    card.addEventListener('click', () => flipCard(card))
    board.appendChild(card)
  })
}

function flipCard(card) {
  if (locked) return
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return
  if (flipped.length === 2) return

  card.classList.add('flipped')
  flipped.push(card)

  if (flipped.length === 2) {
    moves++
    movesEl.textContent = moves
    checkMatch()
  }
}

function checkMatch() {
  locked = true
  const [a, b] = flipped

  if (a.dataset.emoji === b.dataset.emoji) {
    a.classList.add('matched')
    b.classList.add('matched')
    matched++
    pairsEl.textContent = matched
    flipped = []
    locked = false

    if (matched === EMOJIS.length) {
      finalMoves.textContent = moves
      winMessage.classList.remove('hidden')
    }
  } else {
    setTimeout(() => {
      a.classList.remove('flipped')
      b.classList.remove('flipped')
      flipped = []
      locked = false
    }, 700)
  }
}

document.getElementById('restart').addEventListener('click', createBoard)
document.getElementById('play-again').addEventListener('click', createBoard)

createBoard()