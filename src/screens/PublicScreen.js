import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import { Linking } from "react-native";
const PublicScreen = () => {
  const openKulms = () => {
    Linking.openURL("https://kulms.tl.kansai-u.ac.jp/").then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + "https://kulms.tl.kansai-u.ac.jp/");
      } else {
        return Linking.openURL("https://kulms.tl.kansai-u.ac.jp/");
      }
    });
  };

  const openInfoSystem = () => {
    Linking.openURL("https://portal.kansai-u.ac.jp/Portal/index.jsp").then(
      (supported) => {
        if (!supported) {
          console.log(
            "無効なURLです: " + "https://portal.kansai-u.ac.jp/Portal/index.jsp"
          );
        } else {
          return Linking.openURL(
            "https://portal.kansai-u.ac.jp/Portal/index.jsp"
          );
        }
      }
    );
  };
  return (
    // <Container>
    <Content>
      <List>
        <ListItem thumbnail>
          {/* <Left>
              <Thumbnail square source={{ uri: "Image URL" }} />
            </Left> */}
          <Body>
            <Text>関大LMS(公式)</Text>
            <Text note numberOfLines={1}>
              KU Learning Management System
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={openKulms}>
              <Text style={{ color: "skyblue", fontWeight: "500" }}>
                サイトへ
              </Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem thumbnail>
          {/* <Left>
            <Thumbnail square source={{ uri: "Image URL" }} />
          </Left> */}
          <Body>
            <Text>インフォメーションシステム</Text>
            <Text note numberOfLines={1}>
              InformationSystem
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={openInfoSystem}>
              <Text style={{ color: "skyblue", fontWeight: "500" }}>
                サイトへ
              </Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    </Content>
    // </Container>
  );
};
// const styles = StyleSheet.create({
//   button: {
//     width: 50,
//     height: 40,
//     backgroundColor: "skyblue",
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default PublicScreen;
