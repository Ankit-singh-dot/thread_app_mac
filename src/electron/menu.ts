import { app, BrowserWindow, Menu } from "electron";
import { Label } from "recharts";
import { ipcWebContentsSend, isDev } from "./utils.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "App",
        type: "submenu",
        submenu: [
          {
            label: "quit",
            click: app.quit,
          },
          {
            label: "DevTools",
            click: () => {
              mainWindow.webContents.openDevTools();
            },
            visible: isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "CPU"),
          },
          {
            label: "RAM",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "RAM"),
          },
          {
            label: "STORAGE",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "STORAGE"),
          },
        ],
      },
    ])
  );
}
