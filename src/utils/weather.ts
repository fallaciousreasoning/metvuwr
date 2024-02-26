import { getDate } from "./date"
import { fetchCors } from "./fetch"
import { range } from "./range"

const pad = (n: number, digits: number) => n.toString().padStart(digits, '0')

const getForecastUrl = (hour: number, forecast: string) => {
    return `https://www.metvuw.com/forecast/${forecast}/rain-nzsi-${forecast}-${pad(hour, 3)}.gif`
}

const parser = new DOMParser()
const getMostRecentForecastTime = async () => {
    const text = await fetchCors('https://metvuw.com/forecast/forecast.php?type=rain&region=nzsi&noofdays=1').then(r => r.text())
    const document = parser.parseFromString(text, 'text/html')
    const img = document.querySelector('img[src*=rain]')
    return img?.getAttribute('src')?.split('/')[1]
}

export interface Forecast {
    hours: number,
    url: string,
    forecast: string
}

export async function* getForecastImages() {
    const mostRecentForecast = await getMostRecentForecastTime()
    if (!mostRecentForecast) {
        alert('failed to fetch forecast!')
        throw new Error('failed to fetch forecast!')
    }

    for (const hour of range(6, 240, 6)) {
        yield {
            hours: hour,
            forecast: mostRecentForecast,
            url: getForecastUrl(hour, mostRecentForecast)
        } as Forecast
    }
}
