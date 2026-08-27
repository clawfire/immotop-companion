import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';
import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js';
import '@awesome.me/webawesome/dist/components/tab/tab.js';
import '@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import './styles.css';
import {
  getBlockedSellers,
  removeBlockedSeller,
  mergeBlockedSellers,
  getSyncEnabled,
  setSyncEnabled,
  getLoginState,
  onLoginStateChanged,
} from '../shared/storage.js';
import { resolveLocale, getLocalePreference, setLocalePreference, translate, SUPPORTED_LOCALES } from '../shared/i18n.js';

const CLOSE_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

const listEl = document.getElementById('list');
const emptyEl = document.getElementById('empty');
const emptyTitleEl = document.querySelector('.app__empty-title');
const emptyHintEl = document.querySelector('.app__hint');
const countEl = document.getElementById('count');
const errorEl = document.getElementById('error');
const exportBtn = document.getElementById('export-btn');
const exportBtnLabel = document.getElementById('export-btn-label');
const importBtn = document.getElementById('import-btn');
const importBtnLabel = document.getElementById('import-btn-label');
const importInput = document.getElementById('import-input');
const languageSelect = document.getElementById('language-select');
const tabListEl = document.getElementById('tab-list');
const tabSettingsEl = document.getElementById('tab-settings');
const syncLabelEl = document.getElementById('sync-label');
const syncDisclaimerEl = document.getElementById('sync-disclaimer');
const syncToggle = document.getElementById('sync-toggle');
const restoreNoticeEl = document.getElementById('restore-notice');
const restoreNoticeTextEl = document.getElementById('restore-notice-text');
const restoreNoticeLinkEl = document.getElementById('restore-notice-link');
const restoreNoticeCloseEl = document.getElementById('restore-notice-close');
const syncLoginWarningEl = document.getElementById('sync-login-warning');
const syncLoginWarningTextEl = document.getElementById('sync-login-warning-text');
const syncLoginWarningLinkEl = document.getElementById('sync-login-warning-link');

let currentLocale = 'fr';
function t(key, params) {
  return translate(currentLocale, key, params);
}

let dateFormatter = new Intl.DateTimeFormat(currentLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });

function showError(message) {
  if (!message) {
    errorEl.hidden = true;
    errorEl.textContent = '';
    return;
  }
  errorEl.hidden = false;
  errorEl.textContent = message;
}

