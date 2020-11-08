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
  Segment,
  Button,
} from "native-base";

import colors from "../../assets/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import firebase from "firebase/app";
import { snapshotToArray } from "../helpers/FirebaseHelpers";

import { useSelector, useDispatch } from "react-redux";

const EditSubject = (props) => {
  const [classroom, setClassroom] = useState(props.editData.classroom);
  const [memo, setMemo] = useState(props.editData.memo);
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const openSyllabus = () => {
    Linking.openURL(props.editData.syllabus).then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + props.editData.syllabus);
      } else {
        return Linking.openURL(props.editData.syllabus);
      }
    });
  };

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

  const saveAbsentCount = async (count, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ absentCount: count });
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomInfo = (classroom) => {
    setClassroom(classroom);
  };

  const getMemoInfo = (memo) => {
    setMemo(memo);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.nav} style={styles.closeButton}>
        <View>
          <AntDesign name="close" size={30} />
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <Text style={styles.title}>授業の編集</Text>
        </View>
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
          <Text style={styles.infoTitle}>{count}</Text>
          <Segment style={{ backgroundColor: "white" }}>
            <Button
              first
              style={{
                marginLeft: 20,
                paddingHorizontal: 20,
                borderColor: "black",
              }}
              onPress={increment}
            >
              <Text>+</Text>
            </Button>
            <Button
              last
              style={{ paddingHorizontal: 20, borderColor: "black" }}
              onPress={decrement}
            >
              <Text>−</Text>
            </Button>
          </Segment>
          <TouchableOpacity
            onPress={() => saveAbsentCount(count, props.editData)}
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
              position: "top",
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
    marginHorizontal: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "100",
    color: colors.txtWhite,
  },
  searchInput: {
    // marginTop: 5,
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
    marginHorizontal: 20,
  },
  textArea: {
    width: 180,
  },
  deleteButton: {
    // width: 100,
    height: 50,
    backgroundColor: "#f69679",
    paddingHorizontal: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  syllabusButton: {
    // width: 100,
    height: 50,
    backgroundColor: "#7acbe1",
    // marginHorizontal: 20,
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
    backgroundColor: "#7acbe1",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bottom: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
