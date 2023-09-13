// import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View } from 'react-native';
import { uploadImage } from './firebaseUpload';
// import { firebase } from '@react-native-firebase/storage';
export const SelectImage =  () => {
  const [image, setImage] = useState(null);

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
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Upload Image" onPress={() => uploadImage(image)} />}
    </View>
    )
};
/**const selectedImageUri = response.uri;

      // Upload the selected image to Firebase Storage
      // uploadImageToFirebase(selectedImageUri); */