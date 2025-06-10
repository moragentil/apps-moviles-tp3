import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import tw from '../utils/tailwind';
import ThemeSwitch from '../components/ThemeSwitch';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import LogoutButton from '../components/LogoutButton';

export default function HomeScreen() {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);
  const { activeTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const isDark = activeTheme === 'dark';

  // Tabs: pendientes o completadas
  const [tab, setTab] = useState('pendientes');
  // Filtro de prioridad
  const [filtroPrioridad, setFiltroPrioridad] = useState('todas');
  // Mostrar/ocultar filtros
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Filtra tareas según el tab y la prioridad
  const tareasFiltradas = tasks.filter((t) =>
    (tab === 'pendientes' ? !t.completed : t.completed) &&
    (filtroPrioridad === 'todas' ? true : t.priority === filtroPrioridad)
  );

  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteTask(id) },
      ]
    );
  };

  // Alternar completado SIN popup
  const handleToggleCompleted = (item) => {
    updateTask({ ...item, completed: !item.completed });
  };

  // Acciones al deslizar a la derecha (completar o marcar pendiente)
  const renderLeftActions = (item) => (
    <View style={tw`flex-1 justify-center items-start pl-4`}>
      <Text style={tw`font-bold ${item.completed ? 'text-yellow-600' : 'text-green-600'}`}>
        {item.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
      </Text>
    </View>
  );

  const renderRightActions = (item) => (
    <View style={tw`flex-1 justify-center items-end pr-4`}>
      <Text style={tw`text-red-600 font-bold`}>Eliminar</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      onSwipeableRightOpen={() => handleDelete(item.id)}
      rightThreshold={60}
      renderLeftActions={() => renderLeftActions(item)}
      onSwipeableLeftOpen={() => handleToggleCompleted(item)}
      leftThreshold={60}
    >
      <TouchableOpacity
        style={tw`p-4 mb-3 rounded-2xl shadow-md ${isDark ? 'bg-gray-700' : 'bg-white'}`}
        onPress={() => navigation.navigate('DetalleTarea', { task: item })}
      >
        {/* Título y fecha en la misma línea */}
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex-shrink`}>
            {item.title}
          </Text>
          <Text style={tw`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} ml-2`}>
            {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
          </Text>
        </View>
        <Text style={tw`${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{item.description}</Text>
        {/* Línea de prioridad y estado */}
        <View style={tw`flex-row justify-between items-center mt-3`}>
          {/* Prioridad */}
          <View
            style={tw`px-3 py-1 rounded-full ${
              item.priority === 'alta'
                ? 'bg-red-200'
                : item.priority === 'media'
                ? 'bg-yellow-200'
                : 'bg-green-200'
            }`}
          >
            <Text
              style={tw`text-xs font-bold ${
                item.priority === 'alta'
                  ? 'text-red-700'
                  : item.priority === 'media'
                  ? 'text-yellow-700'
                  : 'text-green-700'
              }`}
            >
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </Text>
          </View>
          {/* Estado */}
          <Text
            style={tw`text-xs font-bold ${
              item.completed ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {item.completed ? 'Completada' : 'Pendiente'}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={tw`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View style={tw`flex-row mt-16 items-center justify-between py-4 px-4 mb-6`}>
        <ThemeSwitch />
        <Text style={tw`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-center flex-1 -ml-8`}>
          Mis Tareas
        </Text>
        <LogoutButton />
      </View>

      {/* Botón aplicar filtros */}
      <View style={tw`px-4 mb-2`}>
        <TouchableOpacity
          style={[
            tw`self-end px-4 py-2 rounded-full shadow-md`,
            { backgroundColor: 'transparent' },
          ]}
          onPress={() => setMostrarFiltros(!mostrarFiltros)}
        >
          <View
            style={{
              ...tw`absolute left-0 right-0 top-0 bottom-0 rounded-full`,
              background: 'linear-gradient(90deg, #f59e42 0%, #f43f5e 100%)',
              backgroundColor: '#f59e42',
              opacity: 0.95,
              zIndex: -1,
            }}
          />
          <Text style={tw`text-white font-semibold z-10`}>
            <Ionicons name="funnel" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filtro de prioridad */}
      {mostrarFiltros && (
        <View style={tw`${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'} rounded-xl mx-4 mb-4 p-3 shadow-md`}>
          <Text style={tw`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Filtrar por prioridad:</Text>
          <View style={tw`flex-row justify-between`}>
            {['todas', 'baja', 'media', 'alta'].map((nivel) => (
              <TouchableOpacity
                key={nivel}
                style={[
                  tw`px-3 py-2 rounded-full border`,
                  filtroPrioridad === nivel
                    ? { backgroundColor: '#f59e42', borderColor: '#f59e42' }
                    : isDark
                    ? tw`border-gray-800 bg-gray-900`
                    : tw`border-gray-200 bg-white`
                ]}
                onPress={() => setFiltroPrioridad(nivel)}
              >
                <Text
                  style={tw`${
                    filtroPrioridad === nivel
                      ? 'text-white font-bold'
                      : isDark
                      ? 'text-gray-200'
                      : 'text-gray-800'
                  }`}
                >
                  {nivel === 'todas' ? 'Todas' : nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Tabs */}
      <View style={tw`flex-row mx-4 mt-2 mb-4`}>
        <TouchableOpacity
          style={[
            tw`flex-1 items-center pb-2`,
            tab === 'pendientes'
              ? { borderBottomWidth: 3, borderColor: '#f59e42' }
              : { borderBottomWidth: 2, borderColor: isDark ? '#374151' : '#e5e7eb' }
          ]}
          onPress={() => setTab('pendientes')}
        >
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: tab === 'pendientes' ? '#f59e42' : isDark ? '#d1d5db' : '#6b7280'
              }
            ]}
          >
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex-1 items-center pb-2`,
            tab === 'completadas'
              ? { borderBottomWidth: 3, borderColor: '#f59e42' }
              : { borderBottomWidth: 2, borderColor: isDark ? '#374151' : '#e5e7eb' }
          ]}
          onPress={() => setTab('completadas')}
        >
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: tab === 'completadas' ? '#f59e42' : isDark ? '#d1d5db' : '#6b7280'
              }
            ]}
          >
            Completadas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tareas */}
      <FlatList
        data={tareasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={tw`text-gray-500 dark:text-gray-400 px-4`}>No hay tareas aún.</Text>
        }
        contentContainerStyle={tw`px-4`}
      />

      {/* Botón Nueva Tarea */}
      <TouchableOpacity
        style={{
          ...tw`bg-blue-600 p-4 mb-8 rounded-full items-center mt-4 mx-4 shadow-md`,
          background: 'linear-gradient(90deg, #f59e42 0%, #f43f5e 100%)',
          backgroundColor: '#f59e42',
        }}
        onPress={() => navigation.navigate('NuevaTarea')}
      >
        <Text style={tw`text-white text-base font-bold`}>+ Nueva Tarea</Text>
      </TouchableOpacity>
    </View>
  );
}
