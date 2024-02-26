const corsProxy = 'https://corsproxy.io/?'

export const fetchCors = (url: string, init?: RequestInit) => {
    return fetch(`${corsProxy}${url}`, init)
}
