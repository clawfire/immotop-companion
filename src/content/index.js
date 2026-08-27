import './content.css';
import {
  getBlockedSellers,
  addBlockedSeller,
  removeBlockedSeller,
  onBlockedSellersChanged,
  getSyncEnabled,
  setSyncEnabled,
  onSyncEnabledChanged,
  setLoginState,
} from '../shared/storage.js';
import { resolveLocale, onLocalePreferenceChanged, translate } from '../shared/i18n.js';

const PROCESSED_ATTR = 'data-immotop-blocker';
const BLOCKED_ATTR = 'data-immotop-blocked';
const REVEALED_ATTR = 'data-immotop-revealed';
const SYNCED_ATTR = 'data-immotop-synced';
const RESULTS_LIST_SELECTOR = 'ul[data-cy="listing-search-results"]';
const AGENCY_LOGO_SELECTOR = 'figure[class*="AgencyLogo_logo"] img[alt]';
const CARD_READY_SELECTOR = 'a[href*="/annonces/"]';
const NATIVE_HIDE_BUTTON_SELECTOR = 'button.cy-hideButton[aria-label="masquer annonce"]';
const LOGIN_BUTTON_SELECTOR = 'im-login-button';
const AUTH_MODAL_SELECTOR = '.ic-authModal__container';
const AUTH_MODAL_CLOSE_SELECTOR = '.nd-dialogFrame__close';

const BLOCK_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>';
const MASK_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="4" y1="20" x2="20" y2="4"/></svg>';

/** @type {Map<string, { id: string, name: string, logo: string }>} */
let blockedMap = new Map();

let syncEnabled = false;
let syncLoginWarned = false;
let lastReportedLogin = null;

let currentLocale = 'fr';
function t(key, params) {
  return translate(currentLocale, key, params);
}

/** Registered buttons living in the overlay, keyed by the figure they track. @type {Map<Element, HTMLButtonElement>} */
const overlayButtons = new Map();
/** Masks currently in the DOM, so their text can be refreshed on a locale change. @type {Set<HTMLElement>} */
const activeMasks = new Set();
let overlayEl = null;
let repositionScheduled = false;

