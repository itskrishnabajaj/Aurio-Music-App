// ============================================
// AURIO ADMIN PANEL - MAIN LOGIC
// ============================================

let currentUser = null;

// ============================================
// 1. AUTHENTICATION
// ============================================

const loginScreen = document.getElementById('login-screen');
const adminScreen = document.getElementById('admin-screen');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');
const adminEmailDisplay = document.getElementById('admin-email-display');

// Login handler
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value;

  if (!email || !password) {
    showLoginError('Please enter both email and password');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span>Signing in...</span><div class="spinner"></div>';
  loginError.textContent = '';

  try {
    await auth.signInWithEmailAndPassword(email, password);
    // Success handled by onAuthStateChanged
  } catch (error) {
    console.error('Login error:', error);
    showLoginError(getAuthErrorMessage(error.code));
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<span>Sign In</span><svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  }
});

// Logout handler
logoutBtn.addEventListener('click', async () => {
  await auth.signOut();
});

// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    adminEmailDisplay.textContent = user.email;
    loginScreen.classList.add('hidden');
    adminScreen.classList.remove('hidden');
    loadSongs();
  } else {
    currentUser = null;
    loginScreen.classList.remove('hidden');
    adminScreen.classList.add('hidden');
  }
});

function showLoginError(message) {
  loginError.textContent = message;
}

function getAuthErrorMessage(code) {
  const messages = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'Admin account not found',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/network-request-failed': 'Network error. Check your connection'
  };
  return messages[code] || 'Authentication failed. Please try again';
}

// ============================================
// 2. FORM HANDLING
// ============================================

const artworkUrlInput = document.getElementById('artwork-url');
const artworkPreview = document.getElementById('artwork-preview');
const artworkPreviewImg = document.getElementById('artwork-preview-img');

// Preview artwork when URL is entered
artworkUrlInput.addEventListener('blur', () => {
  const url = artworkUrlInput.value.trim();
  if (url && isValidUrl(url)) {
    artworkPreviewImg.src = url;
    artworkPreviewImg.onerror = () => {
      artworkPreview.classList.add('hidden');
      showUploadStatus('Invalid image URL', 'error');
    };
    artworkPreviewImg.onload = () => {
      artworkPreview.classList.remove('hidden');
    };
  } else {
    artworkPreview.classList.add('hidden');
  }
});

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// ============================================
// 3. SONG UPLOAD
// ============================================

const uploadBtn = document.getElementById('upload-btn');
const uploadBtnText = document.getElementById('upload-btn-text');
const uploadSpinner = document.getElementById('upload-spinner');
const uploadStatus = document.getElementById('upload-status');

uploadBtn.addEventListener('click', async () => {
  // Collect and validate form data
  const songData = {
    title: document.getElementById('song-title').value.trim(),
    artist: document.getElementById('song-artist').value.trim(),
    album: document.getElementById('song-album').value.trim() || 'Unknown Album',
    duration: parseInt(document.getElementById('song-duration').value) || 0,
    genre: document.getElementById('song-genre').value,
    mood: document.getElementById('song-mood').value,
    audioURL: document.getElementById('audio-url').value.trim(),
    artwork: document.getElementById('artwork-url').value.trim()
  };

  // Validation
  if (!songData.title) {
    showUploadStatus('Song title is required', 'error');
    return;
  }

  if (!songData.artist) {
    showUploadStatus('Artist name is required', 'error');
    return;
  }

  if (!songData.duration || songData.duration < 1) {
    showUploadStatus('Valid duration is required', 'error');
    return;
  }

  if (!songData.genre) {
    showUploadStatus('Please select a genre', 'error');
    return;
  }

  if (!songData.mood) {
    showUploadStatus('Please select a mood', 'error');
    return;
  }

  if (!songData.audioURL || !isValidUrl(songData.audioURL)) {
    showUploadStatus('Valid audio URL is required', 'error');
    return;
  }

  if (!songData.artwork || !isValidUrl(songData.artwork)) {
    showUploadStatus('Valid artwork URL is required', 'error');
    return;
  }

  // Disable button and show loading
  uploadBtn.disabled = true;
  uploadBtnText.textContent = 'Adding to library...';
  uploadSpinner.classList.remove('hidden');
  uploadStatus.textContent = '';
  uploadStatus.className = 'status-message';

  try {
    // Add to Firestore
    await db.collection('songs').add({
      title: songData.title,
      artist: songData.artist,
      album: songData.album,
      duration: songData.duration,
      genre: songData.genre,
      mood: songData.mood,
      audioURL: songData.audioURL,
      artwork: songData.artwork,
      playCount: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uploadedBy: currentUser.email
    });

    // Success!
    showUploadStatus('✨ Song added successfully!', 'success');
    resetForm();
    loadSongs();

  } catch (error) {
    console.error('Upload error:', error);
    showUploadStatus('Failed to add song: ' + error.message, 'error');
  } finally {
    uploadBtn.disabled = false;
    uploadBtnText.textContent = 'Add Song to Library';
    uploadSpinner.classList.add('hidden');
  }
});

