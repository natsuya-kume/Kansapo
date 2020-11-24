import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={{ height: 200, width: 200 }}
        source={require("../../assets/splash.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
