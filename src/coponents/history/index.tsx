import React from 'react';
import {CityHystoryButton} from './styles';

interface HystoryProps{
    cityName?:string;
    callback:Function;
}

const Hystory:React.FC<HystoryProps> = ({cityName,callback}) =>{

    return (
        <div>
            <CityHystoryButton onClick={(event) => callback(event, cityName)}  >
              {cityName}
            </CityHystoryButton>
        </div>

    );

};

export default Hystory;