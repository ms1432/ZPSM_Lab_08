import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import TestStack from "./TestStack";
import ResultsScreen from "../screens/ResultsScreen";
import TestScreen from "../screens/TestScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Ekran Główny">
      
      <Drawer.Screen
        name="Ekran Główny"
        component={TestStack}
      />

      <Drawer.Screen
        name="Wyniki"
        component={ResultsScreen}
      />

      <Drawer.Screen
        name="Test #1"
        component={TestScreen}
        initialParams={{ testId: 1 }}
      />

      <Drawer.Screen
        name="Test #2"
        component={TestScreen}
        initialParams={{ testId: 2 }}
      />

      <Drawer.Screen
        name="Test #3"
        component={TestScreen}
        initialParams={{ testId: 3 }}
      />
    </Drawer.Navigator>
  );
}
