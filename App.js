import { StatusBar } from 'expo-status-bar';
import { Button, LogBox, StyleSheet, Text, TextInput, View } from 'react-native';
import { SelectImage } from './module/utils/imagePicker';
import { NavigationContainer } from '@react-navigation/native';
import Base from './module/routes/Base';
import Additems from './module/restaurants/Items/AddItems';
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <NavigationContainer>
        <Base />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
