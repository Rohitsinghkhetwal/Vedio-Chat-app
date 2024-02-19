import {GestureHandlerRootView} from "react-native-gesture-handler";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/Authcontext"
import { useEffect, useState } from "react";
import {StreamVideoClient, StreamVideo, User} from "@stream-io/video-react-native-sdk" 
import {OverlayProvider} from "stream-chat-expo";
import Toast from "react-native-toast-message";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const InitialLayout = () => {
  const {authState, initialized} = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null)
  const segments = useSegments();
  const router = useRouter();
  

  useEffect(() => {

    if(!initialized) return;
   

    const authGroup = segments[0] === '(inside)'

    if(authState?.authenticated || !authGroup){
      
      router.replace('/(inside)')
    }else if(!authState?.authenticated && authGroup){
      
      client?.disconnectUser()
      router.replace("/")
    }

  }, [authState, initialized])

  useEffect(() => {
    
    if(authState?.authenticated && authState.token){
      
      const user: User = {id: authState.user_id!}
      try{
        const NewClient = new StreamVideoClient({
          apiKey: API_KEY!,
          user,
          token: authState.token,
        });
        
        setClient(NewClient);
      }catch(err){
        console.log("error in creating client !", err);
      }
    }
  },[authState])


  return (
    <>
      {!client && (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      )}
      {client && (
        <StreamVideo client={client}>
          <OverlayProvider>
            <Slot/>
            <Toast/>
          </OverlayProvider>

        </StreamVideo>
        
      )}
    </>
  );
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );

}

export default RootLayout;