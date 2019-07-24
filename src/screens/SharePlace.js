import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

import HeadingText from '../components/common/HeadingText';
import MainText from '../components/common/MainText';
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';
import PlaceInput from '../components/PlaceInput';

const SharePlace = ({ addPlace }) => {
  const [placeName, setPlaceName] = useState('');

  const { container, button } = styles;

  return (
    <ScrollView>
      <View style={container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage />
        <PickLocation />
        <PlaceInput
          placeName={placeName}
          onChangeText={val => setPlaceName(val)}
        />
        <Button
          title="Share the place!"
          style={button}
          onPress={() => {
            addPlace(placeName);
            setPlaceName('');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default connect(
  null,
  { addPlace }
)(SharePlace);
