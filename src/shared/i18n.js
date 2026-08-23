export const SUPPORTED_LOCALES = ['fr', 'de', 'en', 'pt', 'lb'];
export const DEFAULT_LOCALE = 'fr';
const LANGUAGE_STORAGE_KEY = 'language';

const MESSAGES = {
  fr: {
    'toolbar.export': 'Exporter',
    'toolbar.import': 'Importer',
    'language.label': 'Langue',
    'language.auto': 'Auto (navigateur)',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.pt': 'Português',
    'language.lb': 'Lëtzebuergesch',
    'empty.title': 'Aucun vendeur bloqué',
    'empty.hint':
      "Sur une page de résultats immotop.lu, survolez le logo d'une agence et cliquez sur l'icône qui apparaît pour la bloquer.",
    'badge.blockedOn': 'Bloqué le {date}',
    'card.unblockTitle': 'Débloquer « {name} »',
    'card.unblockAria': 'Débloquer {name}',
    'error.invalidFile': 'Format de fichier invalide.',
    'error.noValidSellers': 'Aucun vendeur valide trouvé dans le fichier.',
    'error.readFailed': 'Impossible de lire ce fichier.',
    'content.blockTitle': 'Bloquer « {name} »',
    'content.blockAria': 'Bloquer le vendeur {name}',
    'content.toastBlocked': '« {name} » a été bloqué',
    'content.toastUndo': 'Annuler',
    'content.maskTitle': 'Annonce masquée',
    'content.maskSubtitle': 'Vendeur bloqué : {name}',
    'content.maskReveal': 'Afficher quand même',
  },
  de: {
    'toolbar.export': 'Exportieren',
    'toolbar.import': 'Importieren',
    'language.label': 'Sprache',
    'language.auto': 'Automatisch (Browser)',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.pt': 'Português',
    'language.lb': 'Lëtzebuergesch',
    'empty.title': 'Keine blockierten Anbieter',
    'empty.hint':
      'Fahren Sie auf einer immotop.lu-Ergebnisseite mit der Maus über das Logo einer Agentur und klicken Sie auf das erscheinende Symbol, um sie zu blockieren.',
    'badge.blockedOn': 'Blockiert am {date}',
    'card.unblockTitle': '„{name}“ entsperren',
    'card.unblockAria': '{name} entsperren',
    'error.invalidFile': 'Ungültiges Dateiformat.',
    'error.noValidSellers': 'In der Datei wurden keine gültigen Anbieter gefunden.',
    'error.readFailed': 'Diese Datei konnte nicht gelesen werden.',
    'content.blockTitle': '„{name}“ blockieren',
    'content.blockAria': 'Anbieter {name} blockieren',
    'content.toastBlocked': '„{name}“ wurde blockiert',
    'content.toastUndo': 'Rückgängig',
    'content.maskTitle': 'Anzeige ausgeblendet',
    'content.maskSubtitle': 'Blockierter Anbieter: {name}',
    'content.maskReveal': 'Trotzdem anzeigen',
  },
  en: {
    'toolbar.export': 'Export',
    'toolbar.import': 'Import',
    'language.label': 'Language',
    'language.auto': 'Auto (browser)',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.pt': 'Português',
    'language.lb': 'Lëtzebuergesch',
    'empty.title': 'No blocked sellers',
    'empty.hint':
      "On an immotop.lu search results page, hover an agency's logo and click the icon that appears to block it.",
    'badge.blockedOn': 'Blocked on {date}',
    'card.unblockTitle': 'Unblock "{name}"',
    'card.unblockAria': 'Unblock {name}',
    'error.invalidFile': 'Invalid file format.',
    'error.noValidSellers': 'No valid sellers found in the file.',
    'error.readFailed': 'Could not read this file.',
    'content.blockTitle': 'Block "{name}"',
    'content.blockAria': 'Block seller {name}',
    'content.toastBlocked': '"{name}" has been blocked',
    'content.toastUndo': 'Undo',
    'content.maskTitle': 'Listing hidden',
    'content.maskSubtitle': 'Blocked seller: {name}',
    'content.maskReveal': 'Show anyway',
  },
  pt: {
    'toolbar.export': 'Exportar',
    'toolbar.import': 'Importar',
    'language.label': 'Idioma',
    'language.auto': 'Automático (navegador)',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.pt': 'Português',
    'language.lb': 'Lëtzebuergesch',
    'empty.title': 'Nenhum vendedor bloqueado',
    'empty.hint':
      'Numa página de resultados do immotop.lu, passe o rato sobre o logótipo de uma agência e clique no ícone que aparece para a bloquear.',
    'badge.blockedOn': 'Bloqueado em {date}',
    'card.unblockTitle': 'Desbloquear «{name}»',
    'card.unblockAria': 'Desbloquear {name}',
    'error.invalidFile': 'Formato de ficheiro inválido.',
    'error.noValidSellers': 'Nenhum vendedor válido encontrado no ficheiro.',
    'error.readFailed': 'Não foi possível ler este ficheiro.',
    'content.blockTitle': 'Bloquear «{name}»',
    'content.blockAria': 'Bloquear o vendedor {name}',
    'content.toastBlocked': '«{name}» foi bloqueado',
    'content.toastUndo': 'Anular',
    'content.maskTitle': 'Anúncio ocultado',
    'content.maskSubtitle': 'Vendedor bloqueado: {name}',
    'content.maskReveal': 'Mostrar mesmo assim',
  },
  lb: {
    'toolbar.export': 'Exportéieren',
    'toolbar.import': 'Importéieren',
    'language.label': 'Sprooch',
    'language.auto': 'Automatesch (Browser)',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.pt': 'Português',
    'language.lb': 'Lëtzebuergesch',
    'empty.title': 'Kee Verkeefer blockéiert',
    'empty.hint':
      "Op enger immotop.lu Sichresultat-Säit, fuert mam Mauszeiger iwwer d'Logo vun enger Agence a klick op d'Ikon déi opgeet fir se ze blockéieren.",
    'badge.blockedOn': 'Blockéiert den {date}',
    'card.unblockTitle': '„{name}“ entsperren',
    'card.unblockAria': '{name} entsperren',
    'error.invalidFile': 'Ongülteg Dateiformat.',
    'error.noValidSellers': 'Keen gültege Verkeefer an der Datei fonnt.',
    'error.readFailed': 'Dës Datei konnt net gelies ginn.',
    'content.blockTitle': '„{name}“ blockéieren',
    'content.blockAria': 'De Verkeefer {name} blockéieren',
    'content.toastBlocked': '„{name}“ gouf blockéiert',
    'content.toastUndo': 'Réckgängeg maachen',
    'content.maskTitle': 'Annonce verstoppt',
    'content.maskSubtitle': 'Blockéierten Verkeefer: {name}',
    'content.maskReveal': 'Trotzdeem uweisen',
  },
};

