import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const data = [{ title: 'Radar Chart' }, { title: 'Test' }];

export default function HomeScreen() {
  return (
    <View style={styles.layout}>
      {data.map((item, index) => (
        <Pressable key={index} style={styles.card} onPress={() => {}}>
          <Text style={styles.text}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    backgroundColor: '#141D2F',
  },
  card: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7C3AED',
  },
});
