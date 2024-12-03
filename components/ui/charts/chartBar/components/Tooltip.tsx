import { useChartBar } from '@/context/ChartBar';
import React, { ReactNode, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ForeignObject, Rect, RectProps } from 'react-native-svg';
import { ChartBarData } from '../@types';

type TooltipProps = RectProps & {
  content?: () => ReactNode;
};

type CurrentTooltipProps = {
  label: string;
  value: { [key: string]: number };
  colors: string[];
};

export function Tooltip({ content, ...props }: TooltipProps) {
  const [currentTooltip, setCurrentTooltip] =
    useState<CurrentTooltipProps | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (isVisible) {
      // Define o timeout para esconder o tooltip após 3 segundos
      timeout = setTimeout(() => {
        setIsVisible(false);
        setCurrentTooltip(null);
      }, 2000);
    }

    // Limpa o timeout ao desmontar ou quando o tooltip for atualizado
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible]);

  const handlePress = (item: ChartBarData, colors: string[]) => {
    setCurrentTooltip({ ...item, colors });
    setIsVisible(true); // Mostra o tooltip ao clicar
  };

  const { data, height, axisPaddingX, groupWidth, numberOfBar, dataKey } =
    useChartBar();

  return (
    <>
      {data.map((item, index) => {
        const colors = dataKey.map((itemKey) => {
          const color = Object.entries(item.value).find(
            ([key]) => key === itemKey.key,
          );
          return color ? itemKey.color : null; // Retorna a cor ou null se não encontrar
        });

        const barPadding = groupWidth * 0.2; // Espaçamento entre barras
        const availableBarWidth = groupWidth - barPadding; // Espaço real para barras
        const adjustedBarWidth = availableBarWidth - (numberOfBar > 1 ? 3 : 0); // Largura de cada barra com espaçamento

        const positionX = index * groupWidth + axisPaddingX; // Posição X para o grupo

        return (
          <React.Fragment key={index}>
            <Rect
              x={positionX + 8}
              width={adjustedBarWidth + 12}
              height={height}
              fill="transparent"
              onPress={() => handlePress(item, colors as string[])}
              {...props}
            />
          </React.Fragment>
        );
      })}

      {isVisible && (
        <ForeignObject x={axisPaddingX + 5}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
          >
            <View
              style={{
                width: '80%',
                height: '70%',
                gap: 8,
                backgroundColor: 'rgba(210, 210, 210, 0.9)',
                borderRadius: 8,
                borderWidth: 2,
                borderColor: 'rgba(8, 50, 100,0.8)',
                padding: 16,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 800 }}>
                {currentTooltip?.label}
              </Text>
              {currentTooltip &&
                Object.entries(currentTooltip?.value).map(
                  ([key, value], index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            backgroundColor: currentTooltip.colors[index],
                          }}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>
                          {`${key}: ${value}`}
                        </Text>
                      </View>
                    );
                  },
                )}
            </View>
            {content && content()}
          </View>
        </ForeignObject>
      )}
    </>
  );
}
