import { StyleSheet } from "react-native";

import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Players, useGameStore } from "@/hooks/stores/useGameStore";
import { useCpu } from "@/hooks/useCpu";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useId, useMemo } from "react";
import { LastFiveResults } from "@/components/LastFiveResults";

const playerNumber: Players = "playerOne";
const cpuNumber: Players = "playerTwo";

export default function GameResultScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const uniqueId = useId();

  const { getCpuMove } = useCpu();

  const playerMove = useGameStore((state) => state.getPlayerMove(playerNumber));
  const cpuMove = useGameStore((state) => state.getPlayerMove(cpuNumber));
  const winner = useGameStore((state) => state.getWinner());

  const setPlayerMove = useGameStore((state) => state.setPlayerMove);
  const pushGameHistory = useGameStore((state) => state.pushGameHistory);
  const newGame = useGameStore(
    (state) => state.newGame
  );

  useEffect(() => {
    if (playerMove === null && rootNavigationState?.key) {
      router.replace("/");
    }
  }, [playerMove, rootNavigationState]);

  useEffect(() => {
    let cpuMoveTimeout: any;

    if (cpuMove === null) {
      cpuMoveTimeout = setTimeout(() => {
        setPlayerMove(getCpuMove(), "playerTwo");
      }, 1500);
    }

    return () => clearTimeout(cpuMoveTimeout);
  }, []);

  useEffect(() => {
    if (winner && playerMove && cpuMove) {
      pushGameHistory({
        id: uniqueId,
        playerOneMove: playerMove,
        playerTwoMove: cpuMove,
        winner,
      });
    }
  }, [winner, playerMove, cpuMove])

  const winnerText = useMemo(() => {
    switch (winner) {
      case "draw":
        return "The game ended in a draw";
      case "playerOne":
        return "Congratulations, You won!";
      case "playerTwo":
        return "Sorry, You lost";
    }
  }, [winner]);

  const playAgainHandle = () => {
    newGame();
    router.push("/game");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Result</ThemedText>
        {cpuMove === null && (
          <ThemedText type="subtitle">wating player two move...</ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.section}>
        {playerMove && <ThemedText>You chose {playerMove}</ThemedText>}
        {cpuMove && <ThemedText>CPU chose {cpuMove}</ThemedText>}
        {winner && <ThemedText>{winnerText}</ThemedText>}
      </ThemedView>
      {winner && (
        <ThemedView style={styles.confirmSection}>
          <Button title="Play again" onPress={() => playAgainHandle()} />
        </ThemedView>
      )}
      <LastFiveResults />
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
  confirmSection: {
    marginBottom: 32,
  },
});
