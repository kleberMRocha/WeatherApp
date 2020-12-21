import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import CityCard, { WeatherCity } from "../../coponents/CityCard";
import { Container, FormGroup, Input, HystoryGroup } from "./style";
import { FaCity } from "react-icons/fa/";
import api from "axios";
import Hystory from "../../coponents/history";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [isFocus, setFocus] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weather, setWeather] = useState({} as WeatherCity);
  const [history, setHistory] = useState([""]);

  useEffect(() => {
    const historyStorage = localStorage.getItem("@CityNameWeatherApp:");

    setHistory(historyStorage?.split(",") || [""]);
  }, [weather]);

  const handleInputFocus = useCallback((status: boolean): void => {
    setFocus(status);
  }, []);

  const handleFilled = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setCity(event.target.value);
      !!event.target.value.length ? setFilled(true) : setFilled(false);
    },
    []
  );

  const handleGetWeather = useCallback(
    async (event: FormEvent, city: string): Promise<void> => {
      event.preventDefault();

      if (city.length === 0) {
        setErrorMessage("Por favor, informe uma cidade !");
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},br&units=metric&APPID=47c17de4a3211a0ab28ffb829fb98727`;

      try {
        const cityWeather = await api.get(url);

        setErrorMessage("");
        setWeather(cityWeather.data);

        const oldData = localStorage.getItem("@CityNameWeatherApp:");

        if (!oldData) {
          localStorage.setItem(
            "@CityNameWeatherApp:",
            String(cityWeather.data.name)
          );

          setHistory(cityWeather.data.name);

          return;
        } else {
          const cityArray = oldData.split(",");

          if (!!cityArray.includes(cityWeather.data.name)) {
            return;
          }

          localStorage.setItem(
            "@CityNameWeatherApp:",
            String([cityWeather.data.name, oldData])
          );
        }
      } catch (error) {
        setErrorMessage("Cidade Não encontrada!");
      }
    },
    []
  );

  return (
    <Container>
      <h1>Simple Weather App </h1>
      <form onSubmit={(event) => handleGetWeather(event, city)}>
        <FormGroup isFocus={isFocus} isFilled={isFilled}>
          <FaCity size={30} />
          <Input
            value={city}
            onChange={(event) => handleFilled(event)}
            onFocus={() => handleInputFocus(true)}
            onBlur={() => handleInputFocus(false)}
            type="text"
            placeholder="Digite Uma Localidade"
          />
          <button type="submit">Buscar Localidade</button>
        </FormGroup>
        <div id="alert">{errorMessage.length ? errorMessage : ""}</div>
      </form>
      {weather.weather && (
        <CityCard
          main={weather.main}
          name={weather.name}
          weather={weather.weather}
        />
      )}
  
      <HystoryGroup>
        {history[0] !== '' && history.map((city, index) => {
          if (index < 5) {
            return (
              <Hystory key={city} callback={handleGetWeather} cityName={city} />
            );
          } else {
            return null;
          }
        })}
      </HystoryGroup>
    </Container>
  );
};

export default App;
