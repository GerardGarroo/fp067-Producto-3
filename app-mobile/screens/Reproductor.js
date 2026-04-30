import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function Reproductor({ route }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const { reto } = route.params || {};

  // Usamos una URL de video por defecto o una que provenga de Firebase (reto.videoUrl)
  const videoSource = reto?.videoUrl || reto?.video 
    ? { uri: reto.videoUrl || reto.video }
    : { uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Multimedia: {reto?.titulo || reto?.title || 'Video por defecto'}
      </Text>
      
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={videoSource}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>

      <View style={styles.controls}>
        <View style={styles.buttonWrapper}>
          <Button
            title={status.isPlaying ? 'Pausa' : 'Play'}
            onPress={() =>
              status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
            }
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Stop"
            color="#FF3B30"
            onPress={() => {
              videoRef.current.stopAsync();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonWrapper: {
    width: 100,
  }
});
