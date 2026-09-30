/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


var EMOJIS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍑'];
var cards = [];
var flipped = [];
var matched = 0;
var moves = 0;
var locked = false;
var board = document.getElementById('board');
var movesEl = document.getElementById('moves');
var pairsEl = document.getElementById('pairs');
var winMessage = document.getElementById('win-message');
var finalMoves = document.getElementById('final-moves');
function shuffle(array) {
  var arr = _toConsumableArray(array);
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
  return arr;
}
function createBoard() {
  board.innerHTML = '';
  cards = shuffle([].concat(EMOJIS, EMOJIS));
  flipped = [];
  matched = 0;
  moves = 0;
  locked = false;
  movesEl.textContent = '0';
  pairsEl.textContent = '0';
  winMessage.classList.add('hidden');
  cards.forEach(function (emoji, index) {
    var card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    var front = document.createElement('div');
    front.className = 'memory-card-front';
    front.textContent = '?';
    var back = document.createElement('div');
    back.className = 'memory-card-back';
    back.textContent = emoji;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', function () {
      return flipCard(card);
    });
    board.appendChild(card);
  });
}
function flipCard(card) {
  if (locked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flipped.length === 2) return;
  card.classList.add('flipped');
  flipped.push(card);
  if (flipped.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}
function checkMatch() {
  locked = true;
  var _flipped = flipped,
    _flipped2 = _slicedToArray(_flipped, 2),
    a = _flipped2[0],
    b = _flipped2[1];
  if (a.dataset.emoji === b.dataset.emoji) {
    a.classList.add('matched');
    b.classList.add('matched');
    matched++;
    pairsEl.textContent = matched;
    flipped = [];
    locked = false;
    if (matched === EMOJIS.length) {
      finalMoves.textContent = moves;
      winMessage.classList.remove('hidden');
    }
  } else {
    setTimeout(function () {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      flipped = [];
      locked = false;
    }, 700);
  }
}
document.getElementById('restart').addEventListener('click', createBoard);
document.getElementById('play-again').addEventListener('click', createBoard);
createBoard();
/******/ })()
;