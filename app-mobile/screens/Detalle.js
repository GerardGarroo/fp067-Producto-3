import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function Detalle({ route, navigation }) {
  // Obtenemos el objeto "reto" pasado desde Inicio.js
  const { reto } = route.params || {};

  if (!reto) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No se han encontrado detalles para este reto.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{reto.titulo || reto.title || reto.nombre || 'Reto'}</Text>
        <Text style={styles.description}>
          {reto.descripcion || reto.description || 'No hay descripción detallada para este reto.'}
        </Text>
        
        {/* Mostramos otros posibles campos de la base de datos si existen */}
        {reto.dificultad && (
          <Text style={styles.extraInfo}>Dificultad: {reto.dificultad}</Text>
        )}
        {reto.puntos && (
          <Text style={styles.extraInfo}>Puntos: {reto.puntos}</Text>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Abrir Reproductor Multimedia"
          color="#007AFF"
          onPress={() => navigation.navigate('Reproductor', { reto })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  description: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 15 },
  extraInfo: { fontSize: 16, fontWeight: '500', color: '#007AFF', marginTop: 5 },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  }
});
