// import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";
import { uploadImage } from "./firebaseUpload";
import { theme } from "../../style/Theme";
import { Iconify } from "react-native-iconify";
// import { firebase } from '@react-native-firebase/storage';
export const SelectImage = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };
  return (
    <View >
      {/* <Button title="Select Image" onPress={pickImage} /> */}
      {!image && (
        <Pressable style={styles.box} onPress={pickImage}>
          <Iconify icon="mdi:add" />
        </Pressable>
      )}
      {image && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: image }} style={{width: "100%", height: 150}} />
          <Iconify icon="mdi:close" onPress={() => setImage(null)} style={{}} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
});
/**const selectedImageUri = response.uri;

      // Upload the selected image to Firebase Storage
      // uploadImageToFirebase(selectedImageUri); */
