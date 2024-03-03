export interface Forecast {
    forecastTime: string,
    predictions: Prediction[]
}

export interface Prediction {
    hours: number,
    url: string,
}
