import { useEffect, useMemo, useState } from "react";

import "./App.css";
import useStatistics from "./useStatistics";
import { Chart } from "./Chart";
import { StatCard } from "./StatCard";


function App() {
  const statistics = useStatistics(10);
  console.log(statistics);
  const [activeView, setActiveView] = useState<View>("CPU");
  const cpuUsages = useMemo(
    () => statistics.map((stat) => ({ value: stat.cpuUsage })),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => ({ value: stat.ramUsage })),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => ({ value: stat.storageUsage })),
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

  // return (

  // );

  return (
    <main className="h-screen w-screen bg-zinc-950 text-white p-6 flex gap-6">
      <div className="w-1/3 flex flex-col gap-4">
        <StatCard
          title="CPU"
          subtitle="Apple M1" // Isko next step mein real data se replace karenge
          data={cpuUsages}
          fillColor="#0ea5e9" // Tailwind sky-500
          strokeColor="#38bdf8" // Tailwind sky-400
          onClick={() => setActiveView("CPU")}
        />
        <StatCard
          title="RAM"
          subtitle="8 GB"
          data={ramUsages}
          fillColor="#f97316" // Tailwind orange-500
          strokeColor="#fb923c" // Tailwind orange-400
          onClick={() => setActiveView("RAM")}
        />
        <StatCard
          title="STORAGE"
          subtitle="245 GB"
          data={storageUsages}
          fillColor="#22c55e" // Tailwind green-500
          strokeColor="#4ade80" // Tailwind green-400
          onClick={() => setActiveView("STORAGE")}
        />
      </div>
      <div className="w-2/3 bg-zinc-900 rounded-xl border border-zinc-800 p-4 flex flex-col min-h-[400px]">
        {/* Extra divs hata diye, ab chart ko direct poori jagah milegi */}
        <div className="w-full flex-1">
          <Chart data={activeSwitch} maxPointData={10} />
        </div>
      </div>
    </main>
  );
}

export default App;
