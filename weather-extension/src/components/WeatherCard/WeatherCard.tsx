import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchWeatherByCityName,
} from '../../shared/open-weather.api';
import './WeatherCard.css';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color='secondary' onClick={onDelete}>
              <Typography className='weatherCard-body'>Delete</Typography>              
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    fetchWeatherByCityName(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState('ready');
      })
      .catch((error) => {
        console.log(error);
        setCardState('error');
      });
  }, [city, tempScale]);

  if (cardState.includes('loading') || cardState.includes('error'))
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className='weatherCard-body'>{city}</Typography>
        <Typography className='weatherCard-body'>
          {cardState.includes('loading')
            ? 'Loading...'
            : 'Error: could not retrieve weather data for city.'}
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className='weatherCard-title'>{weatherData.name}</Typography>
      <Typography className='weatherCard-body'>
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography className='weatherCard-body'>
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
