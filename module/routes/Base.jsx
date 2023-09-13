import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../auth/AuthScreen";
import Restaurants from "../restaurants/Restaurant";

const Base = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Restaurant" component={Restaurants} />
    </Stack.Navigator>
  );
};

export default Base;
