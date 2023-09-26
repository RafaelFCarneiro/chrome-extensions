import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card } from '@mui/material';
import WeatherCard from '../components/WeatherCard';
import './contentScript.css';
import {
  LocalStorageOptions,
  getStorageOptions,
} from '../shared/weather.storage';
import { Message } from '../shared/messages';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStorageOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Message.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) return null;
  return (
    <>
      {isActive && (
        <Card className='overlayCard'>
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={setIsActive.bind(this, false)}
          />
        </Card>
      )}
    </>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
