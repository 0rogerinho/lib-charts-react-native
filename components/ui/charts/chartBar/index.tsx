import { ChartBarContext } from '@/context/ChartBar';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import { ChartBarProps } from './@types';

type Props = {
  data: ChartBarProps['data'];
  width?: number;
  height?: number;
  barSize?: number;
  children: ReactNode;
};

const BarChart = ({ data, height, width, barSize, children }: Props) => {
  const initialSize = { width: width ?? 0, height: height ?? 0 };

  const [viewSize, setViewSize] = useState(initialSize);
  const [axisPaddingX, setAxisPaddingX] = useState(0);
  const [axisPaddingY, setAxisPaddingY] = useState(0);
  const [dataKey, setDataKey] = useState<ChartBarProps['dataKey']>([]);
  const [numberOfBar, setNumberOfBar] = useState<number>(0);
  const [maxValue, setMaxValue] = useState(0.0000001);

  const viewRef = useRef(null);

  const groupWidth = viewSize.width / data.length; // Espaço disponível para o grupo de barras

  useEffect(() => {
    if (width) return setViewSize({ ...viewSize, width });
    if (height) return setViewSize({ ...viewSize, height });
  }, [width, height]);

  useEffect(() => {
    const filterKey = dataKey.filter(
      (item, index, self) =>
        index === self.findIndex((el) => el.stackId === item.stackId),
    );

    setNumberOfBar(filterKey.length);
  }, [dataKey]);

  const handleLayout = (event: any) => {
    if (!width || !height) {
      const size = event.nativeEvent.layout;
      setViewSize({ width: size.width, height: size.height });
    }
  }; // Atualiza o estado com a largura da view

  const renderChildren = () => {
    const childrenArray = React.Children.toArray(children);

    const tooltip = childrenArray.find(
      (child: any) => child.type?.name === 'Tooltip',
    );
    const otherChildren = childrenArray.filter(
      (child: any) => child.type?.name !== 'Tooltip',
    );

    return (
      <>
        {otherChildren}
        {tooltip && tooltip}
      </>
    );
  };

  return (
    <ChartBarContext.Provider
      value={{
        data: data,
        width: viewSize.width,
        height: viewSize.height,
        barSize,
        dataKey,
        maxValue,
        viewSize,
        groupWidth,
        numberOfBar,
        axisPaddingX,
        axisPaddingY,
        setDataKey,
        setMaxValue,
        setAxisPaddingX,
        setAxisPaddingY,
      }}
    >
      <View
        ref={viewRef}
        onLayout={handleLayout}
        style={{
          width: width ?? '100%',
          height: height ?? '100%',
        }}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewSize.width + axisPaddingX} ${
            viewSize.height + axisPaddingY
          }`} // Ajuste o viewBox para suportar o redimensionamento
          preserveAspectRatio="none" // Garante que o SVG escale corretamente
        >
          {renderChildren()}
        </Svg>
      </View>
    </ChartBarContext.Provider>
  );
};

export default BarChart;
