import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import Inicio from './screens/Inicio';
import Detalle from './screens/Detalle';
import Reproductor from './screens/Reproductor';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={({ navigation }) => ({
          headerTitle: 'App Retos',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Inicio')} 
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Inicio</Text>
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ title: 'Inicio' }} 
        />
        <Stack.Screen 
          name="Detalle" 
          component={Detalle} 
          options={{ title: 'Detalle del Reto' }} 
        />
        <Stack.Screen 
          name="Reproductor" 
          component={Reproductor} 
          options={{ title: 'Reproductor Multimedia' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
