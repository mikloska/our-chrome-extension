let color = '#3aa757';
const imgUrl = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  chrome.storage.sync.set({ imgUrl });
});
