// ボタン管理のコンポーネント
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";

const CustomActionButton = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.bgSuccess,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomActionButton;
