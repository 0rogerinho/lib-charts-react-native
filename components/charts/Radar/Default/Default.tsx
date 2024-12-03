import {
  CircleMarker,
  RadarChartContainer,
  RadarChartLabels,
  RadarField,
  Tooltip,
} from '@/components/ui/charts/RadarChart';
import { CurrentTooltip } from '@/context/RadarChart';
import { LayoutView } from '@/layout/LayoutView';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const data = [
  { label: 'January', data: { desktop: 7, mobile: 5 } },
  { label: 'February', data: { desktop: 7, mobile: 6 } },
  { label: 'March', data: { desktop: 5, mobile: 8 } },
  { label: 'April', data: { desktop: 4, mobile: 2 } },
  { label: 'May', data: { desktop: 2, mobile: 5 } },
  { label: 'jun', data: { desktop: 2, mobile: 5 } },
  // { label: 'jul', data: { desktop: 2, mobile: 5 } },
];

const fieldMap: {
  keyScore: 'desktop' | 'mobile';
  fieldColor: string;
  circleColor: string;
}[] = [
  {
    keyScore: 'desktop',
    fieldColor: 'rgba(255, 20, 147, 0.2)',
    circleColor: 'rgba(255, 20, 147, 0.8)',
  },
  {
    keyScore: 'mobile',
    fieldColor: 'rgba(50, 205, 50, 0.5)',
    circleColor: 'rgba(50, 205, 50, 1)',
  },
];

export function Default() {
  const [toolTip, setToolTip] = useState<CurrentTooltip | null>(null);

  function handleClickMarker(item: CurrentTooltip | null) {
    setToolTip(item?.label === toolTip?.label ? null : item);
  }

  return (
    <LayoutView style={styles.layout}>
      <RadarChartContainer
        data={data}
        size={350}
        maxPolygons={3}
        showLabels
        stroke="#344974"
        strokeWidth={2}
        rotate={4.72}
      >
        <RadarChartLabels stroke="#90B0EF" fontWeight="500" letterSpacing={3} />
        {fieldMap.map(({ fieldColor, keyScore }, index) => (
          <RadarField
            key={index}
            keyScore={keyScore}
            fill={fieldColor}
            stroke={'none'}
          />
        ))}

        {fieldMap.map(({ keyScore, circleColor }, index) => (
          <CircleMarker
            key={index}
            keyScore={keyScore}
            fill={circleColor}
            r={6}
          />
        ))}

        <Tooltip
          width={100}
          height={80}
          onClickMaker={(item) => handleClickMarker(item)}
          renderItem={({ label, data }) => {
            if (toolTip) {
              return (
                <View style={styles.tooltip}>
                  <Text style={styles.text}>{label}</Text>
                  <Text style={styles.text}>Desktop:{data.desktop}</Text>
                  <Text style={styles.text}>Mobile:{data.mobile}</Text>
                </View>
              );
            } else {
              return;
            }
          }}
        />
      </RadarChartContainer>
    </LayoutView>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    backgroundColor: '#141D2F',
  },
  tooltip: {
    backgroundColor: 'rgba(255, 20, 147, 1)',
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontWeight: '400',
    color: 'white',
  },
});
