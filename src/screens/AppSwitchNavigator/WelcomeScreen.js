// 最初の画面を表示するスクリーン
import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="table" size={150} color="blue" />
        <Text style={{ fontSize: 50, fontWeight: "100" }}>KULMS</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderColor: "orange",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: colors.bgPrimary,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={{ fontWeight: "100" }}>新規登録</Text>
        </CustomActionButton>
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: colors.bgPrimary,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={{ fontWeight: "100" }}>ログイン</Text>
        </CustomActionButton>
      </View>
    </View>
  );
};

export default WelcomeScreen;
