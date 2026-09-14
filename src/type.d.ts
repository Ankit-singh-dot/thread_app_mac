type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
};

interface Window {
  electron: {
    subscribeStatics: (callback: (Statistics: Statistics) => void) => void;
    getStaticsData: () => Promise<StaticData>;
  };
}
