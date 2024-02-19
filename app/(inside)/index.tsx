import { View, Text, ScrollView, StyleSheet, ImageBackground, Dimensions, Alert, ToastAndroid } from "react-native";
import React, { useState } from 'react'
import { rooms } from "@/assets/RoomData/Dummyrooms";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import prompt from "react-native-prompt-android";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default function Page() {

  const [id, setId] = useState<string>('')
  const router = useRouter();

  const onMeetingStart = () => {
    const randNum = Math.floor(Math.random() * 10000000).toString()
    router.push(`/(inside)/(room)/${randNum}`)
  }


  const onMeetingJoin = async() => { 
    prompt(
      "Join Meeting",
      "Please Enter your call ID",
      [
        {
          text: "Cancel",
          onPress: () => setId(''),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (ID) => setId(ID),
        },
      ],
      {
        type: "plain-text",
        cancelable: false,
        defaultValue: "",
        
      }
    );
    router.push(`/(inside)/(room)/${id}`)
  };

  
  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ paddingBottom: 10 }}
    >
      <View>
        <TouchableOpacity style={styles.btn} onPress={onMeetingStart}>
          <Ionicons name="videocam-outline" size={24} color="white" />
          <Text style={styles.btntxt}>Start New Meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={onMeetingJoin}>
          <Ionicons name="business-outline" size={24} color="white" />
          <Text style={styles.btntxt}>Join Meeting by ID</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#000",
          }}
        />
        <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
          Or Join in Public room
        </Text>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#000",
          }}
        />
      </View>

      <View style={styles.container}>
        {rooms.map((person) => (
          <Link key={person.id} href={`/(inside)/(room)/${person.id}`}>
            <TouchableOpacity>
              <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                source={person.img}
                style={styles.imgWrapper}
              >
                <View style={styles.MarkSize}>
                  <Text style={styles.text}>{person.name}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: WIDTH > HEIGHT ? "row" : "column",
    gap: 20,
  },
  imgWrapper: {
    width: WIDTH > HEIGHT ? WIDTH / 4 - 40 : WIDTH - 40,
    height: 200,
  },
  MarkSize: {
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#90ee90",
    margin: 18,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  btntxt: {
    color: "white",
    fontSize: 18,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20

  }
});

function setInputText(newText: any) {
  throw new Error("Function not implemented.");
}
