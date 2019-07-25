import React, { Fragment, useState, useRef } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const PickLocation = ({ coords, updateCoords }) => {
  const [locationChosen, setLocationChosen] = useState(false);

  const delta = {
    latitudeDelta: 0.0122,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.0122
  };

  const mapRef = useRef(null);

  goToLocation = coords => {
    mapRef.current.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      ...delta
    });

    updateCoords({
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    setLocationChosen(true);
  };

  const pickLocation = ({ nativeEvent: { coordinate: coords } }) => {
    goToLocation(coords);
  };

  const locateMe = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        goToLocation(pos.coords);
      },
      err => {
        console.log('Fetching location error.', err);
      }
    );
  };

  const { map, button } = styles;

  return (
    <Fragment>
      <MapView
        ref={mapRef}
        initialRegion={{ ...coords, ...delta }}
        style={map}
        onPress={pickLocation}>
        {locationChosen && <MapView.Marker coordinate={coords} />}
      </MapView>
      <View style={button}>
        <Button title="Locate Me" onPress={locateMe} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 5
  }
});

export default PickLocation;
