import {useState, useEffect} from 'react';
import {UVCCamera} from 'react-native-uvc-camera';

export const useUVCCamera = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (isConnected) {
        UVCCamera.disconnect();
      }
    };
  }, [isConnected]);

  const connect = async () => {
    try {
      await UVCCamera.connect();
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to connect to camera',
      );
      setIsConnected(false);
    }
  };

  const disconnect = async () => {
    try {
      await UVCCamera.disconnect();
      setIsConnected(false);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to disconnect from camera',
      );
    }
  };

  return {
    isConnected,
    error,
    connect,
    disconnect,
  };
};
