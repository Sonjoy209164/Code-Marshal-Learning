/* script.js
   Production-ready Keyboard Whack-a-Rabbit
   - responsive keyboard
   - pops/sec adjustable
   - combo, accuracy, timer
   - local leaderboard (localStorage)
   - keyboard + mouse support
   - sound via WebAudio
*/

/* -------------------------
   Config & DOM references
   ------------------------- */
const KEY_LAYOUT = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','='],
  ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
  ['Caps','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
  ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
  ['Space']
];

const keyboardRoot = document.getElementById('keyboard');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const speedRange = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');
const lengthInput = document.getElementById('length');

const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const accuracyEl = document.getElementById('accuracy');
const timerEl = document.getElementById('timer');

const modal = document.getElementById('modal');
const modalSummary = document.getElementById('modalSummary');
const playerNameInput = document.getElementById('playerName');
const saveScoreBtn = document.getElementById('saveScore');
const modalRestart = document.getElementById('modalRestart');
const modalClose = document.getElementById('modalClose');

const leaderboardList = document.getElementById('leaderboardList');
const clearLbBtn = document.getElementById('clearLb');

/* -------------------------
   Game state
   ------------------------- */
let keys = [];               // array of key DOM elements
let activeKey = null;        // currently popped key DOM
let lastKey = null;
let popInterval = null;      // interval id
let hideTimeout = null;      // hide timeout for current pop (if any)
let gameTimer = null;        // countdown
let gameRunning = false;
let paused = false;

let score = 0;
let hits = 0;
let misses = 0;
let combo = 0;
let bestCombo = 0;

let timeLeft = parseInt(lengthInput.value, 10) || 60;

/* -------------------------
   WebAudio helpers (simple SFX)
   ------------------------- */
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioCtx ? new AudioCtx() : null;

function playTone(type='sine', freq=800, dur=0.06, gain=0.12){
  if(!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g); g.connect(audioCtx.destination);
  o.start(); setTimeout(()=>{ o.stop(); }, dur*1000);
}

function playHit(){
  // happy quick rising blip
  playTone('triangle', 900 + Math.random()*120, 0.06, 0.12);
}
function playMiss(){
  // short low thud
  playTone('sine', 220, 0.10, 0.09);
}

/* -------------------------
   Build keyboard DOM
   ------------------------- */
function buildKeyboard(){
  keyboardRoot.innerHTML = '';
  keys = [];
  KEY_LAYOUT.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'krow';
    row.forEach(keyLabel => {
      const keyEl = document.createElement('div');
      keyEl.className = 'key';
      // special classes for visual size
      if(keyLabel === 'Tab' || keyLabel === 'Caps' || keyLabel === 'Enter' || keyLabel === 'Shift') keyEl.classList.add('k-wide');
      if(keyLabel === 'Space') keyEl.classList.add('k-space');

      // display label
      const display = keyLabel === 'Space' ? '␣' : (keyLabel.length === 1 ? keyLabel.toUpperCase() : keyLabel);
      keyEl.textContent = display;

      // data-key stores the real event.key we expect
      // normalize to lower-case single keys; special keys keep their names
      const dataKey = (keyLabel === 'Space') ? ' ' : (keyLabel.length === 1 ? keyLabel.toLowerCase() : keyLabel.toLowerCase());
      keyEl.dataset.key = dataKey;
      // mouse/touch support: allow clicking a key to "hit" it
      keyEl.addEventListener('pointerdown', (ev)=>{
        ev.preventDefault();
        handleKeyPress(dataKey);
        // small feedback
        keyEl.classList.add('pressed');
        setTimeout(()=>keyEl.classList.remove('pressed'), 80);
      });

      rowEl.appendChild(keyEl);
      keys.push(keyEl);
    });
    keyboardRoot.appendChild(rowEl);
  });
}

/* -------------------------
   Utility: random key (not same as last)
   ------------------------- */
function randomKeyElement(){
  if(keys.length === 0) return null;
  let idx;
  let attempts = 0;
  do {
    idx = Math.floor(Math.random() * keys.length);
    attempts++;
  } while(keys[idx] === lastKey && attempts < 10);
  return keys[idx];
}

/* -------------------------
   Pop logic
   ------------------------- */
function popRabbit(){
  if(!gameRunning || paused) return;
  // hide previous if still up (counts as a miss)
  if(activeKey){
    // if still active when new pop starts, count as missed
    if(activeKey.classList.contains('up')){
      registerMiss(activeKey);
      activeKey.classList.remove('up');
    }
    activeKey = null;
  }

  const keyEl = randomKeyElement();
  lastKey = keyEl;
  activeKey = keyEl;
  keyEl.classList.add('up');

  // hide after stayTime unless hit
  const stayTime = getStayTimeMs();
  hideTimeout = setTimeout(()=>{
    if(keyEl.classList.contains('up')){
      registerMiss(keyEl);
      keyEl.classList.remove('up');
      activeKey = null;
    }
  }, stayTime);
}

