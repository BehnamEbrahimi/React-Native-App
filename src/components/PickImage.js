import React from 'react';
import { Image, View, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const PickImage = ({ image, updateImage }) => {
  const { placeholder, button, container, preview } = styles;

  const browseImage = () => {
    ImagePicker.showImagePicker({ title: 'Pick an image.' }, res => {
      if (res.didCancel) {
        console.log('User cancelled.');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        updateImage({
          uri: res.uri,
          base64: res.data
        });
      }
    });
  };

  return (
    <View style={container}>
      <View style={placeholder}>
        <Image source={image} style={preview} />
      </View>
      <View style={button}>
        <Button title="Pick Image" onPress={browseImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  preview: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 5
  }
});

export default PickImage;
