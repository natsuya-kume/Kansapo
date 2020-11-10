// 授業リストの詳細を表示するコンポーネント
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Toast } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import colors from "../../assets/colors";
import { Entypo } from "@expo/vector-icons";

const ListItem = ({ item, onPress, closeModal }) => {
  // シラバスを開く関数
  const openSyllabus = () => {
    Linking.openURL(item.syllabus).then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + item.syllabus);
      } else {
        return Linking.openURL(item.syllabus);
      }
    });
  };
  return (
    <View style={styles.subjectsContainer}>
      <TouchableOpacity onPress={openSyllabus}>
        <View>
          <Entypo name="open-book" size={20} color="#7acbe1" />
        </View>
      </TouchableOpacity>
      <View style={styles.subjectsInfo}>
        <Text style={styles.listItemTitle}>{item.subject}</Text>
        <Text style={styles.listItemTitle}>{item.term}</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={closeModal}
        onPressOut={() =>
          Toast.show({
            text: "授業を追加しました",
            buttonText: "OK",
            position: "bottom",
          })
        }
      >
        <View style={styles.button}>
          <Text>追加</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  subjectsContainer: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#7acbe1",
    marginTop: 20,
  },
  subjectsInfo: {
    paddingLeft: 5,
    width: 200,
  },
  listItemTitle: {
    fontSize: 20,
    fontWeight: "100",
  },
  button: {
    width: 50,
    height: 40,
    // backgroundColor: colors.bgSuccess,
    backgroundColor: "#7acbe1",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
