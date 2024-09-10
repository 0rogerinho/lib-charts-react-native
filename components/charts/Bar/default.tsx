import BarChart from '@/components/ui/charts/chartBar';
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

export function ChartBarDefault() {
  const [toolTip, setToolTip] = useState<CurrentTooltip | null>(null);

  function handleClickMarker(item: CurrentTooltip | null) {
    setToolTip(item?.label === toolTip?.label ? null : item);
  }

  return (
    <LayoutView style={styles.layout}>
      <BarChart />
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
