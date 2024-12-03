import { useChartBar } from '@/context/ChartBar';
import React, { useEffect } from 'react';
import { G, Rect } from 'react-native-svg';

type BarProps = {
  dataKey: string; // Chave de dados que representa a barra
  fill?: string; // Cor da barra
  stackId?: string; // Identificador do stack para agrupar barras
};

export function Bar({ dataKey, fill = 'teal', stackId }: BarProps) {
  const {
    data,
    dataKey: getDataKey,
    maxValue,
    viewSize,
    groupWidth,
    numberOfBar,
    axisPaddingX,
    setDataKey,
    setMaxValue,
  } = useChartBar();

  useEffect(() => {
    setDataKey((prevKeys) =>
      prevKeys
        .filter((item) => item.key !== dataKey)
        .concat({ key: dataKey, stackId, color: fill }),
    );

    return () => {
      setDataKey((keys) => keys.filter(({ key }) => key !== dataKey));
    };
  }, [dataKey, stackId, fill]);

  // Remove duplicatas de stackId
  const uniqueStackIds = getDataKey.filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj.stackId === item.stackId),
  );

  // Filtra os itens que possuem o mesmo stackId
  const filteredDataKeys = getDataKey.filter(
    (item) => stackId === item.stackId,
  );

  return (
    <React.Fragment key={dataKey}>
      {data.map((item, index) => {
        // Obtém o índice da chave atual
        const currentDataKeyIndex = Object.keys(item.value).findIndex(
          (key) => key === dataKey,
        );

        // Obtém o índice para posicionar a barra corretamente
        const stackIndex = uniqueStackIds.findIndex(
          (item) => item.stackId === stackId,
        );

        // Filtra pelos itens que possuem o mesmo stackId
        const filteredItems = Object.entries(item.value).filter(
          ([key, value]) =>
            getDataKey.some((item) => item.key === key) &&
            getDataKey.some((item) => item.stackId === stackId),
        );

        // Calcula o valor total entre as barras que possuem o mesmo stackId
        const totalStackValue = filteredItems.reduce(
          (acc, [key, value]) => value + acc,
          0,
        );

        // Obtém o índice da barra inferior
        const lowerBarIndex =
          getDataKey.findIndex((item) => item.stackId === stackId) + 1;

        // Verifica se a barra atual é a barra superior
        const isTopBar =
          filteredDataKeys.length > 1 && dataKey === filteredDataKeys[0].key;

        // Valores das barras
        const lowerBarValue = Object.values(item.value)[lowerBarIndex]; // Valor da barra inferior
        const currentBarValue = Object.values(item.value)[currentDataKeyIndex]; // Valor da barra atual

        // Atualiza o valor máximo se necessário
        useEffect(() => {
          if (totalStackValue > maxValue) {
            setMaxValue(totalStackValue);
          } else if (currentBarValue > maxValue) {
            setMaxValue(currentBarValue);
          }
        }, [totalStackValue]); // Monitora o maior valor recebido

        // Verifica se os valores são válidos antes de renderizar a barra
        if (!currentBarValue || !numberOfBar) return null;

        // Cálculos de posicionamento e dimensões da barra
        const barPadding = groupWidth * 0.2; // Espaçamento entre barras
        const availableBarWidth = groupWidth - barPadding; // Espaço real para barras
        const adjustedBarWidth =
          availableBarWidth / numberOfBar - (numberOfBar > 1 ? 3 : 0); // Largura de cada barra com espaçamento
        const positionX = index * groupWidth + axisPaddingX; // Posição X para o grupo

        // Calcula a posição e altura da barra
        const topBarHeight =
          (lowerBarValue / maxValue) * (viewSize.height - 30);
        const barHeight = (currentBarValue / maxValue) * (viewSize.height - 30); // Altura da barra proporcional ao valor
        const barXPosition =
          positionX +
          stackIndex * (adjustedBarWidth + barPadding / numberOfBar); // Posição X para cada barra dentro do grupo

        return (
          <React.Fragment key={item.label}>
            <G
              x={barXPosition + 12}
              y={viewSize.height - barHeight - (isTopBar ? topBarHeight : 0)}
              width={adjustedBarWidth}
              height={barHeight}
            >
              <Rect width={adjustedBarWidth} height={barHeight} fill={fill} />
            </G>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
