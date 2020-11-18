// ローディング画面を表示するスクリーン
import React, { Component } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import colors from "../../../assets/colors";

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
