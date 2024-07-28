import RadarChartContext, {
  CurrentTooltip,
  useProductCardContext,
} from '@/context/RadarChart';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Line,
  Polygon,
  Svg,
  SvgProps,
  PolygonProps,
  Circle,
  CircleProps,
  ForeignObject,
  Text,
  TextProps,
} from 'react-native-svg';

type Data = {
  label: string;
  data: { [key: string]: number };
};

type RadarChartContainerProps = SvgProps & {
  data: {
    label: string;
    data: { [key: string]: number };
  }[];
  maxPoints?: number;
  maxPolygons: number;
  size: number;
  children: React.ReactNode;
  showLabels?: boolean;
  stroke?: string;
  strokeWidth?: number;
  showLine?: boolean;
  rotate?: number;
};

type score = { desktop: number; mobile: number };

export const RadarChartContainer = ({
  data,
  size,
  maxPoints,
  maxPolygons,
  showLabels = false,
  children,
  stroke,
  strokeWidth,
  showLine = true,
  rotate = 0.95,
  ...rest
}: RadarChartContainerProps) => {
  const [circlePosition, setCirclePosition] = useState<CurrentTooltip>(null);

  const center = (size + 50) / 2;
  const radius = size / 2;
  const numSides = data.length;
  const getMaxPoints = () => {
    if (!maxPoints) {
      return data.reduce((accumulator, currentValue) => {
        const currentData = Object.values(currentValue.data);
        const highestValue = Math.max(...currentData);
        accumulator = Math.max(accumulator, highestValue);

        return accumulator;
      }, 0);
    } else {
      return maxPoints;
    }
  };

  // Função para calcular os pontos do polígono com base no número de lados
  const calculateRadarPoints = (radius: number) => {
    const pontos = [];
    for (let i = 0; i < numSides; i++) {
      const theta = ((2 * Math.PI) / numSides) * i + rotate;
      const x = center + radius * Math.cos(theta);
      const y = center + radius * Math.sin(theta);
      pontos.push(`${x},${y}`);
    }
    return pontos.join(' ');
  };

  // Função para calcular os pontos das linhas que conectam o center aos vértices
  const calculateRadarPointsLine = (index: number) => {
    const theta = ((2 * Math.PI) / numSides) * index + rotate;
    const x = center + radius * Math.cos(theta);
    const y = center + radius * Math.sin(theta);
    return { x, y };
  };

  // Calcular os pontos dos polígonos e as linhas
  const polygon = Array.from({ length: maxPolygons }).map((_, index) => (
    <Polygon
      key={index}
      points={calculateRadarPoints((radius / maxPolygons) * (index + 1))}
      fill="transparent"
      stroke={stroke ?? 'white'}
      strokeWidth={strokeWidth ?? '1'}
    />
  ));

  const lines = Array.from({ length: numSides }).map((_, index) => {
    const { x, y } = calculateRadarPointsLine(index);
    return (
      <Line
        key={index}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke={stroke ?? 'white'}
        strokeWidth={strokeWidth ?? '1'}
      />
    );
  });

  return (
    <RadarChartContext.Provider
      value={{
        size,
        center,
        radius,
        data: data,
        circlePosition,
        setCirclePosition,
        maxPoints: getMaxPoints(),
        maxPolygons,
        numSides,
        showLabels,
        rotate,
      }}
    >
      <View style={[styles.container]}>
        <Svg
          height={size}
          width={size + 20}
          viewBox={`0 -10 ${size + 50} ${size + 50}`}
          {...rest}
        >
          {polygon}
          {showLine && lines}
          {children}
        </Svg>
      </View>
    </RadarChartContext.Provider>
  );
};

interface PolygonFill extends PolygonProps {
  keyScore: keyof score;
  children?: React.ReactNode;
}

