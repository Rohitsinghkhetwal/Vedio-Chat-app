import { View, Text, ScrollView, StyleSheet, ImageBackground, Dimensions } from "react-native";
import React from 'react'
import { rooms } from "@/assets/RoomData/Dummyrooms";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default function Page() {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={{paddingBottom: 10}}>
     <View style={styles.container}>
      {rooms.map((person) => (
        <Link key={person.id} href={`/(inside)/(room)/${person.id}`}>
          <TouchableOpacity>
            <ImageBackground imageStyle={{borderRadius: 10}} source={person.img} style={styles.imgWrapper}>
              <View style={styles.MarkSize}>
                <Text style={styles.text}>{person.name}</Text>
              </View>
            </ImageBackground>

          </TouchableOpacity>
        </Link>
      ) )}

     </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: WIDTH > HEIGHT ? "row" : 'column',
    gap: 20
    
    
  },
  imgWrapper: {
    width: WIDTH > HEIGHT ? WIDTH / 4 - 40 : WIDTH - 40,
    height: 200,
    
    
  },
  MarkSize: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: "700"

  }
});