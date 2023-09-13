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
import { LoginApi } from "./api";
import Loader from "../common/Loader/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Iconify } from "react-native-iconify";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ onSuccess }) => {
  const [user, setUser] = useState({
    email: "kfc1@example.com",
    password: "kfc_password",
  });

  const [isLoading, setLoading] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [eyeIcon, setIcon] = useState("ant-design:eye-invisible-outlined");

  const handleLoginPress = async () => {
    setLoading(true);
    console.log(user);
    try {
      const response = await LoginApi({
        email: user.email,
        password: user.password,
      });
      console.log(response);
      setLoading(false);
      AsyncStorage.setItem("token", response.id);
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
      !isPasswordVisible
        ? "ant-design:eye-outlined"
        : "ant-design:eye-invisible-outlined"
    );
  };

  const handleToast = () => {
    ToastAndroid.show("Invalid Login", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.inputContainer}>
      <KeyboardAwareScrollView>
        <View style={{ marginVertical: 50 }}>
          <View>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              onChangeText={(text) => setUser({ ...user, email: text })}
              style={styles.inputText}
              value={user.email}
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
                secureTextEntry={!isPasswordVisible}
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
              "Login"
            )}
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    justifyContent: "space-between",
  },
  logoContainer: {
    flex: 0.4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    shadowRadius: 20,
  },
  buttonTabs: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 0,
    marginHorizontal: 10,
  },
  inputContainer: {
    flex: 0.6,
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
    fontSize: 18,
    fontWeight: theme.font.fontWeight.medium,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "100%",
    // borderColor: theme.colors.orange.secondary,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    // top: 0,
  },
});

export default Login;
