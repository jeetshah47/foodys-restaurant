import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../style/Theme";
import { Iconify } from "react-native-iconify";
import Items from "./Items/Items";
import { useEffect, useState } from "react";
import { GetFoodItems } from "./Items/api";

const Restaurants = ({ route, navigation }) => {
  const details = route.params.data;
  const [restaurantItems, setRestaurantItems] = useState([]);

  const hadleAddPress = () => {
    navigation.navigate("Additems", {
      id: details.id,
    });
  }

  useEffect(() => {
    const getItems = async () => {
      const result = await GetFoodItems(details.id);
      console.log(result);
      setRestaurantItems(result);
    };
    getItems();
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.cover} source={{ uri: details.logoUrl }} />
      <Text style={styles.title}>{details.name}</Text>
      <View style={{ height: 1, width: "100%", backgroundColor: theme.colors.tertiary }}></View>
      <View style={styles.desc}>
        <View>
          <Text style={styles.subText}>Caption:</Text>
          <Text style={styles.subText}>City:</Text>
        </View>
        <View>
          <Text style={styles.subText}>{details.caption}</Text>
          <Text style={styles.subText}>{details.city}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={styles.subText}>My Items</Text>
        <Iconify icon="icon-park-outline:add" size={30} onPress={hadleAddPress} />
      </View>
      <View>
        <ScrollView >
          {restaurantItems.map((item) => (
            <Items key={item.id} {...item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cover: {
    aspectRatio: 1.5,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  desc: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  }
})


export default Restaurants;
