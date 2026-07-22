import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, SunDim } from 'lucide-react';
import { ElementType } from 'react';

export interface WeatherCodeInfo {
  label: string;
  icon: ElementType;
  description: string;
}

export function getWeatherInfo(code: number): WeatherCodeInfo {
  switch (code) {
    case 0:
      return { label: 'Clear sky', icon: Sun, description: 'Clear and sunny' };
    case 1:
    case 2:
    case 3:
      return { label: 'Mainly clear', icon: SunDim, description: 'Partly cloudy to overcast' };
    case 45:
    case 48:
      return { label: 'Fog', icon: CloudFog, description: 'Foggy conditions' };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { label: 'Drizzle', icon: CloudDrizzle, description: 'Light rain or drizzle' };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { label: 'Rain', icon: CloudRain, description: 'Steady rain' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { label: 'Snow', icon: CloudSnow, description: 'Snowfall' };
    case 80:
    case 81:
    case 82:
      return { label: 'Showers', icon: CloudRain, description: 'Rain showers' };
    case 85:
    case 86:
      return { label: 'Snow Showers', icon: CloudSnow, description: 'Snow showers' };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: CloudLightning, description: 'Thunderstorms' };
    default:
      return { label: 'Unknown', icon: Cloud, description: 'Unknown weather condition' };
  }
}

export function isRainy(code: number): boolean {
  const rainyCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  return rainyCodes.includes(code);
}
