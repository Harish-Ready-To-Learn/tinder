import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [type, setType] = useState(1); //1. Login 2.signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [type]);

  const signIn = () => {
    if (email.trim() === "" || password.trim() === "") {
      return Alert.alert("Oh!", "You have not entered all the details.");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log("LOGGED IN", user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signUp = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return Alert.alert("Oh!", "You have not entered all the details.");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
      })
      .catch((err) => {
        console.warn("ERROR", err);
      });
  };

  return (
    <ImageBackground
      style={tw.style("flex-1")}
      resizeMode="cover"
      source={require("../assets/bg.png")}
    >
      {type === 1 ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign In</Text>
          <Text style={tw.style("text-white")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white mt-5")}>
              Email
            </Text>
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full p-2.5"
              )}
            />
            <Text style={tw.style("font-semibold pb-2 text-white mt-5")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full p-2.5"
              )}
            />
            <TouchableOpacity
              onPress={signIn}
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(2)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Doesn't have an account?{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign Up</Text>
          <Text style={tw.style("text-white")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full p-2.5"
              )}
            />
            <Text style={tw.style("font-semibold pb-2 text-white mt-5")}>
              Email
            </Text>
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full p-2.5"
              )}
            />
            <Text style={tw.style("font-semibold pb-2 text-white mt-5")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full p-2.5"
              )}
            />
            <TouchableOpacity
              onPress={signUp}
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(1)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;
