import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../screen/Auth/SignUpScreen";
import LogInScreen from "../../screen/Auth/LogInScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
