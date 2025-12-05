import axios from "axios";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OptimalChargeRange from "@/app/optimal-charge-range/page";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Page submit", () => {
  test("cheks input range constraints and fetch data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        start: "2025-01-01T12:00:00Z",
        to: "2025-01-01T15:00:00Z",
        averagePercentage: 53.25,
      },
    });

    render(<OptimalChargeRange />);

    const input = screen.getByLabelText(
      /Podaj zakres ładowania/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /zatwierdz/i });

    // enter incorrect value
    fireEvent.change(input, { target: { value: "7" } });
    fireEvent.click(button);
    expect(input.checkValidity()).toBe(false);
    expect(mockedAxios.get).not.toHaveBeenCalled();

    // enter incorrect value
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(button);
    expect(input.checkValidity()).toBe(false);
    expect(mockedAxios.get).not.toHaveBeenCalled();

    // enter correct value
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(button);
    expect(input.checkValidity()).toBe(true);

    // check if axios is invoked with param hours=3
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://backend-mxg2.onrender.com/api/optimalChargeRange",
        { params: { hours: 3 } }
      )
    );

    //check i results are visible after data fetch
    expect(await screen.findByText(/Średni procent/i)).toBeInTheDocument();
  });
});
