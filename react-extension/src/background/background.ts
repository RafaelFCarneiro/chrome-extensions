// TODO: background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
  sendResponse('From the background script');
});