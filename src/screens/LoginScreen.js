import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import tw from '../utils/tailwind';
import CustomInput from '../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { activeTheme } = useContext(ThemeContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDark = activeTheme === 'dark';

  const handleLogin = () => {
    if (!login(username, password)) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={tw`${isDark ? 'flex-1 items-center justify-center bg-black p-4' : 'flex-1 items-center justify-center bg-white p-4'}`}>
      <View style={tw`w-full max-w-md rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} p-8`}>
        <View style={tw`items-center`}>
          <View style={tw`h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 p-2 items-center justify-center`}>
            <View style={tw`flex-1 w-full h-full items-center justify-center rounded-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <Ionicons name="lock-closed" size={24} color="#f59e42" />
            </View>
          </View>
          <Text style={tw`mt-6 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Iniciar Sesión</Text>
          <Text style={tw`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            O{' '}
            <Text style={tw`font-medium text-amber-500`}>crea una cuenta nueva</Text>
          </Text>
        </View>

        <View style={tw`mt-8 space-y-6`}>
          <View style={tw`rounded-lg border ${isDark ? 'border-gray-800 bg-gray-800/50' : 'border-gray-200 bg-gray-100'} p-4`}>
            {/* Usuario */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Usuario</Text>
              <View style={tw`flex-row items-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg`}>
                <Ionicons name="person" size={20} color={isDark ? "#6b7280" : "#a3a3a3"} style={tw`ml-3`} />
                <CustomInput
                  placeholder="usuario"
                  placeholderTextColor={isDark ? "#6b7280" : "#a3a3a3"}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  style={tw`flex-1 p-3 rounded-lg pl-3 ${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`}
                />
              </View>
            </View>
            {/* Contraseña */}
            <View>
              <View style={tw`flex-row items-center justify-between mb-1`}>
                <Text style={tw`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Contraseña</Text>
                <Text style={tw`text-xs font-medium text-amber-500`}>¿Olvidaste?</Text>
              </View>
              <View style={tw`flex-row items-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg`}>
                <Ionicons name="lock-closed" size={20} color={isDark ? "#6b7280" : "#a3a3a3"} style={tw`ml-3`} />
                <CustomInput
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? "#6b7280" : "#a3a3a3"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={tw`flex-1 p-3 rounded-lg pl-3 ${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              tw`h-12 w-full rounded-lg items-center justify-center mt-4 flex-row`,
              { backgroundColor: 'transparent' },
            ]}
            onPress={handleLogin}
          >
            <View
              style={{
                ...tw`absolute left-0 right-0 top-0 bottom-0 rounded-full`,
                background: 'linear-gradient(90deg, #f59e42 0%, #f43f5e 100%)',
                backgroundColor: '#f59e42',
                opacity: 0.95,
              }}
            />
            <Text style={tw`text-white font-bold text-base z-10`}>Ingresar</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={tw`ml-2 z-10`} />
          </TouchableOpacity>

          <View style={tw`items-center justify-center mt-4`}>
            <Text style={tw`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Protegido por reCAPTCHA y sujeto a la{' '}
              <Text style={tw`text-amber-500`}>Política de Privacidad</Text> y{' '}
              <Text style={tw`text-amber-500`}>Términos de Servicio</Text>.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}