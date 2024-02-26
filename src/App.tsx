import { For, type Component, createSignal } from 'solid-js';
import { Forecast, getForecastImages } from './utils/weather';
import { toArray } from './utils/range';
import { createStore } from "solid-js/store";

const [forecast, setForecast] = createStore<Forecast[]>([])
toArray(getForecastImages()).then(setForecast)

const App: Component = () => {
  const [hour, setHour] = createSignal(6)
  return <div>
    <For each={forecast}>
      {(item) => <img src={item.url} />}
    </For>
  </div>
};

export default App;
