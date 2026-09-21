import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath } from "./utils.js";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssetPath(), "tray_icon.png"));
  tray.setContextMenu( 
    Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit(),
      },
      {
        label: "show",
        click: () => {
          mainWindow.show();
          if (app.dock) {
            app.dock.show();
          }
        },
      },
    ])
  );
}
