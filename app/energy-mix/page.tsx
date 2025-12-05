"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { EnergyData, PieDataItem } from "../types/types";
import Header from "../components/Header";
import CustomActiveShapePieChart from "../components/charts/CustomActiveShapePieChart ";
import PieChartDefaultIndex from "../components/charts/PieChartDefaultIndex";
import PieChartWithCustomizedLabel from "../components/charts/PieChartWithCustomizedLabel";
import LoadingSpinner from "../components/LoadingSpinner";

const EnergyMix = () => {
  const [data, setData] = useState<PieDataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setIsLoading(true);
        const res = await axios.get<EnergyData[]>(
          "https://backend-mxg2.onrender.com/api/generationMix"
        );
        // console.log(res.data);
        if (res.data) {
          setData(formatAllForPie(res.data));
        }
      } catch (err) {
        console.log(err || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="custom-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="mb-12 text-2xl font-bold">Miks energetyczny</h1>
            {/* charts done using recharts docs examples: https://recharts.github.io/en-US/examples/CustomActiveShapePieChart/ */}

            {/* first chart */}
            <CustomActiveShapePieChart data={data[0]} />
            {/* second chart */}
            {/* negative margin to shrink first chart container  */}
            <PieChartDefaultIndex data={data[1]} className={"mb-24 -mt-32"} />
            {/* third chart */}
            <PieChartWithCustomizedLabel data={data[2]} />
          </div>
        )}
      </div>
    </>
  );
};

export default EnergyMix;
