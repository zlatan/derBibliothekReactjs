import axios from 'axios';

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather() {
  const url = 'http://localhost:8090/api/book?size=2&page=0';
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
