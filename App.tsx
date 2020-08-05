import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FadingCard from "./components/FadingCard";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  // const foo: number = "1";
  return (
    <PaperProvider>
    <View style={styles.container}>
      <FadingCard />
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
