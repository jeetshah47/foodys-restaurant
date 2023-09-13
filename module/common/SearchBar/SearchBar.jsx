import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../../style/Theme";
import { Iconify } from "react-native-iconify";
import Base from "../../base/Base";

const SearchBar = ({ param, setValue }) => {
  return (
    <View style={styles.container}>
      <Iconify icon="iconamoon:search-bold" color={"#767F9D"} />
      <TextInput
        style={styles.text}
        onChangeText={setValue}
        value={param}
        placeholder="Search for restaurants"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFCFD",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#9AA0B4",
    fontWeight: "300",
  },
});

export default SearchBar;
