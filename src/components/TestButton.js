import React from "react";
import { Button, View, StyleSheet } from "react-native";

export default function TestButton({ text, onPress }) {
  return (
    <View style={styles.buttonWrapper}>
      <Button title={text} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 10
  }
});
