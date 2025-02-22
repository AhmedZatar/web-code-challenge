import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import debounce from "lodash/debounce";

import { TableData } from "../types/tableTypes";

import { titleCase } from "../utils/stringUtils";

const AMADEUS_API_URL = "https://test.api.amadeus.com";
const CLIENT_ID = process.env.REACT_APP_AMADEUS_API_KEY;
const CLIENT_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;
const CACHE_EXPIRY = 10 * 60 * 1000;

class FlightStore {
  flights: TableData[] = [];
  originalFlights: TableData[] = [];
  token: string | null = null;
  loading: boolean = false;
  error: string | null = null;
  editedCells: Set<string> = new Set();
  columnFilters: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    await this.fetchFlights("MAD");
  }

  async fetchToken() {
    try {
      const response = await axios.post(
        `${AMADEUS_API_URL}/v1/security/oauth2/token`,
        `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      runInAction(() => {
        this.token = response.data.access_token;
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to get API token.";
      });
    }
  }

  async fetchFlights(
    origin: string,
    departureDate: string = ""
  ): Promise<void> {
    const cacheKey = this.getCacheKey(origin, departureDate);

    if (this.isCacheValid(origin, departureDate)) {
      const cachedData = JSON.parse(sessionStorage.getItem(cacheKey)!);
      runInAction(() => {
        this.flights = cachedData.flights;
        this.originalFlights = cachedData.flights;
      });
      return;
    }

    if (!this.token) await this.fetchToken();
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await axios.get(
        `${AMADEUS_API_URL}/v1/shopping/flight-destinations`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
          params: { origin, departureDate: departureDate || undefined },
        }
      );

      if (response.status === 401) {
        await this.fetchToken();
        return this.fetchFlights(origin, departureDate);
      }

      runInAction(() => {
        const locations = response.data.dictionaries?.locations;

        const flightsData = response.data.data.map(
          (flight: any, index: number) => ({
            id: String(index + 1),
            origin: `${flight.origin} (${titleCase(
              locations?.[flight.origin]?.detailedName
            )})`,
            destination: `${flight.destination} (${titleCase(
              locations?.[flight.destination]?.detailedName || "-"
            )})`,
            departureDate: flight.departureDate,
            returnDate: flight.returnDate,
            price: `${flight.price?.total} \u20AC`,
          })
        );

        this.originalFlights = flightsData;
        this.flights = flightsData;
        this.editedCells = new Set();

        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ flights: flightsData, timestamp: Date.now() })
        );
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to fetch flights.";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  updateFlight(flightId: String, columnId: string, value: string) {
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

  saveChanges() {
    this.editedCells.clear();
  }

  debouncedFilter = debounce((column: string, value: string) => {
    this.columnFilters = { ...this.columnFilters, [column]: value };

    this.flights = this.originalFlights.filter((row) =>
      Object.entries(this.columnFilters).every(([col, filterValue]) => {
        const cellValue = row[col as keyof TableData];

        if (col === "departureDate" || col === "returnDate") {
          const dateObj = new Date(cellValue);
          const formattedDate = `${String(dateObj.getMonth() + 1).padStart(
            2,
            "0"
          )}/${String(dateObj.getDate()).padStart(
            2,
            "0"
          )}/${dateObj.getFullYear()}`;

          return formattedDate.includes(filterValue);
        }

        return cellValue
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );
  }, 300);

  getCacheKey(origin: string, departureDate: string) {
    return `flight_cache_${origin}_${departureDate || "any"}`;
  }

  isCacheValid(origin: string, departureDate: string): boolean {
    const cacheKey = this.getCacheKey(origin, departureDate);
    const cachedData = sessionStorage.getItem(cacheKey);
    if (!cachedData) return false;

    const { timestamp } = JSON.parse(cachedData);
    return Date.now() - timestamp < CACHE_EXPIRY;
  }
}

export const flightStore = new FlightStore();
