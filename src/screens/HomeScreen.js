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
import { ScrollView } from "react-native-gesture-handler";
const ITEM_WIDTH = Dimensions.get("window").width;
import { snapshotToArray } from "../helpers/FirebaseHelpers";
import SubjectsModal from "../components/SubjectsModal";
import Modal from "react-native-modal";
import colors from "../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
import EditSubjectModal from "../components/EditSubjectModal";

const Home = (props) => {
  const [isSubjectsModal, setIsSubjectsModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  // const [TableId, setTableId] = useState(null);

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

  // const getTableId = (index) => {
  //   setTableId(index);
  // };

  const toggleEditModal = (item, index) => {
    setIsEditModal(!isEditModal);
    // index番号があるときだけセットする　→editModalを閉じたときはセットしない
    if (index) {
      setToEditData(table[index].subject[0]);
    }
  };

  const toggleSubjectsModal = () => {
    setIsSubjectsModal(!isSubjectsModal);
  };

  const renderSubject = (item, index) => {
    const map = subjects.map((a) => {
      // (a.tableId===index)
      if (a.subjectId === index) {
        table[index].subject.push(a);
        if (table[index].subject.length === 1) {
          return (
            <View>
              <Text key={index} style={{ marginTop: 3 }}>
                {a.subject}
              </Text>
              {a.classroom === "" || !a.classroom ? null : (
                <Text
                  key={item}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#f69679",
                    marginHorizontal: 3,
                  }}
                >
                  {a.classroom}
                </Text>
              )}
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

  const blank = [""];

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

  const period = ["月", "火", "水", "木", "金", "土"];

  const time = ["1", "2", "3", "4", "5", "6"];
  return (
    // <TimeTable />
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={{ flexDirection: "row" }}>
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
      <View style={{ flexDirection: "row" }}>
        <View>
          <FlatList
            data={time}
            ListEmptyComponent={() => (
              <View>
                <Text>aaa</Text>
              </View>
            )}
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
      {/* </ScrollView> */}

      <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={isEditModal}>
          <EditSubjectModal
            nav={toggleEditModal}
            // getTableId={TableId}
            // onPress={deleteSubject}
            editData={toEditData}
          />
        </Modal>
      </SafeAreaView>

      <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={isSubjectsModal}>
          <SubjectsModal
            nav={toggleSubjectsModal}
            // getTableId={TableId}
          />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
  },
  blank: {
    width: 10,
    margin: 1,
    backgroundColor: "#7acbe1",
    // backgroundColor: colors.logoColor,
  },
  period: {
    margin: 1,
    textAlign: "center",
    width: ITEM_WIDTH / 6.6,
    backgroundColor: "#7acbe1",
    // backgroundColor: colors.logoColor,
  },
  time: {
    width: 10,
    margin: 1,
    backgroundColor: "#7acbe1",
    // backgroundColor: colors.logoColor,
    height: ITEM_WIDTH / 4.4,
    // 数字の中央寄せ
    lineHeight: ITEM_WIDTH / 4.4,
  },
  table: {
    margin: 1,
    resizeMode: "cover",
    backgroundColor: "snow",
    width: ITEM_WIDTH / 6.6,
    height: ITEM_WIDTH / 4.4,
  },
  alert: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
