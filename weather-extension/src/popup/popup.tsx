import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Paper, InputBase, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '@fontsource/roboto';
import './popup.css';
import WeatherCard from './WeatherCard';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    'Fortaleza',
    'São Paulo',
    'Error',
  ]);

  const [cityInput, setCityInput] = useState<string>('');

  const handleCityButtonClick = () => {
    if (!cityInput.length) return;
    setCities([...cities, cityInput]);
    setCityInput('');
  };

  const handleCityDeleteClick = (index: number) => {
    cities.splice(index, 1);
    setCities([...cities]);
  };

  return (
    <Box mx='8px' my='16px'>
      <Grid container>
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
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
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
