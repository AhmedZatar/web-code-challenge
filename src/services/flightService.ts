import axios from "axios";

import config from "../config";

export const fetchToken = async (): Promise<string> => {
  const response = await axios.post(
    `${config.AMADEUS_URL}/v1/security/oauth2/token`,
    `grant_type=client_credentials&client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

export const fetchFlights = async (
  token: string,
  origin: string,
  departureDate?: string
) => {
  const response = await axios.get(
    `${config.AMADEUS_URL}/v1/shopping/flight-destinations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        origin,
        departureDate: departureDate || undefined,
      },
    }
  );

  return response.data;
};

export default {
  fetchFlights,
  fetchToken,
};
