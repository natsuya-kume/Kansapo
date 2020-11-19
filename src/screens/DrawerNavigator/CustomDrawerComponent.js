// ドロワーを表示するコンポーネント
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import colors from "../../../assets/colors";
import { AntDesign } from "@expo/vector-icons";

import { DrawerItemList } from "@react-navigation/drawer";

class CustomDrawerComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={colors.bgMain} />
        <View
          style={{
            height: 150,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: (Platform.OS = "android" ? 20 : 0),
          }}
        >
          <AntDesign name="table" size={100} color="blue" />
          <Text style={{ fontSize: 24, fontWeight: "100" }}>KULMS</Text>
        </View>
        <DrawerItemList {...this.props} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CustomDrawerComponent;