function applyStaticTexts() {
  document.documentElement.lang = currentLocale;
  exportBtnLabel.textContent = t('toolbar.export');
  importBtnLabel.textContent = t('toolbar.import');
  languageSelect.label = t('language.label');
  const optionKeys = ['auto', 'fr', 'de', 'en', 'pt', 'lb'];
  languageSelect.querySelectorAll('wa-option').forEach((option, index) => {
    option.textContent = t(`language.${optionKeys[index]}`);
  });
  emptyTitleEl.textContent = t('empty.title');
  emptyHintEl.textContent = t('empty.hint');
  tabListEl.textContent = t('tabs.list');
  tabSettingsEl.textContent = t('tabs.settings');
  syncLabelEl.textContent = t('settings.syncTitle');
  syncDisclaimerEl.textContent = t('settings.syncDisclaimer');
  restoreNoticeLinkEl.textContent = t('card.unblockRestoreLink');
  restoreNoticeCloseEl.setAttribute('aria-label', t('common.close'));
  syncLoginWarningTextEl.textContent = t('settings.syncLoginRequired');
  syncLoginWarningLinkEl.textContent = t('settings.syncLoginRequiredLink');
  dateFormatter = new Intl.DateTimeFormat(currentLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function showRestoreNotice(name) {
  restoreNoticeTextEl.textContent = t('card.unblockRestoreHint', { name });
  restoreNoticeEl.hidden = false;
}

restoreNoticeCloseEl.addEventListener('click', () => {
  restoreNoticeEl.hidden = true;
});

/** Gates the sync toggle on immotop.lu's login state: it makes no sense enabled while logged out. */
async function updateSyncAvailability(loginState) {
  const loggedIn = loginState.loggedIn === true;
  syncToggle.disabled = !loggedIn;
  syncLoginWarningEl.hidden = loggedIn;
  if (!loggedIn && (await getSyncEnabled())) {
    await setSyncEnabled(false);
    syncToggle.checked = false;
  }
}

function render(sellers) {
  countEl.textContent = String(sellers.length);
  listEl.innerHTML = '';

  if (sellers.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  const sorted = [...sellers].sort((a, b) => b.addedAt - a.addedAt);
  for (const seller of sorted) {
    const li = document.createElement('li');

    const card = document.createElement('div');
    card.className = 'app__card';

    const row = document.createElement('div');
    row.className = 'app__card-row';

    const img = document.createElement('img');
    img.className = 'app__logo';
    img.src = seller.logo;
    img.alt = '';
    img.loading = 'lazy';

    const name = document.createElement('div');
    name.className = 'app__card-name';
    name.textContent = seller.name;
    name.title = seller.name;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'app__card-close';
    closeBtn.title = t('card.unblockTitle', { name: seller.name });
    closeBtn.setAttribute('aria-label', t('card.unblockAria', { name: seller.name }));
    closeBtn.innerHTML = CLOSE_ICON_SVG;
    closeBtn.addEventListener('click', async () => {
      showError('');
      await removeBlockedSeller(seller.id);
      render(await getBlockedSellers());
      if (await getSyncEnabled()) {
        showRestoreNotice(seller.name);
      }
    });

    row.append(img, name, closeBtn);

    const badge = document.createElement('span');
    badge.className = 'app__badge';
    badge.textContent = t('badge.blockedOn', { date: dateFormatter.format(new Date(seller.addedAt)) });

    card.append(row, badge);
    li.appendChild(card);
    listEl.appendChild(li);
  }
}

async function refresh() {
  render(await getBlockedSellers());
}

exportBtn.addEventListener('click', async () => {
  showError('');
  const sellers = await getBlockedSellers();
  const payload = {
    format: 'immotop-blocked-sellers',
    version: 2,
    exportedAt: new Date().toISOString(),
    language: await getLocalePreference(),
    sellers,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `immotop-vendeurs-bloques-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener('click', () => {
  showError('');
  importInput.value = '';
  importInput.click();
});

importInput.addEventListener('change', async () => {
  const file = importInput.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    const sellers = Array.isArray(data) ? data : data?.sellers;

    if (!Array.isArray(sellers)) {
      throw new Error('invalidFile');
    }

    const cleaned = sellers
      .filter((s) => s && typeof s.id === 'string' && typeof s.name === 'string')
      .map((s) => ({ id: s.id, name: s.name, logo: typeof s.logo === 'string' ? s.logo : '', addedAt: s.addedAt }));

    if (cleaned.length === 0) {
      throw new Error('noValidSellers');
    }

    await mergeBlockedSellers(cleaned);

    const importedLanguage = data?.language;
    if (importedLanguage === 'auto' || SUPPORTED_LOCALES.includes(importedLanguage)) {
      await setLocalePreference(importedLanguage);
      currentLocale = await resolveLocale();
      languageSelect.value = importedLanguage;
      applyStaticTexts();
    }

    await refresh();
  } catch (err) {
    const code = err instanceof Error && ['invalidFile', 'noValidSellers'].includes(err.message) ? err.message : 'readFailed';
    showError(t(`error.${code}`));
  }
});

languageSelect.addEventListener('change', async () => {
  await setLocalePreference(languageSelect.value);
  currentLocale = await resolveLocale();
  applyStaticTexts();
  await refresh();
});

syncToggle.addEventListener('change', async () => {
  await setSyncEnabled(syncToggle.checked);
});

onLoginStateChanged((state) => {
  updateSyncAvailability(state);
});

async function init() {
  currentLocale = await resolveLocale();
  languageSelect.value = await getLocalePreference();
  syncToggle.checked = await getSyncEnabled();
  await updateSyncAvailability(await getLoginState());
  applyStaticTexts();
  await refresh();
}

init();