/* compute stay time in ms based on speed setting so higher speed -> shorter stay */
function getStayTimeMs(){
  // base stay 900ms at speed 2, scale inversely
  const popsPerSec = parseFloat(speedRange.value);
  // clamp
  const p = Math.max(1, Math.min(8, popsPerSec));
  // stay time decreases as pops increase; tuned curve:
  const ms = Math.round(1200 - (p * 120)); // between ~1080ms and 240ms
  return Math.max(220, ms);
}

/* -------------------------
   Scoring helpers
   ------------------------- */
function registerHit(keyEl){
  hits++;
  score += 10 + Math.floor(combo * 2);
  combo++;
  bestCombo = Math.max(bestCombo, combo);
  updateStatUI();
  keyEl.classList.remove('up');
  keyEl.classList.add('hit');
  setTimeout(()=>keyEl.classList.remove('hit'), 220);
  playHit();
}

function registerMiss(keyEl){
  misses++;
  combo = 0;
  updateStatUI();
  keyEl.classList.add('miss');
  setTimeout(()=>keyEl.classList.remove('miss'), 260);
  playMiss();
}

function updateStatUI(){
  scoreEl.textContent = score;
  comboEl.textContent = `x${Math.max(1, combo)}`;
  const total = hits + misses || 1;
  const acc = Math.round((hits / total) * 1000) / 10; // one decimal
  accuracyEl.textContent = `${isNaN(acc) ? 100 : acc}%`;
}

/* -------------------------
   Input handling (keyboard & programmatic)
   ------------------------- */
function handleKeyPress(keyValue){
  // keyValue is normalized to same convention as data-key
  // find matching DOM key
  const keyEl = keys.find(k => k.dataset.key === keyValue);
  if(!keyEl) return;

  // If the pressed key is the one currently with rabbit -> hit
  if(activeKey && keyEl === activeKey && keyEl.classList.contains('up')){
    // clear hide timeout for this pop
    clearTimeout(hideTimeout);
    registerHit(keyEl);
    activeKey = null;
  } else {
    // pressed wrong key
    registerMiss(keyEl);
  }
}

/* physical keyboard events */
window.addEventListener('keydown', (ev)=>{
  // allow repeated keydown but handle once visually
  const k = ev.key === ' ' ? ' ' : ev.key.length === 1 ? ev.key.toLowerCase() : ev.key.toLowerCase();
  handleKeyPress(k);
  // visual feedback
  const kEl = keys.find(x=>x.dataset.key === k);
  if(kEl){
    kEl.classList.add('pressed');
  }
});
window.addEventListener('keyup', (ev)=>{
  const k = ev.key === ' ' ? ' ' : ev.key.length === 1 ? ev.key.toLowerCase() : ev.key.toLowerCase();
  const kEl = keys.find(x=>x.dataset.key === k);
  if(kEl) kEl.classList.remove('pressed');
});

/* -------------------------
   Game lifecycle: start/pause/restart/tick
   ------------------------- */
function startGame(){
  if(gameRunning && !paused) return;
  // resume if paused
  if(gameRunning && paused){
    paused = false;
    startPopInterval();
    startTimer();
    return;
  }

  // fresh start
  resetGameState();
  gameRunning = true;
  paused = false;

  // compute interval between pops (ms)
  startPopInterval();
  startTimer();

  // disable start while running
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  restartBtn.disabled = false;
}

function pauseGame(){
  if(!gameRunning) return;
  paused = !paused;
  if(paused){
    stopPopInterval();
    stopTimer();
    pauseBtn.textContent = 'Resume';
  } else {
    startPopInterval();
    startTimer();
    pauseBtn.textContent = 'Pause';
  }
}

function restartGame(){
  // stop everything, reset UI and state
  stopPopInterval();
  stopTimer();
  resetGameState();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  restartBtn.disabled = true;
  gameRunning = false;
  paused = false;
  // clear any active visual
  if(activeKey){ activeKey.classList.remove('up'); activeKey = null; }
}

function resetGameState(){
  score = 0; hits = 0; misses = 0; combo = 0; bestCombo = 0;
  timeLeft = parseInt(lengthInput.value, 10) || 60;
  updateStatUI();
  timerEl.textContent = `${timeLeft}s`;
}