export function detectBrowserLocale() {
  const lang = (navigator.language || '').toLowerCase().split('-')[0];
  return SUPPORTED_LOCALES.includes(lang) ? lang : DEFAULT_LOCALE;
}

/** @returns {Promise<'auto'|'fr'|'de'|'en'|'pt'|'lb'>} */
export async function getLocalePreference() {
  const data = await chrome.storage.local.get(LANGUAGE_STORAGE_KEY);
  const value = data[LANGUAGE_STORAGE_KEY];
  return value === 'auto' || SUPPORTED_LOCALES.includes(value) ? value : 'auto';
}

/** @param {'auto'|'fr'|'de'|'en'|'pt'|'lb'} preference */
export async function setLocalePreference(preference) {
  await chrome.storage.local.set({ [LANGUAGE_STORAGE_KEY]: preference });
}

/** Resolves the preference ('auto' or an explicit locale) to an actual supported locale. */
export async function resolveLocale() {
  const preference = await getLocalePreference();
  return preference === 'auto' ? detectBrowserLocale() : preference;
}

/** @param {(preference: string) => void} callback */
export function onLocalePreferenceChanged(callback) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[LANGUAGE_STORAGE_KEY]) {
      callback(changes[LANGUAGE_STORAGE_KEY].newValue || 'auto');
    }
  });
}

/**
 * @param {string} locale
 * @param {string} key
 * @param {Record<string, string>} [params]
 */
export function translate(locale, key, params) {
  const dict = MESSAGES[locale] || MESSAGES[DEFAULT_LOCALE];
  let str = dict[key] ?? MESSAGES[DEFAULT_LOCALE][key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      str = str.replaceAll(`{${name}}`, value);
    }
  }
  return str;
}
