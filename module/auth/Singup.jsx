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

const Signup = ({ onSuccess }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [isLoading, setLoading] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [eyeIcon, setIcon] = useState("ant-design:eye-invisible-outlined");

  const handleLoginPress = async () => {
    setLoading(true);
    try {
      const response = await SignupApi({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        ph_number: user.phoneNumber,
        address: user.address,
      });
      console.log(response);
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

  const handleToast = () => {
    ToastAndroid.show("Please Enter Correct Values", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.inputContainer}>
      <KeyboardAwareScrollView>
        <View style={{ marginVertical: 50 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                onChangeText={(text) => setUser({ ...user, firstName: text })}
                style={styles.inputText}
                value={user.firstName}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                onChangeText={(text) => setUser({ ...user, lastName: text })}
                style={styles.inputText}
                value={user.lastName}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              onChangeText={(text) => setUser({ ...user, email: text })}
              style={styles.inputText}
              value={user.email}
              textContentType="emailAddress"
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
              style={styles.inputText}
              value={user.phoneNumber}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              onChangeText={(text) => setUser({ ...user, address: text })}
              style={styles.inputText}
              value={user.address}
              textContentType="fullStreetAddress"
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
                value={user.password}
                style={styles.inputText}
                onChangeText={(text) => setUser({ ...user, password: text })}
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
