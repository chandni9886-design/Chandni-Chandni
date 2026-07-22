import { DailyWeather } from '../types';
import { getWeatherInfo } from '../utils/weather';

interface ForecastListProps {
  daily: DailyWeather;
}

export function ForecastList({ daily }: ForecastListProps) {
  // Take up to 7 days
  const days = daily.time.slice(0, 7).map((time, index) => {
    return {
      date: new Date(time),
      minTemp: Math.round(daily.temperature_2m_min[index]),
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      weatherCode: daily.weather_code[index],
    };
  });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">7-Day Forecast</h3>
      <div className="flex flex-col gap-4">
        {days.map((day, i) => {
          const info = getWeatherInfo(day.weatherCode);
          const Icon = info.icon;
          
          const isToday = i === 0;
          const dayName = isToday 
            ? 'Today' 
            : day.date.toLocaleDateString([], { weekday: 'short' });
            
          return (
            <div key={day.date.toISOString()} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-20 font-medium text-gray-700">
                {dayName}
              </div>
              
              <div className="flex items-center gap-3 flex-1 justify-center">
                <Icon className="w-6 h-6 text-gray-500" />
                <span className="text-sm text-gray-600 hidden sm:inline-block w-24">
                  {info.label}
                </span>
              </div>
              
              <div className="flex items-center justify-end gap-3 w-32">
                <span className="text-gray-900 font-medium">{day.maxTemp}Â°</span>
                <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
                  {/* Visual temp bar - simplified version */}
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-orange-400 w-full"
                    style={{
                      clipPath: `inset(0 ${100 - ((day.maxTemp + 20) / 60) * 100}% 0 ${((day.minTemp + 20) / 60) * 100}%)`
                    }}
                  />
                </div>
                <span className="text-gray-500 text-sm">{day.minTemp}Â°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
