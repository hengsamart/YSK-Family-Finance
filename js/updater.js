/**
 * YSK Family Finance - GitHub Auto-Update Engine
 * Checks GitHub repository / version.json for updates, handles ServiceWorker cache invalidation,
 * and notifies user when an update is available on App and Computer.
 */

class GitHubUpdater {
  constructor() {
    this.currentVersion = '1.0.0';
    this.currentBuild = 20261101;
    this.repoOwner = 'hengsamart';
    this.repoName = 'YSK-Family-Finance';
    this.isUpdateAvailable = false;
    this.latestInfo = null;

    this.init();
  }

  async init() {
    try {
      const resp = await fetch('version.json?t=' + Date.now());
      if (resp.ok) {
        const localMeta = await resp.json();
        this.currentVersion = localMeta.version || this.currentVersion;
        this.currentBuild = localMeta.build || this.currentBuild;
        this.updateVersionUI();
      }
    } catch (e) {
      console.warn('Could not read local version.json', e);
    }

    // Auto-check silently after 3 seconds on launch
    setTimeout(() => {
      this.checkForUpdate(true);
    }, 3000);
  }

  updateVersionUI() {
    const el = document.getElementById('current-app-version');
    if (el) el.textContent = `v${this.currentVersion} (${this.currentBuild})`;
  }

  // Check remote version.json on server/GitHub Pages
  async checkForUpdate(isSilent = false) {
    const statusEl = document.getElementById('update-status-msg');
    const updateBtn = document.getElementById('btn-apply-update');
    const isKm = window.i18n ? window.i18n.getLanguage() === 'km' : true;

    if (!isSilent && statusEl) {
      statusEl.className = 'text-sm text-blue-600 flex items-center gap-2';
      statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${window.i18n.t('githubStatusChecking')}`;
    }

    try {
      // Fetch fresh version.json bypassing browser cache
      const response = await fetch(`version.json?_nocache=${Date.now()}`);
      if (!response.ok) throw new Error('Failed to fetch version metadata');

      const remoteData = await response.json();
      this.latestInfo = remoteData;

      const remoteBuild = parseInt(remoteData.build, 10) || 0;
      const hasNewVersion = remoteBuild > this.currentBuild || remoteData.version !== this.currentVersion;

      if (hasNewVersion) {
        this.isUpdateAvailable = true;
        this.showUpdateBanner(remoteData);

        if (statusEl) {
          statusEl.className = 'text-sm font-semibold text-emerald-600 flex items-center gap-2';
          statusEl.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${window.i18n.t('githubStatusUpdateAvailable')}: <strong>v${remoteData.version}</strong>`;
        }
        if (updateBtn) updateBtn.classList.remove('hidden');

      } else {
        this.isUpdateAvailable = false;
        if (!isSilent && statusEl) {
          statusEl.className = 'text-sm text-slate-600 flex items-center gap-2';
          statusEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500"></i> ${window.i18n.t('githubStatusUpToDate')} (v${this.currentVersion})`;
        }
      }
    } catch (err) {
      console.warn('Update check warning:', err);
      if (!isSilent && statusEl) {
        statusEl.className = 'text-sm text-amber-600 flex items-center gap-2';
        statusEl.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${isKm ? 'មិនអាចតភ្ជាប់ពិនិត្យកំណែថ្មីបាន (Offline/Local mode)' : 'Could not check remote version (Offline mode)'}`;
      }
    }
  }

  // Display top floating update banner
  showUpdateBanner(info) {
    const existing = document.getElementById('github-update-notification-banner');
    if (existing) return;

    const isKm = window.i18n ? window.i18n.getLanguage() === 'km' : true;
    const banner = document.createElement('div');
    banner.id = 'github-update-notification-banner';
    banner.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 max-w-lg w-11/12 border border-blue-400/40 animate-bounce-short';
    
    const changelogText = info.changelog 
      ? (isKm ? info.changelog.km : info.changelog.en)
      : (isKm ? 'មានការកែលម្អប្រព័ន្ធថ្មី' : 'New performance enhancements and features');

    banner.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <i class="fa-solid fa-cloud-arrow-down text-lg"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-bold text-sm flex items-center gap-2">
          <span>${isKm ? 'មានកំណែប្រែថ្មី!' : 'New Update Available!'}</span>
          <span class="bg-emerald-500 text-xs px-2 py-0.5 rounded-full font-mono">v${info.version}</span>
        </div>
        <p class="text-xs text-blue-100 truncate mt-0.5">${changelogText}</p>
      </div>
      <button id="banner-btn-update" class="bg-white text-blue-700 hover:bg-blue-50 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow transition-transform active:scale-95 shrink-0">
        ${isKm ? 'ធ្វើបច្ចុប្បន្នភាព' : 'Update Now'}
      </button>
      <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white p-1">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    document.body.appendChild(banner);

    document.getElementById('banner-btn-update').addEventListener('click', () => {
      this.applyUpdate();
    });
  }

  // Clear Service Worker cache and reload app
  async applyUpdate() {
    const isKm = window.i18n ? window.i18n.getLanguage() === 'km' : true;
    const banner = document.getElementById('github-update-notification-banner');
    if (banner) {
      banner.innerHTML = `
        <div class="flex items-center gap-3 w-full justify-center py-1">
          <i class="fa-solid fa-spinner fa-spin text-xl"></i>
          <span class="font-bold text-sm">${isKm ? 'កំពុងទាញយក និង Refresh ប្រព័ន្ធថ្មី...' : 'Downloading and updating application...'}</span>
        </div>
      `;
    }

    try {
      // Unregister service workers or clean caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.update();
        }
      }
    } catch (e) {
      console.warn('Cache clear error:', e);
    }

    // Force hard reload from server
    setTimeout(() => {
      window.location.reload(true);
    }, 800);
  }
}

// Global updater singleton
window.updater = new GitHubUpdater();
