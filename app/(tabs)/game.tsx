import { StyleSheet } from "react-native";

import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Players, useGameStore } from "@/hooks/stores/useGameStore";
import { Link } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";

export default function GameScreen() {
  const [playerNumber] = useState<Players>("playerOne");

  const playerMove = useGameStore((state) => state.getPlayerMove(playerNumber));
  const setPlayerMove = useGameStore((state) => state.setPlayerMove);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Choose your move</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <Button
          color={playerMove === "rock" ? "#051937" : undefined}
          title="✊ Rock"
          onPress={() => setPlayerMove("rock", playerNumber)}
        />
        <Button
          color={playerMove === "paper" ? "#051937" : undefined}
          title="👋 Paper"
          onPress={() => setPlayerMove("paper", playerNumber)}
        />
        <Button
          color={playerMove === "scissor" ? "#051937" : undefined}
          title="✌️ Scissor"
          onPress={() => setPlayerMove("scissor", playerNumber)}
        />
      </ThemedView>
      <ThemedView style={styles.confirmSection}>
        <Link href="/game-result" asChild>
          <Button title="Confirm" onPress={() => {}} />
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 64,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  section: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 8,
  },
  confirmSection: {},
  selectedButton: {
    backgroundColor: "#051937",
  },
  button: {},
});
