export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: {
    total: string;
  };
}

export interface FlightResponse {
  data: Flight[];
  dictionaries: {
    locations: {
      [key: string]: {
        detailedName: string;
      };
    };
  };
}