/* pop interval management */
function startPopInterval(){
  stopPopInterval();
  const pops = parseFloat(speedRange.value) || 3;
  // we want pops times per second -> interval ms
  const intervalMs = Math.max(120, Math.round(1000 / pops));
  popInterval = setInterval(popRabbit, intervalMs);
  // pop once immediately
  popRabbit();
}
function stopPopInterval(){ if(popInterval) { clearInterval(popInterval); popInterval = null; } }

/* timer management */
function startTimer(){
  stopTimer();
  timerEl.textContent = `${timeLeft}s`;
  gameTimer = setInterval(()=>{
    if(paused) return;
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;
    if(timeLeft <= 0){
      endGame();
    }
  }, 1000);
}
function stopTimer(){ if(gameTimer){ clearInterval(gameTimer); gameTimer = null; } }

/* end of round */
function endGame(){
  stopPopInterval();
  stopTimer();
  gameRunning = false;
  paused = false;

  // hide active pop without counting miss (round finished)
  if(activeKey) activeKey.classList.remove('up');
  activeKey = null;

  // show modal summary
  const total = hits + misses || 1;
  const acc = Math.round((hits / total) * 1000) / 10;
  modalSummary.textContent = `Score: ${score} · Hits: ${hits} · Misses: ${misses} · Accuracy: ${isNaN(acc) ? 100 : acc}% · Best combo: x${bestCombo}`;
  showModal();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

/* -------------------------
   Modal & leaderboard (localStorage)
   ------------------------- */
function showModal(){ modal.classList.remove('hidden'); }
function hideModal(){ modal.classList.add('hidden'); }

function loadLeaderboard(){
  const raw = localStorage.getItem('whackRabbitLeaderboard');
  const arr = raw ? JSON.parse(raw) : [];
  // sort descending
  arr.sort((a,b) => b.score - a.score);
  // show top 8
  leaderboardList.innerHTML = '';
  arr.slice(0,8).forEach(entry=>{
    const li = document.createElement('li');
    li.textContent = `${entry.name} — ${entry.score} (acc ${entry.accuracy}%)`;
    leaderboardList.appendChild(li);
  });
}

function saveScoreToLeaderboard(name){
  if(!name) return;
  const raw = localStorage.getItem('whackRabbitLeaderboard');
  const arr = raw ? JSON.parse(raw) : [];
  const total = hits + misses || 1;
  const acc = Math.round((hits / total) * 1000) / 10;
  arr.push({ name, score, accuracy: acc, date: Date.now() });
  localStorage.setItem('whackRabbitLeaderboard', JSON.stringify(arr));
  loadLeaderboard();
}

/* -------------------------
   Wrong/hit helpers triggered by input
   ------------------------- */
function handleKeyPressEvent(keyVal){
  // wrapper to call from UI or keyboard
  handleKeyPress(keyVal);
}

/* -------------------------
   UI wiring & event listeners
   ------------------------- */
startBtn.addEventListener('click', ()=> {
  // resume audio context if necessary (user interaction requirement on some browsers)
  if(audioCtx && audioCtx.state === 'suspended'){ audioCtx.resume(); }
  startGame();
});

pauseBtn.addEventListener('click', ()=> {
  pauseGame();
});

restartBtn.addEventListener('click', ()=> {
  restartGame();
});

speedRange.addEventListener('input', ()=>{
  speedVal.textContent = speedRange.value;
  // if running, restart interval with new speed
  if(gameRunning && !paused){ startPopInterval(); }
});

lengthInput.addEventListener('input', ()=>{
  // change remaining time only if not running
  if(!gameRunning){ timerEl.textContent = `${lengthInput.value}s`; }
});

modalClose.addEventListener('click', ()=> { hideModal(); });
modalRestart.addEventListener('click', ()=> {
  hideModal();
  restartGame();
  startGame();
});

saveScoreBtn.addEventListener('click', ()=>{
  const name = (playerNameInput.value || 'Player').substring(0,18);
  saveScoreToLeaderboard(name);
  playerNameInput.value = '';
});

clearLbBtn.addEventListener('click', ()=>{
  localStorage.removeItem('whackRabbitLeaderboard');
  loadLeaderboard();
});

/* keyboard build & initial UI */
buildKeyboard();
loadLeaderboard();
updateStatUI();
speedVal.textContent = speedRange.value;
timerEl.textContent = `${lengthInput.value}s`;
pauseBtn.disabled = true;
restartBtn.disabled = true;

/* small helper to prevent accidental text selection on double tap */
document.addEventListener('selectstart', e => {
  if (e.target.closest('.keyboard')) e.preventDefault();
});
