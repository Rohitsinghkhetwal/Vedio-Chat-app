import {GestureHandlerRootView} from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";

const InitialLayout = () => {
  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}}/>
  </Stack>
}

const RootLayout = () => {
  return <GestureHandlerRootView style={{flex: 1}}>
    <InitialLayout/>
  </GestureHandlerRootView>;

}

export default RootLayout;