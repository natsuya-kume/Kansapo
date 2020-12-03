// ホームスクリーン
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { loadSelectedSubjects } from "../redux/actions";
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;
import { snapshotToArray } from "../helpers/FirebaseHelpers";
import SubjectsModal from "../components/SubjectsModal";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
import EditSubjectModal from "../components/EditSubjectModal";

const Home = (props) => {
  // 授業リストモーダルの管理
  const [isSubjectsModal, setIsSubjectsModal] = useState(false);
  // 授業編集モーダルの管理
  const [isEditModal, setIsEditModal] = useState(false);

  // 編集データの管理
  const [toEditData, setToEditData] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const subjects = useSelector((state) => state.subjects.selectedSubjects);

  useEffect(() => {
    const fetchData = async () => {
      const selectedSubjects = await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .once("value");
      const selectedSubjectsArray = snapshotToArray(selectedSubjects);
      dispatch(loadSelectedSubjects(selectedSubjectsArray));
    };
    fetchData();
  }, [user, dispatch, !isEditModal]);

  // 授業編集モーダルが開かれる時の関数　indexは選択されたテーブル番号が入る
  const toggleEditModal = (item, index) => {
    setIsEditModal(!isEditModal);
    // index番号があるときだけセットする　→editModalを閉じたときはセットしない
    if (index) {
      // table[index].subject[0]を編集データにいれる
      setToEditData(table[index].subject[0]);
    }
  };

  // 授業リストモーダルが押された時の関数
  const toggleSubjectsModal = () => {
    setIsSubjectsModal(!isSubjectsModal);
  };

  // テーブルに授業を描画する関数
  const renderSubject = (item, index) => {
    const map = subjects.map((a) => {
      if (a.subjectId === index) {
        table[index].subject.push(a);
        if (table[index].subject.length === 1) {
          return (
            <View key={index}>
              <View
                key={a.subject}
                style={{
                  marginTop: 3,
                  backgroundColor: "pink",
                  width: ITEM_WIDTH / 6.6,
                  height: ITEM_HEIGHT / 8.3,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 10,
                  paddingTop: 9,
                }}
              >
                <Text style={{ fontSize: 13 }}>{a.subject}</Text>
                {a.classroom === "" || !a.classroom ? null : (
                  <Text
                    key={a.classroom}
                    style={{
                      marginHorizontal: 3,
                      fontSize: 11,
                    }}
                  >
                    {a.classroom}
                  </Text>
                )}
              </View>
            </View>
          );
        }
      }
    });
    return (
      <View style={styles.table}>
        <Text>{map}</Text>
      </View>
    );
  };

  // 時間割表の左上の空白
  const blank = [""];

  // 時間割表
  const table = [
    { index: 0, exId: 37, subject: [] },
    { index: 1, exId: 37, subject: [] },
    { index: 2, exId: 37, subject: [] },
    { index: 3, exId: 37, subject: [] },
    { index: 4, exId: 37, subject: [] },
    { index: 5, exId: 37, subject: [] },
    { index: 6, exId: 37, subject: [] },
    { index: 7, exId: 37, subject: [] },
    { index: 8, exId: 37, subject: [] },
    { index: 9, exId: 37, subject: [] },
    { index: 10, exId: 37, subject: [] },
    { index: 11, exId: 37, subject: [] },
    { index: 12, exId: 37, subject: [] },
    { index: 13, exId: 37, subject: [] },
    { index: 14, exId: 37, subject: [] },
    { index: 15, exId: 37, subject: [] },
    { index: 16, exId: 37, subject: [] },
    { index: 17, exId: 37, subject: [] },
    { index: 18, exId: 37, subject: [] },
    { index: 19, exId: 37, subject: [] },
    { index: 20, exId: 37, subject: [] },
    { index: 21, exId: 37, subject: [] },
    { index: 22, exId: 37, subject: [] },
    { index: 23, exId: 37, subject: [] },
    { index: 24, exId: 37, subject: [] },
    { index: 25, exId: 37, subject: [] },
    { index: 26, exId: 37, subject: [] },
    { index: 27, exId: 37, subject: [] },
    { index: 28, exId: 37, subject: [] },
    { index: 29, exId: 37, subject: [] },
    { index: 30, exId: 37, subject: [] },
    { index: 31, exId: 37, subject: [] },
    { index: 32, exId: 37, subject: [] },
    { index: 33, exId: 37, subject: [] },
    { index: 34, exId: 37, subject: [] },
    { index: 35, exId: 37, subject: [] },
  ];

  // 曜日の表示
  const period = ["月", "火", "水", "木", "金", "土"];

  // 時間の表示
  const time = ["1", "2", "3", "4", "5", "6"];
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <FlatList
            data={blank}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.blank}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View>
          <FlatList
            data={period}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            horizontal
            renderItem={({ item }) => (
              <View>
                <Text style={styles.period}>{item}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <FlatList
            data={time}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.time}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View>
          <FlatList
            data={table}
            numColumns={6}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  // tableの中のsubjectのlengthで判断
                  item.subject.length !== 0
                    ? toggleEditModal(item, index)
                    : toggleSubjectsModal();
                }}
              >
                {renderSubject(item, index)}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={isEditModal}>
          <EditSubjectModal nav={toggleEditModal} editData={toEditData} />
        </Modal>
      </SafeAreaView>

      <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={isSubjectsModal}>
          <SubjectsModal nav={toggleSubjectsModal} />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
    paddingRight: 5,
    marginTop: 5,
  },
  blank: {
    width: 13,
    margin: 1,
    backgroundColor: "skyblue",
  },
  period: {
    margin: 1,
    textAlign: "center",
    width: ITEM_WIDTH / 6.6,
    backgroundColor: "skyblue",
  },
  time: {
    width: 13,
    margin: 1,
    backgroundColor: "skyblue",
    textAlign: "center",
    lineHeight: ITEM_HEIGHT / 8.3,
    height: ITEM_HEIGHT / 8.3,
  },
  table: {
    margin: 1,
    backgroundColor: "#dddddd",
    width: ITEM_WIDTH / 6.6,
    height: ITEM_HEIGHT / 8.3,
  },
});
