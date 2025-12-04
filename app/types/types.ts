export type EnergySources = {
  biomass: number;
  coal: number;
  gas: number;
  hydro: number;
  imports: number;
  nuclear: number;
  other: number;
  solar: number;
  wind: number;
};

export type EnergyData = {
  avg: EnergySources;
  clean: number;
};
//chart type
export type PieDataItem = {
  data: { name: string; value: number }[];
  clean: number;
};

export type OptimalChargeData = {
  averagePercentage: number;
  start: Date;
  to: Date;
};
