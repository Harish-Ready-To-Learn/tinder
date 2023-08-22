import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Header title="chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
