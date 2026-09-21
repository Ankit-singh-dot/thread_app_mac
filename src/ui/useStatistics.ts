import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number) {
  const [value, setValue] = useState<Statistics[]>([]);
  useEffect(() => {
    const unsubscribe = window.electron?.subscribeStatics?.((stats) => {
      setValue((prev) => {
        const newData = [...prev, stats];
        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      });
    });
    return () => {
      unsubscribe?.();
    };
  }, []);
  return value;
}

export default useStatistics;
