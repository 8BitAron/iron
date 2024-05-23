import {onlineManager} from '@tanstack/react-query';
import {Button, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocations, usePuLocations} from '../api/locations/locations';
import {ILocation} from '../components/locations/ILocation';

export function HomeScreen() {
  const {isError, data, isFetching} = useLocations();
  const isOnline = onlineManager.isOnline();
  const mutation = usePuLocations();

  const onClick = (location: ILocation) => {
    location.isDone = !location.isDone;
    mutation.mutate(location);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <Text>Home Screen</Text>
          <Text>Network: {isOnline ? 'Online' : 'Offline'}</Text>
        </View>
        {isFetching && <Text>Loading...</Text>}
        {isError && <Text>Error</Text>}
        <MapView style={styles.map} />
        {data &&
          data.map((item: ILocation, index: number) => (
            <View key={item.id}>
              <View>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{item.isDone ? 'Done' : 'Not Done'}</Text>
                <Text>{!item.isNotSynced ? 'Not Synced' : 'Synced'}</Text>
              </View>
              <View>
                <Button
                  title="Done"
                  onPress={() => {
                    onClick(item);
                  }}
                />
              </View>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
