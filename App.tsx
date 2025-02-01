/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {UVCCamera} from 'react-native-uvc-camera';

const {width, height} = Dimensions.get('window');

function App(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      // Attempt to connect to the UVC camera
      await UVCCamera.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to camera:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isConnected ? (
        <TouchableOpacity style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonText}>Подключить</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.cameraContainer}>
          <UVCCamera
            style={styles.camera}
            autoFocus={true}
            whiteBalance="auto"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -75}, {translateY: -25}],
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    width: width,
    height: height,
  },
});

export default App;
