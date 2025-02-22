const config: {
  AMADEUS_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
} = {
  AMADEUS_URL: "https://test.api.amadeus.com",
  CLIENT_ID: process.env.REACT_APP_AMADEUS_API_KEY || "",
  CLIENT_SECRET: process.env.REACT_APP_AMADEUS_API_SECRET || "",
};

export default config;
