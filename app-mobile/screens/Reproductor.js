import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function Reproductor({ route }) {
  const { reto } = route.params || {};

  // Usamos una URL de video por defecto o una que provenga de Firebase
  const videoSource = reto?.videoUrl || reto?.video 
    ? { uri: reto.videoUrl || reto.video }
    : { uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' };

  // hook useVideoPlayer de expo-video reemplaza la API imperativa de expo-av
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.pause(); // Empezar en pausa
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Multimedia: {reto?.titulo || reto?.title || 'Video por defecto'}
      </Text>
      
      <View style={styles.videoContainer}>
        {/* VideoView proporciona sus propios controles nativos de forma mucho más optimizada */}
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>

      <View style={styles.controls}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Play"
            color="#007AFF"
            onPress={() => player.play()}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Pausa"
            color="#FF9500"
            onPress={() => player.pause()}
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
