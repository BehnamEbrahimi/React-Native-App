import React, { Fragment } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { removePlace } from '../../store/actions';

import { closePlaceDetails } from '../navigations';

const PlaceDetail = ({
  user,
  removePlace,
  placeKey,
  placeName,
  placeImage,
  photoOwner
}) => (
  <View style={styles.container}>
    <Fragment>
      <Image source={placeImage} style={styles.image} />
      <Text style={styles.text}>{placeName}</Text>
    </Fragment>
    <View>
      {photoOwner === user && (
        <TouchableOpacity
          onPress={() => {
            removePlace(placeKey);
            closePlaceDetails();
          }}>
          <View style={styles.deleteButton}>
            <Icon
              size={30}
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              color="red"
            />
          </View>
        </TouchableOpacity>
      )}
      <Button
        title="Close"
        onPress={() => {
          closePlaceDetails();
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  image: { height: 200, width: '100%' },
  text: { fontWeight: 'bold', textAlign: 'center', fontSize: 28 },
  deleteButton: {
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return { user: state.auth._id };
};

export default connect(
  mapStateToProps,
  { removePlace }
)(PlaceDetail);
