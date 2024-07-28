import {
  CircleMarker,
  RadarChartContainer,
  RadarField,
  Tooltip,
} from '@/components/ui/charts/RadarChart';
import { CurrentTooltip } from '@/context/RadarChart';
import { LayoutView } from '@/layout/LayoutView';
import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const data = [
  { label: 'January', data: { desktop: 10, mobile: 8 } },
  { label: 'February', data: { desktop: 8, mobile: 10 } },
  { label: 'March', data: { desktop: 9, mobile: 6 } },
  { label: 'April', data: { desktop: 7, mobile: 9 } },
  { label: 'May', data: { desktop: 9, mobile: 9 } },
  { label: 'jun', data: { desktop: 7, mobile: 10 } },
  // { label: 'jul', data: { desktop: 2, mobile: 5 } },
];

const fieldMap: {
  keyScore: 'desktop' | 'mobile';
  fieldColor: string;
}[] = [
  {
    keyScore: 'desktop',
    fieldColor: 'rgba(255, 20, 147, 0.2)',
  },
  {
    keyScore: 'mobile',
    fieldColor: 'rgba(50, 205, 50, 0.2)',
  },
];

export function DefaultTwo() {
  const [toolTip, setToolTip] = useState<CurrentTooltip | null>(null);

  function handleClickMarker(item: CurrentTooltip | null) {
    setToolTip(item?.label === toolTip?.label ? null : item);
  }

  return (
    <LayoutView style={styles.layout}>
      <RadarChartContainer
        data={data}
        size={350}
        maxPolygons={2}
        showLabels
        stroke="#344974"
        strokeWidth={1}
        rotate={4.72}
        showLine={false}
      >
        {fieldMap.map(({ fieldColor, keyScore }, index) => (
          <Fragment key={index}>
            <RadarField keyScore={keyScore} fill={fieldColor} stroke={'none'} />
          </Fragment>
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
