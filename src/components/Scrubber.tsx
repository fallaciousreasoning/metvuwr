import { createEffect, createSignal } from "solid-js";
import { Forecast } from "../utils/weather";

const buttonClass = "px-3 py-1 rounded shadow bg-purple-600 hover:bg-purple-700 focus:outline-1 focus:outline-black font-bold text-white"

export default function Scrubber(props: { forecasts: Forecast[] }) {
    const [index, setIndex] = createSignal(0)
    const step = (delta: number) => {
        let next = index() + delta
        while (next < 0) next += props.forecasts.length
        while (next >= props.forecasts.length) next -= props.forecasts.length
        setIndex(next)
    }

    createEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') step(-1)
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'r') setIndex(0)
        }

        document.addEventListener('keydown', handler)
        return () => {
            document.removeEventListener('keydown', handler)
        }
    })

    return <div class="flex flex-col gap-2 max-h-screen mx-auto" style={{ "max-width": '700px' }}>
        {props.forecasts.length ? <img src={props.forecasts[index()].url} />
            : null}
        <div class="flex flex-row justify-center gap-5">
            <button class={buttonClass} onClick={() => step(-1)}>
                &lt;
            </button>
            <button class={buttonClass} onClick={() => step(1)}>
                &gt;
            </button>
        </div>
    </div>

}
