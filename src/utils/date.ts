export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export const getDate = (forecast: string) => {
    const year = forecast.slice(0, 4)
    const month = forecast.slice(4, 6)
    const day = forecast.slice(6, 8)
    const hours = forecast.slice(8, 10)

    return new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours)))
}

export const getDaysFromToday = (forecast: string) => {
    const days = [...daysOfWeek]
    let dayOfWeek = getDate(forecast).getDay()
    while (dayOfWeek > 0) {
        days.push(days.shift()!)
        dayOfWeek--
    }
    return days
}

const hoursPerForecast = 6

const second = 1000
const minute = 60 * second
const hour = 60 * minute

export const computeOffset = (day: string, forecast: string) => {
    const index = daysOfWeek.indexOf(day)

    const forecastDate = getDate(forecast).getTime()
    let offset = 1
    while (new Date(forecastDate + offset * hoursPerForecast * hour).getDay() != index)
        ++offset
    return offset - 1
}
