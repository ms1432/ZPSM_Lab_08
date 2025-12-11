import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppLoader({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const flag = await AsyncStorage.getItem("hasLaunched");

      if (flag === null) {
        navigation.replace("Welcome"); // pierwsze uruchomienie
      } else {
        navigation.replace("Home"); // kolejne uruchomienia
      }
    };

    check();
  }, []);

  return null;
}
