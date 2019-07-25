import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import Joi from 'joi-browser';

import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

import validate from '../utils/validate';

import HeadingText from '../components/common/HeadingText';
import MainText from '../components/common/MainText';
import Input from '../components/common/Input';
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';

const SharePlace = ({ addPlace }) => {
  const [formData, setFormData] = useState({
    placeName: '',
    locationChosen: false,
    imageChosen: false
  });
  const [coords, setCoords] = useState({
    latitude: -33.845499,
    longitude: 151.072297
  });
  const [placeImage, setPlaceImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    placeName: false
  });

  const { placeName } = formData;

  const schema = {
    placeName: Joi.string()
      .min(1)
      .required(),
    locationChosen: Joi.boolean().invalid(false),
    imageChosen: Joi.boolean().invalid(false)
  };

  useEffect(() => {
    const errors = validate(formData, schema);
    setErrors(errors || {});
  }, [formData]);

  const handleChange = name => val => {
    setFormData({ ...formData, [name]: val });
    setTouched({ ...touched, [name]: true });
  };

  const { container, button } = styles;

  return (
    <ScrollView>
      <View style={container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage
          image={placeImage}
          updateImage={image => {
            setPlaceImage(image);
            setFormData({ ...formData, imageChosen: true });
          }}
        />
        <PickLocation
          coords={coords}
          updateCoords={coords => {
            setCoords(coords);
            setFormData({ ...formData, locationChosen: true });
          }}
        />
        <Input
          placeholder="Share the place!"
          value={placeName}
          onChangeText={handleChange('placeName')}
          valid={errors['placeName'] ? false : true}
          touched={touched['placeName']}
        />
        <Button
          title="Share the place!"
          style={button}
          onPress={() => {
            addPlace(placeName, placeImage, coords);
            setFormData({
              placeName: '',
              locationChosen: false,
              imageChosen: false
            });
            setTouched({ placeName: false });
            setErrors({});
          }}
          disabled={Object.entries(errors).length !== 0}
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
