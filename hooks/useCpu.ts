import { BaseMoveOptions } from "@/hooks/stores/useGameStore";

export const useCpu = () => {
  const getCpuMove = () => {
    const moves: BaseMoveOptions[] = ['rock', 'paper', 'scissor'];

    return moves[Math.floor(Math.random() * moves.length)];
  }

  return {
    getCpuMove
  }
}