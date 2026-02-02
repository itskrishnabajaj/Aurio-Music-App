// ============================================
// AURIO MUSIC APP - PREMIUM EXPERIENCE
// Production-ready, bug-free, Spotify-level quality
// ============================================

console.log('🎵 Aurio app.js loaded');
console.log('🔥 Firebase available:', typeof firebase !== 'undefined');
console.log('🔑 Auth available:', typeof auth !== 'undefined');
console.log('💾 DB available:', typeof db !== 'undefined');

// === GLOBAL STATE ===
const state = {
  currentUser: null,
  currentTrack: null,
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeat: 'off', // 'off', 'all', 'one'
  songs: [],
  playlists: [],
  likedSongs: [],
  recentSongs: [],
  categories: [
    { name: 'Pop', color: '#ff6bcb', emoji: '🎵' },
    { name: 'Rock', color: '#ff4757', emoji: '🎸' },
    { name: 'Hip Hop', color: '#ffd93d', emoji: '🎤' },
    { name: 'Electronic', color: '#7ee787', emoji: '🎧' },
    { name: 'Jazz', color: '#70a1ff', emoji: '🎷' },
    { name: 'Classical', color: '#dfe4ea', emoji: '🎹' },
    { name: 'Indie', color: '#ff6348', emoji: '🌟' },
    { name: 'R&B', color: '#c44569', emoji: '💿' }
  ]
};

// === DOM ELEMENTS ===
// Screens
const splashScreen = document.getElementById('splash-screen');
const loginScreen = document.getElementById('login-screen');
const app = document.getElementById('app');

// Audio
const audioPlayer = document.getElementById('audio-player');

// Login
const loginSubmit = document.getElementById('login-submit');
const googleLogin = document.getElementById('google-login');
const loginError = document.getElementById('login-error');

// Views
const views = {
  home: document.getElementById('view-home'),
  search: document.getElementById('view-search'),
  library: document.getElementById('view-library')
};

// Navigation
const navBtns = document.querySelectorAll('.nav-btn');

// Mini Player
const miniPlayer = document.getElementById('mini-player');
const miniPlayBtn = document.getElementById('mini-play-btn');
const miniLikeBtn = document.getElementById('mini-like-btn');

// Full Player
const fullPlayer = document.getElementById('full-player');
const playerMinimize = document.getElementById('player-minimize');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const likeBtn = document.getElementById('like-btn');
const seekBar = document.getElementById('seek-bar');

// Search
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');

// ============================================
// 1. INITIALIZATION
// ============================================

// Hide splash screen after load
window.addEventListener('load', () => {
  setTimeout(() => {
    splashScreen.style.display = 'none';
  }, 2000);
});

// ============================================
// 2. AUTHENTICATION
// ============================================

loginSubmit.addEventListener('click', async () => {
  const email = document.getElementById('user-email').value.trim();
  const password = document.getElementById('user-password').value;

  if (!email || !password) {
    showLoginError('Please enter email and password');
    return;
  }

  loginSubmit.disabled = true;
  loginSubmit.innerHTML = '<span>Signing in...</span>';
  loginError.textContent = '';

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Login error:', error);
    showLoginError(getAuthError(error.code));
    loginSubmit.disabled = false;
    loginSubmit.innerHTML = '<span>Sign In</span><svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  }
});

googleLogin.addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    showLoginError(getAuthError(error.code));
  }
});

function showLoginError(msg) {
  loginError.textContent = msg;
}

function getAuthError(code) {
  const errors = {
    'auth/invalid-email': 'Invalid email',
    'auth/user-not-found': 'No account found',
    'auth/wrong-password': 'Wrong password',
    'auth/invalid-credential': 'Invalid credentials',
    'auth/too-many-requests': 'Too many attempts'
  };
  return errors[code] || 'Login failed';
}

// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    state.currentUser = user;
    loginScreen.classList.add('hidden');
    app.classList.remove('hidden');
    initializeApp();
  } else {
    loginScreen.classList.remove('hidden');
    app.classList.add('hidden');
  }
});

// ============================================
// 3. APP INITIALIZATION
// ============================================

