export const STORAGE_KEY = 'blockedSellers';

/** @typedef {{ id: string, name: string, logo: string, addedAt: number }} BlockedSeller */

/** @returns {Promise<BlockedSeller[]>} */
export async function getBlockedSellers() {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  return Array.isArray(data[STORAGE_KEY]) ? data[STORAGE_KEY] : [];
}

/** @param {BlockedSeller[]} list */
export async function saveBlockedSellers(list) {
  await chrome.storage.local.set({ [STORAGE_KEY]: list });
}

/** @param {{ id: string, name: string, logo: string }} seller */
export async function addBlockedSeller(seller) {
  const list = await getBlockedSellers();
  if (list.some((s) => s.id === seller.id)) return list;
  const next = [...list, { ...seller, addedAt: Date.now() }];
  await saveBlockedSellers(next);
  return next;
}

/** @param {string} id */
export async function removeBlockedSeller(id) {
  const list = await getBlockedSellers();
  const next = list.filter((s) => s.id !== id);
  await saveBlockedSellers(next);
  return next;
}

/**
 * Merge sellers from an import, keeping the original addedAt for existing entries.
 * @param {Array<{ id: string, name: string, logo: string, addedAt?: number }>} sellers
 */
export async function mergeBlockedSellers(sellers) {
  const list = await getBlockedSellers();
  const byId = new Map(list.map((s) => [s.id, s]));
  for (const seller of sellers) {
    if (!seller || !seller.id || !seller.name) continue;
    const existing = byId.get(seller.id);
    byId.set(seller.id, {
      id: seller.id,
      name: seller.name,
      logo: seller.logo || existing?.logo || '',
      addedAt: existing?.addedAt ?? seller.addedAt ?? Date.now(),
    });
  }
  const next = [...byId.values()];
  await saveBlockedSellers(next);
  return next;
}

/** @param {(list: BlockedSeller[]) => void} callback */
export function onBlockedSellersChanged(callback) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[STORAGE_KEY]) {
      callback(changes[STORAGE_KEY].newValue || []);
    }
  });
}
