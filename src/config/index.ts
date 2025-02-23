const config: {
  AMADEUS_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  CACHE_EXPIRY: number;
} = {
  AMADEUS_URL: "https://test.api.amadeus.com",
  CLIENT_ID: process.env.REACT_APP_AMADEUS_API_KEY || "",
  CLIENT_SECRET: process.env.REACT_APP_AMADEUS_API_SECRET || "",
  CACHE_EXPIRY: 10 * 60 * 1000,
};

export default config;
