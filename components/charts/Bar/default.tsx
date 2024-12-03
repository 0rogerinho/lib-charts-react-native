import BarChart from '@/components/ui/charts/chartBar';
import { Bar } from '@/components/ui/charts/chartBar/components/Bar';
import { CartesianGrid } from '@/components/ui/charts/chartBar/components/CartesianGrid';
import { Tooltip } from '@/components/ui/charts/chartBar/components/Tooltip';
import { XAxis } from '@/components/ui/charts/chartBar/components/XAxios';
import { YAxis } from '@/components/ui/charts/chartBar/components/YAxis';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const data = [
  { label: 'Jan', value: { smartphone: 20, laptop: 10, ex: 50 } },
  { label: 'Fev', value: { smartphone: 30, laptop: 20, ex: 50 } },
  { label: 'Mar', value: { smartphone: 10, laptop: 30, ex: 50 } },
  { label: 'Abr', value: { smartphone: 20, laptop: 40, ex: 50 } },
  { label: 'Mai', value: { smartphone: 20, laptop: 40, ex: 50 } },
];

export function ChartBarDefault() {
  return (
    <View style={styles.layout}>
      <BarChart data={data}>
        <YAxis />
        <XAxis />
        <Tooltip />
        <CartesianGrid />
        <Bar dataKey="smartphone" fill="red" stackId="a" />
        <Bar dataKey="laptop" fill="yellow" stackId="a" />
      </BarChart>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
