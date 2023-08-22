import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { FlatList } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapShot) => {
        setMatches(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return unsubscribe;
  }, [user]);

  console.log("MATCHES", matches.length);

  return matches.length > 0 ? (
    <FlatList
      style={tw.style("h-full ")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatListItem matchDetails={item} />}
    />
  ) : (
    <View style={tw.style("p-5")}>
      <Text style={tw.style("text-center text-lg")}>
        No matches at the moment
      </Text>
    </View>
  );
};

export default ChatList;
