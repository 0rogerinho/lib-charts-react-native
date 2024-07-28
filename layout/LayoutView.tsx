import { ScrollView, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
};

export function LayoutView({
  style,
  lightColor,
  darkColor,
  children,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor="white" style="dark" /> */}
      <View
        style={[{ backgroundColor, height: '100%' }, style]}
        {...otherProps}
      >
        {children}
      </View>
    </ScrollView>
  );
}
