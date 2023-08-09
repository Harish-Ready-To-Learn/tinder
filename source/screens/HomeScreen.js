import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const HomeScreen = () => {
  const signOutUser1 = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 100 }}>
      <Pressable onPress={signOutUser1}>
        <Text>HomeScreen</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
