const daysOfWeek = [
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
