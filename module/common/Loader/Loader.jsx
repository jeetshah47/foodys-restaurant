import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../../../style/Theme";

const Loader = ({ display, color }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        hidesWhenStopped={display}
        size={"large"}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
});

export default Loader;
