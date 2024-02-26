import { For, type Component, createSignal } from 'solid-js';
import { Forecast, getForecastImages } from './utils/weather';
import { toArray } from './utils/range';
import { createStore } from "solid-js/store";
import Scrubber from './components/Scrubber';

const [forecast, setForecast] = createStore<Forecast[]>([])
toArray(getForecastImages()).then(setForecast)

const App: Component = () => {
  return<Scrubber forecasts={forecast} />
};

export default App;
