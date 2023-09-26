import { fetchWeatherByCityName } from '../shared/open-weather.api';
import {
  getStorageCities,
  setStorageCities,
  setStorageOptions,
  getStorageOptions,
} from '../shared/weather.storage';

chrome.runtime.onInstalled.addListener(() => {
  setStorageCities([]);
  setStorageOptions({
    tempScale: 'metric',
    homeCity: '',
    hasAutoOverlay: false,
  });

  chrome.contextMenus.create({
    id: 'weather-extension',
    title: 'Add city to weather extension',
    contexts: ['selection'],
  });

  chrome.alarms.create('update-weather', { periodInMinutes: 1 / 6 });
});

chrome.contextMenus.onClicked.addListener((info) => {
  getStorageCities().then((cities) => {
    if (info.menuItemId === 'weather-extension') {
      const city = info.selectionText;
      if (!cities.includes(city)) {
        setStorageCities([...cities, city]);
      }
    }
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStorageOptions().then((options) => {
    if (!options.homeCity.length) return;
    fetchWeatherByCityName(options.homeCity, options.tempScale).then(
      (weather) => {
        const temp = Math.round(weather.main.temp);
        const symbol = options.tempScale === 'metric' ? '°C' : '°F';
        chrome.action.setBadgeText({ text: `${temp}${symbol}` });
      }
    );
  });  
});

