import { LocationData, WeatherData } from '../types';
import { getWeatherInfo } from '../utils/weather';
import { MapPin, Wind, Thermometer, Clock } from 'lucide-react';

interface CurrentWeatherProps {
  location: LocationData;
  weather: WeatherData['current'];
}

export function CurrentWeather({ location, weather }: CurrentWeatherProps) {
  const info = getWeatherInfo(weather.weather_code);
  const Icon = info.icon;
  
  // Format current time properly matching the location timezone if possible
  // Open-Meteo returns time in ISO format local to the requested timezone
  const localDate = new Date(weather.time);
  const timeString = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = localDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-300 opacity-10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-blue-100">
            <MapPin className="w-5 h-5" />
            <h2 className="text-xl font-medium">
              {location.name}, {location.country}
            </h2>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-blue-100 mb-8">
            <Clock className="w-4 h-4" />
            <span>{timeString} â¢ {dateString}</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-6">
            <Icon className="w-24 h-24 text-white drop-shadow-md" />
            <div>
              <div className="text-6xl font-bold tracking-tighter">
                {Math.round(weather.temperature_2m)}Â°C
              </div>
              <div className="text-xl font-medium text-blue-100 mt-1">
                {info.label}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 flex-1 md:flex-none border border-white/10">
            <div className="p-3 bg-white/20 rounded-full">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-blue-100">Feels Like</div>
              <div className="font-semibold text-lg">{Math.round(weather.temperature_2m)}Â°C</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 flex-1 md:flex-none border border-white/10">
            <div className="p-3 bg-white/20 rounded-full">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-blue-100">Wind Speed</div>
              <div className="font-semibold text-lg">{weather.wind_speed_10m} km/h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
