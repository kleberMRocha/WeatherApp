import React from 'react';

export interface WeatherCity{
        main:{
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number
        }
        name: string,
        weather:[{
            main: string,
            icon: string
        }]

 }


const CityCard:React.FC<WeatherCity> = ({ main,weather,name }) => {
    return <div>
                <h2> Localidade: {name} </h2>
                <h1> {Math.floor(main.temp)} ºC</h1>
                <h5>Min: {Math.floor(main.temp_min)} ºC | Max: {Math.floor(main.temp_max)} ºC</h5>
                <span>
                    <img 
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} 
                    alt={weather[0].main}
                    />
                </span>
                 <p>{new Date(Date.now()).getHours()}:
                 {new Date(Date.now()).getMinutes()}h</p>

                 <p>Umidade do Ar: {main.humidity} </p>
            </div>

};


export default CityCard;