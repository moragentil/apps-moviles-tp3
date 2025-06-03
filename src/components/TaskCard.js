import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from '../utils/tailwind';

export default function TaskCard({ task, onPress }) {
  return (
    <TouchableOpacity
      style={tw`p-3 mb-2 rounded-lg ${task.priority === 'alta' ? 'bg-red-100' : task.priority === 'media' ? 'bg-yellow-100' : 'bg-green-100'}`}
      onPress={onPress}
    >
      <Text style={tw`text-lg font-bold text-gray-900 dark:text-white`}>{task.title}</Text>
      <Text style={tw`text-gray-700 dark:text-gray-300`}>{task.description}</Text>
      <Text style={tw`mt-1 italic text-gray-500 dark:text-gray-400`}>Estado: {task.completed ? 'Completada' : 'Pendiente'}</Text>
    </TouchableOpacity>
  );
}