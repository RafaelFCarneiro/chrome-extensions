export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export async function fetchWeatherByCityName(
  cityName: string
): Promise<OpenWeatherData> {
  console.log(process.env.OPEN_WEATHER_API_KEY);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  return response.json();
}
