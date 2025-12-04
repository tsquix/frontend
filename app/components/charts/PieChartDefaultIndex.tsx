import { PieDataItem } from "@/app/types/types";
import { Pie, PieChart, Tooltip } from "recharts";

export default function PieChartDefaultIndex({
  isAnimationActive = true,
  data,
  className,
}: {
  isAnimationActive?: boolean;
  data: PieDataItem;
  className: string;
}) {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`text-center ${className} `}>
      <h1 className="text-xl font-semibold">Wykres na Jutro</h1>
      <p>procent czystej energii: {data.clean} %</p>
      <PieChart width={400} height={400}>
        <Pie
          activeShape={{
            fill: "red",
          }}
          data={data?.data}
          dataKey="value"
          isAnimationActive={isAnimationActive}
        />
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
      </PieChart>
    </div>
  );
}
