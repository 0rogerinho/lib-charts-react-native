import { ChartBarDefault } from '@/components/charts/Bar';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const defaultChartData = [<ChartBarDefault key={1} />];

export default function RadarChart() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ScrollView horizontal>
          {defaultChartData.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </ScrollView>
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
    borderWidth: 4,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 410,
  },
});
