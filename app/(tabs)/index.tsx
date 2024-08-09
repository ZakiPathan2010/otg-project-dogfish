// REACT //
import { useEffect } from 'react';

// REACT NATIVE //
import { StyleSheet, Text } from 'react-native';

// MODULES //
import { router } from 'expo-router';

// ENUMS //
import { LocalStorageKeys } from '@/enums/local-storage';

// SERVICES //
import { setDataStorage } from '@/services/storage.service';

export default function HomeScreen() {

  useEffect(() => {
    // Empty the Local Storage
    // TODO: Remove after development is complete
    setDataStorage(LocalStorageKeys.AUTH_TOKEN, "");

    // Navigate to Login
    // TODO: Remove this and make Login first page
    setTimeout(() => {
      router.replace("/account/login");
    }, 200);
  }, []);

  return (
    <Text>OTG</Text>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
