import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';

const DefaultButton = props => {
  const { button } = styles;
  const content = (
    <View
      style={[
        button,
        { backgroundColor: props.color },
        props.disabled && styles.disabled
      ]}>
      <Text>{props.children}</Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }

  if (Platform.OS === 'ios')
    return (
      <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
    );
  else if (Platform.OS === 'android')
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  disabled: {
    backgroundColor: '#eee',
    color: '#aaa',
    borderColor: '#aaa'
  }
});

export default DefaultButton;
