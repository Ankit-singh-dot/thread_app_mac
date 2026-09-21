import { BaseChart } from "./BaseChart";

type StatCardProps = {
  title: string;
  subtitle: string;
  data: { value: number | undefined }[]; // Chart ka data
  fillColor: string;
  strokeColor: string;
  onClick: () => void;
};
export function StatCard(props: StatCardProps) {
  return (
    <div
      onClick={props.onClick}
      className="bg-zinc-900 rounded-2xl p-5 flex flex-col gap-4 border border-zinc-800"
    >
      <div>
        <h3 className="text-white text-lg font-bold">{props.title}</h3>
        <p className="text-zinc-400 text-sm">{props.subtitle}</p>
      </div>

      <div className="h-16 w-full">
        <BaseChart
          data={props.data}
          showGrid={false}
          fillColor={props.fillColor}
          strokeColor={props.strokeColor}
        />
      </div>
    </div>
  );
}
