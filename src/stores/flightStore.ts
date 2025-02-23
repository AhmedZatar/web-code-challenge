import { makeAutoObservable, runInAction } from "mobx";
import debounce from "lodash/debounce";

import flightService from "../services/flightService";

import { TableData } from "../types/tableTypes";
import { Flight } from "../types/apiTypes";

import { titleCase } from "../utils/stringUtils";
import {
  getFlightCacheKey,
  isFlightCacheValid,
  setInCache,
  getFromCache,
} from "../utils/cacheUtils";

class FlightStore {
  public flights: TableData[] = [];
  public loading: boolean = false;
  public error: string | null = null;
  public editedCells: Set<string> = new Set();

  private originalFlights: TableData[] = [];
  private token: string | null = null;
  private columnFilters: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    await this.fetchFlights("MAD");
  }

  private async fetchToken() {
    try {
      const token = await flightService.fetchToken();

      runInAction(() => {
        this.token = token;
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to get API token.";
      });
    }
  }

  public async fetchFlights(
    origin: string,
    departureDate: string = ""
  ): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    const cacheKey = getFlightCacheKey(origin, departureDate);

    if (isFlightCacheValid(origin, departureDate)) {
      const cachedData = getFromCache(cacheKey);
      runInAction(() => {
        this.flights = cachedData.flights;
        this.originalFlights = cachedData.flights;
        this.editedCells = new Set();
        this.loading = false;
      });
      return;
    }

    if (!this.token) await this.fetchToken();

    try {
      const response = await flightService.fetchFlights(
        this.token!,
        origin,
        departureDate
      );

      runInAction(() => {
        const locations = response.dictionaries?.locations;

        const flightsData = response.data.map(
          (flight: Flight, index: number) => ({
            id: String(index + 1),
            origin: `${flight.origin} (${titleCase(locations?.[flight.origin]?.detailedName)})`,
            destination: `${flight.destination} (${titleCase(
              locations?.[flight.destination]?.detailedName
            )})`,
            departureDate: flight.departureDate,
            returnDate: flight.returnDate,
            price: `${flight.price?.total} \u20AC`,
          })
        );

        this.originalFlights = flightsData;
        this.flights = flightsData;
        this.editedCells = new Set();

        setInCache(cacheKey, flightsData);
      });
    } catch (err: any) {
      if (err.response?.status === 401) {
        await this.fetchToken();
        return this.fetchFlights(origin, departureDate);
      }
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to fetch flights.";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  public updateFlight(flightId: String, columnId: string, value: string) {
    const flightIndex = this.flights.findIndex((f) => f.id === flightId);
    const originalIndex = this.originalFlights.findIndex(
      (f) => f.id === flightId
    );

    if (flightIndex === -1 || originalIndex === -1) return;

    const oldValue = this.flights[flightIndex][columnId as keyof TableData];
    if (oldValue === value) return;

    this.flights[flightIndex] = {
      ...this.flights[flightIndex],
      [columnId]: value,
    };
    this.originalFlights[originalIndex] = {
      ...this.originalFlights[originalIndex],
      [columnId]: value,
    };

    this.editedCells.add(`${flightId}-${columnId}`);
  }

  public saveChanges() {
    this.editedCells.clear();
  }

  public debouncedFilter = debounce((column: string, value: string) => {
    this.columnFilters = {
      ...this.columnFilters,
      [column]: value,
    };

    this.flights = this.originalFlights.filter((row) =>
      Object.entries(this.columnFilters).every(([col, filterValue]) => {
        const cellValue = row[col as keyof TableData];

        if (col === "departureDate" || col === "returnDate") {
          const dateObj = new Date(cellValue);
          const formattedDate = `${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(
            dateObj.getDate()
          ).padStart(2, "0")}/${dateObj.getFullYear()}`;

          return formattedDate.includes(filterValue);
        }

        return cellValue
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );
  }, 300);
}

export const flightStore = new FlightStore();
