import React from "react";
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Body,
  Title,
  Right,
  Icon,
} from "native-base";

const NotificationScreen = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Left style={{ flex: 0.1 }} />
        <Body style={{ flex: 0.1 }}>
          <Title>Notification</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Notification Screen</Text>
      </Content>
    </Container>
  );
};

export default NotificationScreen;
