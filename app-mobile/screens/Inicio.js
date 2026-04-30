import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// Usamos el SDK web de Firebase y nuestra configuración
import { db } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

export default function Inicio({ navigation }) {
  const [retos, setRetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Usamos db importado correctamente desde firebaseConfig
      const retosRef = ref(db, 'retos');
      const unsubscribe = onValue(retosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const retosArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setRetos(retosArray);
        } else {
          setRetos([]);
        }
        setLoading(false);
      });
      
      // Cleanup de la suscripción al desmontar el componente
      return () => unsubscribe();
    } catch (err) {
      console.error("Error al cargar firebase:", err);
      setLoading(false);
    }
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detalle', { reto: item })}
    >
      <Text style={styles.title}>{item.titulo || item.title || item.nombre || 'Reto sin nombre'}</Text>
      <Text style={styles.subtitle}>{item.descripcion || item.description || 'Pulsa para ver más detalles'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={retos}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay retos disponibles en la base de datos.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  loader: { marginTop: 40 },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 6 },
  emptyText: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#666' },
});
