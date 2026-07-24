/**
 * DeliHub Mini App — Phase 2
 * Now fetching real USDT/TOMAN price from Nobitex API (with CORS proxy).
 */

// ============================================
// DOM References
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
// Formatting Utilities
// ============================================

function formatPrice(value) {
  return value.toLocaleString('fa-IR');
}

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

function renderPrice(price, now = new Date()) {
  DOM.priceValue.textContent = formatPrice(price);
  DOM.lastUpdate.textContent = `آخرین بروزرسانی: ${formatTime(now)}`;
}

// ============================================
// Real API Fetch Logic
// ============================================

async function fetchRealPrice() {
  // استفاده از پروکسی قدرتمند allorigins برای دور زدن محدودیت تلگرام
  const nobitexUrl = 'https://api.nobitex.ir/market/stats?src_currency=usdt&dst_currency=rls';
  const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(nobitexUrl);
  
  const response = await fetch(proxyUrl);
  
  if (!response.ok) {
    throw new Error('خطا در دریافت اطلاعات از سرور');
  }
  
  const data = await response.json();
  
  // گرفتن قیمت و تبدیل از ریال به تومان
  const priceString = data.stats["usdt-rls"].latest;
  
  // اطمینان از اینکه قیمت به عنوان عدد پردازش میشه (برای حل مشکل NaN)
  const priceInToman = Math.floor(parseInt(priceString, 10) / 10);

  return {
    price: priceInToman,
    fetchedAt: new Date(),
  };
}

// ============================================
// Telegram WebApp SDK Initialization
// ============================================

function initTelegramSDK() {
  const webApp = window.Telegram?.WebApp;

  if (!webApp) {
    console.warn('[DeliHub] Telegram WebApp SDK not detected. Running outside Telegram.');
    return;
  }

  webApp.ready();

  if (webApp.themeParams) {
    const theme = webApp.themeParams;
    const root = document.documentElement;

    if (theme.bg_color)       root.style.setProperty('--bg-primary', theme.bg_color);
    if (theme.secondary_bg_color) root.style.setProperty('--bg-secondary', theme.secondary_bg_color);
    if (theme.text_color)     root.style.setProperty('--text-primary', theme.text_color);
    if (theme.hint_color)     root.style.setProperty('--text-muted', theme.hint_color);
    if (theme.button_color)   root.style.setProperty('--accent', theme.button_color);
  }

  webApp.expand();
}

// ============================================
// Bootstrap
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initTelegramSDK();
  DOM.refreshBtn.addEventListener('click', handleRefresh);
  handleRefresh();
});
