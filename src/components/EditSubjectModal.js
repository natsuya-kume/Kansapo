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
} from "react-native";
import { Form, Item, Input, Label, Icon } from "native-base";

import colors from "../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/app";
import { snapshotToArray } from "../helpers/FirebaseHelpers";

import { useSelector, useDispatch } from "react-redux";

const EditSubject = (props) => {
  const [classroom, setClassroom] = useState(props.editData.classroom);
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
    alert("授業を保存出来ました");
  };

  const getRoomInfo = (classroom) => {
    setClassroom(classroom);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.nav} style={styles.closeButton}>
        <View>
          <AntDesign name="close" size={30} />
        </View>
      </TouchableOpacity>
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
          >
            <View style={styles.saveButton}>
              <Text>保存</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={openSyllabus}>
          <Text style={styles.infoTitle}>
            シラバス：{props.editData.syllabus}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => deleteSubject(props.editData)}
        onPressIn={props.nav}
      >
        <View style={styles.button}>
          <Text>この授業を削除する</Text>
        </View>
      </TouchableOpacity>
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
    marginTop: 20,
    marginLeft: 20,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#7acbe1",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
});
