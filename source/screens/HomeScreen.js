import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef } from "react";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
  {
    displayName: "Harish",
    job: "React-Native Developer",
    photoURL:
      "https://instagram.fcjb3-3.fna.fbcdn.net/v/t51.2885-19/359721711_827618455755532_3635744140856303716_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcjb3-3.fna.fbcdn.net&_nc_cat=104&_nc_ohc=uUgwSLYSGjUAX9Rh-4b&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAUrSGYWgxjeo7-sxJs4epB_Hh_tGajTKhiJrHDnwDR4g&oe=64DF9DE9&_nc_sid=8b3546",
    age: 23,
    id: 1,
  },
  {
    displayName: "Harish V",
    job: "Programmer",
    photoURL:
      "https://media.licdn.com/dms/image/D5603AQESyIwkSkyxjQ/profile-displayphoto-shrink_400_400/0/1687875435163?e=1697068800&v=beta&t=0OW7HhoxgrI8IxLde2OHiNPrRT6dk-5dvTgFGAvGp2w",
    age: 39,
    id: 2,
  },
  {
    displayName: "Justin Mateen",
    job: "Software Developer",
    photoURL:
      "https://i.insider.com/606730e3856cd700198a2dd1?width=1136&format=jpeg",
    age: 37,
    id: 3,
  },
];

const HomeScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();

  const swiperRef = useRef();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 6,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={tw.style("flex-row items-center justify-between px-5")}>
        <TouchableOpacity onPress={logOut}>
          <Image
            style={tw.style("h-10 w-10 rounded-full")}
            source={{
              uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tw.style("h-10 w-10")}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: -6 }}>
        <Swiper
          ref={swiperRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("SWIPE LEFt", cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("SWIPE RIGHT", cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: { textAlign: "right", color: "red" },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: { textAlign: "left", color: "green" },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View
                key={card.id}
                style={tw.style("relative bg-white h-3/4 rounded-xl")}
              >
                <Image
                  style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={tw.style(
                    "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                  )}
                >
                  <View>
                    <Text style={tw.style("text-xl font-bold ")}>
                      {card.displayName}
                    </Text>
                    <Text style={tw.style("")}>{card.job}</Text>
                  </View>
                  <Text style={tw.style("text-xl font-bold ")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={tw.style(
                  "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                )}
              >
                <Text style={tw.style("font-bold pb-5")}>No more profiles</Text>
                <Image
                  style={{ height: 75, width: 75 }}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={tw.style("flex flex-row justify-evenly pb-10")}>
        <TouchableOpacity
          onPress={() => {
            swiperRef.current.swipeLeft();
          }}
          style={tw.style(
            "items-center justify-center h-16 w-16 rounded-full bg-red-200"
          )}
        >
          <Entypo name="cross" size={28} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            swiperRef.current.swipeRight();
          }}
          style={tw.style(
            "items-center justify-center h-16 w-16 rounded-full bg-green-200"
          )}
        >
          <Entypo name="heart" size={28} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
