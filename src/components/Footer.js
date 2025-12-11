import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function Footer({ text, onPress }) {
  return (
    <View style={styles.footer}>
      <Button title={text} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 50
  }
});
