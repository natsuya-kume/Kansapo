// 授業リストを管理する
import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Form, Item, Input, Label, Icon } from "native-base";
import colors from "../../assets/colors";
import ListItem from "./ListItem";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/app";
import { snapshotToArray } from "../helpers/FirebaseHelpers";
import { loadSelectedSubjects } from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

const SubjectsModal = (props) => {
  // 元々管理しているデータを管理
  const [data, setData] = useState([]);
  // 検索でヒットした授業リストを管理
  const [listData, setListData] = useState([]);
  // 検索用語の管理
  const [searchWord, setSearchWord] = useState("");

  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  // モーダルが開閉されるときに元の授業データを取得
  useEffect(() => {
    const getFireData = () => {
      let db = firebase.database();
      let ref = db.ref("subjectsData/");
      ref
        .orderByKey()
        .limitToFirst(4822)
        .on("value", (snapshot) => {
          setData(snapshot.val());
        });
    };
    getFireData();
  }, [props.nav]);

  // 授業の追加ボタンを押した時の関数　引数selectedSubjectには選択された授業の情報が入ってくる
  const addSubject = async (selectedSubject, index) => {
    try {
      // キーを追加
      const key = await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .push().key;

      // ↑で追加したキーの中にnameとして情報を保存
      const setSelectedSubject = await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(key)
        .set({ name: selectedSubject, select: true });

      //　授業削除のために必要なkeyを追加する
      const addKey = await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(key)
        .child("name")
        .update({ key: key });

      // ユーザーごとに授業内容を取得して、配列に変換する
      const selectedSubjects = await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .once("value");
      const selectedSubjectsArray = snapshotToArray(selectedSubjects);

      dispatch(loadSelectedSubjects(selectedSubjectsArray));
    } catch (error) {
      console.log(error);
    }
  };

  // 検索される用語をもとに、教科を絞り込む
  const searchSubjects = (searchWord) => {
    let listData = data.filter((item) => {
      return item.subject.indexOf(searchWord) > -1;
    });
    setListData(listData);

    setSearchWord(searchWord);
  };

  // flatlist内で描画する内容 ListItemにpropsで渡す
  const renderItem = (item, index) => (
    <ListItem
      item={item}
      onPress={() => addSubject(item, index)}
      closeModal={props.nav}
    />
  );

  return (
    <View style={styles.modal}>
      <TouchableOpacity onPress={props.nav} style={styles.closeButton}>
        <View>
          <AntDesign name="close" size={30} />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>授業の追加</Text>
      </View>
      <View>
        <Form style={styles.searchInput}>
          <Item floatingLabel>
            <Label>授業名で検索</Label>
            <Icon active name="search" />
            <Input value={searchWord} onChangeText={searchSubjects} />
          </Item>
        </Form>
      </View>
      <FlatList
        data={listData}
        renderItem={({ item }, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default SubjectsModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 550,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    marginRight: 5,
    top: 5,
    right: 0,
  },
  titleText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "300",
  },
  searchInput: {
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: 300,
    borderColor: "black",
    paddingHorizontal: 20,
  },
});
