import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import { theme } from "../../style/Theme";
import { useState } from "react";
import { LoginApi, SignupApi } from "./api";
import Loader from "../common/Loader/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Iconify } from "react-native-iconify";
import { Dropdown } from "react-native-element-dropdown";
import { SelectImage } from "./../utils/imagePicker";
import { uploadImage } from "../utils/firebaseUpload";

const Signup = ({ onSuccess }) => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    caption: "",
    logoUrl: "",
    email: "",
    password: "",
    city: "",
  });

  const [isLoading, setLoading] = useState(false);
  const cityData = [
    {
      id: 1,
      name: "Vadodara",
    },
    {
      id: 2,
      name: "Surat",
    },
    {
      id: 3,
      name: "Ahmedabad",
    },
  ];
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [eyeIcon, setIcon] = useState("ant-design:eye-invisible-outlined");
  const [image, setImage] = useState(null);
  const handleLoginPress = async () => {
    setLoading(true);
    console.log(restaurant);
    try {
      const response = await SignupApi({
        name: restaurant.name,
        caption: restaurant.caption,
        logoUrl: restaurant.logoUrl,
        email: restaurant.email,
        password: restaurant.password,
        city: restaurant.city,
      });
      console.log(response);
      ToastAndroid.show("Signup Successfull", ToastAndroid.SHORT);
      setLoading(false);
      onSuccess();
    } catch (error) {
      handleToast();
      console.log(error);
      setLoading(false);
    }
  };

  const handleVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
    setIcon(
      isPasswordVisible
        ? "ant-design:eye-outlined"
        : "ant-design:eye-invisible-outlined"
    );
  };

  const handleUploadLogo = () => {
    setLoading(true);
    uploadImage([image]).then((url) => {
      setRestaurant({ ...restaurant, logoUrl: url["1"] });
      ToastAndroid.show("Logo Uploaded Succesfully", ToastAndroid.SHORT);
      setLoading(false);
    });
  };

  const handleToast = () => {
    ToastAndroid.show("Please Enter Correct Values", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.inputContainer}>
      <KeyboardAwareScrollView>
        <View style={{ marginVertical: 50 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                onChangeText={(text) =>
                  setRestaurant({ ...restaurant, name: text })
                }
                style={styles.inputText}
                value={restaurant.name}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.inputLabel}>Caption</Text>
              <TextInput
                onChangeText={(text) =>
                  setRestaurant({ ...restaurant, caption: text })
                }
                style={styles.inputText}
                value={restaurant.lastName}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              onChangeText={(text) =>
                setRestaurant({ ...restaurant, email: text })
              }
              style={styles.inputText}
              value={restaurant.email}
              textContentType="emailAddress"
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>City</Text>
            <Dropdown
              data={cityData}
              labelField={"name"}
              valueField={"name"}
              style={styles.inputText}
              value={restaurant.city}
              onChange={(text) =>
                setRestaurant({ ...restaurant, city: text.name })
              }
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextInput
                inputMode="text"
                textContentType="password"
                secureTextEntry={isPasswordVisible}
                value={restaurant.password}
                style={styles.inputText}
                onChangeText={(text) =>
                  setRestaurant({ ...restaurant, password: text })
                }
              />
              {isPasswordVisible ? (
                <Iconify
                  style={styles.eyeIcon}
                  icon={"ant-design:eye-outlined"}
                  size={24}
                  onPress={handleVisibility}
                />
              ) : (
                <Iconify
                  style={styles.eyeIcon}
                  icon={"ant-design:eye-invisible-outlined"}
                  size={24}
                  onPress={handleVisibility}
                />
              )}
            </View>
          </View>

          <View style={{ marginBottom: 5 }}>
            <SelectImage image={image} setImage={setImage} />
            <Button title="upload" onPress={handleUploadLogo} />
          </View>
        </View>
        <Pressable onPress={handleLoginPress} style={styles.buttonContainer}>
          <Text
            style={{
              color: theme.colors.white,
              fontWeight: theme.font.fontWeight.medium,
              fontSize: theme.font.fontSize.medium,
            }}
          >
            {isLoading ? (
              <Loader color={theme.colors.white} display={true} />
            ) : (
              "Signup"
            )}
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.7,
    // justifyContent: "flex-end",
    flexDirection: "column",
    marginHorizontal: 50,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: theme.colors.orange.secondary,
    color: theme.colors.white,
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  inputLabel: {
    color: theme.colors.tertiary,
    fontSize: 16,
    fontWeight: theme.font.fontWeight.medium,
  },
  inputText: {
    fontSize: 17,
    fontWeight: theme.font.fontWeight.medium,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderColor: theme.colors.orange.secondary,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    // top: 0,
  },
});

export default Signup;
