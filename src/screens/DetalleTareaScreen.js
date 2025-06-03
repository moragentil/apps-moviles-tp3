import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, ScrollView
} from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from '../utils/tailwind';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

export default function DetalleTareaScreen() {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const { activeTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { task } = route.params;
    const isDark = activeTheme === 'dark';


  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [priority, setPriority] = useState(task.priority);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setModified(
      description !== task.description ||
      completed !== task.completed ||
      priority !== task.priority
    );
  }, [description, completed, priority]);

  const handleSave = () => {
    if (description.trim() === '') {
      Alert.alert('Error', 'La descripción no puede estar vacía');
      return;
    }
    updateTask({ ...task, description, completed, priority });
    Alert.alert('Guardado', 'Los cambios se guardaron correctamente');
    setModified(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro que querés eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  const priorityOptions = [
    { label: 'Baja', value: 'baja', color: 'bg-green-400' },
    { label: 'Media', value: 'media', color: 'bg-yellow-400' },
    { label: 'Alta', value: 'alta', color: 'bg-red-400' },
  ];

  return (
    <ScrollView
      style={tw`flex-1 ${activeTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
      contentContainerStyle={tw`flex-grow p-4 justify-between`}
    >
      {/* Header personalizado */}
      <View style={tw`flex-row items-center mt-10 justify-between py-4 px-2 mb-4`}>
        <BackButton color="#f59e42" />
        <Text style={tw`text-xl font-bold text-center flex-1 -ml-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Detalle de Tarea
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="log-out-outline" size={24} color="#f59e42" onPress={() => navigation.reset({index: 0, routes: [{name: 'Login'}]})} />
        </TouchableOpacity>
      </View>

      {/* Tarjeta principal, ahora solo hasta antes de los botones */}
      <View style={{...tw`bg-white dark:bg-gray-800 p-5 border-[#f59e42] border-4 rounded-2xl shadow-md flex-1`,
        backgroundColor: `${isDark ? '#1f2937' : '#ffffff'}`,
        border: 2,
            borderColor: '#f59e42',
            opacity: 0.95,
      }}>
        <Text style={tw`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-2`}>
          {task.title}
        </Text>
        {/* Fecha de creación */}
        <Text style={tw`text-xs text-white dark:text-gray-400 mb-2`}>
          Creada: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'Sin fecha'}
        </Text>

        {/* Prioridad Visual */}
        <Text style={tw`text-base font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-2`}>Prioridad</Text>
        <View style={tw`flex-row justify-around mb-4`}>
          {priorityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={tw`px-4 py-2 rounded-full ${priority === option.value ? option.color : 'bg-gray-200 dark:bg-gray-700'}`}
              onPress={() => setPriority(option.value)}
            >
              <Text style={tw`text-gray-600 font-bold`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Descripción */}
        <Text style={tw`text-base font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-1`}>Descripción</Text>
        <TextInput
          multiline
          placeholder="Escribe una descripción..."
          placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
          style={tw`border border-gray-300 dark:border-gray-600 rounded-xl p-3 h-28 text-gray-900 dark:text-white ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50'} text-sm mb-4`}
          value={description}
          onChangeText={setDescription}
        />

        {/* Estado */}
        <View style={tw`flex-row items-center mb-10`}>
          <Text style={tw`text-base font-semibold ${isDark ? 'text-gray-300' : 'text-black'} `}>
            Estado:
          </Text>
          <Text style={tw`ml-2 text-base font-semibold ${completed ? 'text-green-600' : 'text-red-500'}`}>
            {completed ? 'Completada' : 'Pendiente'}
          </Text>
        </View>
      </View>

      {/* Botón Marcar como Completada/Pendiente */}
      <TouchableOpacity
        onPress={toggleCompleted}
        style={tw`mt-6 mb-4 p-4 rounded-full shadow-md w-full items-center ${completed ? 'bg-yellow-400' : 'bg-green-600'}`}
      >
        <Text style={tw`text-white text-base font-semibold`}>
          {completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </Text>
      </TouchableOpacity>

      {/* Botones finales */}
      <View style={tw`mb-2`}>
        {modified && (
          <TouchableOpacity
            style={tw`mb-4 p-4 rounded-full bg-blue-600 shadow-md items-center`}
            onPress={handleSave}
          >
            <Text style={tw`text-white font-bold text-base`}>Guardar Cambios</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={tw`p-4 rounded-full bg-red-600 shadow-md items-center`}
          onPress={handleDelete}
        >
          <Text style={tw`text-white font-bold text-base`}>Eliminar Tarea</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
