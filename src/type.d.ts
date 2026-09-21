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

type View = "CPU" | "RAM" | "STORAGE";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
};

interface Window {
  electron: {
    subscribeStatics: (
      callback: (Statistics: Statistics) => void
    ) => unsubscribe;
    getStaticsData: () => Promise<StaticData>;

    subscribeChangeView: (callback: (view: View) => void) => unsubscribe;
    getStaticsData: () => Promise<StaticData>;
  };
}
