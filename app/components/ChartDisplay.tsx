"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomActiveShapePieChart from "./charts/CustomActiveShapePieChart ";
import PieChartWithCustomizedLabel from "./charts/PieChartWithCustomizedLabel";
import PieChartDefaultIndex from "./charts/PieChartDefaultIndex";
import Header from "./Header";
import { EnergyData, PieDataItem } from "../types/chartTypes";

const ChartDisplay = () => {
  const [data, setData] = useState<PieDataItem[]>([]);

  // prepare data for piecharts
  const formatAllForPie = (arr: EnergyData[]): PieDataItem[] => {
    return arr.map((item) => ({
      data: Object.entries(item.avg).map(([name, value]) => ({
        name,
        value,
      })),
      clean: item.clean,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(
        //   "http://localhost:3000/api/optimalChargeRange"
        // );
        const res = await axios.get<EnergyData[]>(
          "http://localhost:3001/api/generationMix"
        );
        console.log(res.data);
        if (res.data) {
          setData(formatAllForPie(res.data));
        }
      } catch (err) {
        console.log(err || "Unknown error");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex md:px-24 xl:py-12 mx-auto max-w-7xl justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-12 text-2xl font-bold">Miks energetyczny</h1>
          {/* charts done using recharts docs examples: https://recharts.github.io/en-US/examples/CustomActiveShapePieChart/ */}
          <CustomActiveShapePieChart data={data[0]} />
          <PieChartDefaultIndex data={data[1]} className={"mb-12"} />
          <PieChartWithCustomizedLabel data={data[2]} />
        </div>
      </div>
    </>
  );
};

export default ChartDisplay;
