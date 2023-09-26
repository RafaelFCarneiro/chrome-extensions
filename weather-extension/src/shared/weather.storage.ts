import { OpenWeatherTempScale } from "./open-weather.api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity: string;
  tempScale: OpenWeatherTempScale;
}


export type LocalStorageKeys = keyof LocalStorage;

export function setStorageCities(cities: string[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ cities } as LocalStorage, () => {
      resolve();
    });
  });
}

export function getStorageCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (storage: LocalStorage) => {
      resolve(storage.cities);
    });
  });
}

export function setStorageOptions(options: LocalStorageOptions): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ options } as LocalStorage, () => {
      resolve();
    });
  });
}

export function getStorageOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (storage: LocalStorage) => {
      resolve(storage.options);
    });
  });
}