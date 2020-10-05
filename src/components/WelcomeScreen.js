import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, Button, TextInput } from 'react-native';
import { welcomeScreen } from '../actions';
import backgroundImage from '../assets/background2.jpg';
import colors from './../config/colors';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { SOME_KEY } from 'react-native-dotenv';
import * as rnd from 'react-native-dotenv';

function WelcomeScreen(props) {
  console.log('Things:');

  console.log(SOME_KEY);

  console.log('RND');
  console.log(rnd);

  // for (const key in process.env) {
  //   console.log(key);
  //   console.log(process.env[key])
  // }
  // console.log(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}`);
  // Sign In/Up form display state and error text hooks
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
        console.log('Successfully signed up!');
      }).catch(function(error) {
        console.log(error.message);
        setErrorText(error.message);
      });
    }
  }

  function doSignIn() {
    setErrorText(null);
    const email = signInEmail;
    const password = signInPassword;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log('Successfully signed in!');
    }).catch(function(error) {
      console.log(error.message);
      setErrorText(error.message);
    });
  }

  // Sign in display
  if (formType === "Sign In") {
    return (
      <ImageBackground 
      source={backgroundImage}
      style={styles.background} >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
          <Text>Take Charge of Your Health Journey</Text>
        </View>
        
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

        <View style={styles.loginButton} >
          <Button onPress={doSignIn} title="Sign In" color={colors.primary} />
        </View>
      </ImageBackground>
    )
  }

  // Sign up display
  else if (formType === "Sign Up") {
    return (
      <ImageBackground 
      source={backgroundImage}
      style={styles.background} >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
          <Text>Take Charge of Your Health Journey</Text>
        </View>
        
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

        <Text>Confirm Password:</Text>
        <TextInput
          style={styles.email}
          onChangeText = {text => setSignUpPasswordConfirm(text)}
          secureTextEntry = {true}
          textContentType = {"password"}
        />

        <View style={styles.registerButton} >
          <Button onPress={doSignUp} title="Sign In" color={colors.primary} />
        </View>
      </ImageBackground>
    )
  }

  // Default sign-in display
  else {
    return (
      <ImageBackground 
      source={backgroundImage}
      style={styles.background} >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
          <Text>Take Charge of Your Health Journey</Text>
        </View>

        {/* <Button onPress={props.goHome} title="Home Page" color={colors.primary} /> */}
        <View style={styles.loginButton} >
          <Button onPress={() => setFormType("Sign In")} title="Sign In" color={colors.secondary} />
        </View>
        <View style={styles.registerButton} >
          <Button onPress={() => setFormType("Sign Up")} title="Sign Up" color={colors.primary} />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  loginButton: {
    width: 140,
    height: 70,
    backgroundColor: colors.primary,
  },
  registerButton: {
    width: 140,
    height: 70,
    backgroundColor: colors.secondary,
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
    width: 250,
    borderColor: 'gray',
    borderWidth: 1 
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
  }
});

// welcomeScreen.propTypes = {
//   goHome: PropTypes.func,
// }

export default WelcomeScreen;