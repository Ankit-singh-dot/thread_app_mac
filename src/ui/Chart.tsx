import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

export type ChartProps = {
  data: { value: number }[];
  maxPointData: number;
};

export function Chart(props: ChartProps) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point.value * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxPointData - points.length }, () => ({
        value: undefined,
      })),
    ];
  }, [props.data]);

  return <BaseChart data={preparedData} showGrid={true} />;
}
