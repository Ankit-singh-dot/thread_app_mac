const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatics: (callback) => {
    electron.ipcRenderer.on("statistics", (events: any, stats: any) => {
      callback(stats);
    });
  },
  getStaticsData: () => electron.ipcRenderer.invoke("getStaticsData"),
} satisfies Window["electron"]);
