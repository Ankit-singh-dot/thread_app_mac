const electron = require("electron");
function ipcRendererInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (_event: any, payload: any) =>
    callback(payload)
  );
}
electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatics: (callback) => {
    const listener = (_events: any, stats: any) => callback(stats);
    electron.ipcRenderer.on("statistics", listener);
    return () => {
      electron.ipcRenderer.off("statistics", listener);
    };
  },
  getStaticsData: () => ipcRendererInvoke("getStaticData"),
} satisfies Window["electron"]);
