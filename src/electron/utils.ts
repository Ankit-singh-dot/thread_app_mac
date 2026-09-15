import { app, ipcMain, WebContents, WebFrameMain } from "electron";
import path from "path";
import { pathToFileURL } from "url";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function getUIpath() {
  return path.join(app.getAppPath(), "/dist-react", "index.html");
}

export function validateEventFrame(frame: WebFrameMain | null) {
  if (!frame) {
    throw new Error("Malicious event: sender frame does not exist");
  }
  if (isDev() && new URL(frame.url).host === "localhost:5173") {
    return;
  }
  if (frame.url !== pathToFileURL(getUIpath()).toString()) {
    throw new Error("Malicious event");
  }
}
