import { useChartBar } from '@/context/ChartBar';
import React, { useEffect } from 'react';
import { Line, Text, TextProps, LineProps } from 'react-native-svg';
import { formatNumber, getYPosition } from '../utils';

type YAxisProps = LineProps & {
  textStyle?: TextProps;
  tickMarks?: LineProps;
};

export const YAxis = ({ textStyle, tickMarks, ...props }: YAxisProps) => {
  const { data, height, maxValue, setAxisPaddingX, axisPaddingX } =
    useChartBar();

  useEffect(() => {
    const paddingX = 25 + (textStyle ? Number(textStyle?.fontSize) : 16) * 0.8;
    setAxisPaddingX(paddingX);
  }, [textStyle?.fontSize]);

  useEffect(() => {
    return () => {
      setAxisPaddingX(0);
    };
  }, []);

  const numberOfYAxisLabels = data.length; // Número de rótulos no eixo Y

  return (
    <React.Fragment>
      {Array.from({ length: numberOfYAxisLabels + 1 }).map((_, index) => {
        const yValue = (maxValue / numberOfYAxisLabels) * index;
        const yPosition = getYPosition(yValue, height, maxValue);
        return (
          <React.Fragment key={index}>
            {/*  Value Line */}
            <Line
              x1={axisPaddingX - 6}
              y1={yPosition}
              x2={axisPaddingX + 6}
              y2={yPosition}
              stroke={props.stroke ?? 'white'}
              strokeWidth={props.strokeWidth ?? 2}
              {...tickMarks}
            />

            {/* Axios Label */}
            <Text
              x={axisPaddingX - 10}
              y={yPosition + 6} // Centralizando o rótulo verticalmente
              textAnchor="end"
              fontSize={16}
              fill={'white'}
              {...textStyle}
            >
              {formatNumber.format(Math.round(yValue))}
            </Text>
          </React.Fragment>
        );
      })}

      {/* Axios Line */}
      <Line
        x1={axisPaddingX}
        y1={0}
        x2={axisPaddingX}
        y2={height}
        stroke="white"
        strokeWidth={2}
        {...props}
      />
    </React.Fragment>
  );
};
