import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native';
import backgroundImage from '../assets/background.jpg';

function WelcomeScreen(props) {

  return(
    <ImageBackground 
    source={backgroundImage}
    style={styles.background} >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/placeholderLogo.png')} style={styles.logo}/>
        <Text>Take Charge of Your Health Journey</Text>
      </View>
      <View style={styles.loginButton} >
        <Text>Button will be here!</Text>
      </View>
      <View style={styles.registerButton} >
        <Text>Button will be here!</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#32CD32",
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  loginButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#fc5c65',
  },
  registerButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#4ecdc4',
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
});

export default WelcomeScreen;