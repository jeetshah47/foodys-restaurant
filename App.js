import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SelectImage } from './module/utils/imagePicker';
import { NavigationContainer } from '@react-navigation/native';
import Base from './module/routes/Base';

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
