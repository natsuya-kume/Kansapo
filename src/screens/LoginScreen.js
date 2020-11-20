// ログインする時のスクリーン
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import colors from "../../assets/colors";
import { Form, Item, Input, Label, Icon } from "native-base";
import CustomActionButton from "../components/CustomActionButton";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          setIsLoading(false);
          dispatch({ type: "SIGN_IN", payload: response.user });
        }
      } catch (error) {
        setIsLoading(false);

        switch (error.code) {
          case "auth/user-not-found":
            alert(
              "そのユーザーは存在しません。メールアドレス・パスワードが正しいことを確認してください。"
            );
            break;
          case "auth/invalid-email":
            alert("メールアドレスとパスワードを入力してください");
            break;
          default:
            alert("エラー");
        }
      }
    } else {
      alert("メールアドレスとパスワードを入力してください");
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              elevation: 1000,
            },
          ]}
        >
          <ActivityIndicator size="large" color="#7acbe1" />
        </View>
      ) : null}
      <View style={{ justifyContent: "center" }}>
        <View style={{ marginHorizontal: 5 }}>
          <Form>
            <Item floatingLabel>
              <Label>メールアドレス</Label>
              <Input onChangeText={(email) => setEmail(email)} />
            </Item>
            <Item floatingLabel>
              <Label>パスワード</Label>
              <Input onChangeText={(password) => setPassword(password)} />
            </Item>
          </Form>
        </View>
        <View style={styles.buttonContainer}>
          <CustomActionButton
            onPress={onSignIn}
            style={[styles.loginButton, { borderColor: colors.bgPrimary }]}
          >
            <Text style={{ fontWeight: "400" }}>ログイン</Text>
          </CustomActionButton>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: colors.bgMain,
    // backgroundColor: "#7acbe1",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
    marginTop: 20,
    width: 200,
  },
});
