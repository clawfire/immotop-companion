import { getBlockedSellers, onBlockedSellersChanged } from '../shared/storage.js';

async function updateBadge(list) {
  await chrome.action.setBadgeText({ text: list.length > 0 ? String(list.length) : '' });
  await chrome.action.setBadgeBackgroundColor({ color: '#b42318' });
}

getBlockedSellers().then(updateBadge);
onBlockedSellersChanged(updateBadge);
