import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import tw from '../utils/tailwind';
import BackButton from '../components/BackButton';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '../components/LogoutButton';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NuevaTareaScreen() {
  const { addTask } = useContext(TaskContext);
  const { activeTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const isDark = activeTheme === 'dark';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Helper para convertir string a número
  const prioridadToInt = (p) => (p === 'alta' ? 1 : p === 'media' ? 2 : 3);

  const handleGuardar = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      title,
      description,
      priority: priority, // <-- Guarda como número
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : '',
    };

    addTask(nuevaTarea);
    navigation.goBack();
  };

  const priorityOptions = [
  { label: 'Baja', value: 3, color: 'bg-green-400' },
  { label: 'Media', value: 2, color: 'bg-yellow-400' },
  { label: 'Alta', value: 1, color: 'bg-red-400' },
];

  const onChangeDate = (event, selectedDate) => {
    setShowCalendar(false);
    if (selectedDate) {
      setDueDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <ScrollView
      style={tw`flex-1 ${activeTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
      contentContainerStyle={tw`p-4`}
    >
      <View style={tw`flex-row items-center mt-10 justify-between py-4 px-2 mb-4`}>
        <BackButton color="#f59e42" />
        <Text style={tw`text-xl font-bold text-center flex-1 -ml-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Nueva Tarea
        </Text>
        <LogoutButton />
      </View>

      <View style={{
        ...tw`bg-white dark:bg-gray-800 p-5 border-[#f59e42] border-4 rounded-2xl shadow-md flex-1`,
        backgroundColor: `${isDark ? '#1f2937' : '#ffffff'}`,
        border: 2,
        borderColor: '#f59e42',
        opacity: 0.95,
      }}>
        {/* Título */}
        <Text style={tw`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>Título</Text>
        <TextInput
          placeholder="Título de la tarea"
          placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
          style={tw`border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-sm text-gray-900 dark:text-white ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50'} mb-4`}
          value={title}
          onChangeText={setTitle}
        />

        {/* Descripción */}
        <Text style={tw`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>Descripción</Text>
        <TextInput
          placeholder="Descripción"
          placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
          multiline
          style={tw`border border-gray-300 dark:border-gray-600 rounded-xl p-3 h-28 text-sm text-gray-900 dark:text-white ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50'} mb-4`}
          value={description}
          onChangeText={setDescription}
        />

        {/* Fecha de entrega */}
        <Text style={tw`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>Fecha de entrega</Text>
        <TouchableOpacity
          style={tw`border border-gray-300 dark:border-gray-600 rounded-xl p-3 mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={tw`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {dueDate ? dueDate : 'Seleccionar fecha'}
          </Text>
        </TouchableOpacity>
        {showCalendar && (
          <DateTimePicker
            value={dueDate ? new Date(dueDate) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            minimumDate={new Date(2000, 0, 1)}
            maximumDate={new Date(2100, 11, 31)}
          />
        )}

        {/* Prioridad */}
        <Text style={tw`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>Prioridad</Text>
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
          style={{
            ...tw` p-4 rounded-full items-center shadow-md bg-green-500`,
            background: 'linear-gradient(90deg, #f59e42 0%, #f43f5e 100%)',
            backgroundColor: '#f59e42'
          }}
          onPress={handleGuardar}
        >
          <Text style={tw`text-white font-bold text-base`}>Guardar Tarea</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
