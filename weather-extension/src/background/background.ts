import { setStorageCities, setStorageOptions } from '../shared/weather.storage';

chrome.runtime.onInstalled.addListener(() => {
  setStorageCities([]);
  setStorageOptions({
    tempScale: 'metric',
    homeCity: '',
    hasAutoOverlay: false,
  });
});
