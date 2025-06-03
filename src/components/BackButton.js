import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from '../utils/tailwind';

export default function BackButton({ color = '#f59e42', style }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[tw`p-2 rounded-full`, style]}
      accessibilityLabel="Volver"
    >
      <Ionicons name="arrow-back" size={24} color={color} />
    </TouchableOpacity>
  );
}