export function* range(from: number, to: number, step = 1) {
    for (let i = from; i < to; i += step)
        yield i
}

export async function toArray<T>(gen: AsyncIterable<T>): Promise<T[]> {
    const out: T[] = []
    for await(const x of gen) {
        out.push(x)
    }
    return out
}
