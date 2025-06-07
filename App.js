import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigators/index";
import AuthProvider from "./src/contexts/authContext";

const App = () => (
  <AuthProvider>
    <StatusBar style="auto" />
    <Navigation />
  </AuthProvider>
);

export default App;
