/**
 * DeliHub Mini App — Phase 1
 *
 * Responsibilities:
 *  1. Initialize the Telegram WebApp SDK (expand later).
 *  2. Render fake USDT/TOMAN price data.
 *  3. Simulate refresh with a loading state.
 *  4. Format numbers in Persian locale with comma separators.
 */

// ============================================
// DOM References
// Cached once — no repeated queries.
// ============================================
const DOM = Object.freeze({
  priceValue:   document.getElementById('price-value'),
  priceLabel:   document.getElementById('price-label'),
  lastUpdate:   document.getElementById('last-update'),
  refreshBtn:   document.getElementById('refresh-btn'),
  refreshIcon:  document.getElementById('refresh-icon'),
  liveBadge:    document.getElementById('live-badge'),
});

// ============================================
// Fake Data Configuration
// Easily replaceable when real API is connected.
// ============================================
const FAKE_PRICE = {
  /** Base price in Toman for 1 USDT */
  base: 87_450_000,
  /** Random fluctuation range (±) in Toman */
  fluctuation: 350_000,
};

/**
 * Generate a fake price with slight random variation.
 * This simulates what a real API response would look like.
 *
 * @returns {number} Price in Toman (integer)
 */
function generateFakePrice() {
  const { base, fluctuation } = FAKE_PRICE;
  const delta = Math.floor(Math.random() * fluctuation * 2) - fluctuation;
  return base + delta;
}

// ============================================
// Formatting Utilities
// ============================================

/**
 * Format a number as a Persian-localized string with commas.
 * Example: 87450000 → "۸۷,۴۵۰,۰۰۰"
 *
 * @param {number} value - The number to format
 * @returns {string} Formatted Persian string
 */
function formatPrice(value) {
  // toLocaleString with 'fa-IR' converts digits to Persian numerals
  // and adds thousand separators automatically.
  return value.toLocaleString('fa-IR');
}

/**
 * Format a Date object as a Persian-style time string.
 * Example: "۱۴:۳۲:۰۵"
 *
 * @param {Date} date
 * @returns {string}
 */
function formatTime(date) {
  return date
    .toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
}

// ============================================
// UI State Management
// ============================================

/**
 * Set the loading state of the card.
 * Disables the button, spins the icon, fades the price.
 *
 * @param {boolean} isLoading
 */
function setLoading(isLoading) {
  DOM.refreshBtn.disabled = isLoading;

  if (isLoading) {
    DOM.refreshIcon.classList.add('refresh-icon--spinning');
    DOM.priceValue.classList.add('card__price--loading');
  } else {
    DOM.refreshIcon.classList.remove('refresh-icon--spinning');
    DOM.priceValue.classList.remove('card__price--loading');
  }
}

/**
 * Render the price and update timestamp into the DOM.
 *
 * @param {number} price - Price in Toman
 * @param {Date}  [now=new Date()] - Timestamp of this data
 */
function renderPrice(price, now = new Date()) {
  DOM.priceValue.textContent = formatPrice(price);
  DOM.lastUpdate.textContent = `آخرین بروزرسانی: ${formatTime(now)}`;
}

// ============================================
// Refresh Logic
// Simulates a network request with a delay.
// ============================================

/** Minimum time the spinner is visible (ms) — prevents flash */
const MIN_LOADING_DURATION = 800;

/**
 * Simulate fetching a fresh price.
 * Replaces this function body with a real fetch() in Phase 2.
 *
 * @returns {Promise<{price: number, fetchedAt: Date}>}
 */
async function fetchFakePrice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        price: generateFakePrice(),
        fetchedAt: new Date(),
      });
    }, MIN_LOADING_DURATION);
  });
}

/**
 * Handle the refresh button click.
 * Orchestrates: loading → fetch → render → idle.
 */
async function handleRefresh() {
  // Guard: ignore clicks while already loading
  if (DOM.refreshBtn.disabled) return;

  setLoading(true);

  try {
    const { price, fetchedAt } = await fetchFakePrice();
    renderPrice(price, fetchedAt);
  } catch (error) {
    // Silent fail for now — error handling comes in a later phase
    console.error('[DeliHub] Refresh failed:', error);
  } finally {
    setLoading(false);
  }
}

// ============================================
// Telegram WebApp SDK Initialization
// We initialize it early so the SDK is ready for
// future phases, but don't use any features yet.
// ============================================

function initTelegramSDK() {
  // The script tag in index.html exposes window.Telegram.WebApp
  const webApp = window.Telegram?.WebApp;

  if (!webApp) {
    console.warn('[DeliHub] Telegram WebApp SDK not detected. Running outside Telegram.');
    return;
  }

  // Tell Telegram we're ready — prevents the loading spinner in the client
  webApp.ready();

  // Apply Telegram's built-in theme colors as CSS variables
  // This makes the app match light/dark mode the user has in Telegram
  if (webApp.themeParams) {
    const theme = webApp.themeParams;
    const root = document.documentElement;

    // Map only the ones we use — others can be added later
    if (theme.bg_color)       root.style.setProperty('--bg-primary', theme.bg_color);
    if (theme.secondary_bg_color) root.style.setProperty('--bg-secondary', theme.secondary_bg_color);
    if (theme.text_color)     root.style.setProperty('--text-primary', theme.text_color);
    if (theme.hint_color)     root.style.setProperty('--text-muted', theme.hint_color);
    if (theme.button_color)   root.style.setProperty('--accent', theme.button_color);
  }

  // Expand the app to fill the entire Telegram viewport
  webApp.expand();

  console.log('[DeliHub] Telegram SDK initialized.', {
    platform: webApp.platform,
    theme: webApp.colorScheme,
    version: webApp.version,
  });
}

// ============================================
// Bootstrap
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Telegram SDK (non-blocking)
  initTelegramSDK();

  // 2. Bind refresh button
  DOM.refreshBtn.addEventListener('click', handleRefresh);

  // 3. Perform initial "load" — show spinner then render fake data
  handleRefresh();
});