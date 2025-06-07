import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = (routeName, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName, params);
  }
};
