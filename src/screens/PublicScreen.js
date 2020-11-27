import React from "react";
import {
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Button,
} from "native-base";
import { Linking } from "react-native";

const PublicScreen = () => {
  // lmsを開く関数
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
    // インフォメーションシステムを開く関数
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
    <Content>
      <List>
        <ListItem thumbnail>
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
  );
};

export default PublicScreen;
