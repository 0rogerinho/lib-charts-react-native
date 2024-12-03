import { useChartBar } from '@/context/ChartBar';
import React, { useEffect } from 'react';
import { Line, LineProps, Text, TextProps } from 'react-native-svg';
import { shouldShowLabel } from '../utils';

type XAxisProps = LineProps & {
  textStyle?: TextProps;
};

export const XAxis = ({ textStyle, ...props }: XAxisProps) => {
  const { data, width, height, axisPaddingX, groupWidth, setAxisPaddingY } =
    useChartBar();

  useEffect(() => {
    const paddingY = 10 + (textStyle ? Number(textStyle?.fontSize) : 16);
    setAxisPaddingY(paddingY);
  }, [textStyle?.fontSize]);

  useEffect(() => {
    return () => {
      setAxisPaddingY(0);
    };
  }, []);

  const labels = data.map((item) => Object.values(item.label));

  return (
    <React.Fragment>
      {/* Axios Line */}
      <Line
        x1={axisPaddingX}
        y1={height}
        x2={width + axisPaddingX}
        y2={height}
        strokeWidth={2}
        stroke="white"
        {...props}
      />

      {/* Axios Label */}
      {labels.map((label, index) => {
        return (
          <React.Fragment key={index}>
            {shouldShowLabel(index, width, data) && (
              <Text
                x={index * groupWidth + groupWidth / 2 + axisPaddingX - 8}
                y={height + (textStyle ? Number(textStyle?.fontSize) : 16)}
                fontSize={16}
                fill="white"
                textAnchor="middle"
                {...textStyle}
              >
                {label}
              </Text>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
