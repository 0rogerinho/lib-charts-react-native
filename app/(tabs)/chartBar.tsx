import { ChartBarDefault } from '@/components/charts/Bar';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const defaultChartData = [<ChartBarDefault key={1} />];

export default function RadarChart() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {defaultChartData.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141D2F',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  box: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
