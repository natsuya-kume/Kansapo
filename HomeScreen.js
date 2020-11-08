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
import ModalDetails from "../components/ModalDetails";
import Modal from "react-native-modal";
import colors from "../../assets/colors";
import { connect, useDispatch, useSelector } from "react-redux";
import * as firebase from "firebase/app";
import TimeTable from "../components/TimeTable";
import EditSubject from "../components/EditSubject";

const Home = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [TableId, setTableId] = useState(null);

  const [toEditData, setToEditData] = useState([]);

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
    // subjects(props.subjects.selectedSubjects)の値が変更したら(授業が追加されたら)レンダリング
    fetchData();
  }, [user, dispatch, !isModalVisible]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const getTableId = (index) => {
    setTableId(index);
  };

  // const getToEditData = (item, index) => {
  //   if (table[index].subject !== []) {
  //     table[index].subject.map((data) => {
  //       setToEditData(data);
  //     });
  //   } else {
  //     return null;
  //   }
  // };

  const renderSubject = (item, index) => {
    const map = subjects.map((a) => {
      // (a.tableId===index)
      if (a.subjectId === index) {
        const pushArray = table[index].subject.push(a);

        // subjects.filter((a) => {
        //   if (a.subjectId === a.tableId) return true;
        // });

        return <Text>{a.subject}</Text>;
      }
    });
    return (
      <View style={styles.table}>
        <Text>{map}</Text>
      </View>
    );
  };

  const deleteSubject = async (item, index) => {
    console.log(item);
    if (item.subject.length !== 0) {
      // console.log(item.subject);
      const key = item.subject[0].key;
      const sendInfo = item.subject[0];
      console.log(sendInfo);
      try {
        await firebase
          .database()
          .ref("selectedSubject")
          .child(user.uid)
          .child(key)
          .remove();

        dispatch(deleteSubject(sendInfo));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const renderModal = (item, index) => {
  //   console.log(item.subject);
  //   const aaa = (item, index) => {
  //     if (item.subject === []) {
  //       return (
  //         <SafeAreaView style={{ flex: 1 }}>
  //           <Modal isVisible={isModalVisible}>
  //             <EditSubject nav={toggleModal} getTableId={TableId} />
  //           </Modal>
  //         </SafeAreaView>
  //       );
  //     } else if (item.subject === undefined) {
  //       return (
  //         <SafeAreaView style={{ flex: 1 }}>
  //           <Modal isVisible={isModalVisible}>
  //             <ModalDetails nav={toggleModal} getTableId={TableId} />
  //           </Modal>
  //         </SafeAreaView>
  //       );
  //     }
  //   };

  //   return (
  //     <View>
  //       <Text>{aaa}</Text>
  //     </View>
  //   );
  // };

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
            // data={subjects}
            data={table}
            numColumns={6}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => toggleModal()}
                // onPressIn={() => getToEditData(item, index)}
                onPressIn={() => deleteSubject(item, index)}
                // onPressIn={() => getTableId(index)}
              >
                {renderSubject(item, index)}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {/* </ScrollView> */}

      {/* <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <EditSubject
            nav={toggleModal}
            getTableId={TableId}
            onPress={deleteSubject}
          />
        </Modal>
      </SafeAreaView> */}

      <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <ModalDetails nav={toggleModal} getTableId={TableId} />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     subjects: state.subjects,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // 引数にはcomponentDidMount内で与えられた選択された授業リストが入る
//     loadSelectedSubjects: (subjects) =>
//       dispatch({
//         type: "LOAD_SELECTEDSUBJECTS_FROM_SERVER",
//         payload: subjects,
//       }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
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
    backgroundColor: "#f6efdb",
  },
  period: {
    margin: 1,
    textAlign: "center",
    width: ITEM_WIDTH / 6.6,
    backgroundColor: "#f6efdb",
  },
  time: {
    width: 10,
    margin: 1,
    backgroundColor: "#f6efdb",
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
});
