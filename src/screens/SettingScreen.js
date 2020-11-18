import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
// import CustomActionButton from "../components/CustomActionButton";

class SettingScreen extends React.Component {
  signOut = async () => {
    try {
      await firebase.auth().signOut();

      this.props.signOut();
    } catch (error) {
      alert("Unable to sign out right now.");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signOut}>
          <View style={styles.button} title="Sign Up">
            <Text style={{ fontWeight: "400" }}>ログアウト</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(null, mapDispatchToProps)(SettingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8cd",
  },
  button: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: colors.bgPrimary,
  },
});
