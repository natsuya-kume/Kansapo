// ドロワーを表示するコンポーネント
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";

class CustomDrawerComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView />
        <View
          style={{
            height: 150,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: (Platform.OS = "android" ? 20 : 0),
            // backgroundColor: "pink",
          }}
        >
          <AntDesign name="table" size={100} color="blue" />
          <Text style={{ fontSize: 24, fontWeight: "100" }}>Kanさぽ</Text>
        </View>
        <DrawerItemList {...this.props} />
        <View
        // style={{
        //   flexDirection: "row",
        //   alignItems: "center",
        // }}
        >
          <DrawerItem
            label="お問い合わせ"
            activeBackgroundColor="skyblue"
            icon={({ color, size, focused }) => (
              <AntDesign name="mail" size={20} color={color} />
            )}
            onPress={() =>
              Linking.openURL(
                "https://docs.google.com/forms/d/e/1FAIpQLSe9TpS0OZWEERbwkKC-LBPLAySQnVM0XsEoAFbbntWYOf1GSQ/viewform"
              )
            }
          />
        </View>
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
