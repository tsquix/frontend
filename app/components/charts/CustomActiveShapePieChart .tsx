import { PieDataItem } from "@/app/types/types";
import { Pie, PieChart, Sector, Tooltip } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { TooltipIndex } from "recharts/types/state/tooltipSlice";
const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {" "}
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function CustomActiveShapePieChart({
  isAnimationActive = true,
  defaultIndex = undefined,
  data,
}: {
  data: PieDataItem;
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ width: 640, height: 640 }}
      className="flex flex-col items-center"
    >
      <div className="-mb-24 text-center">
        <h1 className="text-xl font-semibold">Wykres na Dziś</h1>
        <p>procent czystej energii: {data.clean} %</p>
      </div>

      <PieChart
        width={600}
        height={600}
        margin={{ top: 0, right: 120, bottom: 0, left: 120 }}
      >
        <Pie
          activeShape={renderActiveShape}
          data={data?.data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={isAnimationActive}
        />
        <Tooltip content={() => null} defaultIndex={defaultIndex} />
      </PieChart>
    </div>
  );
}
