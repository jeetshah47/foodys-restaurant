import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../style/Theme";
import { Dropdown } from "react-native-element-dropdown";

const OrderCard = (data) => {
  const status = [
    { value: "Created" },
    { value: "Accepted" },
    { value: "Cancel" },
    { value: "Preparing" },
    { value: "Picked" },
    { value: "Arrived" },
    { value: "Delivered" },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Items</Text>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Count</Text>
      </View>
      <View
        style={{
          borderWidth: 0.75,
          width: "100%",
          borderColor: theme.colors.tertiary,
        }}
      />
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Items 1</Text>
          <Text>x1</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Items 1</Text>
          <Text>x1</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Items 1</Text>
          <Text>x1</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Items 1</Text>
          <Text>x1</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.75,
          width: "100%",
          borderColor: theme.colors.tertiary,
        }}
      />
      <View>
        <Text>Rs. 100</Text>
        <Text>Deliver to</Text>
      </View>
      <View>{/* <Dropdown /> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d1d8",
    margin: 10,
    padding: 10,
  },
});

export default OrderCard;
