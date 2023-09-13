import { createStackNavigator } from "@react-navigation/stack"
import AuthScreen from '../auth/AuthScreen';

const Base = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} />

        </Stack.Navigator>
    )
}