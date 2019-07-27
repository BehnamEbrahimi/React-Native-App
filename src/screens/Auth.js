import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Joi from 'joi-browser';

import { connect } from 'react-redux';
import { login, register } from '../../store/actions';

import { startMainTabs } from '../navigations';

import validate from '../utils/validate';

import Input from '../components/common/Input';
import HeadingText from '../components/common/HeadingText';
import MainText from '../components/common/MainText';
import DefaultButton from '../components/common/DefaultButton';
import backgroundImage from '../img/background.jpg';

const Auth = ({ login, register, isAuthenticated }) => {
  useEffect(() => {
    const updateStyle = newDims => {
      if (newDims.window.height > 500) setIsLong(true);
      else setIsLong(false);
    };

    Dimensions.addEventListener('change', updateStyle);

    // clean-up after unmounting to prevent memory leak
    return () => Dimensions.removeEventListener('change', updateStyle);
  }, []);

  const [isLong, setIsLong] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });
  const [authMode, setAuthMode] = useState('login');

  const { email, password, confirmPassword } = formData;

  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .options({ language: { any: { allowOnly: 'must match password' } } })
  };

  useEffect(() => {
    const errors = validate(formData, schema);
    if (authMode === 'login') {
      delete errors.confirmPassword;
    }
    setErrors(errors || {});
  }, [formData]);

  const handleChange = name => val => {
    setFormData({ ...formData, [name]: val });
    setTouched({ ...touched, [name]: true });
  };

  const handleLogin = () => {
    const authData = {
      email,
      password
    };
    if (authMode === 'login') {
      login(authData);
    } else if (authMode === 'signUp') {
      register(authData);
    }
  };

  const toggleLogin = () => {
    setAuthMode(authMode === 'login' ? 'signUp' : 'login');
  };

  const {
    container,
    inputContainer,
    input,
    landscapePasswordContainer,
    portraitPasswordContainer,
    landscapePasswordWrapper,
    portraitPasswordWrapper
  } = styles;

  let headingText = null;
  if (isLong) {
    headingText = (
      <MainText>
        <HeadingText>
          {authMode === 'login' ? 'Please Log In' : 'Please Sign Up'}
        </HeadingText>
      </MainText>
    );
  }

  if (isAuthenticated) {
    startMainTabs();
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={container}>
        {headingText}
        <DefaultButton color="#29aaf4" onPress={toggleLogin}>
          {authMode === 'login'
            ? 'Need an account?'
            : 'Already have an account!'}
        </DefaultButton>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={inputContainer}>
            <Input
              placeholder="Your E-mail Address"
              style={input}
              value={email}
              onChangeText={handleChange('email')}
              valid={errors['email'] ? false : true}
              touched={touched['email']}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View
              style={
                isLong ? portraitPasswordContainer : landscapePasswordContainer
              }>
              <View
                style={
                  isLong || authMode === 'login'
                    ? portraitPasswordWrapper
                    : landscapePasswordWrapper
                }>
                <Input
                  placeholder="Password"
                  style={input}
                  value={password}
                  onChangeText={handleChange('password')}
                  valid={errors['password'] ? false : true}
                  touched={touched['password']}
                  secureTextEntry={true}
                />
              </View>
              <View
                style={
                  isLong ? portraitPasswordWrapper : landscapePasswordWrapper
                }>
                {authMode === 'signUp' && (
                  <Input
                    placeholder="Confirm Password"
                    style={input}
                    value={confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    valid={errors['confirmPassword'] ? false : true}
                    touched={touched['confirmPassword']}
                    secureTextEntry={true}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <DefaultButton
          color="#29aaf4"
          onPress={handleLogin}
          disabled={Object.entries(errors).length !== 0}>
          Submit
        </DefaultButton>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: { width: '80%' },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '49%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { login, register }
)(Auth);
