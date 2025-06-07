import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { navigate } from "../utils/NavigationRef";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
  errMsg: null,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        isInitialized: true,
        token: action.payload.token,
        errMsg: null,
      };
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        errMsg: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        errMsg: null,
      };
    case "ERROR":
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  isAuthenticated: false,
  signUp: async () => {},
  login: async () => {},
  logOut: async () => {},
  initialize: async () => {},
  isInitialized: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    // try {
    //   const token = await AsyncStorage.getItem("token");
    //   dispatch({ type: "INITIALIZE", payload: { token } });
    //   navigate(token ? "MainFlow" : "AuthFlow");
    // } catch (e) {
    //   dispatch({ type: "ERROR", payload: "Failed to initialize auth" });
    //   navigate("AuthFlow");
    // }
    dispatch({ type: "INITIALIZE", payload: { token: "123456" } });
    navigate("MainFlow");
  }

  const signUp = async ({ email, password }) => {
    try {
      // Replace with your actual API call
      const response = { data: { token: "dummy-token" }, status: 200 }; // Mock response
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: { token: response.data.token } });
      navigate("MainFlow");
      ToastAndroid.show("Account created successfully", ToastAndroid.SHORT);
    } catch (e) {
      const errorMsg =
        e.response?.data || "Something went wrong. Please try again";
      dispatch({ type: "ERROR", payload: errorMsg });
      ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
    }
  };

  const login = async ({ email, password }) => {
    try {
      // Replace with your actual API call
      const response = { data: { token: "dummy-token" }, status: 200 }; // Mock response
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: { token: response.data.token } });
      navigate("MainFlow");
      ToastAndroid.show("Login successful", ToastAndroid.SHORT);
    } catch (e) {
      const errorMsg =
        e.response?.data || "Something went wrong. Please try again";
      dispatch({ type: "ERROR", payload: errorMsg });
      ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "SIGN_OUT" });
      navigate("AuthFlow");
      ToastAndroid.show("Signed out successfully", ToastAndroid.SHORT);
    } catch (e) {
      dispatch({ type: "ERROR", payload: "Failed to sign out" });
      ToastAndroid.show("Failed to sign out", ToastAndroid.SHORT);
    }
  };

  const authContextValue = useMemo(
    () => ({
      isAuthenticated: state.isAuthenticated,
      isInitialized: state.isInitialized,
      signUp,
      login,
      logOut,
      initialize,
    }),
    [state.isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
