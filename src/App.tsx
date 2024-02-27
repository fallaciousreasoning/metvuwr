import { For, type Component, createSignal } from 'solid-js';
import { Forecast, getForecastImages } from './utils/weather';
import { toArray } from './utils/range';
import { createStore } from "solid-js/store";
import Scrubber from './components/Scrubber';

const [forecast, setForecast] = createStore<Forecast[]>([])
toArray(getForecastImages()).then(forecast => {
  setForecast(forecast)

  // preload images, to make navigating more seamless
  for (const fc of forecast)
    fetch(fc.url, { mode: 'no-cors' })
})

const App: Component = () => {
  return<Scrubber forecasts={forecast} />
};

export default App;
