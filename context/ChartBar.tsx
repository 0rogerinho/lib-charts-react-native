import { ChartBarProps } from '@/components/ui/charts/chartBar/@types';
import { createContext, useContext } from 'react';

export const ChartBarContext = createContext<ChartBarProps | null>(null);

export function useChartBar() {
  const context = useContext(ChartBarContext);
  if (!context) {
    throw new Error(
      'RadarChartContext.* component must be rendered as child of ProductCard component',
    );
  }
  return context;
}
