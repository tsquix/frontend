import EnergyMix from "@/app/energy-mix/page";
import { render, screen, waitFor } from "@testing-library/react";

import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("fetches data and renders charts", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      {
        avg: {
          biomass: 9.3,
          coal: 0,
          imports: 9.9,
          gas: 36.7,
          nuclear: 12.5,
          other: 0,
          hydro: 0,
          solar: 0,
          wind: 31.6,
        },
        clean: 53.4,
      },
      {
        avg: {
          biomass: 9.3,
          coal: 0,
          imports: 9.9,
          gas: 36.7,
          nuclear: 12.5,
          other: 0,
          hydro: 0,
          solar: 0,
          wind: 31.6,
        },
        clean: 52.4,
      },
      {
        avg: {
          biomass: 9.3,
          coal: 0,
          imports: 9.9,
          gas: 36.7,
          nuclear: 12.5,
          other: 0,
          hydro: 0,
          solar: 0,
          wind: 31.6,
        },
        clean: 51.4,
      },
    ],
  });
  render(<EnergyMix />);

  //checkloading spinner
  expect(screen.getByRole("status")).toBeInTheDocument();

  await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://backend-mxg2.onrender.com/api/generationMix"
    );
  });

  //check if h1 is displayed
  await waitFor(() => {
    expect(screen.getByText(/Miks energetyczny/i)).toBeInTheDocument();
  });

  //check if chart's header is displayed
  await waitFor(() => {
    expect(
      screen.getByText(/procent czystej energii: 53.4 %/i)
    ).toBeInTheDocument();
  });

  // check if charts got rendered
  expect(screen.getByText("coal")).toBeInTheDocument();
});
