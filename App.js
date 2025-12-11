import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./src/screens/SplashScreen";
import AppLoader from "./src/screens/AppLoader";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import DrawerNavigator from "./src/navigation/DraverNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="AppLoader" component={AppLoader} />


        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        <Stack.Screen name="Home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
