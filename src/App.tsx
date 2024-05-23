/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {QueryClient, onlineManager} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import React, {useEffect} from 'react';

import {HomeScreen} from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

function App(): React.JSX.Element {
  useEffect(() => {
    return NetInfo.addEventListener(state => {
      const status = !!state.isConnected;
      onlineManager.setOnline(status);
    });
  }, []);

  return (
    <PersistQueryClientProvider
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }
      persistOptions={{persister}}
      client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}

export default App;
