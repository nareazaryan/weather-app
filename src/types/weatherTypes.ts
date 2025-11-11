export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number; 
  };
  weather: {
    description: string;
    icon: string;
  }[];
  sys: {
    country: string;
  };
}
