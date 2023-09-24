import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  OpenWeatherData,
  fetchWeatherByCityName,
} from '../../apis/open-weather.api';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCard: React.FC<{
  city: string;
}> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    fetchWeatherByCityName(city)
      .then((data) => {
        setWeatherData(data);
        setCardState('ready');
      })
      .catch((error) => {
        console.log(error);
        setCardState('error');
      });
  }, [city]);

  if (cardState.includes('loading') || cardState.includes('error'))
    return (
      <WeatherCardContainer>
        <Typography>
          {cardState.includes('loading')
            ? 'Loading...'
            : 'Error: could not retrieve weather data for city.'}
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant='body1'>
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