async function initializeApp() {
  updateGreeting();
  await loadSongs();
  await loadUserData();
  generateAIPlaylists();
  renderHome();
  renderCategories();
  setupMediaSession();
  registerServiceWorker();
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good Evening';
  if (hour < 12) greeting = 'Good Morning';
  else if (hour < 18) greeting = 'Good Afternoon';
  document.getElementById('greeting').textContent = greeting;
}

async function loadSongs() {
  try {
    const snapshot = await db.collection('songs').orderBy('title').get();
    state.songs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Load songs error:', error);
  }
}

async function loadUserData() {
  try {
    const userDoc = await db.collection('users').doc(state.currentUser.uid).get();
    if (userDoc.exists) {
      const data = userDoc.data();
      state.likedSongs = data.likedSongs || [];
      state.recentSongs = data.recentSongs || [];
    } else {
      await db.collection('users').doc(state.currentUser.uid).set({
        email: state.currentUser.email,
        likedSongs: [],
        recentSongs: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Load user error:', error);
  }
}

// ============================================
// 4. AI PLAYLISTS GENERATION
// ============================================

function generateAIPlaylists() {
  const hour = new Date().getHours();
  state.playlists = [];

  // Time-based
  let timePlaylist = {
    id: 'time-based',
    name: 'For You',
    description: 'Your personalized mix',
    artwork: createGradient('#7ee787', '#ffd93d'),
    songs: []
  };

  if (hour >= 5 && hour < 12) {
    timePlaylist.name = 'Morning Energy';
    timePlaylist.songs = state.songs.filter(s => s.mood === 'upbeat' || s.mood === 'energetic').slice(0, 25);
  } else if (hour >= 12 && hour < 18) {
    timePlaylist.name = 'Afternoon Vibes';
    timePlaylist.songs = state.songs.filter(s => s.genre === 'pop' || s.genre === 'indie').slice(0, 25);
  } else {
    timePlaylist.name = 'Night Mix';
    timePlaylist.songs = state.songs.filter(s => s.mood === 'chill' || s.mood === 'ambient').slice(0, 25);
  }

  // Top tracks
  const topTracks = {
    id: 'top-tracks',
    name: 'On Repeat',
    description: 'Your most played',
    artwork: createGradient('#ff6bcb', '#c44569'),
    songs: [...state.songs].sort((a, b) => (b.playCount || 0) - (a.playCount || 0)).slice(0, 20)
  };

  // Fresh finds
  const freshFinds = {
    id: 'fresh-finds',
    name: 'Fresh Finds',
    description: 'New additions',
    artwork: createGradient('#70a1ff', '#7ee787'),
    songs: [...state.songs].sort((a, b) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    }).slice(0, 20)
  };

  // Liked songs
  if (state.likedSongs.length > 0) {
    state.playlists.push({
      id: 'liked-songs',
      name: 'Liked Songs',
      description: `${state.likedSongs.length} songs`,
      artwork: createGradient('#ff6bcb', '#ffd93d'),
      songs: state.songs.filter(s => state.likedSongs.includes(s.id))
    });
  }

  state.playlists.push(timePlaylist, topTracks, freshFinds);
}

function createGradient(color1, color2) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 300, 300);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 300);
  return canvas.toDataURL();
}

// ============================================
// 5. HOME VIEW RENDERING
// ============================================

function renderHome() {
  // Quick playlists
  const quickContainer = document.getElementById('quick-playlists');
  quickContainer.innerHTML = state.playlists.slice(0, 4).map(p => `
    <div class="quick-playlist" onclick="openPlaylist('${p.id}')">
      <img src="${p.artwork || (p.songs[0]?.artwork || '')}" class="quick-playlist-img" alt="${p.name}">
      <div class="quick-playlist-name">${p.name}</div>
    </div>
  `).join('');

  // AI playlists
  const aiContainer = document.getElementById('ai-playlists');
  aiContainer.innerHTML = state.playlists.map(p => `
    <div class="playlist-card" onclick="openPlaylist('${p.id}')">
      <img src="${p.artwork || (p.songs[0]?.artwork || '')}" class="playlist-card-img" alt="${p.name}">
      <div class="playlist-card-name">${p.name}</div>
      <div class="playlist-card-desc">${p.description}</div>
    </div>
  `).join('');

  // Recent songs
  const recentContainer = document.getElementById('recent-songs');
  const recentSongs = state.recentSongs.slice(0, 10).map(id => state.songs.find(s => s.id === id)).filter(Boolean);
  recentContainer.innerHTML = recentSongs.map(s => `
    <div class="song-card-horizontal" onclick="playSongById('${s.id}')">
      <img src="${s.artwork}" alt="${s.title}">
      <div class="song-card-horizontal-title">${s.title}</div>
      <div class="song-card-horizontal-artist">${s.artist}</div>
    </div>
  `).join('');
}

