import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { analyze } from "../services/api";

export default function ScannerScreen() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onScan = async () => {
    if (!text.trim()) return;
    setLoading(true); setResult(null);
    try { setResult(await analyze(text, "message")); }
    catch (e) { setResult({ error: e.message }); }
    finally { setLoading(false); }
  };

  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 20 }}>
      <Text style={s.title}>AI Scam Scanner</Text>
      <TextInput
        style={s.input} value={text} onChangeText={setText}
        placeholder="Paste a suspicious message…" placeholderTextColor="#888"
        multiline
      />
      <TouchableOpacity style={s.btn} onPress={onScan} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Run AI Scan</Text>}
      </TouchableOpacity>
      {result && (
        <View style={s.result}>
          <Text style={[s.verdict, { color: result.verdict === "scam" ? "#ff5470" : "#22d3a4" }]}>
            {String(result.verdict || "").toUpperCase()} · {result.confidence}%
          </Text>
          <Text style={s.body}>{result.explanation}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#0b1020" },
  title: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 16 },
  input: { backgroundColor: "#1a2238", color: "#fff", borderRadius: 12, padding: 14, minHeight: 120, textAlignVertical: "top" },
  btn: { backgroundColor: "#22d3ee", padding: 14, borderRadius: 12, marginTop: 14, alignItems: "center" },
  btnText: { color: "#0b1020", fontWeight: "700" },
  result: { marginTop: 20, backgroundColor: "#1a2238", padding: 16, borderRadius: 12 },
  verdict: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  body: { color: "#cbd5e1", lineHeight: 20 },
});
