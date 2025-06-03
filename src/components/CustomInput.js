import React from 'react';
import { TextInput } from 'react-native';
import tw from '../utils/tailwind';

export default function CustomInput(props) {
  return (
    <TextInput
      style={tw`border border-gray-300 rounded-lg p-3 mt-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800`}
      placeholderTextColor="#888"
      {...props}
    />
  );
}