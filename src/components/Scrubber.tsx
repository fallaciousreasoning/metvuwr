import { For, createEffect, createSignal } from "solid-js";
import { Forecast } from "../utils/weather";
import { range } from "../utils/range";
import { computeOffset, daysOfWeek } from "../utils/date";

const buttonClass = "px-3 py-1 rounded shadow bg-purple-600 hover:bg-purple-700 focus:outline-1 focus:outline-black font-bold text-white"

const classes: { [key: number]: string } = {
    1: 'grid-cols-1',
    3: 'grid-cols-3',
    21: 'grid-cols-3 grid-rows-7'
}

export default function Scrubber(props: { forecasts: Forecast[] }) {
    const [index, setIndex] = createSignal(0)
    const [show, setShow] = createSignal(1)
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

    return <div class="flex flex-col gap-2 max-h-screen mx-auto">
        {props.forecasts.length ? <div class={`grid justify-items-center ${classes[show()]}`}>
            <For each={Array.from(range(index(), index() + show()))}>
                {(add) => <img class="flex-shrink" src={props.forecasts[add].url} />}
            </For>
        </div>
            : null}
        <div class="flex flex-row justify-center gap-5">
            <button class={buttonClass} onClick={() => step(-1)}>
                &lt;
            </button>
            <button class={buttonClass} onClick={() => step(1)}>
                &gt;
            </button>
        </div>
        <div class="flex flex-row justify-center">
            <label class="flex flex-row gap-1">
                Show:
                <select value={show()} onChange={e => setShow(parseInt(e.target.value))}>
                    <option value="1">Single</option>
                    <option value="3">Day</option>
                    <option value="21">Week</option>
                </select>
            </label>
        </div>
        <div class="flex flex-col justify-center">
            <For each={daysOfWeek}>
                {day => <a class="text-blue-500 underline text-center" href={"#" + day} onClick={() => setIndex(computeOffset(day, props.forecasts[0].forecast))}>{day}</a>}
            </For>
        </div>
    </div>

}
