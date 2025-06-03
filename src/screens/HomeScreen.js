import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import tw from '../utils/tailwind';
import ThemeSwitch from '../components/ThemeSwitch';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { tasks } = useContext(TaskContext);
  const { activeTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    logout();
  };

  const renderItem = ({ item }) => (
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
  );

  return (
    <View style={tw`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View style={tw`flex-row mt-16 items-center justify-between py-4 px-4 mb-10`}>
        <ThemeSwitch />
        <Text style={tw`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-center flex-1 -ml-8`}>
          Mis Tareas
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#f59e42" />
        </TouchableOpacity>
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
            {mostrarFiltros ? 'Ocultar filtros' : 'Aplicar filtros'}
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
      <View style={tw`flex-row mx-4 mb-4`}>
        <TouchableOpacity
          style={[
            tw`flex-1 py-3 rounded-l-full items-center border`,
            tab === 'pendientes'
              ? { backgroundColor: '#f59e42', borderColor: '#f59e42' }
              : isDark
              ? tw`bg-gray-900 border-gray-800`
              : tw`bg-white border-gray-200`
          ]}
          onPress={() => setTab('pendientes')}
        >
          <Text style={tw`${tab === 'pendientes' ? 'text-white font-bold' : isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex-1 py-3 rounded-r-full items-center border`,
            tab === 'completadas'
              ? { backgroundColor: '#f59e42', borderColor: '#f59e42' }
              : isDark
              ? tw`bg-gray-900 border-gray-800`
              : tw`bg-white border-gray-200`
          ]}
          onPress={() => setTab('completadas')}
        >
          <Text style={tw`${tab === 'completadas' ? 'text-white font-bold' : isDark ? 'text-gray-200' : 'text-gray-800'}`}>
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
