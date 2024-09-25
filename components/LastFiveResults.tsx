import { FlatList } from "react-native";
import { ThemedView } from "./ThemedView";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { ThemedText } from "./ThemedText";
import { useEffect } from "react";

export function LastFiveResults() {
  const history = useGameStore((store) => store.history).slice(-5);

  useEffect(() => {
    console.log('history changed', history);
  }, [history]);

  const getWinnerText = (winner: string) => {
    switch (winner) {
      case "draw":
        return "The game ended in a draw";
      case "playerOne":
        return "Congratulations, You won!";
      case "playerTwo":
        return "Sorry, You lost";
    }
  };

  return (
    <ThemedView>
      <ThemedText type="defaultSemiBold">Last five results</ThemedText>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <ThemedText>
            {item.playerOneMove} vs {item.playerTwoMove}:{" "}
            {getWinnerText(item.winner)}
          </ThemedText>
        )}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}
