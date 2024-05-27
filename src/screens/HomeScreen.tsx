import Geolocation from '@react-native-community/geolocation';
import {onlineManager} from '@tanstack/react-query';
import {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocations, usePuLocations} from '../api/locations/locations';
import {ILocation} from '../components/locations/ILocation';

export function HomeScreen() {
  const {isError, data, isFetching} = useLocations();
  const isOnline = onlineManager.isOnline();
  const mutation = usePuLocations();
  const mapRef = useRef(null);
  const {width} = Dimensions.get('window');
  const [widthOfMap, setWidthOfMap] = useState(width);
  const [zoom, setZoom] = useState(15);

  const [region, setRegion] = useState({
    latitude: 44.933797,
    longitude: -93.33666,
    latitudeDelta: 0.0922 * 100,
    longitudeDelta: 0.0421 * 100,
  });

  const onClick = (location: ILocation) => {
    location.isDone = !location.isDone;
    mutation.mutate(location);
  };

  const handleLocationClick = (location: ILocation) => {
    //@ts-ignore
    mapRef.current.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015 * 30,
        longitudeDelta: 0.0121 * 30,
      },
      1000,
    );
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015 * 5,
          longitudeDelta: 0.0121 * 5,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <Text>Home Screen</Text>
          <Text>Network: {isOnline ? 'Online' : 'Offline'}</Text>
        </View>
        {isFetching && <Text>Loading...</Text>}
        {isError && <Text>Error</Text>}
        <MapView
          mapPadding={{top: 5, right: 5, bottom: 5, left: 5}}
          showsUserLocation={true}
          followsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={region => setRegion(region)}
          onMapReady={() => {
            setWidthOfMap(widthOfMap - 1);
          }}
          ref={mapRef}>
          {data &&
            data.map((item: ILocation, index: number) => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.title}
                description={item.description}
                onPress={() => onClick(item)}
              />
            ))}
        </MapView>

        <View style={{flex: 1}}>
          {/*Display user's current region:*/}
          <Text>Current Pin latitude: {region.latitude}</Text>
          <Text>Current Pin longitude: {region.longitude}</Text>
        </View>

        {data &&
          data.map((item: ILocation, index: number) => (
            <View key={item.id} style={{flex: 1}}>
              <TouchableOpacity onPress={() => handleLocationClick(item)}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>lat: {item.latitude}</Text>
                <Text>long: {item.longitude}</Text>
              </TouchableOpacity>
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
    height: '50%',
  },
});
