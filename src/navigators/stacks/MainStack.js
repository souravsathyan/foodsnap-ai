import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screen/Home";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
