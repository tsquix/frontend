"use client";
import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { OptimalChargeData } from "../types/types";

const OptimalChargeRange = () => {
  const [range, setRange] = useState<number | "">("");
  const [data, setData] = useState<OptimalChargeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(Number(range) > 0 && Number(range) < 7)) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get<OptimalChargeData>(
          "https://backend-mxg2.onrender.com/api/optimalChargeRange",
          {
            params: { hours: range },
          }
        );
        setRange("");
        if (res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.log(err || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  return (
    <>
      <Header />
      <div className="custom-container">
        <div className="flex flex-col">
          {/*  */}
          {/* form */}
          {/*  */}
          <div className="w-full max-w-sm min-w-[200px] flex flex-col mb-12">
            <form onSubmit={handleMessage}>
              <label htmlFor="range">Podaj zakres ładowania (1-6h)</label>
              <input
                type="number"
                id="range"
                min={1}
                max={6}
                value={range}
                onChange={(e) =>
                  setRange(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full bg-transparent  text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
                required
              />
              <button
                role="button"
                type="submit"
                className={`text-white bg-linear-to-r  font-medium rounded-base text-sm px-4 py-2.5 cursor-pointer ${
                  isLoading
                    ? "from-gray-500 via-gray-600 to-gray-700"
                    : "from-blue-500 via-blue-600 to-blue-700"
                }`}
                disabled={isLoading}
              >
                Zatwierdz
              </button>
            </form>
          </div>
          {/*  */}
          {/* display data */}
          {/*  */}
          {data && !isLoading && (
            <div className=" bg-gray-50 shadow-lg p-4 gap-y-4 flex flex-col">
              {/* format date */}
              <p>Data Rozpoczęcia: {new Date(data.start).toLocaleString()}</p>
              <p>Data Zakończenia: {new Date(data.to).toLocaleString()}</p>
              <p>
                Średni procent udziału czystej energii:{" "}
                {data.averagePercentage.toFixed(2)}%
              </p>
            </div>
          )}
          {/*  */}
          {/* loading skeleton */}
          {/*  */}
          {isLoading && (
            <div className=" bg-gray-50 shadow-lg p-4 gap-y-4 flex flex-col">
              <div className="flex gap-2">
                <p> Data Rozpoczęcia: </p>
                <div className="bg-gray-200 px-18 animate-pulse rounded-lg" />
              </div>
              <div className="flex gap-2">
                <p> Data Zakończenia: </p>
                <div className="bg-gray-200 px-18 animate-pulse rounded-lg" />
              </div>
              <div className="flex gap-2">
                <p> Średni procent udziału czystej energii:</p>
                <div className="bg-gray-200 px-6 animate-pulse rounded-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OptimalChargeRange;
