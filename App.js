import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { history } from "../services/api";

export default function HistoryScreen() {
  const [rows, setRows] = useState([]);
  useEffect(() => { history().then(setRows).catch(() => {}); }, []);
  return (
    <FlatList
      style={{ backgroundColor: "#0b1020" }}
      contentContainerStyle={{ padding: 16 }}
      data={rows}
      keyExtractor={(it) => it._id}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={[s.v, { color: item.verdict === "scam" ? "#ff5470" : "#22d3a4" }]}>
            {String(item.verdict).toUpperCase()} · {item.confidence}%
          </Text>
          <Text style={s.body} numberOfLines={2}>{item.input_text}</Text>
        </View>
      )}
    />
  );
}
const s = StyleSheet.create({
  card: { backgroundColor: "#1a2238", padding: 14, borderRadius: 12, marginBottom: 10 },
  v: { fontWeight: "800", marginBottom: 6 },
  body: { color: "#cbd5e1" },
});
