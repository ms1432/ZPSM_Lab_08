import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TestButton from "../components/TestButton";

export default function WelcomeScreen({ navigation }) {
  const acceptRules = async () => {
    await AsyncStorage.setItem("hasLaunched", "true");
    navigation.replace("Home"); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Regulamin aplikacji</Text>

      <Text style={styles.text}>
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. {"\n\n"}
        2. Donec luctus elit eget felis suscipit, et luctus lacus ultricies..{"\n\n"}
        3. Vivamus nec magna turpis..
      </Text>

      <TestButton text="Akceptuję" onPress={acceptRules} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center", 
  },
  title: {
    color: "#111",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: "#111",
    lineHeight: 22,
    marginBottom: 40,
  },
});
