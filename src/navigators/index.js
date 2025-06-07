import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import { useAuth } from "../contexts/authContext";

export default function Navigation() {
  const { isInitialized, isAuthenticated } = useAuth();
  console.log(isAuthenticated, isInitialized);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
