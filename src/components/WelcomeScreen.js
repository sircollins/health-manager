import React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, Image, Button, TextInput, Platform } from 'react-native';
import colors from './../config/colors';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import * as a from '../actions/index';
import { connect } from 'react-redux';

function WelcomeScreen(props) {

  const [ formType, setFormType ] = useState(null);
  const [ errorText, setErrorText ] = useState(null);
  
  // Sign In Text Value hooks
  const [ signInEmail, setSignInEmail ] = useState(null);
  const [ signInPassword, setSignInPassword ] = useState(null);

  // SignUp Text Value hooks
  const [ signUpEmail, setSignUpEmail ] = useState(null);
  const [ signUpPassword, setSignUpPassword ] = useState(null);
  const [ signUpPasswordConfirm, setSignUpPasswordConfirm ] = useState(null);

  function doSignUp() {
    setErrorText(null);
    const email = signUpEmail;
    const password = signUpPassword;
    const passwordConfirm = signUpPasswordConfirm;

    if (password != passwordConfirm) {
      setErrorText("Passwords do not match!");
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        updateDisplay();
      }).catch(function(error) {
        setErrorText(error.message);
      });
    }
  }

  function doSignIn() {
    setErrorText(null);
    const email = signInEmail;
    const password = signInPassword;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      updateDisplay();
    }).catch(function(error) {
      setErrorText(error.message);
    });
  }

  function updateDisplay() {
    const { dispatch } = props;
    const action = a.homeScreen();
    dispatch(action);
  }

  // Sign in display
  if (formType === "Sign In") {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} 
      style={styles.background} >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
          <Text style={styles.slogan}>Take Charge of Your Health Journey</Text>
        </View>
        
        <View style={styles.form}>
          <Text style={styles.header}>Sign In!</Text>
          <Text>{errorText}</Text>
          <Text>Email:</Text>
          <TextInput
            style={styles.email}
            onChangeText = {text => setSignInEmail(text)}
            textContentType = {"emailAddress"}
          />
          <Text>Password:</Text>
          <TextInput
            style={styles.email}
            onChangeText = {text => setSignInPassword(text)}
            secureTextEntry = {true}
            textContentType = {'password'}
          />
        </View>

        <View style={styles.loginButton} >
          <Button onPress={doSignIn} title="Sign In" color={colors.primary} />
        </View>
      </KeyboardAvoidingView>
    )
  }

  // Sign up display
  else if (formType === "Sign Up") {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.background} >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
          <Text style={styles.slogan}>Take Charge of Your Health Journey</Text>
        </View>
        
        <View style={styles.form}>
          <Text style={styles.header}>Sign Up!</Text>
          <Text>{errorText}</Text>

          <Text>Email:</Text>
          <TextInput
            style={styles.email}
            onChangeText = {text => setSignUpEmail(text)}
            textContentType = {"emailAddress"}
          />
          <Text>Password:</Text>
          <TextInput
            style={styles.email}
            onChangeText = {text => setSignUpPassword(text)}
            secureTextEntry = {true}
            textContentType = {"password"}
          />
        </View>

        <Text>Confirm Password:</Text>
        <TextInput
          style={styles.email}
          onChangeText = {text => setSignUpPasswordConfirm(text)}
          secureTextEntry = {true}
          textContentType = {"password"}
        />

        <View style={styles.registerButton} >
          <Button onPress={doSignUp} title="Register" color={colors.primary} />
        </View>
      </KeyboardAvoidingView>
    )
  }

  // Default sign-in display
  else {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} 
      style={styles.background} >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
          <Text style={styles.slogan}>Take Charge of Your Health Journey</Text>
        </View>

        <View style={styles.loginButton} >
          <Button onPress={() => setFormType("Sign In")} title="Sign In" color={colors.secondary} />
        </View>
        <View style={styles.registerButton} >
          <Button onPress={() => setFormType("Sign Up")} title="Sign Up" color={colors.primary} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignSelf: 'stretch',
  },
  loginButton: {
    width: 140,
    height: 45,
    backgroundColor: colors.primary,
    paddingBottom: 5,
  },
  registerButton: {
    width: 140,
    height: 45,
    backgroundColor: colors.secondary,
    paddingBottom: 50,
    paddingTop: 15,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
  },
  email: {
    height: 40,
    width: 251,
    borderColor: 'gray',
    borderWidth: 1 ,
    paddingBottom: 20,
  },
  password: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1
  },
  header: {
    fontSize: 20,
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  slogan: {
    paddingTop: 40,
    fontSize: 20,
  },
  form: {
    paddingBottom: 45,
    alignContent: 'center',
  }
});


WelcomeScreen.propTypes = {
  displayState: PropTypes.object,
}

const mapStateToProps = state => {
  return{
    displayState: state.displayState,
  }
}

WelcomeScreen = connect(mapStateToProps)(WelcomeScreen);

export default WelcomeScreen;