import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { showPlaceDetails } from '../navigations';
import ListItem from './ListItem';

const PlaceList = ({ places }) => (
  <FlatList
    style={styles.listContainer}
    data={places}
    renderItem={info => (
      <ListItem
        key={info.item.key}
        placeName={info.item.placeName}
        placeImage={info.item.placeImage}
        handleItemSelect={() =>
          showPlaceDetails(
            info.item.key,
            info.item.placeName,
            info.item.placeImage
          )
        }
      />
    )}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  return { places: state.places };
};

export default connect(
  mapStateToProps,
  {}
)(PlaceList);
