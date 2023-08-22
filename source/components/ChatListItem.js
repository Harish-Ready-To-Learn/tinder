import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const ChatListItem = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, []);

  return (
    <TouchableOpacity
      style={tw.style(
        "flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg"
      )}
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      <Image
        style={tw.style("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo?.photoUrl }}
      />
      <View>
        <Text style={tw.style("text-lg font-semibold")}>
          {" "}
          {matchedUserInfo?.displayName}
        </Text>
        <Text>Say Hi</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
