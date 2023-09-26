import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './options.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  LocalStorageOptions,
  getStorageOptions,
  setStorageOptions,
} from '../shared/weather.storage';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStorageOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({ ...options, homeCity });
  };

  const handleSaveClick = () => {
    setFormState('saving');
    setStorageOptions(options).then(() =>
      setTimeout(() => setFormState('ready'), 1000)
    );
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({ ...options, hasAutoOverlay });
  };

  const isFieldDisabled = formState === 'saving';

  if (!options) return null;
  return (
    <Box mx='10%' my='2%'>
      <Card>
        <CardContent>
          <Grid container direction={'column'} spacing={4}>
            <Grid item>
              <Typography variant='h4'>Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>Home city name</Typography>
              <TextField
                fullWidth
                variant='standard'
                placeholder='Enter a home city name'
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldDisabled}
              ></TextField>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                Auto toggle overlay on webpage
              </Typography>
              <Switch
                color='primary'
                checked={options.hasAutoOverlay}
                onChange={(_, checked) =>  handleAutoOverlayChange(checked)}
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSaveClick}
                disabled={isFieldDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
