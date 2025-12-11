import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { tasks } from "../data/tasks";
import { addResult } from "../storage/resultsStorage";

const TestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { testId } = route.params;

  const currentTasks = tasks.filter(task => task.testId === testId);

  if (!currentTasks.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Brak pytań dla tego testu!</Text>
      </View>
    );
  }

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(currentTasks[0].duration);

  const progressAnim = useRef(new Animated.Value(1)).current;

  const q = currentTasks[current];

  useEffect(() => {
    const duration = currentTasks[current].duration;
    setTimeLeft(duration);

    progressAnim.setValue(1);

    Animated.timing(progressAnim, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();

  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          handleAnswer(false, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [current]);

  const handleAnswer = async (isCorrect, timeExpired = false) => {
    let newScore = score;

    if (isCorrect) {
      newScore++;
      setScore(newScore);
    }

    if (current < currentTasks.length - 1) {
      setCurrent(current + 1);
      return;
    }

    const resultObj = {
      nick: "Test",
      score: newScore,
      total: currentTasks.length,
      type: `Test #${testId}`,
      date: new Date().toISOString().substring(0, 10),
    };

    await addResult(resultObj);

    navigation.navigate("Wyniki");
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test</Text>

      <Text style={styles.counter}>
        Pytanie {current + 1} z {currentTasks.length}
      </Text>

      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>

      <Text style={styles.question}>{q.question}</Text>

      <View style={styles.answersContainer}>
        {q.answers.map((ans, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answerButton}
            onPress={() => handleAnswer(ans.isCorrect)}
          >
            <Text style={styles.answerText}>{ans.content}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },

  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },

  counter: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },

  progressBarBackground: {
    height: 10,
    backgroundColor: "#ddd",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "red",
  },

  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  answersContainer: {
    marginTop: 10,
  },

  answerButton: {
    backgroundColor: "#ddd",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },

  answerText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default TestScreen;
