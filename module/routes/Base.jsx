import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../auth/AuthScreen";
import Restaurants from "../restaurants/Restaurant";
import Additems from "../restaurants/Items/AddItems";
import Orders from "../restaurants/orders/Order";

const Base = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Restaurant" component={Restaurants} />
      <Stack.Screen name="Additems" component={Additems} />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
};

export default Base;
