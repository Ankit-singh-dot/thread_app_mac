import osUtils from "os-utils";
import fs from "fs";
import { cpuUsage } from "process";
const poling_interval = 500;
export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = await getRamUsage();
    const storageUsage = getStorageData();
    console.log({ cpuUsage, ramUsage, storageUsage: storageUsage.usage });
  }, poling_interval);
}
function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}
function getRamUsage() {
  return new Promise((resolve) => {
    resolve(1 - osUtils.freememPercentage());
  });
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "c://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 100_000_000),
    usage: 1 - free / total,
  };
}