function showUploadStatus(message, type) {
  uploadStatus.textContent = message;
  uploadStatus.className = `status-message ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      uploadStatus.textContent = '';
      uploadStatus.className = 'status-message';
    }, 5000);
  }
}

function resetForm() {
  document.getElementById('song-title').value = '';
  document.getElementById('song-artist').value = '';
  document.getElementById('song-album').value = '';
  document.getElementById('song-duration').value = '';
  document.getElementById('song-genre').value = '';
  document.getElementById('song-mood').value = '';
  document.getElementById('audio-url').value = '';
  document.getElementById('artwork-url').value = '';
  artworkPreview.classList.add('hidden');
}

// ============================================
// 4. SONGS LIST
// ============================================

const songsList = document.getElementById('songs-list');
const songsCount = document.getElementById('songs-count');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');

let allSongs = [];
let filteredSongs = [];

async function loadSongs() {
  songsList.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading your music library...</p>
    </div>
  `;

  try {
    const snapshot = await db.collection('songs')
      .orderBy('createdAt', 'desc')
      .get();

    allSongs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    filteredSongs = [...allSongs];
    songsCount.textContent = allSongs.length;
    renderSongs();

  } catch (error) {
    console.error('Error loading songs:', error);
    songsList.innerHTML = `
      <div class="empty-state">
        <h3>Error loading songs</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

function renderSongs() {
  if (filteredSongs.length === 0) {
    const emptyMessage = searchInput.value.trim() 
      ? 'No songs match your search'
      : 'No songs in library yet';
    
    songsList.innerHTML = `
      <div class="empty-state">
        <h3>${emptyMessage}</h3>
        <p>${searchInput.value.trim() ? 'Try a different search term' : 'Upload your first song to get started'}</p>
      </div>
    `;
    return;
  }

  songsList.innerHTML = filteredSongs.map(song => `
    <div class="song-item" data-id="${song.id}">
      <img src="${song.artwork}" alt="${song.title}" class="song-artwork" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%231e1e1e%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'">
      <div class="song-info">
        <div class="song-title">${escapeHtml(song.title)}</div>
        <div class="song-meta">${escapeHtml(song.artist)} • ${escapeHtml(song.album)} • ${song.genre} • ${formatDuration(song.duration)}</div>
      </div>
      <div class="song-actions">
        <button class="btn-delete" onclick="deleteSong('${song.id}', '${escapeHtml(song.title).replace(/'/g, "\\'")}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  if (query === '') {
    filteredSongs = [...allSongs];
  } else {
    filteredSongs = allSongs.filter(song => 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query) ||
      song.mood.toLowerCase().includes(query)
    );
  }
  
  renderSongs();
});

// Refresh button
refreshBtn.addEventListener('click', () => {
  refreshBtn.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    refreshBtn.style.transform = '';
  }, 600);
  loadSongs();
});

// Delete song
async function deleteSong(songId, songTitle) {
  if (!confirm(`Are you sure you want to delete "${songTitle}"?\n\nThis action cannot be undone.`)) {
    return;
  }

  try {
    // Delete from Firestore
    await db.collection('songs').doc(songId).delete();

    // Update local array
    allSongs = allSongs.filter(s => s.id !== songId);
    filteredSongs = filteredSongs.filter(s => s.id !== songId);
    songsCount.textContent = allSongs.length;

    // Re-render
    renderSongs();

    // Show success message briefly
    const songItem = document.querySelector(`[data-id="${songId}"]`);
    if (songItem) {
      songItem.style.opacity = '0';
      songItem.style.transform = 'translateX(-20px)';
    }

  } catch (error) {
    console.error('Delete error:', error);
    alert('Failed to delete song: ' + error.message);
  }
}

// Make deleteSong global
window.deleteSong = deleteSong;

// ============================================
// 5. UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDuration(seconds) {
  if (!seconds || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// 6. KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  
  // Escape to clear search
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    searchInput.blur();
    filteredSongs = [...allSongs];
    renderSongs();
  }
});

// ============================================
// 7. AUTO-FILL DURATION (BONUS FEATURE)
// ============================================

const audioUrlInput = document.getElementById('audio-url');
const durationInput = document.getElementById('song-duration');

audioUrlInput.addEventListener('blur', async () => {
  const url = audioUrlInput.value.trim();
  
  if (url && isValidUrl(url) && !durationInput.value) {
    try {
      // Try to get duration from audio file
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
          durationInput.value = Math.round(audio.duration);
          console.log('Auto-filled duration:', Math.round(audio.duration));
        }
      });
      
      // Set a timeout to prevent hanging
      setTimeout(() => {
        if (!durationInput.value) {
          console.log('Could not auto-detect duration');
        }
      }, 5000);
      
    } catch (error) {
      console.log('Duration auto-detection failed:', error);
    }
  }
});
