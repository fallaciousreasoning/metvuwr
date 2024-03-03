import { For, createEffect, createMemo, createSignal } from "solid-js";
import { Forecast } from "../../types/forecast";
import { computeOffset, getDaysFromToday } from "../utils/date";
import { range } from "../utils/range";

const buttonClass = "px-3 py-1 rounded shadow bg-purple-600 hover:bg-purple-700 focus:outline-1 focus:outline-black font-bold text-white"

const classes: { [key: number]: string } = {
    1: 'grid-cols-1',
    4: 'grid-cols-4',
    28: 'grid-cols-4 grid-rows-7'
}

const [imgHeight, setImgHeight] = createSignal(0)

export default function Scrubber(props: { forecast: Forecast }) {
    const [index, setIndex] = createSignal(0)
    const [show, setShow] = createSignal(1)
    const step = (delta: number) => {
        let next = index() + delta * show()
        while (next < 0) next += props.forecast.predictions.length
        while (next >= props.forecast.predictions.length) next -= props.forecast.predictions.length
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

    createEffect(() => {
        // When show changes, we should reset the min height
        show()
        setImgHeight(0)
    })

    const firstDate = createMemo(() => props.forecast.forecastTime)

    return <div class="flex flex-col gap-2 max-h-screen mx-auto">
        {props.forecast.predictions.length ? <div class={`grid justify-items-center ${classes[show()]}`}>
            <For each={Array.from(range(index(), index() + show()))}>
                {(add) => add < props.forecast.predictions.length && <img class="flex-shrink" src={props.forecast.predictions[add].url} style={`min-height: ${imgHeight()}px`} onLoad={e => !imgHeight() && setImgHeight(e.target.clientHeight)} />}
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
                    <option value="4">Day</option>
                    <option value="28">Week</option>
                </select>
            </label>
        </div>
        {firstDate() && <div class="flex flex-col justify-center">
            <For each={getDaysFromToday(firstDate())}>
                {day => <a class="text-blue-500 underline text-center" href={"#" + day} onClick={() => setIndex(computeOffset(day, firstDate()))}>{day}</a>}
            </For>
        </div>}
    </div>

}
