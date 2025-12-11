import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";
import ResultsScreen from "../screens/ResultsScreen";

const Stack = createStackNavigator();

export default function TestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="Test" component={TestScreen} options={{ title: "Test" }} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Wyniki" }} />
    </Stack.Navigator>
  );
}
