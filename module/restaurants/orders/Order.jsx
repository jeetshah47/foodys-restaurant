import { ScrollView, StyleSheet, View } from "react-native";
import OrderCard from "./OrderCard";
import { useState } from "react";
import { getOrders } from "./api";
import { useEffect } from "react";
import { theme } from "../../../style/Theme";

const Orders = ({ route }) => {
  const id = route.params.id;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const orderList = async () => {
      const result = await getOrders(id);
      // groupByOrderId(result);
      console.log(result);
      setOrder([...result]);
    };
    orderList();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {order.map((item, index) => (
          <OrderCard key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default Orders;
