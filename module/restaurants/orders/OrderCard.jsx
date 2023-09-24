import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { theme } from "../../../style/Theme";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { updateOrderStatus } from "./api";

const OrderCard = (data) => {
  const [statusList, setStatusList] = useState([]);

  // const caseMap = {
  //   Created: [{ value: "Accepted" }, { value: "Cancel" }],
  //   Accepted: [{ value: "Preparing" }],
  //   Preparing: [{ value: "Picked" }],
  //   Picked: [{ value: "Arrived" }],
  //   Arrived: [{ value: "Delivered" }],
  // };
  const [status, setStatus] = useState({ value: "Created" });

  useEffect(() => {
    handleStatusChange(data?.status);
  }, []);

  const handleStatusChange = (status) => {
    setStatus({ value: status });
    switch (status) {
      case "Created": {
        setStatusList([{ value: "Accepted" }, { value: "Cancel" }]);
        break;
      }
      case "Accepted": {
        setStatusList([{ value: "Preparing" }]);
        break;
      }
      case "Preparing": {
        setStatusList([{ value: "Picked" }]);
        break;
      }
      case "Picked": {
        setStatusList([{ value: "Arrived" }]);
        break;
      }
      case "Arrived": {
        setStatusList([{ value: "Delivered" }]);
        break;
      }
    }
  };

  const handleOnChangeStatus = (text) => {
    handleStatusChange(text);
    handleStatusApi(text);
  };

  const handleStatusApi = async (text) => {
    console.log(data?.order_id, text);
    try {
      const result = await updateOrderStatus(data?.order_id, text);
      console.log(result);
      ToastAndroid.show("Status Updated", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Status Not Updated", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Items</Text>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Quantity</Text>
      </View>
      <View
        style={{
          borderWidth: 0.75,
          width: "100%",
          borderColor: theme.colors.tertiary,
        }}
      />
      <View>
        {data?.itemNames &&
          data?.itemNames.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16 }}>{item}</Text>
              <Text>x{data?.quantity[index]}</Text>
            </View>
          ))}
      </View>
      <View
        style={{
          borderWidth: 0.75,
          width: "100%",
          borderColor: theme.colors.tertiary,
        }}
      />
      <View style={{ alignSelf: "flex-end" }}>
        <Text style={{ fontWeight: "600" }}>Rs. {data?.totalPrice}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.address}>Delivery Addresss</Text>
          <Text>
            {data?.user.first_name} {data?.user.last_name}{" "}
          </Text>
          <Text>{data?.user.ph_number}</Text>
          <Text>{data?.user.address}</Text>
        </View>

        <View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "600", textAlign: "center" }}
            >
              Current Status: {status.value}
            </Text>
          </View>
          <View style={styles.drop}>
            <Dropdown
              valueField={"value"}
              labelField={"value"}
              onChange={(text) => handleOnChangeStatus(text.value)}
              value={status}
              data={statusList}
            />
          </View>
        </View>
      </View>
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
  address: {
    fontSize: 16,
    fontWeight: "600",
  },
  drop: {
    borderRadius: 10,
    borderWidth: 1,
    // padding: 10,
    paddingHorizontal: 5,
    width: 150,
  },
});

export default OrderCard;
