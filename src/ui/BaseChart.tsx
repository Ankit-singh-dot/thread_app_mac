import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type BaseChartProps = {
  data: {
    value: number | undefined;
  }[];
  showGrid?: boolean;
  fillColor?: string;
  strokeColor?: string;
};

export function BaseChart(props: BaseChartProps) {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart data={props.data}>
        

        {props.showGrid && (
          <CartesianGrid stroke="#333" strokeDasharray="5 5" fill="#1C1C1C" />
        )}

        <Area
          fillOpacity={0.8} // Thoda dark color bhara hai
          fill={props.fillColor || "#0A4D5C"} // Card se naya color aayega
          stroke={props.strokeColor || "#5DD4EE"}
          strokeWidth={3}
          type={"monotone"}
          dataKey="value"
          isAnimationActive={false}
        />
        
        {props.showGrid && <XAxis stroke="transparent" height={60} />}
        {props.showGrid && <YAxis domain={[0, 100]} stroke="transparent" width={0} />}
      </AreaChart>
    </ResponsiveContainer>
  );
}
