import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type BaseMoveOptions = 'rock' | 'paper' | 'scissor';
export type MoveOptions = BaseMoveOptions | null;
export type Players = 'playerOne' | 'playerTwo';

export type GameHistory = {
  id: string;
  playerOneMove: BaseMoveOptions;
  playerTwoMove: BaseMoveOptions;
  winner: Players | 'draw';
}

type GameState = {
  playerOneMove: MoveOptions,
  playerTwoMove: MoveOptions,
  history: GameHistory[],
  getPlayerMove: (player: Players) => MoveOptions;
  getWinner: () => Players | 'draw' | null;
  setPlayerMove: (move: MoveOptions, player: Players) => void;
  pushGameHistory: (gameHistory: GameHistory) => void;
  newGameAndPushHistory: (gameHistory: GameHistory) => void;
  newGame: () => void;
}

export const useGameStore = create<GameState>()(devtools((set, get) => ({
  playerOneMove: null,
  playerTwoMove: null,
  history: [],
  getPlayerMove: (player) => {
    if (player === 'playerOne') {
      return get().playerOneMove;
    }

    return get().playerTwoMove;
  },
  getWinner: () => {
    const { playerOneMove, playerTwoMove } = get();

    if (playerOneMove === null || playerTwoMove === null) {
      return null;
    }

    if (playerOneMove === playerTwoMove) {
      return 'draw';
    } else if (
      (playerOneMove === 'rock' && playerTwoMove === 'scissor') ||
      (playerOneMove === 'paper' && playerTwoMove === 'rock') ||
      (playerOneMove === 'scissor' && playerTwoMove === 'paper')
    ) {
      return 'playerOne';
    }

    return 'playerTwo';
  },
  setPlayerMove: (move, player) => {
    if (player === 'playerOne') {
      set(() => ({ playerOneMove: move }));
    } else {
      set(() => ({ playerTwoMove: move }));
    }
  },
  pushGameHistory(gameHistory) {
    const history = get().history.find(item => item.id === gameHistory.id);

    if (!history) {
      set((state) => ({
        history: [...state.history, gameHistory]
      }));
    }
  },
  newGame: () => {
    set(() => ({
      playerOneMove: null,
      playerTwoMove: null,
    }));
  },
  newGameAndPushHistory: (gameHistory) => {
    set((state) => ({
      playerOneMove: null,
      playerTwoMove: null,
      history: [...state.history, gameHistory]
    }));
  },
}), { name: 'game-store' }));