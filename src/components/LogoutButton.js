import React, { useContext, useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import tw from '../utils/tailwind';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    logout();
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="log-out-outline" size={24} color="#f59e42" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-60`}>
          <View style={tw`bg-white dark:bg-gray-900 p-8 rounded-2xl w-80 items-center border-2 border-[#f59e42]`}>
            <Ionicons name="log-out-outline" size={40} color="#f59e42" style={tw`mb-2`} />
            <Text style={tw`text-lg font-bold mb-2 text-gray-900 dark:text-white`}>¿Cerrar sesión?</Text>
            <Text style={tw`text-gray-700 dark:text-gray-300 mb-6 text-center`}>
              ¿Estás seguro que deseas cerrar sesión?
            </Text>
            <View style={tw`flex-row justify-between w-full`}>
              <TouchableOpacity
                style={tw`flex-1 py-3 rounded-full mr-2 bg-gray-200 dark:bg-gray-700 items-center`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-gray-800 dark:text-gray-200 font-bold`}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...tw`flex-1 py-3 rounded-full ml-2 bg-[#f59e42] items-center`,
                    background: 'linear-gradient(90deg, #f59e42 0%, #f43f5e 100%)',
          backgroundColor: '#f59e42',
                }}
                onPress={handleLogout}
              >
                <Text style={tw`text-white font-bold`}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