// Calcular os pontos dos polígonos e as linhas
export const RadarField = ({ keyScore, children, ...rest }: PolygonFill) => {
  const { center, radius, data, maxPoints, numSides, rotate } =
    useProductCardContext();
  const filterData = data.map((item) => item['data'][keyScore]);

  const calculateRadarPoints = (score: number[]) => {
    const pontos = [];
    const circlePoints = [];
    for (let i = 0; i < numSides; i++) {
      const theta = ((2 * Math.PI) / numSides) * i + rotate;
      const radiusAtual = (radius / maxPoints) * score[i]; // Calcula o radius para a pontuação atual
      const x = center + radiusAtual * Math.cos(theta);
      const y = center + radiusAtual * Math.sin(theta);
      pontos.push(`${x},${y}`);
      circlePoints.push({ x: x, y: y });
    }
    return { polygonPoints: pontos.join(' '), circlePoints: circlePoints };
  };

  const points = calculateRadarPoints(filterData);

  return (
    <>
      <Polygon
        points={points.polygonPoints}
        fill="rgba(0,8,99, 0.3)"
        stroke="black"
        strokeWidth="1"
        {...rest}
      />
      {children}
    </>
  );
};

interface CirclePointsProps extends CircleProps {
  keyScore: keyof score;
}

export const CircleMarker = ({ keyScore, ...rest }: CirclePointsProps) => {
  const {
    center,
    radius,
    setCirclePosition,
    data,
    numSides,
    maxPoints,
    rotate,
  } = useProductCardContext();

  const calculateRadarPoints = () => {
    const circlePoints = [];
    for (let i = 0; i < numSides; i++) {
      const theta = ((2 * Math.PI) / numSides) * i + rotate;
      const radiusAtual = (radius / maxPoints) * data[i].data[keyScore]; // Calcula o radius para a pontuação atual
      const x = center + radiusAtual * Math.cos(theta);
      const y = center + radiusAtual * Math.sin(theta);
      circlePoints.push({ ...data[i], x, y });
    }
    return { circlePoints };
  };

  const points = calculateRadarPoints();

  return points.circlePoints.map((item, index) => (
    <Circle
      key={index}
      r={4}
      cx={item.x}
      cy={item.y}
      fill="red"
      onPress={() => setCirclePosition(item)}
      {...rest}
    />
  ));
};

type ToolTipeProps = {
  width: number;
  height: number;
  renderItem: (data: Data) => React.ReactNode;
  onClickMaker?: (data: CurrentTooltip | null) => void;
};

export const Tooltip = ({
  renderItem,
  onClickMaker,
  width,
  height,
}: ToolTipeProps) => {
  const { size, circlePosition } = useProductCardContext();

  useEffect(() => {
    onClickMaker && onClickMaker(circlePosition);
  }, [circlePosition]);

  const handlePress = (x: number, y: number) => {
    let newX = x;
    let newY = y;

    // Lógica para ajustar a posição se o popup estiver cortado
    if (x + width > size - 1) {
      newX -= width;
    }

    if (y + height > size) {
      newY -= height;
    }

    return { x: newX, y: newY };
  };

  const newPosition =
    circlePosition && handlePress(circlePosition?.x, circlePosition?.y);

  if (newPosition)
    return (
      <ForeignObject x={newPosition.x} y={newPosition.y} fill="red">
        <View style={{ width: width, height: height }}>
          {renderItem(circlePosition)}
        </View>
      </ForeignObject>
    );
};

export const RadarChartLabels = ({ ...rest }: TextProps) => {
  const { center, radius, data, numSides, showLabels, rotate } =
    useProductCardContext();

  const calculateRadarPointsLine = (index: number) => {
    const theta = ((2 * Math.PI) / numSides) * index + rotate;
    const x = center + radius * Math.cos(theta);
    const y = center + radius * Math.sin(theta);

    let newX = x;
    let newY = y;
    let textAnchor: 'start' | 'end' | 'middle' = 'middle';

    if (x < radius + 0.95) {
      textAnchor = 'end';
      newX -= 5;
    }

    if (x > radius + 27) {
      textAnchor = 'start';
      newX += 5;
    }

    if (y > radius) {
      newY += 15;
    }

    if (y < radius) {
      newY -= 5;
    }

    return { textAnchor, x: newX, y: newY };
  };

  return data.map((item, index) => {
    const position = calculateRadarPointsLine(index);

    if (!showLabels) return null;

    return (
      <Text
        key={index}
        x={position.x}
        y={position.y}
        textAnchor={position.textAnchor}
        fontSize={13}
        {...rest}
      >
        {item.label}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    transform: 'rotate(80deg)',
  },
});
