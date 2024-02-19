import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStreamVideoClient, Call, StreamCall, CallContent } from '@stream-io/video-react-native-sdk'
import  Spinner  from 'react-native-loading-spinner-overlay';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const [Calling, setCalling] = useState<Call|null>(null)
  const client = useStreamVideoClient();
  const {id} = useLocalSearchParams<{id: string}>()
 
  console.log("hey this is client here !", client);
  
  useEffect(() => {
    if(!client || Calling) return;
    const Join = async() => {
      
      const call = client.call("default", id);
      await call.join({create: true})
      setCalling(Calling)


    }
    Join();

  },[client])

  if(!Calling) return null;
  return (
    <View style={{flex: 1, backgroundColor: "#8866"}}>
      <Spinner visible={!Calling}/>
      <StreamCall call={Calling}>
        <CallContent/>
      </StreamCall>
      
    </View>
  )
}