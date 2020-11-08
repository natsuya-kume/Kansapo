import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import colors from "../../assets/colors";
import { Form, Item, Input, Label, Icon } from "native-base";
import CustomActionButton from "../components/CustomActionButton";
import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onSignIn = async () => {
    if (email && password) {
      // this.setState({ isLoading: true });
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          // this.setState({ isLoading: false });
          setIsLoading(false);
          dispatch({ type: "SIGN_IN", payload: response.user });
          // this.props.signIn(response.user);
          // this.props.navigation.navigate("LoadingScreen");
        }
      } catch (error) {
        // this.setState({ isLoading: false });
        setIsLoading(false);

        switch (error.code) {
          case "auth/user-not-found":
            alert("そのユーザーは存在しません。メールアドレス・パスワードが正しいことを確認してください。");
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

  const onSignUp = async () => {
    
    if (email && password) {
   

      // this.setState({ isLoading: true });
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          // this.setState({ isLoading: false });
          setIsLoading(false);
          firebase.auth().currentUser.sendEmailVerification();

          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });
          dispatch({ type: "SIGN_IN", payload: response.user });
          // this.props.navigation.navigate("LoadingScreen");
          // this.onSignIn(this.state.email, this.state.password);
        }
      } catch (error) {
        setIsLoading(false);

        // this.setState({ isLoading: false });

        if (error.code == "auth/email-already-in-use") {
          alert("そのユーザーは既に存在しています。");
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
          <ActivityIndicator
            size="large"
            // color={colors.logoColor}
            color="#7acbe1"
          />
        </View>
      ) : null}
      <View style={{ flex: 1, justifyContent: "center" }}>
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
          <CustomActionButton
            onPress={onSignUp}
            style={[styles.loginButton, { borderColor: colors.bgPrimary }]}
          >
            <Text style={{ fontWeight: "400" }}>新規登録</Text>
          </CustomActionButton>
        </View>

      </View>
      <View style={{ flex: 1,alignItems:'center',justifyContent:'space-between',marginTop:50}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("TermsScreen")}
        
        >
          <Text style={{color:"#009bc6"}}>利用規約(必読)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10
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
