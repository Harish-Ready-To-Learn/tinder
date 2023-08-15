import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db, timeStamp } from "../firebase/index";

const ModalScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [image, setImage] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoUrl: image,
      job,
      age,
      timeStamp,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("ERROR", err.message);
      });
  };

  return (
    <View style={tw.style("flex-1 items-center pt-1")}>
      <Image
        style={tw.style("h-20 w-full")}
        source={require("../assets/text-logo.png")}
        resizeMode="contain"
      />
      <Text style={tw.style("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Profile Picture
      </Text>
      <TextInput
        placeholder="Enter profile pic URL"
        style={tw.style("text-center text-xl  border border-gray-300 p-2")}
        keyboardType="url"
        value={image}
        onChangeText={setImage}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Job
      </Text>
      <TextInput
        placeholder="Enter Job"
        style={tw.style("text-center text-xl border border-gray-300 p-2")}
        keyboardType="url"
        value={job}
        onChangeText={setJob}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Age
      </Text>
      <TextInput
        placeholder="Enter Age"
        style={tw.style("text-center text-xl border border-gray-300 p-2")}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={tw.style(
          "w-64 p-3 rounded-xl absolute bottom-5 bg-red-400 items-center justify-center",
          incompleteForm && "bg-gray-400"
        )}
      >
        <Text style={tw.style("text-center text-white text-xl")}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
