import { PieDataItem } from "@/app/types/chartTypes";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = [
  "#0088FE",
  "#2a3533",
  "#ff6528",
  "#c89880",
  "#AF19FF",
  "#FF4560",
  "#26A69A",
  "#a9cbb8",
  "#FFC658",
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (!percent || percent === 0) return null;
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(1)}%`}
    </text>
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
  data,
}: {
  data: PieDataItem;
  isAnimationActive?: boolean;
}) {
  if (!data) return <div>Loading...</div>;

  return (
    <div
      style={{
        width: "400px",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1 className="text-xl font-semibold">Wykres na Pojutrze</h1>
      <p>procent czystej energii: {data.clean} %</p>
      <PieChart style={{ width: "100%", aspectRatio: 1 }}>
        <Pie
          data={data?.data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={isAnimationActive}
        >
          {data?.data.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "12px",
        }}
      >
        {data?.data.map((entry, i) => (
          <div
            key={entry.name}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: COLORS[i % COLORS.length],
                borderRadius: "3px",
              }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
