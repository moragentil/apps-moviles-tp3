import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import tw from '../utils/tailwind';

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <View style={tw`flex-row justify-center mb-4`}>
      {['auto', 'light', 'dark'].map((modo) => (
        <TouchableOpacity
          key={modo}
          style={tw`mx-1 px-4 py-2 rounded-lg border ${theme === modo ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white dark:bg-gray-800'}`}
          onPress={() => setTheme(modo)}
        >
          <Text style={tw`${theme === modo ? 'text-white font-bold' : 'text-gray-700 dark:text-gray-200'}`}>
            {modo === 'auto' ? 'Auto' : modo.charAt(0).toUpperCase() + modo.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}