function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function extractSellerId(src) {
  const match = src.match(/\/(\d+)(?:\/[^/?#]*)?\.(?:jpg|jpeg|png|webp)(?:[?#].*)?$/i);
  return match ? match[1] : src;
}

function getSellerFromCard(li) {
  const img = li.querySelector(AGENCY_LOGO_SELECTOR);
  if (!img || !img.src) return null;
  const name = img.alt.trim();
  if (!name) return null;
  return { id: extractSellerId(img.src), name, logo: img.src };
}

function applyMaskText(mask, seller) {
  mask.__seller = seller;
  mask.__titleEl.textContent = t('content.maskTitle');
  mask.__subtitleEl.textContent = t('content.maskSubtitle', { name: seller.name });
  mask.__revealBtn.textContent = t('content.maskReveal');
}

function buildMask(seller) {
  const mask = document.createElement('div');
  mask.className = 'immotop-blocker-mask';

  const icon = document.createElement('div');
  icon.className = 'immotop-blocker-mask-icon';
  icon.innerHTML = MASK_ICON_SVG;

  const title = document.createElement('div');
  title.className = 'immotop-blocker-mask-title';

  const subtitle = document.createElement('div');
  subtitle.className = 'immotop-blocker-mask-subtitle';

  const revealBtn = document.createElement('button');
  revealBtn.type = 'button';
  revealBtn.className = 'immotop-blocker-mask-reveal';

  mask.__titleEl = title;
  mask.__subtitleEl = subtitle;
  mask.__revealBtn = revealBtn;
  applyMaskText(mask, seller);

  mask.append(icon, title, subtitle, revealBtn);

  const stop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  mask.addEventListener('mousedown', stop);
  mask.addEventListener('click', (e) => {
    // Swallow clicks on the mask itself so it never triggers the card's own
    // navigation, but let the reveal button's own handler run first.
    if (e.target === revealBtn) return;
    stop(e);
  });
  revealBtn.addEventListener('click', (e) => {
    stop(e);
    mask.closest('li')?.setAttribute(REVEALED_ATTR, 'true');
    mask.remove();
    activeMasks.delete(mask);
  });

  activeMasks.add(mask);
  return mask;
}

function isLoggedIn() {
  return !document.querySelector(LOGIN_BUTTON_SELECTOR);
}

/** Persists the login state so the popup can gate the sync toggle on it, and turns sync off if the session dropped. */
function reportLoginState() {
  const loggedIn = isLoggedIn();
  if (loggedIn === lastReportedLogin) return;
  lastReportedLogin = loggedIn;
  setLoginState(loggedIn);
  if (!loggedIn && syncEnabled) {
    setSyncEnabled(false);
  }
}

function warnSyncLoginRequired() {
  lastReportedLogin = false;
  setLoginState(false);
  if (syncEnabled) setSyncEnabled(false);
  if (syncLoginWarned) return;
  syncLoginWarned = true;
  showToast(t('content.syncLoginWarning'));
}

/** Clicks immotop.lu's own "masquer annonce" button for an already-blocked, not-yet-synced card. */
function maybeSyncHide(li) {
  if (!syncEnabled || li.hasAttribute(SYNCED_ATTR)) return;
  const hideBtn = li.querySelector(NATIVE_HIDE_BUTTON_SELECTOR);
  if (!hideBtn) return;
  if (!isLoggedIn()) {
    warnSyncLoginRequired();
    return;
  }
  li.setAttribute(SYNCED_ATTR, 'true');
  hideBtn.click();
  // The login check above is a heuristic; fall back to detecting the auth modal
  // immotop.lu opens instead of hiding when the session turns out to be stale.
  setTimeout(() => {
    if (!document.querySelector(AUTH_MODAL_SELECTOR)) return;
    document.querySelector(AUTH_MODAL_CLOSE_SELECTOR)?.click();
    li.removeAttribute(SYNCED_ATTR);
    warnSyncLoginRequired();
  }, 200);
}

function syncAllBlocked() {
  if (!syncEnabled) return;
  document.querySelectorAll(`${RESULTS_LIST_SELECTOR} > li[${BLOCKED_ATTR}="true"]`).forEach(maybeSyncHide);
}

function applyBlockState(li, seller) {
  if (blockedMap.has(seller.id)) {
    li.setAttribute(BLOCKED_ATTR, 'true');
    if (li.getAttribute(REVEALED_ATTR) !== 'true' && !li.querySelector('.immotop-blocker-mask')) {
      li.appendChild(buildMask(seller));
    }
    maybeSyncHide(li);
  } else if (li.getAttribute(BLOCKED_ATTR) === 'true') {
    li.removeAttribute(BLOCKED_ATTR);
    li.removeAttribute(REVEALED_ATTR);
    li.removeAttribute(SYNCED_ATTR);
    const mask = li.querySelector('.immotop-blocker-mask');
    if (mask) {
      activeMasks.delete(mask);
      mask.remove();
    }
  }
}

let toastTimer;
function showToast(message, undoLabel, onUndo) {
  document.querySelector('.immotop-blocker-toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'immotop-blocker-toast';

  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  if (onUndo) {
    const undoBtn = document.createElement('button');
    undoBtn.type = 'button';
    undoBtn.textContent = undoLabel;
    undoBtn.addEventListener('click', () => {
      onUndo();
      toast.remove();
    });
    toast.appendChild(undoBtn);
  }

  document.body.appendChild(toast);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.remove(), 5000);
}

function getOverlay() {
  if (!overlayEl || !overlayEl.isConnected) {
    overlayEl = document.createElement('div');
    overlayEl.id = 'immotop-blocker-overlay';
    document.body.appendChild(overlayEl);
  }
  return overlayEl;
}

function scheduleReposition() {
  if (repositionScheduled) return;
  repositionScheduled = true;
  requestAnimationFrame(() => {
    repositionScheduled = false;
    repositionButtons();
  });
}

function repositionButtons() {
  for (const [figure, btn] of overlayButtons) {
    if (!figure.isConnected) {
      btn.remove();
      overlayButtons.delete(figure);
      continue;
    }
    const li = figure.closest('li');
    const isBlocked = li?.getAttribute(BLOCKED_ATTR) === 'true' && li?.getAttribute(REVEALED_ATTR) !== 'true';
    const rect = figure.getBoundingClientRect();
    const isVisible = !isBlocked && rect.width > 0 && rect.height > 0;
    btn.style.visibility = isVisible ? '' : 'hidden';
    if (!isVisible) continue;
    // Anchored on the figure's top-right corner; CSS transform floats it up and out.
    btn.style.left = `${rect.right}px`;
    btn.style.top = `${rect.top}px`;
  }
}

function setButtonVisible(btn, visible) {
  btn.classList.toggle('is-visible', visible);
}

function attachHoverReveal(figure, btn) {
  const enter = () => setButtonVisible(btn, true);
  const leaveFigure = (e) => {
    if (e.relatedTarget === btn || (e.relatedTarget instanceof Node && btn.contains(e.relatedTarget))) return;
    setButtonVisible(btn, false);
  };
  const leaveBtn = (e) => {
    if (e.relatedTarget === figure || (e.relatedTarget instanceof Node && figure.contains(e.relatedTarget))) return;
    setButtonVisible(btn, false);
  };
  figure.addEventListener('mouseenter', enter);
  figure.addEventListener('mouseleave', leaveFigure);
  btn.addEventListener('mouseenter', enter);
  btn.addEventListener('mouseleave', leaveBtn);
  btn.addEventListener('focus', enter);
  btn.addEventListener('blur', () => setButtonVisible(btn, false));
}

function applyBlockButtonText(btn, seller) {
  btn.__seller = seller;
  btn.title = t('content.blockTitle', { name: seller.name });
  btn.setAttribute('aria-label', t('content.blockAria', { name: seller.name }));
}

function injectBlockButton(li, img, seller) {
  const figure = img.closest('figure');
  if (!figure || overlayButtons.has(figure)) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'immotop-blocker-btn';
  btn.innerHTML = BLOCK_ICON_SVG;
  applyBlockButtonText(btn, seller);

  const stop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  btn.addEventListener('mousedown', stop);
  btn.addEventListener('click', async (e) => {
    stop(e);
    await addBlockedSeller(seller);
    showToast(t('content.toastBlocked', { name: seller.name }), t('content.toastUndo'), () =>
      removeBlockedSeller(seller.id),
    );
  });

  attachHoverReveal(figure, btn);
  getOverlay().appendChild(btn);
  overlayButtons.set(figure, btn);
  scheduleReposition();
}

function processListings() {
  const items = document.querySelectorAll(`${RESULTS_LIST_SELECTOR} > li:not([${PROCESSED_ATTR}])`);
  items.forEach((li) => {
    if (!li.querySelector(CARD_READY_SELECTOR)) return; // card not fully rendered yet, retry later

    li.setAttribute(PROCESSED_ATTR, '1');
    const img = li.querySelector(AGENCY_LOGO_SELECTOR);
    if (!img) return; // private/no-agency listing, nothing to do

    const seller = getSellerFromCard(li);
    if (!seller) return;
    injectBlockButton(li, img, seller);
    applyBlockState(li, seller);
  });
}

function reapplyBlockStates() {
  document.querySelectorAll(`${RESULTS_LIST_SELECTOR} > li[${PROCESSED_ATTR}]`).forEach((li) => {
    const seller = getSellerFromCard(li);
    if (seller) applyBlockState(li, seller);
  });
}

function refreshInjectedTexts() {
  for (const btn of overlayButtons.values()) {
    if (btn.__seller) applyBlockButtonText(btn, btn.__seller);
  }
  for (const mask of activeMasks) {
    if (mask.__seller) applyMaskText(mask, mask.__seller);
  }
}

async function init() {
  currentLocale = await resolveLocale();

  const sellers = await getBlockedSellers();
  blockedMap = new Map(sellers.map((s) => [s.id, s]));
  syncEnabled = await getSyncEnabled();

  processListings();
  reportLoginState();

  const debouncedTick = debounce(() => {
    processListings();
    reportLoginState();
  }, 150);
  const observer = new MutationObserver(() => {
    debouncedTick();
    scheduleReposition();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('scroll', scheduleReposition, { capture: true, passive: true });
  window.addEventListener('resize', scheduleReposition, { passive: true });

  onBlockedSellersChanged((list) => {
    blockedMap = new Map(list.map((s) => [s.id, s]));
    reapplyBlockStates();
  });

  onSyncEnabledChanged((enabled) => {
    syncEnabled = enabled;
    if (enabled) {
      syncLoginWarned = false;
      syncAllBlocked();
    }
  });

  onLocalePreferenceChanged(async () => {
    currentLocale = await resolveLocale();
    refreshInjectedTexts();
  });
}

init();
