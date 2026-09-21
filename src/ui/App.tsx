import { useEffect, useMemo } from "react";

import "./App.css";
import useStatistics from "./useStatistics";
import { Chart } from "./Chart";
// import { BaseChart } from "./BaseChart";

function App() {
  const statistics = useStatistics(10);
  console.log(statistics);
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
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
        <Chart data={cpuUsages} maxPointData={10} />
      </div>
      <div className="naming"> hello</div>
    </div>
  );
}

export default App;
