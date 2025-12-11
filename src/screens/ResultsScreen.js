import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet
} from "react-native";
import { getResults } from "../storage/resultsStorage";
import { useFocusEffect } from "@react-navigation/native";

const ResultsScreen = () => {
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadResults = async () => {
    const data = await getResults();
    setResults(data);
  };

  useEffect(() => {
    loadResults();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadResults();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadResults();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nick}</Text>
      <Text style={styles.cell}>
        {item.score}/{item.total}
      </Text>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wyniki</Text>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Nick</Text>
            <Text style={styles.headerCell}>Wynik</Text>
            <Text style={styles.headerCell}>Typ</Text>
            <Text style={styles.headerCell}>Data</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 28, textAlign: "center", marginBottom: 20 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 10
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  cell: { flex: 1, textAlign: "center" }
});

export default ResultsScreen;
