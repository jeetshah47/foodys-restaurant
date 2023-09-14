import {
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { theme } from "../../../style/Theme";
import { Iconify } from "react-native-iconify";
import { useState } from "react";

const FoodCard = ({ imgUrl, name, price, nutritionalUrl, type, id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        style={{
          borderRadius: 15,
          aspectRatio: 1.5,
          borderColor: "#d3d1d8",
        }}
        source={{ uri: imgUrl }}
      />
      <View
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          backgroundColor: theme.colors.white,
        }}
      >
        {type === "veg" ? (
          <Iconify icon="mdi:lacto-vegetarian" color={"#22aa00"} />
        ) : (
          <Iconify icon="mdi:lacto-vegetarian" color={"#FF0000"} />
        )}
      </View>

      <Pressable
        android_ripple={{ color: "#9796A1", radius: 50 }}
        style={styles.info}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Iconify
          icon="icon-park-solid:traditional-chinese-medicine"
          color={"#2e88fa"}
        />
        <Modal animationType="slide" visible={modalVisible}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: nutritionalUrl }}
            />
            <View
              style={{ position: "absolute", width: 80, bottom: 0, right: 30 }}
            >
              <Button
                title="Back"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
        <Text>Nutrients</Text>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 10,
        }}
      >
        <View style={{ marginHorizontal: 10, marginVertical: 12 }}>
          <Text style={{ fontWeight: theme.font.fontWeight.bold }}>{name}</Text>
          <View>
            <Text
              style={{
                fontSize: theme.font.fontSize.small,
                color: theme.colors.tertiary,
              }}
            >
              Rs.
              {price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.25,
    borderColor: "#d3d1d8",
    borderRadius: 12,
    margin: 10,
    width: 250,
  },
  info: {
    position: "absolute",
    bottom: 70,
    elevation: 2,
    shadowColor: "#fe724c",
    left: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default FoodCard;
