import { View, Text, KeyboardAvoidingView, StyleSheet, Platform} from 'react-native'
import React from 'react'
import Spinner from "react-native-loading-spinner-overlay"
export default function Page() {
  return (
    <KeyboardAvoidingView style={styles.container}behavior={Platform.OS ? "padding" : "height"}>
      <Text>Something</Text>
      <Text>I am here for you !</Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        justifyContent: "center",
        backgroundColor: "white"
    }


})