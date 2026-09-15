import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getUIpath, ipcHandle, isDev } from "./utils.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
import { getStaticData } from "./resourceManager.js";
type test = string;
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    // our browser doesn't contact to node
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    const indexPath = path.join(getUIpath());
    mainWindow.loadFile(indexPath);
    console.log("App path:", app.getAppPath());
    console.log("Loading:", indexPath);
  }
  pollResources(mainWindow);

  ipcHandle("getStaticData", () => {
    return getStaticData();
  });
});
