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

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

interface Window {
  electron: {
    subscribeStatics: (
      callback: (Statistics: Statistics) => void
    ) => unsubscribe;
    getStaticsData: () => Promise<StaticData>;
  };
}
