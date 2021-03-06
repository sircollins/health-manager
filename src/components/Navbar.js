import colors from './../config/colors';
import { StyleSheet, View, Text, Button, } from 'react-native';
import * as a from '../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

function Navbar (props) {
  const { dispatch } = props;
  
  function pressHome() {
    const action = a.homeScreen();
    dispatch(action);
  }

  function pressMedication() {
    const action = a.medicationList();
    dispatch(action);
  }

  function pressAppointment() {
    const action = a.appointmentList();
    dispatch(action);
  }

  function pressQol() {
    const action = a.qolList();
    dispatch(action);
  }

  return(
    <View style={styles.navbar}>
        <View style={styles.buttonCover}>
          <Button onPress={pressHome} title="Home" color={colors.primary} />
        </View>
        <View style={styles.buttonCover}>
          <Button onPress={pressMedication} title="Meds" color={colors.primary} />
        </View>
        <View style={styles.buttonCover}>
          <Button onPress={pressAppointment} title="Apps" color={colors.primary} />
        </View>
        <View style={styles.buttonCover}>
          <Button onPress={pressQol} title="QoL" color={colors.primary} />
        </View>
    </View>
  )
}

// Will space-around and flex-end conflict?
const styles = StyleSheet.create({
  navbar: {
    justifyContent: "space-around",
    height: 40,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.navbar,
    flexDirection: "row",
  },
  buttonCover: {
    backgroundColor: colors.navbutton,
  }

});


Navbar.propTypes = {
  displayState: PropTypes.object,
}

const mapStateToProps = state => {
  return{
    displayState: state.displayState,
  }
}

Navbar = connect(mapStateToProps)(Navbar);

export default Navbar;
