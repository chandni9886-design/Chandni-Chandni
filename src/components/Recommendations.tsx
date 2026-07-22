import { WeatherData } from '../types';
import { isRainy } from '../utils/weather';
import { Lightbulb, Umbrella, ThermometerSun, Shirt } from 'lucide-react';

interface RecommendationsProps {
  weather: WeatherData;
}

export function Recommendations({ weather }: RecommendationsProps) {
  const currentCode = weather.current.weather_code;
  const currentTemp = weather.current.temperature_2m;
  const maxTempToday = weather.daily.temperature_2m_max[0];
  
  const recommendations: { text: string; icon: any; color: string }[] = [];

  // Check for rain
  if (isRainy(currentCode) || weather.daily.weather_code.slice(0, 1).some(isRainy)) {
    recommendations.push({
      text: 'Carry an umbrella, rain is expected today.',
      icon: Umbrella,
      color: 'text-blue-500 bg-blue-50',
    });
  }

  // Check temperature extremes
  if (maxTempToday > 30 || currentTemp > 30) {
    recommendations.push({
      text: 'Wear light clothes, it\'s quite hot outside.',
      icon: ThermometerSun,
      color: 'text-orange-500 bg-orange-50',
    });
  } else if (currentTemp < 15) {
    recommendations.push({
      text: 'Carry a jacket, it\'s chilly right now.',
      icon: Shirt,
      color: 'text-indigo-500 bg-indigo-50',
    });
  }

  // Default if nothing extreme
  if (recommendations.length === 0) {
    recommendations.push({
      text: 'Great weather to enjoy! No special gear needed.',
      icon: Lightbulb,
      color: 'text-emerald-500 bg-emerald-50',
    });
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        Smart Insights
      </h3>
      
      <div className="flex flex-col gap-4">
        {recommendations.map((rec, i) => {
          const Icon = rec.icon;
          return (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
              <div className={`p-3 rounded-full ${rec.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-gray-700 font-medium mt-1 leading-relaxed">
                {rec.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
