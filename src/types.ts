export interface LocationData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone: string;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
}

export interface WeatherCondition {
  label: string;
  icon: string;
}
