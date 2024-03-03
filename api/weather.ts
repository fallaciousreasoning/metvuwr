import { range } from "../src/utils/range"
import { Forecast } from '../types/forecast'
import { JSDOM } from 'jsdom'

const pad = (n: number, digits: number) => n.toString().padStart(digits, '0')

const getForecastUrl = (hour: number, forecast: string) => {
    return `https://www.metvuw.com/forecast/${forecast}/rain-nzsi-${forecast}-${pad(hour, 3)}.png`
}

const getMostRecentForecastTime = async () => {
    const text = await fetch('https://metvuw.com/forecast/forecast.php?type=rain&region=nzsi&noofdays=1').then(r => r.text())
    const { window: { document } } = new JSDOM(text, { contentType: 'text/html' })
    const img = document.querySelector('img[src*=rain]')
    return img?.getAttribute('src')?.split('/')[1]
}

export async function getForecast() {
    const mostRecentForecast = await getMostRecentForecastTime()
    if (!mostRecentForecast) {
        alert('failed to fetch forecast!')
        throw new Error('failed to fetch forecast!')
    }

    const forecast: Forecast = {
        forecastTime: mostRecentForecast,
        predictions: []
    }

    for (const hour of range(6, 240, 6)) {
        forecast.predictions.push({
            hours: hour,
            url: getForecastUrl(hour, mostRecentForecast)
        })
    }

    return forecast
}


export async function GET(request: Request) {
    const forecast = await getForecast()
    return new Response(JSON.stringify(forecast), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
