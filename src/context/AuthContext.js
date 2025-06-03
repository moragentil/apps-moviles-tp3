import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Autenticación local dummy (usuario: admin, contraseña: 1234)
    if (username === 'admin' && password === '1234') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    // Dummy: siempre permite registro, pero no guarda usuarios
    setUser({ username });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}