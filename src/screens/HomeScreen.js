import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TestButton from "../components/TestButton";
import Footer from "../components/Footer";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran Główny</Text>

      <TestButton
        text="Przejdź do Testu #1"
        onPress={() => navigation.navigate("Test", { testId: 1 })}
      />

      <TestButton
        text="Przejdź do Testu #2"
        onPress={() => navigation.navigate("Test", { testId: 2 })}
      />

      <TestButton
        text="Przejdź do Testu #3"
        onPress={() => navigation.navigate("Test", { testId: 3 })}
      />

      <Footer
        text="Przejdź do wyników"
        onPress={() => navigation.navigate("Results")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  }
});
