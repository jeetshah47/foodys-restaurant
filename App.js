import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp, cert } from "firebase-admin/app"
import { getStorage } from "firebase-admin/storage"

const serviceAccount = require("./foodys-34dd3-firebase-adminsdk-ao3q8-2af309ea03.json")

initializeApp({
  credential:  cert(serviceAccount),
  storageBucket: "https://foodys-34dd3-default-rtdb.firebaseio.com"
});

export default function App() {
  return (
    <View style={styles.container}>

      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
