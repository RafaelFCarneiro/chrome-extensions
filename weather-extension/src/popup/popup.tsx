import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './popup.css';
import WeatherCard from './WeatherCard';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city='Fortaleza' />
      <WeatherCard city='São Paulo' />
      <WeatherCard city='Error' />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
