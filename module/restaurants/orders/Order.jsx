import { ScrollView, StyleSheet, View } from "react-native";
import OrderCard from "./OrderCard";
import { useState } from "react";
import { getOrders } from "./api";
import { useEffect } from "react";
import { theme } from "../../../style/Theme";

const Orders = ({ route }) => {
  const id = route.params.id;
  const [order, setOrder] = useState([]);
  const groupByOrderId = (orders) => {
    const knownOrderId = [];
    orders.map((item) => {
      if (!knownOrderId.map((i) => i.order_id).includes(item.order_id)) {
        knownOrderId.push({ order_id: item.order_id });
      }
    });
    console.log(knownOrderId);

    knownOrderId.map((id) => {
      const groupedItems = {
        items: orders.filter((item) => item.order_id === id.order_id),
      };
      counter = {};
      console.log("counte", counter);
      groupedItems.items.map((i) => {
        i.item_record;
      });

      id.items = groupedItems.items;
    });
    console.log("firstItem", knownOrderId[0]);
  };

  const groupedByItems = (order) => {
    const countItem = 1;
    const groupedItems = {};
    order.map((item) => {
      if (groupedItems[item.item_id]) {
        groupedItems[item.item_id].push({
          name: item.name,
          price: item.price,
          count: countItem++,
        });
      } else {
        groupedItems[item.item_id] = [
          { name: item.name, price: item.price, count: countItem++ },
        ];
      }
    });
    console.log("grup", groupedItems);
  };

  useEffect(() => {
    const orderList = async () => {
      const result = await getOrders(id);
      groupByOrderId(result);
      //   setOrder([...result]);
    };
    orderList();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {order.map((item) => (
          <OrderCard key={item.id} {...item} />
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
