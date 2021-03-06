// 最初の画面を表示するスクリーン
import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
        <Text style={{ fontSize: 50, fontWeight: "100" }}>Kanさぽ</Text>
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
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text>新規登録</Text>
        </CustomActionButton>
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text>ログイン</Text>
        </CustomActionButton>
      </View>
    </View>
  );
};

export default WelcomeScreen;
