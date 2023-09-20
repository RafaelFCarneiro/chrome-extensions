chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ shows: [] });
  chrome.contextMenus.create({
    title: "Search TV Show",
    id: "contextMenuTvShow",
    contexts: ["page", "selection"],
  });
  chrome.contextMenus.create({
    title: "Read This Text",
    id: "contextMenuTts",
    contexts: ["page", "selection"],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "contextMenuTvShow") {
      fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
      .then((res) => res.json())
      .then((shows) => {
        console.log(shows);
        chrome.storage.local.set({ shows });
      });
    } else if (event.menuItemId == "contextMenuTts") {
      chrome.tts.speak(event.selectionText, {
        lang: "en-US",
        rate: 0.5,
      });
    }
  });
});
