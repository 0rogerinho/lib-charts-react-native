import { createContext, useContext } from 'react';

export type CurrentTooltip = null | {
  label: string;
  data: { [key: string]: number };
  x: number;
  y: number;
};

type RadarCharContextProps = {
  size: number;
  radius: number;
  center: number;
  circlePosition: CurrentTooltip | null;
  setCirclePosition: (data: CurrentTooltip | null) => void;
  data: {
    label: string;
    data: { [key: string]: number };
  }[];
  polygonPoints?: { x: number; y: number }[];
  maxPoints: number;
  maxPolygons: number;
  numSides: number;
  showLabels: boolean;
  rotate: number;
};

const RadarChartContext = createContext<RadarCharContextProps | null>(null);

export function useProductCardContext() {
  const context = useContext(RadarChartContext);
  if (!context) {
    throw new Error(
      'RadarChartContext.* component must be rendered as child of ProductCard component',
    );
  }
  return context;
}

export default RadarChartContext;
