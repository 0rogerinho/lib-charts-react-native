import {
  Default,
  DefaultOne,
  DefaultTwo,
  Line,
  LineTwo,
} from '@/components/charts/Radar';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const defaultChartData = [
  <Default key={1} />,
  <DefaultOne key={2} />,
  <DefaultTwo key={3} />,
  <Line key={4} />,
  <LineTwo key={5} />,
];

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
