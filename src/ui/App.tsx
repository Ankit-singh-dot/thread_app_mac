import { useEffect, useMemo, useState } from "react";

import "./App.css";
import useStatistics from "./useStatistics";
import { Chart } from "./Chart";
// import { BaseChart } from "./BaseChart";

function App() {
  const statistics = useStatistics(10);
  console.log(statistics);
  const [activeView, setActiveView] = useState<View>("CPU");
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );

  const activeSwitch = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);
  useEffect(() => {
    window.electron.subscribeChangeView((view) => {
      setActiveView(view);
    });
  });
  useEffect(() => {
    async function fetchSpecs() {
      const specs = await window.electron?.getStaticsData();
      console.log("My pc spec", specs);
    }
    fetchSpecs();
  }, []);

  return (
    <div className="app">
      <div style={{ height: 120 }}>
        <Chart data={activeSwitch} maxPointData={10} />
      </div>
    </div>
  );
}

export default App;
