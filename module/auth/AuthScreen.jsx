import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Login from "./Login";
import { theme } from "../../style/Theme";
import { useState } from "react";
import Signup from "./Singup";

const AuthScreen = ({ navigation }) => {
  const [tab, setTab] = useState("Login");

  const handleChangeTabLogin = () => {
    setTab("Login");
  };

  const handleChangeTabSignUp = () => {
    setTab("Singup");
  };

  const handleNavigation = () => {
    navigation.navigate("Restaurant");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/LogoCenter.png")} />
        <View style={styles.buttonTabs}>
          <Pressable
            android_ripple={{ color: theme.colors.tertiary }}
            onPress={handleChangeTabLogin}
            style={{
              paddingBottom: 15,
              borderBottomWidth: tab === "Login" ? 2 : 0,
              width: "40%",
              borderBottomColor: theme.colors.orange.secondary,
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: theme.colors.tertiary }}
            onPress={handleChangeTabSignUp}
            style={{
              paddingBottom: 15,
              borderBottomWidth: tab === "Login" ? 0 : 2,
              width: "40%",
              borderBottomColor: theme.colors.orange.secondary,
            }}
          >
            <Text style={styles.buttonText}>Sign-Up</Text>
          </Pressable>
        </View>
      </View>
      {/* Screen Change */}
      {tab === "Login" ? (
        <Login onSuccess={handleNavigation} />
      ) : (
        <Signup onSuccess={handleNavigation} />
      )}
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
    flex: 0.3,
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

export default AuthScreen;
