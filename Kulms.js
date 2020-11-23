import React from "react";
import { View, StyleSheet, Text } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import PublicScreen from "./src/screens/PublicScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LoginScreen";
import TermsDrawerScreen from "./src/screens/TermsDrawerScreen";
import PrivacyPolicyScreen from "./src/screens/AppSwitchNavigator/PrivacyPolicyScreen";
import LoadingScreen from "./src/screens/AppSwitchNavigator/LoadingScreen";
import WelcomeScreen from "./src/screens/AppSwitchNavigator/WelcomeScreen";
import CustomDrawerComponent from "./src/screens/DrawerNavigator/CustomDrawerComponent";
import SplashScreen from "./src/screens/SplashScreen";
import firebase from "firebase/app";
import "firebase/auth";

import { useSelector } from "react-redux";

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./assets/colors";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { DrawerItemList } from "@react-navigation/drawer";
import useAuthenticateUser from "./src/hooks/useAuthenticateUser";
import TermsScreen from "./src/screens/AppSwitchNavigator/TermsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const KulmsHooks = () => {
  useAuthenticateUser();

  const auth = useSelector((state) => state.auth);

  if (auth.isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {!auth.isSignedIn ? (
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              // backgroundColor: colors.bgMain,
            },
            headerTintColor: "black",
            // headerTitle: "ログイン・新規登録",
            headerTitle: () => {
              switch (route.name) {
                case "SignUpScreen":
                  return <Text style={{ fontWeight: "500" }}>新規登録</Text>;
                case "LoginScreen":
                  return <Text style={{ fontWeight: "500" }}>ログイン</Text>;
                case "TermsScreen":
                  return <Text style={{ fontWeight: "500" }}>利用規約</Text>;
              }
            },
          })}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="TermsScreen"
            component={TermsScreen}
            options={{ headerBackTitleVisible: false }}
          />
        </Stack.Navigator>
      ) : (
        <AppDrawerNavigator />
      )}
    </NavigationContainer>
  );
};

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, focused, size }) => {
        switch (route.name) {
          case "時間割":
            return <AntDesign name="table" size={30} color={color} />;
          case "公式":
            return <FontAwesome5 name="school" size={24} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      // activeTintColor: "black",
      activeTintColor: "#f67690",
      // tabStyle: {
      // backgroundColor: "#fff8cd",
      // backgroundColor: "blue",
      // },
    }}
  >
    <Tab.Screen name="時間割" component={HomeScreen} />
    <Tab.Screen
      options={{ tabBarLabel: "公式" }}
      name="公式"
      component={PublicScreen}
    />
  </Tab.Navigator>
);

// const getHeaderTitle = (route) => {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : "Home";

//   switch (routeName) {
//     // case "利用規約":
//     //   return "Kulms";
//     // case "Setting":
//     //   return "Kulms";
//     default:
//       return "Kulms";
//   }
// };

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens = ["HomeTabNavigator"];
  switch (routeName) {
    case "TermsTabNavigator":
      return "Kanさぽ";
    // case "Setting":
    //   return "Kulms";
    default:
      return "Kanさぽ";
  }
  // if (hideOnScreens.indexOf(routeName) > -1) return false;
  // return true;
};

const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      // headerStyle: {
      //   backgroundColor: "#fff8cd",
      // },
      headerTintColor: "black",
      headerLeft: () => (
        <Ionicons
          name="ios-menu"
          size={30}
          color="black"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerRight: () => {
        <Ionicons
          name="ios-home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => navigation.openDrawer()}
        />;
      },
    }}
  >
    <Stack.Screen
      options={({ route }) => ({
        title: getHeaderTitle(route),
      })}
      name="HomeTabNavigator"
      component={HomeTabNavigator}
    />
  </Stack.Navigator>
);

const AppDrawerNavigator = ({ navigation }) => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerComponent {...props} />}
    // drawerContentOptions={{
    //   // activeBackgroundColor: "pink",
    //   activeTintColor: "#00a5dd",
    // }}
  >
    <Drawer.Screen
      name="ホーム"
      component={HomeStackNavigator}
      options={{
        drawerIcon: () => <Ionicons name="ios-home" size={24} />,
      }}
    />

    <Drawer.Screen
      options={({ route }) => ({
        drawerIcon: () => <Ionicons name="ios-document" size={28} />,
      })}
      name="利用規約"
      component={TermsDrawerScreen}
    />

    <Drawer.Screen
      options={{
        drawerIcon: () => <Ionicons name="ios-checkmark" size={30} />,
      }}
      name="プライバシーポリシー"
      component={PrivacyPolicyScreen}
    />

    <Drawer.Screen
      options={{
        drawerIcon: () => <AntDesign name="logout" size={20} />,
      }}
      name="ログアウト"
      component={LogoutScreen}
    />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default KulmsHooks;
