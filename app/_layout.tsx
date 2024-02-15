import {GestureHandlerRootView} from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "../context/Authcontext"

const InitialLayout = () => {
  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}}/>
  </Stack>
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