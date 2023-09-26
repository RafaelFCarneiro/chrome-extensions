import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Paper, InputBase, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '@fontsource/roboto';
import './popup.css';
import WeatherCard from './WeatherCard';
import {
  LocalStorageOptions,
  getStorageCities,
  getStorageOptions,
  setStorageCities,
  setStorageOptions,
} from '../shared/weather.storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStorageCities().then((cities) => setCities(cities));
    getStorageOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (!cityInput.length) return;
    const updatedCities = [...cities, cityInput];
    setStorageCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStorageCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updateOptions = {
      ...options,
      tempScale: options?.tempScale === 'metric' ? 'imperial' : 'metric',
    } as LocalStorageOptions;
    setStorageOptions(updateOptions).then(() => {
      setOptions(updateOptions);
    });
  };

  if (!options) return null;

  return (
    <Box mx='8px' my='16px'>
      <Grid container justifyContent={'space-evenly'}>
        <Grid item>
          <Paper>
            <Box px={'15px'} py={'5px'}>
              <InputBase
                placeholder='Add a city name'
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py={'3px'}>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '°C' : '°F'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={handleCityDeleteClick.bind(null, index)}
        ></WeatherCard>
      ))}
      <Box height={'16px'} />
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