function openPlaylist(id) {
  const playlist = state.playlists.find(p => p.id === id);
  if (playlist && playlist.songs.length > 0) {
    state.queue = [...playlist.songs];
    if (state.shuffle) shuffleQueue();
    state.queueIndex = 0;
    loadTrack(state.queue[0]);
  }
}

window.openPlaylist = openPlaylist;

// ============================================
// 6. SEARCH
// ============================================

function renderCategories() {
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = state.categories.map((cat, i) => `
    <div class="category-card" style="background: linear-gradient(135deg, ${cat.color} 0%, ${adjustColor(cat.color, -30)} 100%);" onclick="searchCategory('${cat.name}')">
      <h3>${cat.emoji} ${cat.name}</h3>
    </div>
  `).join('');
}

function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  
  if (query) {
    searchClear.classList.remove('hidden');
    document.getElementById('browse-categories').classList.add('hidden');
    document.getElementById('search-results').classList.remove('hidden');
    performSearch(query);
  } else {
    searchClear.classList.add('hidden');
    document.getElementById('browse-categories').classList.remove('hidden');
    document.getElementById('search-results').classList.add('hidden');
  }
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.dispatchEvent(new Event('input'));
});

function performSearch(query) {
  const q = query.toLowerCase();
  const results = state.songs.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.album.toLowerCase().includes(q) ||
    s.genre.toLowerCase().includes(q)
  ).slice(0, 20);

  document.getElementById('results-songs').innerHTML = results.length > 0 ? results.map(s => `
    <div class="result-item" onclick="playSongById('${s.id}')">
      <img src="${s.artwork}" class="result-artwork" alt="${s.title}">
      <div class="result-info">
        <div class="result-title">${s.title}</div>
        <div class="result-artist">${s.artist}</div>
      </div>
    </div>
  `).join('') : '<p style="color: var(--text-secondary); padding: 20px;">No songs found</p>';
}

function searchCategory(category) {
  searchInput.value = category;
  searchInput.dispatchEvent(new Event('input'));
}

window.searchCategory = searchCategory;

// ============================================
// 7. LIBRARY
// ============================================

const libraryTabs = document.querySelectorAll('.library-tab');
const libraryContent = document.getElementById('library-content');
let activeLibraryTab = 'playlists';

libraryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    activeLibraryTab = tab.dataset.tab;
    libraryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderLibrary();
  });
});

function renderLibrary() {
  if (activeLibraryTab === 'playlists') {
    libraryContent.innerHTML = state.playlists.map(p => `
      <div class="library-item" onclick="openPlaylist('${p.id}')">
        <img src="${p.artwork || (p.songs[0]?.artwork || '')}" class="library-item-img" alt="${p.name}">
        <div class="library-item-info">
          <div class="library-item-name">${p.name}</div>
          <div class="library-item-meta">${p.songs.length} songs</div>
        </div>
      </div>
    `).join('');
  } else if (activeLibraryTab === 'songs') {
    libraryContent.innerHTML = state.songs.map(s => `
      <div class="library-item" onclick="playSongById('${s.id}')">
        <img src="${s.artwork}" class="library-item-img" alt="${s.title}">
        <div class="library-item-info">
          <div class="library-item-name">${s.title}</div>
          <div class="library-item-meta">${s.artist} • ${s.album}</div>
        </div>
      </div>
    `).join('');
  } else if (activeLibraryTab === 'liked') {
    const liked = state.songs.filter(s => state.likedSongs.includes(s.id));
    libraryContent.innerHTML = liked.length > 0 ? liked.map(s => `
      <div class="library-item" onclick="playSongById('${s.id}')">
        <img src="${s.artwork}" class="library-item-img" alt="${s.title}">
        <div class="library-item-info">
          <div class="library-item-name">${s.title}</div>
          <div class="library-item-meta">${s.artist} • ${s.album}</div>
        </div>
      </div>
    `).join('') : '<p style="color: var(--text-secondary); padding: 40px 20px; text-align: center;">No liked songs yet<br><small>Heart songs to see them here</small></p>';
  }
}

