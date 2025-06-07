import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";

const AuthResolverScreen = () => {
  const { initialize } = useAuth();
  useEffect(() => {
    initialize();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

export default AuthResolverScreen;

const styles = StyleSheet.create({});
