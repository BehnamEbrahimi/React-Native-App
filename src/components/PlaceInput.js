import React from 'react';

import Input from '../components/common/Input';

const PlaceInput = ({ placeName, onChangeText }) => {
  return (
    <Input
      placeholder="Share the place!"
      value={placeName}
      onChangeText={onChangeText}
    />
  );
};

export default PlaceInput;
