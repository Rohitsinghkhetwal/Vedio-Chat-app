import { View, Text } from 'react-native'
import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons";
import { useAuth } from '@/context/Authcontext';

export default function Layout() {
     const { onLogout } = useAuth();
  return (
   
   <Stack
   screenOptions={{
    headerStyle:{
        backgroundColor: '#0987'
    },
    headerTintColor: "#ffff"
   }}
   >
    <Stack.Screen name="index" options={{title: "Meeting room", headerRight: () => (
        <TouchableOpacity onPress={onLogout}>
            <Ionicons name='log-out-outline' size={24} color={'white'}/>

        </TouchableOpacity>
    )}    
}/>

<Stack.Screen name='(room)/[id]' options={{title: "Room"}}/>

   </Stack>
  )
}