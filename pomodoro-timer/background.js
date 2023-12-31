chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "pomodoroTimer") return;

  chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
    if (res.isRunning) {
      let timer = res.timer + 1;
      let isRunning = true;
      if (timer == 60 * res.timeOption) {
        this.registration.showNotification("Pomodoro Timer", {
          body: `${res.timeOption} minutes has passed!`,
          icon: "icon.png",
        });
        timer = 0;
        isRunning = false;
      }
      chrome.storage.local.set({
        timer,
        isRunning,
      });
    }
  });
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: res?.timer ?? 0,
    isRunning: res?.isRunning ?? false,
    timeOption: res?.timeOption ?? 25,
  });
});
