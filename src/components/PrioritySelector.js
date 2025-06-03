import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from '../utils/tailwind';

export default function PrioritySelector({ value, onChange }) {
  const niveles = ['baja', 'media', 'alta'];
  return (
    <View style={tw`flex-row justify-between mt-3`}>
      {niveles.map((nivel) => (
        <TouchableOpacity
          key={nivel}
          style={tw`flex-1 p-3 mx-1 border rounded-lg items-center ${value === nivel ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white dark:bg-gray-800'}`}
          onPress={() => onChange(nivel)}
        >
          <Text style={tw`${value === nivel ? 'text-white font-bold' : 'text-gray-700 dark:text-gray-200'}`}>
            {nivel.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}