// ============================================
// 8. AUDIO ENGINE
// ============================================

function playSongById(id) {
  const song = state.songs.find(s => s.id === id);
  if (song) {
    state.queue = [song];
    state.queueIndex = 0;
    loadTrack(song);
  }
}

window.playSongById = playSongById;

function loadTrack(track) {
  if (!track || !track.audioURL) return;
  
  state.currentTrack = track;
  audioPlayer.src = track.audioURL;
  
  updateAllPlayerUI(track);
  updateMediaSession(track);
  
  play();
  preloadNext();
  addToRecent(track.id);
  incrementPlayCount(track.id);
}

function play() {
  audioPlayer.play().then(() => {
    state.isPlaying = true;
    updatePlayButtons();
    miniPlayer.classList.remove('hidden');
  }).catch(err => console.error('Play error:', err));
}

function pause() {
  audioPlayer.pause();
  state.isPlaying = false;
  updatePlayButtons();
}

function playNext() {
  if (state.repeat === 'one') {
    audioPlayer.currentTime = 0;
    play();
    return;
  }

  state.queueIndex++;
  if (state.queueIndex >= state.queue.length) {
    if (state.repeat === 'all') {
      state.queueIndex = 0;
    } else {
      pause();
      return;
    }
  }

  loadTrack(state.queue[state.queueIndex]);
}

function playPrevious() {
  if (audioPlayer.currentTime > 3) {
    audioPlayer.currentTime = 0;
    return;
  }

  state.queueIndex--;
  if (state.queueIndex < 0) {
    state.queueIndex = state.repeat === 'all' ? state.queue.length - 1 : 0;
  }

  loadTrack(state.queue[state.queueIndex]);
}

function preloadNext() {
  const nextIdx = state.queueIndex + 1;
  if (nextIdx < state.queue.length) {
    const next = state.queue[nextIdx];
    const preload = new Audio(next.audioURL);
    preload.preload = 'auto';
  }
}

async function addToRecent(id) {
  if (state.recentSongs[0] === id) return;
  state.recentSongs = [id, ...state.recentSongs.filter(i => i !== id)].slice(0, 20);
  
  try {
    await db.collection('users').doc(state.currentUser.uid).update({
      recentSongs: state.recentSongs
    });
  } catch (err) {
    console.error('Add recent error:', err);
  }
}

async function incrementPlayCount(id) {
  try {
    await db.collection('songs').doc(id).update({
      playCount: firebase.firestore.FieldValue.increment(1)
    });
  } catch (err) {
    console.error('Play count error:', err);
  }
}

// Audio events
audioPlayer.addEventListener('ended', playNext);

audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
  seekBar.value = progress;
  document.getElementById('mini-progress').style.width = progress + '%';
  document.getElementById('current-time').textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener('loadedmetadata', () => {
  document.getElementById('total-time').textContent = formatTime(audioPlayer.duration);
});

seekBar.addEventListener('input', (e) => {
  const time = (e.target.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = time;
});

// ============================================
// 9. PLAYER UI
// ============================================

function updateAllPlayerUI(track) {
  // Mini player
  document.getElementById('mini-artwork').src = track.artwork;
  document.getElementById('mini-title').textContent = track.title;
  document.getElementById('mini-artist').textContent = track.artist;

  // Full player
  document.getElementById('player-artwork').src = track.artwork;
  document.getElementById('player-title').textContent = track.title;
  document.getElementById('player-artist').textContent = track.artist;
  document.getElementById('player-title-small').textContent = track.title;

  // Update like buttons
  const isLiked = state.likedSongs.includes(track.id);
  if (isLiked) {
    likeBtn.classList.add('active');
    miniLikeBtn.classList.add('active');
  } else {
    likeBtn.classList.remove('active');
    miniLikeBtn.classList.remove('active');
  }
}

function updatePlayButtons() {
  const playIcons = document.querySelectorAll('.play-icon, .play-icon-main');
  const pauseIcons = document.querySelectorAll('.pause-icon, .pause-icon-main');
  
  if (state.isPlaying) {
    playIcons.forEach(i => i.classList.add('hidden'));
    pauseIcons.forEach(i => i.classList.remove('hidden'));
  } else {
    playIcons.forEach(i => i.classList.remove('hidden'));
    pauseIcons.forEach(i => i.classList.add('hidden'));
  }
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ============================================
// 10. PLAYER CONTROLS
// ============================================

playBtn.addEventListener('click', () => state.isPlaying ? pause() : play());
miniPlayBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  state.isPlaying ? pause() : play();
});

prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);

shuffleBtn.addEventListener('click', () => {
  state.shuffle = !state.shuffle;
  shuffleBtn.classList.toggle('active');
  if (state.shuffle) shuffleQueue();
});

function shuffleQueue() {
  const current = state.queue[state.queueIndex];
  const remaining = state.queue.slice(state.queueIndex + 1);
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }
  state.queue = [current, ...remaining];
  state.queueIndex = 0;
}

repeatBtn.addEventListener('click', () => {
  const modes = ['off', 'all', 'one'];
  const idx = modes.indexOf(state.repeat);
  state.repeat = modes[(idx + 1) % modes.length];
  repeatBtn.classList.toggle('active', state.repeat !== 'off');
});

async function toggleLike() {
  if (!state.currentTrack) return;
  
  const id = state.currentTrack.id;
  const isLiked = state.likedSongs.includes(id);
  
  if (isLiked) {
    state.likedSongs = state.likedSongs.filter(i => i !== id);
  } else {
    state.likedSongs.push(id);
  }
  
  try {
    await db.collection('users').doc(state.currentUser.uid).update({
      likedSongs: state.likedSongs
    });
    updateAllPlayerUI(state.currentTrack);
  } catch (err) {
    console.error('Like error:', err);
  }
}

likeBtn.addEventListener('click', toggleLike);
miniLikeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleLike();
});

// ============================================
// 11. PLAYER NAVIGATION
// ============================================

miniPlayer.addEventListener('click', (e) => {
  if (e.target.closest('.mini-play-btn') || e.target.closest('.mini-icon-btn')) return;
  fullPlayer.classList.remove('hidden');
});

playerMinimize.addEventListener('click', () => {
  fullPlayer.classList.add('hidden');
});

// Swipe down to minimize
let startY = 0;
fullPlayer.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

fullPlayer.addEventListener('touchmove', (e) => {
  const y = e.touches[0].clientY;
  const delta = y - startY;
  if (delta > 0 && !e.target.closest('.seek-bar')) {
    fullPlayer.style.transform = `translateY(${delta}px)`;
  }
});

fullPlayer.addEventListener('touchend', (e) => {
  const y = e.changedTouches[0].clientY;
  const delta = y - startY;
  if (delta > 100) {
    fullPlayer.classList.add('hidden');
  }
  fullPlayer.style.transform = '';
});

// ============================================
// 12. NAVIGATION
// ============================================

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    
    Object.values(views).forEach(v => v.classList.remove('active'));
    views[view].classList.add('active');
    
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    if (view === 'library') renderLibrary();
  });
});

// ============================================
// 13. MEDIA SESSION API
// ============================================

function setupMediaSession() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('previoustrack', playPrevious);
    navigator.mediaSession.setActionHandler('nexttrack', playNext);
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      audioPlayer.currentTime = details.seekTime;
    });
  }
}

function updateMediaSession(track) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: [
        { src: track.artwork, sizes: '96x96', type: 'image/jpeg' },
        { src: track.artwork, sizes: '128x128', type: 'image/jpeg' },
        { src: track.artwork, sizes: '192x192', type: 'image/jpeg' },
        { src: track.artwork, sizes: '256x256', type: 'image/jpeg' },
        { src: track.artwork, sizes: '384x384', type: 'image/jpeg' },
        { src: track.artwork, sizes: '512x512', type: 'image/jpeg' }
      ]
    });
  }
}

// ============================================
// 14. SERVICE WORKER
// ============================================

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
      .then(() => console.log('Service Worker registered'))
      .catch(err => console.error('SW registration failed:', err));
  }
}

// ============================================
// 15. KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  
  if (e.code === 'Space') {
    e.preventDefault();
    state.isPlaying ? pause() : play();
  } else if (e.code === 'ArrowRight') {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
  } else if (e.code === 'ArrowLeft') {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
  }
});

console.log('🎵 Aurio loaded successfully');
