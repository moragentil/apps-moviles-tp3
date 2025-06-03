import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import tw from '../utils/tailwind';
import CustomInput from '../components/CustomInput'; // <-- Importa el input reutilizable

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { activeTheme } = useContext(ThemeContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!login(username, password)) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={tw`${activeTheme === 'dark' ? 'flex-1 justify-center p-6 bg-gray-900 text-white' : 'flex-1 justify-center p-6 bg-white'}`}>
      <Text style={tw`text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white`}>Iniciar Sesión</Text>
      <CustomInput
        placeholder="Usuario"
        placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <CustomInput
        placeholder="Contraseña"
        placeholderTextColor={activeTheme === 'dark' ? '#ccc' : '#888'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={tw`bg-blue-600 p-4 rounded-lg items-center mt-4`} onPress={handleLogin}>
        <Text style={tw`text-white font-bold text-base`}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}