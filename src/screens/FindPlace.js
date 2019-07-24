import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';

import PlaceList from '../components/PlaceList';

const FindPlace = () => {
  const [loading, setLoading] = useState(true);
  const { searchBtn, searchBtnText, btnContainer } = styles;

  // Expand Fade Out Animation
  const expandFadeOutAnimatedValue = useRef(new Animated.Value(1)).current;
  const expandFadeOut = () =>
    new Promise(finished => {
      // Converting a callback API to promise
      Animated.timing(expandFadeOutAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => finished());
    });
  const expandFadeOutStyle = {
    opacity: expandFadeOutAnimatedValue,
    transform: [
      {
        scale: expandFadeOutAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 1]
        })
      }
    ]
  };

  // Fade In Animation
  const fadeInAnimatedValue = useRef(new Animated.Value(0)).current;
  const fadeIn = () =>
    new Promise(finished => {
      // Converting a callback API to promise
      Animated.timing(fadeInAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => finished());
    });
  const fadeInStyle = {
    opacity: fadeInAnimatedValue
  };

  const handleSearch = async () => {
    await expandFadeOut();
    setLoading(false);
    await fadeIn();
  };

  let content = (
    <Animated.View style={expandFadeOutStyle}>
      <TouchableOpacity onPress={handleSearch}>
        <View style={searchBtn}>
          <Text style={searchBtnText}>Find Places</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (!loading) {
    content = (
      <Animated.View style={fadeInStyle}>
        <PlaceList />
      </Animated.View>
    );
  }

  return <View style={loading && btnContainer}>{content}</View>;
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtn: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchBtnText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

export default FindPlace;
