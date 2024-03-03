import { For, type Component, createSignal } from 'solid-js';
import { getForecast } from './utils/weather';
import { toArray } from './utils/range';
import { createStore } from "solid-js/store";
import Scrubber from './components/Scrubber';
import { Forecast } from '../types/forecast';

const [forecast, setForecast] = createSignal<Forecast>()
getForecast().then(forecast => {
  setForecast(forecast)

  for (const pred of forecast.predictions)
    fetch(pred.url, { mode: 'no-cors', cache: 'force-cache' })
})

const App: Component = () => {
  return <>
    {forecast() && <Scrubber forecast={forecast()!} />}
  </>
};

export default App;
