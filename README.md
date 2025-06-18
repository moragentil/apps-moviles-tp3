# Gestor de Tareas con Prioridades

## Descripción

Esta app es un gestor de tareas que permite al usuario crear, editar y eliminar tareas, asignarles prioridades (alta, media, baja), establecer fecha de entrega y marcar su estado como completada o pendiente. Incluye autenticación local, modo claro/oscuro configurable, filtros por prioridad, y la posibilidad de ordenar tareas usando una API externa.

## Librerías principales utilizadas

- **React Native**: Framework principal para el desarrollo móvil.
- **Expo**: Plataforma para desarrollo y testing rápido de apps React Native.
- **@react-navigation/native** y **@react-navigation/native-stack**: Navegación entre pantallas.
- **@react-native-async-storage/async-storage**: Persistencia local de tareas.
- **@react-native-community/datetimepicker**: Selección de fechas.
- **axios**: Llamadas HTTP a la API externa.
- **tailwind-react-native-classnames**: Estilos rápidos y responsivos con Tailwind.
- **react-native-gesture-handler**: Soporte para gestos (swipe para completar/eliminar tareas).
- **@expo/vector-icons**: Iconos.

## Instrucciones para instalar y correr la app

1. **Clona el repositorio**  
   ```sh
   git clone <URL_DEL_REPO>
   cd gestor-tareas
   ```

2. **Instala las dependencias**  
   ```sh
   npm install
   ```

3. **Inicia la app**  
   ```sh
   npm start
   ```
   o usando Expo:
   ```sh
   expo start
   ```

4. **Abre la app en tu dispositivo o emulador**  
   - Escanea el QR con la app Expo Go en tu teléfono, o
   - Usa un emulador Android/iOS.

---

**Notas:**
- Usuario demo: `admin`  
- Contraseña demo: `1234`
- Para ordenar tareas por API, presiona el botón de ordenar en la pantalla