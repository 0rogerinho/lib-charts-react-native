import React from 'react';
import { Line } from 'react-native-svg';
import { getYPosition } from '../utils';
import { useChartBar } from '@/context/ChartBar';

type GridProps = {
  stroke?: number;
  color?: string;
  strokeDasharray?: number;
};

export const CartesianGrid = ({
  color = 'rgba(255,255,255,0.2)',
  stroke = 2,
  strokeDasharray = 4,
}: GridProps) => {
  const {
    data,
    width,
    height,
    maxValue,
    groupWidth,
    axisPaddingX,
    numberOfBar,
  } = useChartBar();

  const numberOfYAxisLabels = data.length;
  return (
    <React.Fragment>
      {Array.from({ length: numberOfYAxisLabels + 1 }).map((_, index) => {
        const yValue = (maxValue / numberOfYAxisLabels) * index;
        const yPosition = getYPosition(yValue, height, maxValue);
        const position =
          index * groupWidth -
          groupWidth / (numberOfBar === 1 ? 2 : 2.15) +
          axisPaddingX;

        if (index === 0) return null;
        const positionX = position;
        return (
          <React.Fragment key={index}>
            {/* X Axios line*/}
            <Line
              x1={axisPaddingX}
              y1={yPosition}
              x2={width + axisPaddingX}
              y2={yPosition}
              stroke={color}
              strokeWidth={stroke}
              strokeDasharray={strokeDasharray}
            />

            {/* Y Axios line*/}
            <Line
              x1={positionX}
              y1={0}
              x2={positionX}
              y2={height}
              stroke={color}
              strokeWidth={stroke}
              strokeDasharray={strokeDasharray}
            />
          </React.Fragment>
        );
      })}

      {/*Top X Axios line*/}
      <Line
        x1={axisPaddingX}
        y1={0}
        x2={width + axisPaddingX}
        y2={0}
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={strokeDasharray}
      />
    </React.Fragment>
  );
};
