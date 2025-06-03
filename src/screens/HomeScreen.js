import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import tw from '../utils/tailwind';
import axios from 'axios';
import ThemeSwitch from '../components/ThemeSwitch';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { tasks } = useContext(TaskContext);
  const { activeTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const [filtroPrioridad, setFiltroPrioridad] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [sugerencia, setSugerencia] = useState('');
  const [loadingSugerencia, setLoadingSugerencia] = useState(false);

/*   useEffect(() => {
    setLoadingSugerencia(true);
    axios
      .get('https://api.adviceslip.com/advice')
      .then(res => setSugerencia(res.data.slip.advice))
      .catch(() => setSugerencia('No se pudo obtener sugerencia'))
      .finally(() => setLoadingSugerencia(false));
  }, []); */

  const tareasFiltradas = tasks.filter((t) => {
    const porPrioridad = filtroPrioridad === 'todas' || t.priority === filtroPrioridad;
    const porEstado =
      filtroEstado === 'todos' ||
      (filtroEstado === 'completadas' && t.completed) ||
      (filtroEstado === 'pendientes' && !t.completed);
    return porPrioridad && porEstado;
  });

  const handleLogout = () => {
    logout();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`p-4 mb-3 rounded-2xl shadow-md bg-white dark:bg-gray-800`}
      onPress={() => navigation.navigate('DetalleTarea', { task: item })}
    >
      {/* Título y fecha en la misma línea */}
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-bold text-gray-900 dark:text-white flex-shrink`}>
          {item.title}
        </Text>
        <Text style={tw`text-xs text-gray-500 dark:text-gray-400 ml-2`}>
          {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
        </Text>
      </View>
      <Text style={tw`text-gray-800 dark:text-gray-300`}>{item.description}</Text>
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
  );

  return (
    <View style={tw`flex-1 ${activeTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between py-4 px-4 mb-10`}>
        <ThemeSwitch />
        <Text style={tw`text-xl font-bold text-gray-900 dark:text-white text-center flex-1 -ml-8`}>
          Mis Tareas
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      
      {/* <View style={tw`mb-4 px-4`}>
        <Text style={tw`text-base font-bold text-blue-700 dark:text-blue-300 mb-1`}>
          Sugerencia de organización:
        </Text>
        {loadingSugerencia ? (
          <ActivityIndicator color="#2563eb" />
        ) : (
          <Text style={tw`italic text-gray-700 dark:text-gray-300`}>{sugerencia}</Text>
        )}
      </View> */}

      {/* Botón para mostrar filtros */}
      <View style={tw`px-4 mb-2`}>
        <TouchableOpacity
          style={tw`self-end bg-blue-600 px-4 py-2 rounded-full shadow-md`}
          onPress={() => setMostrarFiltros(!mostrarFiltros)}
        >
          <Text style={tw`text-white font-semibold`}>{mostrarFiltros ? 'Ocultar filtros' : 'Aplicar filtros'}</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros condicionales */}
      {mostrarFiltros && (
        <View style={tw`bg-white dark:bg-gray-800 rounded-xl mx-4 mb-4 p-3 shadow-md`}>
          <Text style={tw`text-base font-semibold mb-2 text-gray-800 dark:text-white`}>Filtrar por prioridad:</Text>
          <View style={tw`flex-row justify-between mb-3`}>
            {['todas', 'baja', 'media', 'alta'].map((nivel) => (
              <TouchableOpacity
                key={nivel}
                style={tw`px-3 py-2 rounded-full border ${
                  filtroPrioridad === nivel
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 bg-gray-100 dark:bg-gray-700'
                }`}
                onPress={() => setFiltroPrioridad(nivel)}
              >
                <Text
                  style={tw`${
                    filtroPrioridad === nivel
                      ? 'text-white font-bold'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {nivel === 'todas' ? 'Todas' : nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={tw`text-base font-semibold mb-2 text-gray-800 dark:text-white`}>Filtrar por estado:</Text>
          <View style={tw`flex-row justify-between`}>
            {[
              { label: 'Todos', value: 'todos' },
              { label: 'Pendientes', value: 'pendientes' },
              { label: 'Completadas', value: 'completadas' },
            ].map((estado) => (
              <TouchableOpacity
                key={estado.value}
                style={tw`px-3 py-2 rounded-full border ${
                  filtroEstado === estado.value
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 bg-gray-100 dark:bg-gray-700'
                }`}
                onPress={() => setFiltroEstado(estado.value)}
              >
                <Text
                  style={tw`${
                    filtroEstado === estado.value
                      ? 'text-white font-bold'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {estado.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

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
        style={tw`bg-blue-600 p-4 mb-8 rounded-full items-center mt-4 mx-4 shadow-md`}
        onPress={() => navigation.navigate('NuevaTarea')}
      >
        <Text style={tw`text-white text-base font-bold`}>+ Nueva Tarea</Text>
      </TouchableOpacity>
    </View>
  );
}
