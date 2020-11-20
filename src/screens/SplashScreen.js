import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../../assets/colors";

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
    backgroundColor: "pink",
  },
});

export default SplashScreen;
