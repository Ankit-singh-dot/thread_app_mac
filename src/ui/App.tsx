import { useEffect } from "react";

import "./App.css";
import { BaseChart } from "./BaseChart";

function App() {
  useEffect(() => {
    const unsubscribe = window.electron?.subscribeStatics?.((stats) => {
      console.log(stats);
    });
    return () => {
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    async function fetchSpecs() {
      const specs = await window.electron?.getStaticsData();
      console.log("My pc spec", specs);
    }
    fetchSpecs();
  }, []);

  return (
    <div className="app">
      <div style={{ height: 400 }}>
        <BaseChart
          data={[{ value: 10 }, { value: 30 }, { value: 60 }, { value: 100 }]}
        ></BaseChart>
      </div>

      <div className="naming"> hello</div>
    </div>
  );
}

export default App;
