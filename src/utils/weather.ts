import { Forecast } from "../../types/forecast"

export const getForecast = () => fetch('/api/weather').then(r => r.json()) as Promise<Forecast>
