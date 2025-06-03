import React, { useContext } from 'react';
import { Switch, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const toggleSwitch = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <View>
      <Switch
        value={isDark}
        onValueChange={toggleSwitch}
        thumbColor={isDark ? '#2563eb' : '#f4f3f4'}
        trackColor={{ false: '#767577', true: '#2563eb' }}
      />
    </View>
  );
}