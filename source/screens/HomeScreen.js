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
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
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
import { db, timeStamp } from "../firebase";
import generateId from "../lib/generateId";

const HomeScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  const [userData, setUserData] = useState();
  const [otherProfiles, setOtherProfiles] = useState([]);
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const swiperRef = useRef();

  useLayoutEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((data) => {
      if (!data.exists()) {
        navigation.navigate("Modal");
      } else {
        setUserData(data._document.data.value.mapValue.fields);
      }
    });
  }, []);

  useEffect(() => {
    let unsubscribe;
    const fetchOtherProfiles = async () => {
      const nope = await getDocs(
        collection(db, "users", user.uid, "nope")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      console.log("Nope", nope);
      const match = await getDocs(
        collection(db, "users", user.uid, "match")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      console.log("match", match);

      const nopeUserIds = nope.length > 0 ? nope : ["temp"];
      const matchUserIds = match.length > 0 ? match : ["temp"];

      unsubscribe = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...nopeUserIds, ...matchUserIds])
        ),
        (snapShot) => {
          setOtherProfiles(
            snapShot.docs
              .filter((doc) => doc.id != user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchOtherProfiles();

    return unsubscribe;
  }, []);

  const swipeMatch = async (cardIndex) => {
    try {
      if (!otherProfiles[cardIndex]) {
        return;
      }

      const userSwiped = otherProfiles[cardIndex];
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      console.log("loggedInProfile", loggedInProfile);

      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (docSnap) => {
          if (docSnap.exists()) {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
            setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timeStamp,
            });

            console.log(loggedInProfile, userSwiped);

            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const swipeNope = (cardIndex) => {
    if (!otherProfiles[cardIndex]) {
      return;
    }

    const userSwiped = otherProfiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "nope", userSwiped.id), userSwiped);
    console.log("POP", otherProfiles.pop);
    setOtherProfiles((otherProfiles) =>
      otherProfiles.splice(0, otherProfiles.length)
    );
  };

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
              uri: userData
                ? userData.photoUrl.stringValue
                : "https://img.freepik.com/free-icon/user_318-159711.jpg",
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
          cards={otherProfiles}
          stackSize={5}
          cardIndex={0}
          infinite={false}
          animateCardOpacity
          verticalSwipe={false}
          horizontalSwipe={otherProfiles ? true : false}
          onSwipedLeft={(cardIndex) => {
            console.log("SWIPE LEFt", cardIndex);
            swipeNope(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("SWIPE RIGHT", cardIndex);
            swipeMatch(cardIndex);
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
            return card && otherProfiles ? (
              <View
                key={card.id}
                style={tw.style("relative bg-white h-3/4 rounded-xl")}
              >
                <Image
                  style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoUrl }}
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
