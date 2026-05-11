import { GameMode } from '../App';
import { HumanVsGAPanel } from './HumanVsGAPanel';
import { HumanGuessingPanel } from './HumanGuessingPanel';

interface GameBoardProps {
  mode: GameMode;
  gameStarted: boolean;
  onGameStart: () => void;
  onRestart: () => void;
}

export function GameBoard({ mode, gameStarted, onGameStart, onRestart }: GameBoardProps) {
  return (
    <div className="w-full transition-all duration-500">
      {mode === 'human-guesses' ? (
        <HumanGuessingPanel 
          gameStarted={gameStarted} 
          onGameStart={onGameStart} 
          onRestart={onRestart} 
        />
      ) : (
        <HumanVsGAPanel 
          gameStarted={gameStarted} 
          onGameStart={onGameStart} 
          onRestart={onRestart} 
        />
      )}
    </div>
  );
}
