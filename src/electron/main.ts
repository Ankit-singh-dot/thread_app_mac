import { app, BrowserWindow } from "electron";
import path from "path";
type test = string;
app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  const indexPath = path.join(app.getAppPath(), "dist-react", "index.html");
   console.log("App path:", app.getAppPath());
   console.log("Loading:", indexPath);
  mainWindow.loadFile(indexPath);
});
