import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import ModalScreen from "../screens/ModalScreen";
import MatchScreen from "../screens/MatchScreen";
import MessageScreen from "../screens/MessageScreen";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  console.log("USER", user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
