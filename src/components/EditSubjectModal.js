// 科目編集画面のコンポーネント
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Linking,
  KeyboardAvoidingView,
} from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Icon,
  Textarea,
  Toast,
  Button,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import firebase from "firebase/app";
import { snapshotToArray } from "../helpers/FirebaseHelpers";

import { useSelector, useDispatch } from "react-redux";

const EditSubject = (props) => {
  const [classroom, setClassroom] = useState(props.editData.classroom);
  const [memo, setMemo] = useState(props.editData.memo);
  const [absentCount, setAbsentCount] = useState(props.editData.absentCount);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const saveAbsentCount = async (count, editData) => {
  //     const editDataKey = editData.key;
  //     try {
  //       await firebase
  //         .database()
  //         .ref("selectedSubject")
  //         .child(user.uid)
  //         .child(editDataKey)
  //         .child("name")
  //         .update({ absentCount: 0 });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   saveAbsentCount();
  // }, []);

  // シラバスを開く関数
  const openSyllabus = () => {
    Linking.openURL(props.editData.syllabus).then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + props.editData.syllabus);
      } else {
        return Linking.openURL(props.editData.syllabus);
      }
    });
  };

  // 科目を消す関数
  const deleteSubject = async (editData) => {
    const editDataKey = editData.key;
    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .remove();
      // dispatch(deleteSubject(props));
    } catch (error) {
      console.log(error);
    }
  };

  // 科目教室を保存する関数
  const saveClassroom = async (classroom, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ classroom: classroom });
    } catch (error) {
      console.log(error);
    }
  };

  // メモを保存する関数
  const saveMemo = async (memo, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ memo: memo });
    } catch (error) {
      console.log(error);
    }
  };

  // 欠席回数を保存する関数
  const saveAbsentCount = async (absentCount, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ absentCount: absentCount });
    } catch (error) {
      console.log(error);
    }
  };

  // 入力された教室情報を取得
  const getRoomInfo = (classroom) => {
    setClassroom(classroom);
  };

  // 入力されたメモ情報を取得
  const getMemoInfo = (memo) => {
    setMemo(memo);
  };

  const getAbsentInfo = (absentCount) => {
    setAbsentCount(absentCount);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.nav} style={styles.closeButton}>
        <View>
          <AntDesign name="close" size={30} style={{ borderRadius: 50 }} />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>授業の編集</Text>
      </View>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>授業名：{props.editData.subject}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>開講時限：{props.editData.term}</Text>
        </View>

        <View style={styles.editClassroomContaimer}>
          <Text style={styles.infoTitle}>授業教室：</Text>

          <View>
            <Form style={styles.searchInput}>
              <Item>
                <Input value={classroom} onChangeText={getRoomInfo} />
              </Item>
            </Form>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => saveClassroom(classroom, props.editData)}
              onPressIn={() =>
                Toast.show({
                  text: "教室を保存しました",
                  buttonText: "OK",
                  position: "bottom",
                })
              }
            >
              <View style={styles.saveButton}>
                <Text>保存</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editClassroomContaimer}>
          <Text style={styles.infoTitle}>メモ：</Text>

          <View>
            <Form style={styles.textArea}>
              <Textarea
                value={memo}
                onChangeText={getMemoInfo}
                rowSpan={3}
                bordered
              />
            </Form>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => saveMemo(memo, props.editData)}
              onPressIn={() =>
                Toast.show({
                  text: "メモを保存しました",
                  buttonText: "OK",
                })
              }
            >
              <View style={styles.saveButton}>
                <Text>保存</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editClassroomContaimer}>
          <Text style={styles.infoTitle}>欠席回数：</Text>
          <View>
            <Form style={styles.searchInput}>
              <Item>
                <Input
                  keyboardType="number-pad"
                  value={absentCount}
                  onChangeText={getAbsentInfo}
                />
              </Item>
            </Form>
          </View>
          <TouchableOpacity
            onPress={() => saveAbsentCount(absentCount, props.editData)}
            onPressIn={() =>
              Toast.show({
                text: "欠席回数を保存しました",
                buttonText: "OK",
              })
            }
          >
            <View style={styles.saveButton}>
              <Text>保存</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => deleteSubject(props.editData)}
          onPressIn={props.nav}
          onPressOut={() =>
            Toast.show({
              text: "削除しました",
              buttonText: "OK",
              position: "bottom",
            })
          }
        >
          <View style={styles.deleteButton}>
            <Icon name="trash" />
            <Text style={{ textAlign: "center" }}>この授業を削除</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openSyllabus}>
          <View style={styles.syllabusButton}>
            <Entypo size={24} name="open-book" />
            <Text style={{ textAlign: "center" }}>シラバスを参照</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditSubject;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 550,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    marginRight: 5,
    top: 5,
    right: 0,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "100",
  },
  searchInput: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: 150,
    borderColor: "black",
    paddingHorizontal: 20,
  },
  editClassroomContaimer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textArea: {
    width: 180,
  },
  deleteButton: {
    height: 50,
    backgroundColor: "pink",
    paddingHorizontal: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  syllabusButton: {
    height: 50,
    backgroundColor: "skyblue",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
