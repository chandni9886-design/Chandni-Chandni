import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastList } from './components/ForecastList';
import { Recommendations } from './components/Recommendations';
import { LocationData, WeatherData } from './types';
import { CloudRain } from 'lucide-react';

export default function App() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (loc: LocationData) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load weather data. Please try again.');
    }
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const loc = data.results[0];
        setLocation(loc);
        await fetchWeather(loc);
      } else {
        setError(`City "${city}" not found. Please check the spelling and try again.`);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-load a default city
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-600 p-2.5 rounded-xl">
              <CloudRain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Weather Intelligence</h1>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>

        <main className="space-y-6 relative min-h-[500px]">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-center border border-red-100 max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          {!error && location && weather && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out space-y-6">
              <CurrentWeather location={location} weather={weather.current} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ForecastList daily={weather.daily} />
                </div>
                <div className="lg:col-span-1">
                  <Recommendations weather={weather} />
                </div>
              </div>
            </div>
          )}

          {isLoading && !weather && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Discovering weather patterns...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
