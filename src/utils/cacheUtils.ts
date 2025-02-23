import config from "../config";

export const getFlightCacheKey = (origin: string, departureDate: string) => {
  return `flight_cache_${origin}_${departureDate || "any"}`;
};

export const isFlightCacheValid = (
  origin: string,
  departureDate: string
): boolean => {
  const cacheKey = getFlightCacheKey(origin, departureDate);
  const cachedData = sessionStorage.getItem(cacheKey);
  if (!cachedData) return false;

  const { timestamp } = JSON.parse(cachedData);
  return Date.now() - timestamp < config.CACHE_EXPIRY;
};

export const setInCache = (key: string, data: any) =>
  sessionStorage.setItem(
    key,
    JSON.stringify({
      flights: data,
      timestamp: Date.now(),
    })
  );

export const getFromCache = (key: string) =>
  JSON.parse(sessionStorage.getItem(key)!);
