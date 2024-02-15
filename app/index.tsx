import { View, Text, KeyboardAvoidingView, 
  StyleSheet,
  Platform, 
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import Spinner from "react-native-loading-spinner-overlay"
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../context/Authcontext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height; 

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {onRegister, onLogin} = useAuth()

    const onsignInPress = async() => {
      setLoading(true);
      try{
        const result = await onLogin!(email, password);
        console.log("this is signIn info !", result);

      }catch(err){
        Alert.alert("Login failed !")
      } finally {
        setLoading(false)
      }
    }


    const onSignUp = async() => {
      setLoading(true)
      try{
        const result = await onRegister!(email, password);
        console.log("this is register info !", result);

      }catch(err){
        Alert.alert("Error somethig went wrong")
      } finally{
        setLoading(false)
      }
    }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS ? "padding" : "height"}
    >
      <Spinner visible={loading} />
      <Text style={styles.header}>Glims Meet</Text>
      <Text style={styles.subheader}>Fastest meeting online</Text>
      <TextInput
        placeholder="maxx@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.inputField}
      />
      <TouchableOpacity onPress={onsignInPress} style={styles.signInBtn}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpbtn} onPress={onSignUp}>
        <Text style={styles.signuptxt}>Don't have account? sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WIDTH > HEIGHT ? "40%" : 22,
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  inputField: {
    fontSize: 20,
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    padding: 10,
  },
  signInBtn: {
    backgroundColor: "blue",
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    color: "white",
    fontSize: 17
  },
  signUpbtn: {
    alignItems: "center",
    marginTop: 10,
    
  },
  signuptxt: {
    fontSize: 15,
    color: 'blue'

  }
});