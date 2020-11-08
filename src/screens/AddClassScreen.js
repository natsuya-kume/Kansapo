// 関大の授業データをfirebaseに格納
import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import firebase from "firebase/app";
import { snapshotToArray } from "../helpers/FirebaseHelpers";
import ListItem from "../components/ListItem";
import colors from "../../assets/colors";
import CustomActionButton from "../components/CustomActionButton";
class AddClassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 授業リストを入れる配列
      data: [],
      // 選択された授業を入れる配列
      selectedSubjects: [],
      currentUser: {},
    };
    // subjects配列の授業リストを取得　dataに代入
    this.getFireData();
  }

  componentDidMount = async () => {
    // LoadingScreenから持ってくる
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    // userのuidを参照
    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    // selectedSubjectsのuidを参照
    const selectedSubjects = await firebase
      .database()
      .ref("selectedSubject")
      .child(user.uid)
      .once("value");

    // snapshotToArrayにuidを含んだselectedSubject情報を渡す→配列に変換
    const selectedSubjectsArray = snapshotToArray(selectedSubjects);
    this.setState({
      currentUser: currentUserData.val(),
      selectedSubjects: selectedSubjectsArray,
    });
  };

  // Firebaseからのデータ取得
  getFireData() {
    let db = firebase.database();
    let ref = db.ref("subjects/");
    let self = this;
    ref
      .orderByKey()
      .limitToFirst(100)
      .on("value", (snapshot) => {
        self.setState({
          data: snapshot.val(),
        });
      });
  }
  
  // 授業が選ばれた時にusersと同じuidを持つselectedSubjectをつくりたい
  addSubject = async (selectedSubject, index) => {
    try {
      // const snapshot = await firebase
      //   .database()
      //   .ref("selectedSubject")
      //   .child(this.state.currentUser.uid)
      //   .orderByChild("name")
      //   .equalTo(selectedSubject)
      //   .once("value");
      // if (snapshot.exists()) {
      //   alert("既に追加されています");
      // } else {
      const key = await firebase
        .database()
        .ref("selectedSubject")
        .child(this.state.currentUser.uid)
        .push().key;

      const response = await firebase
        .database()
        .ref("selectedSubject")
        .child(this.state.currentUser.uid)
        .child(key)
        .set({ name: selectedSubject, number: 3 });
      this.setState((state, props) => ({
        // 本の情報を更新
        selectedSubjects: [
          ...state.selectedSubjects,
          { name: selectedSubject, number: 3 },
        ],
      }));
      // }
    } catch (error) {
      console.log(error);
    }
  };

  renderItem = (item, index) => (
    <ListItem item={item}>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.addSubject(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>追加</Text>
      </CustomActionButton>
    </ListItem>
  );

  renderSubjectsItem = (item, index) => {
    <ListItem item={item}></ListItem>;
  };

  render() {
    if (this.state.data.length == 0) {
      this.getFireData();
    }
    return (
      <View>
        <SafeAreaView />
        <View>
          <FlatList
            data={this.state.data}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View>
          <FlatList
            data={this.state.selectedSubjects}
            renderItem={({ item }, index) =>
              this.renderSubjectsItem(item, index)
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}
export default AddClassScreen;

const styles = StyleSheet.create({
  markAsReadButton: {
    width: 50,
    backgroundColor: colors.bgSuccess,
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
