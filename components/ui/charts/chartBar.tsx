import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Rect, Text } from 'react-native-svg';

// [] caso não caiba todas as barras, deve fazer com que apareça uma e outra não

const data = [
  { label: 'Jan', value: 40 },
  { label: 'Feb', value: 80 },
  { label: 'Mar', value: 70 },
  { label: 'Apr', value: 1000 },
  { label: 'May', value: 50 },
];

const data2 = [
  { label: 'Jan', value: { smartphone: 50, laptop: 10 } },
  { label: 'Feb', value: { smartphone: 40, laptop: 20 } },
  { label: 'Mar', value: { smartphone: 30, laptop: 30 } },
  { label: 'Apr', value: { smartphone: 20, laptop: 40 } },
  { label: 'May', value: { smartphone: 10, laptop: 50 } },
];

const config = {};

type Props = {
  width?: number;
  height?: number;
  barSize: number;
  fontSizeLabelY?: number;
  fontSizeLabelX?: number;
  fontSizeLabelValue?: number;
};

const BarChart = ({
  height = 300,
  width = 300,
  barSize = 20,
  fontSizeLabelY = 16,
  fontSizeLabelX = 16,
  fontSizeLabelValue = 16,
}: Props) => {
  const barWidth = width / data.length; // Largura de cada barra
  // const maxValue = Math.max(...data.map((item) => item.value)); // Valor máximo para normalizar
  const maxValue = Math.max(
    ...data2.map((item) => Object.values(item.value)[0]),
  );

  const axisPaddingY = 10 + fontSizeLabelX; // Espaçamento para o eixo Y
  const axisPaddingX = 25 + fontSizeLabelY * 1.5; // Espaçamento para o eixo X
  const numberOfYAxisLabels = data.length; // Número de rótulos no eixo Y

  // Função para calcular a posição Y dos rótulos no eixo Y
  const getYPosition = (value: number) => {
    return height - (value / maxValue) * (height - 30);
  };

  const formatNumber = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  return (
    <View style={styles.container}>
      <Svg width={width + axisPaddingX} height={height + axisPaddingY}>
        {/* Rótulos do eixo Y */}
        {Array.from({ length: numberOfYAxisLabels + 1 }).map((_, index) => {
          const yValue = (maxValue / numberOfYAxisLabels) * index;
          const yPosition = getYPosition(yValue);
          return (
            <React.Fragment key={index}>
              {/* Linha de grade Eixo X*/}
              <Line
                x1={axisPaddingX}
                y1={yPosition}
                x2={width + axisPaddingX}
                y2={yPosition}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="4"
              />
              {/* Linha para o value do eixo Y */}
              <Line
                x1={axisPaddingX - 6}
                y1={yPosition}
                x2={axisPaddingX + 6}
                y2={yPosition}
                stroke="#c2c2c0"
                strokeWidth={2}
              />

              {/* Rótulo do eixo Y */}
              <Text
                x={axisPaddingX - 10}
                y={yPosition + 4} // Centralizando o rótulo verticalmente
                fontSize={fontSizeLabelY}
                fill="white"
                textAnchor="end"
              >
                {formatNumber.format(Math.round(yValue))}
              </Text>
            </React.Fragment>
          );
        })}
        {data2.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {Object.values(item.value).map((value, index2) => {
                const totalBar = Object.values(item.value).length;
                const widthBoxBar = barSize * totalBar;
                const barHeight = (value / maxValue) * (height - 30);
                const primaryBar = index * barWidth + axisPaddingX + 6;
                const secondBar = primaryBar + 26;
                const LineGradeY =
                  primaryBar + widthBoxBar / 2 + (totalBar < 2 ? 0 : 3);

                return (
                  <>
                    {/* Linha de grade Eixo Y */}
                    <Line
                      key={index + 10}
                      x1={LineGradeY}
                      y1={0}
                      x2={LineGradeY}
                      y2={height}
                      stroke="rgba(255,255,255,0.2)"
                      strokeDasharray="4"
                    />
                    {/* Barras */}
                    <Rect
                      key={index2 + 1}
                      x={index2 === 0 ? primaryBar : secondBar}
                      y={height - barHeight}
                      width={barSize}
                      height={barHeight}
                      fill="teal"
                    />
                    {/* Rótulos de valor */}
                    <Text
                      key={index2 + 2}
                      x={(index2 === 0 ? primaryBar : secondBar) + barSize / 2}
                      y={height - barHeight - 10}
                      fontSize={fontSizeLabelValue}
                      fill="white"
                      textAnchor="middle"
                    >
                      {formatNumber.format(value)}
                    </Text>
                  </>
                );
              })}
              <Text
                x={index * barWidth + barWidth / 2 + axisPaddingX}
                y={height + fontSizeLabelX}
                fontSize={fontSizeLabelX}
                fill="white"
                textAnchor="middle"
              >
                {item.label}
              </Text>
            </React.Fragment>
          );
        })}

        {/* Eixo Y */}
        <Line
          x1={axisPaddingX}
          y1={0}
          x2={axisPaddingX}
          y2={height}
          stroke="#c2c2c0"
          strokeWidth={3}
        />

        {/* Eixo X */}
        <Line
          x1={axisPaddingX}
          y1={height}
          x2={width + axisPaddingX}
          y2={height}
          stroke="#c2c2c0"
          strokeWidth={3}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 50,
  },
});

export default BarChart;
