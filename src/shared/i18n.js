export const SUPPORTED_LOCALES = ['fr', 'de', 'en', 'pt', 'lb'];
export const DEFAULT_LOCALE = 'fr';
const LANGUAGE_STORAGE_KEY = 'language';

const MESSAGES = {
  fr: {
    'tabs.list': 'Annonces',
    'tabs.settings': 'Réglages',
    'toolbar.export': 'Exporter',
    'common.close': 'Fermer',
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
    'settings.syncTitle': 'Synchro smartphone',
    'settings.syncDisclaimer':
      "Clique automatiquement sur le bouton « masquer » natif d'immotop.lu pour chaque annonce des vendeurs bloqués, afin qu'elle disparaisse aussi de l'app mobile. Fonctionnement différent du masquage de l'extension : nécessite d'être connecté à votre compte immotop.lu, l'action est liée à ce compte (pas seulement à ce navigateur) et n'est pas annulée automatiquement quand vous débloquez un vendeur.",
    'content.syncLoginWarning': 'Synchro smartphone : connectez-vous à votre compte immotop.lu pour l’activer.',
    'card.unblockRestoreHint':
      'La synchro smartphone était active : les annonces de « {name} » restent masquées sur immotop.lu. Pour les restaurer :',
    'card.unblockRestoreLink': 'Ouvrir mes annonces masquées',
    'settings.syncLoginRequired': "Connectez-vous à votre compte immotop.lu pour pouvoir l'activer.",
    'settings.syncLoginRequiredLink': 'Ouvrir immotop.lu',
    'restore.bannerText': 'Vendeur retiré du blocage : « {name} ». {count} annonce(s) masquée(s) trouvée(s) sur cette page.',
    'restore.bannerAction': 'Restaurer ces annonces',
    'restore.bannerDismiss': 'Terminé',
    'restore.bannerDone': "{count} annonce(s) de « {name} » restaurée(s) sur cette page. D'autres apparaîtront ici si tu fais défiler ou changes de page.",
  },
  de: {
    'tabs.list': 'Anzeigen',
    'tabs.settings': 'Einstellungen',
    'toolbar.export': 'Exportieren',
    'common.close': 'Schließen',
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
    'settings.syncTitle': 'Smartphone-Synchronisierung',
    'settings.syncDisclaimer':
      'Klickt automatisch auf die native „Ausblenden“-Schaltfläche von immotop.lu für jede Anzeige blockierter Anbieter, damit sie auch in der mobilen App verschwindet. Funktioniert anders als das Ausblenden der Erweiterung: Sie müssen bei Ihrem immotop.lu-Konto angemeldet sein, die Aktion ist an dieses Konto gebunden (nicht nur an diesen Browser) und wird beim Entsperren eines Anbieters nicht automatisch rückgängig gemacht.',
    'content.syncLoginWarning': 'Smartphone-Synchronisierung: Melden Sie sich bei Ihrem immotop.lu-Konto an, um sie zu aktivieren.',
    'card.unblockRestoreHint':
      'Die Smartphone-Synchronisierung war aktiv: Die Anzeigen von „{name}“ bleiben auf immotop.lu ausgeblendet. Zum Wiederherstellen:',
    'card.unblockRestoreLink': 'Meine ausgeblendeten Anzeigen öffnen',
    'settings.syncLoginRequired': 'Melden Sie sich bei Ihrem immotop.lu-Konto an, um sie zu aktivieren.',
    'settings.syncLoginRequiredLink': 'immotop.lu öffnen',
    'restore.bannerText': 'Anbieter entsperrt: „{name}“. {count} ausgeblendete Anzeige(n) auf dieser Seite gefunden.',
    'restore.bannerAction': 'Diese Anzeigen wiederherstellen',
    'restore.bannerDismiss': 'Fertig',
    'restore.bannerDone': '{count} Anzeige(n) von „{name}“ auf dieser Seite wiederhergestellt. Weitere erscheinen hier beim Scrollen oder Seitenwechsel.',
  },
  en: {
    'tabs.list': 'Listings',
    'tabs.settings': 'Settings',
    'toolbar.export': 'Export',
    'common.close': 'Close',
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
    'settings.syncTitle': 'Smartphone sync',
    'settings.syncDisclaimer':
      'Automatically clicks immotop.lu\'s native "hide" button for every listing from blocked sellers, so it also disappears from the mobile app. Works differently from the extension\'s own masking: you must be signed in to your immotop.lu account, the action is tied to that account (not just this browser), and it isn\'t automatically undone when you unblock a seller.',
    'content.syncLoginWarning': 'Smartphone sync: sign in to your immotop.lu account to enable it.',
    'card.unblockRestoreHint':
      'Smartphone sync was on: listings from "{name}" remain hidden on immotop.lu. To restore them:',
    'card.unblockRestoreLink': 'Open my hidden listings',
    'settings.syncLoginRequired': 'Sign in to your immotop.lu account to enable it.',
    'settings.syncLoginRequiredLink': 'Open immotop.lu',
    'restore.bannerText': 'Seller unblocked: "{name}". {count} hidden listing(s) found on this page.',
    'restore.bannerAction': 'Restore these listings',
    'restore.bannerDismiss': 'Done',
    'restore.bannerDone': '{count} listing(s) from "{name}" restored on this page. More will appear here as you scroll or change page.',
  },
  pt: {
    'tabs.list': 'Anúncios',
    'tabs.settings': 'Definições',
    'toolbar.export': 'Exportar',
    'common.close': 'Fechar',
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
    'settings.syncTitle': 'Sincronização com smartphone',
    'settings.syncDisclaimer':
      'Clica automaticamente no botão nativo «ocultar» do immotop.lu para cada anúncio de vendedores bloqueados, para que também desapareça da aplicação móvel. Funciona de forma diferente do mascaramento da extensão: é necessário estar autenticado na sua conta immotop.lu, a ação fica associada a essa conta (não apenas a este navegador) e não é anulada automaticamente quando desbloqueia um vendedor.',
    'content.syncLoginWarning': 'Sincronização com smartphone: inicie sessão na sua conta immotop.lu para a ativar.',
    'card.unblockRestoreHint':
      'A sincronização com smartphone estava ativa: os anúncios de «{name}» continuam ocultos no immotop.lu. Para os restaurar:',
    'card.unblockRestoreLink': 'Abrir os meus anúncios ocultos',
    'settings.syncLoginRequired': 'Inicie sessão na sua conta immotop.lu para poder ativá-la.',
    'settings.syncLoginRequiredLink': 'Abrir immotop.lu',
    'restore.bannerText': 'Vendedor desbloqueado: «{name}». {count} anúncio(s) ocultado(s) encontrado(s) nesta página.',
    'restore.bannerAction': 'Restaurar estes anúncios',
    'restore.bannerDismiss': 'Concluído',
    'restore.bannerDone': '{count} anúncio(s) de «{name}» restaurado(s) nesta página. Mais aparecerão aqui ao percorrer ou mudar de página.',
  },
  lb: {
    'tabs.list': 'Annoncen',
    'tabs.settings': 'Astellungen',
    'toolbar.export': 'Exportéieren',
    'common.close': 'Zoumaachen',
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
    'settings.syncTitle': 'Smartphone-Synchro',
    'settings.syncDisclaimer':
      'Klickt automatesch op de native „verstoppen“-Knäppchen vun immotop.lu fir all Annonce vu blockéierte Verkeefer, domat se och an der Handy-App verschwënnt. Funktionéiert anescht wéi d\'Verstoppen vun der Extension: Dir musst an Ärem immotop.lu-Kont ageloggt sinn, d\'Aktioun ass un dëse Kont gebonnen (net nëmmen un dëse Browser) a gëtt net automatesch réckgängeg gemaach wann Dir e Verkeefer entsperrt.',
    'content.syncLoginWarning': 'Smartphone-Synchro: loggt Iech an Ärem immotop.lu-Kont an fir se z\'aktivéieren.',
    'card.unblockRestoreHint':
      'D\'Smartphone-Synchro war aktiv: D\'Annoncen vu „{name}“ bleiwen op immotop.lu verstoppt. Fir se erëmhierzestellen:',
    'card.unblockRestoreLink': 'Meng verstoppt Annoncen opmaachen',
    'settings.syncLoginRequired': "Loggt Iech an Ärem immotop.lu-Kont an fir se z'aktivéieren.",
    'settings.syncLoginRequiredLink': 'immotop.lu opmaachen',
    'restore.bannerText': 'Verkeefer entsperrt: „{name}“. {count} verstoppte Annonce(n) op dëser Säit fonnt.',
    'restore.bannerAction': 'Dës Annoncen erëmhierstellen',
    'restore.bannerDismiss': 'Fäerdeg',
    'restore.bannerDone': '{count} Annonce(n) vu „{name}“ op dëser Säit erëmhiergestallt. Weider erschéngen hei beim Scrollen oder Säit wiesselen.',
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
