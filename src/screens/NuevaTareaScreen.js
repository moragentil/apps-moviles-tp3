import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import tw from '../utils/tailwind';

export default function NuevaTareaScreen() {
  const { addTask } = useContext(TaskContext);
  const { activeTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('media');

  const handleGuardar = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toISOString(), // <-- Agrega la fecha y hora de creación
    };

    addTask(nuevaTarea);
    navigation.goBack();
  };

  const priorityOptions = [
    { label: 'Baja', value: 'baja', color: 'bg-green-400' },
    { label: 'Media', value: 'media', color: 'bg-yellow-400' },
    { label: 'Alta', value: 'alta', color: 'bg-red-400' },
  ];

  return (
    <ScrollView
      style={tw`flex-1 ${activeTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
      contentContainerStyle={tw`p-4`}
    >
      <View style={tw`bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md`}>
        {/* Título */}
        <Text style={tw`text-base font-semibold text-gray-800 dark:text-white mb-1`}>Título</Text>
        <TextInput
          placeholder="Título de la tarea"
          placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
          style={tw`border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 mb-4`}
          value={title}
          onChangeText={setTitle}
        />

        {/* Descripción */}
        <Text style={tw`text-base font-semibold text-gray-800 dark:text-white mb-1`}>Descripción</Text>
        <TextInput
          placeholder="Descripción"
          placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
          multiline
          style={tw`border border-gray-300 dark:border-gray-600 rounded-xl p-3 h-28 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 mb-4`}
          value={description}
          onChangeText={setDescription}
        />

        {/* Prioridad */}
        <Text style={tw`text-base font-semibold text-gray-800 dark:text-white mb-2`}>Prioridad</Text>
        <View style={tw`flex-row justify-around mb-6`}>
          {priorityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={tw`px-4 py-2 rounded-full ${
                priority === option.value
                  ? option.color
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              onPress={() => setPriority(option.value)}
            >
              <Text style={tw`text-white font-bold`}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          style={tw`bg-green-600 p-4 rounded-full items-center shadow-md`}
          onPress={handleGuardar}
        >
          <Text style={tw`text-white font-bold text-base`}>Guardar Tarea</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
