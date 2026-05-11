import { useState, useRef, useEffect } from 'react';
import { GuessResult } from '../App';
import { validateSecretNumber, calculateBullsAndCows } from '../utils/gameLogic';
import { GeneticAlgorithm, GAStats } from '../utils/geneticAlgorithm';
import { GuessHistory } from './GuessHistory';
import { GAPanel } from './GAPanel';

interface HumanVsGAPanelProps {
  gameStarted: boolean;
  onGameStart: () => void;
  onRestart: () => void;
}

export function HumanVsGAPanel({ gameStarted, onGameStart, onRestart }: HumanVsGAPanelProps) {
  const [secretNumber, setSecretNumber] = useState('');
  const [inputSecret, setInputSecret] = useState('');
  const [gaHistory, setGaHistory] = useState<GuessResult[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [currentGAStats, setCurrentGAStats] = useState<GAStats | null>(null);
  
  const gaRef = useRef<GeneticAlgorithm>(new GeneticAlgorithm());
  const turnCounterRef = useRef(0);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoPlayingRef = useRef(false);

  // Очистка таймеров при закрытии компонента
  useEffect(() => {
    return () => stopAutoPlay();
  }, []);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    isAutoPlayingRef.current = false;
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null; 
    }
    // turnCounterRef.current = 0; //
  };

  const startGame = () => {
    const validation = validateSecretNumber(inputSecret);
    if (!validation.valid) {
      setError(validation.message || 'Ошибка ввода');
      return;
    }
    setSecretNumber(inputSecret); 
    setGaHistory([]);
    setGameWon(false);
    setError('');
    turnCounterRef.current = 0;
    gaRef.current.reset();
    onGameStart();
  };

  const makeGAGuess = () => {
    if (gameWon) return true;

    const stats = gaRef.current.evolve();
    setCurrentGAStats(stats);

    const { bulls, cows } = calculateBullsAndCows(secretNumber, stats.selectedGuess);
    turnCounterRef.current += 1;
    const newGuess: GuessResult = {
      guess: stats.selectedGuess,
      bulls,
      cows,
      turn: turnCounterRef.current,
      generation: stats.generation
    };

    setGaHistory(prev => [...prev, newGuess]);
    gaRef.current.addHistory(stats.selectedGuess, bulls, cows);

    if (bulls === 4) {
      setGameWon(true);
      stopAutoPlay();
      return true;
    }
    return false;
  };

  // --- ЛОГИКА АВТОИГРЫ ---
  const handleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      setIsAutoPlaying(true);
      isAutoPlayingRef.current = true;
      autoPlayStep();
    }
  };

  const autoPlayStep = () => {
    if (!isAutoPlayingRef.current) return;
    
    const won = makeGAGuess();
    
    if (won) {
      stopAutoPlay();
      return;
    }
    
    autoPlayTimeoutRef.current = setTimeout(() => {
      autoPlayStep();
    }, 600);
  };

  const resetGame = () => {
    stopAutoPlay();
    turnCounterRef.current = 0;
    onRestart();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900">👤 Игрок-человек</h2>

        {!gameStarted ? (
          <div>
            <p className="text-gray-600 mb-4">Загадайте 4 уникальные цифры для ГА:</p>
            <input
              type="text"
              value={inputSecret}
              onChange={(e) => setInputSecret(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Например: 1234"
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl mb-4 text-2xl font-mono text-center outline-none focus:border-indigo-500"
            />
            <button onClick={startGame} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
              Начать игру
            </button>
            {error && <p className="text-red-500 mt-2 text-xs">{error}</p>}
          </div>
        ) : gameWon ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-600 mb-4">Разгадано!</h3>
            <p className="text-gray-600 mb-6">Ваше число: <strong>{secretNumber}</strong></p>
            <p className="text-gray-600 mb-6">Генетический алгоритм решил задачу за {gaHistory.length} {gaHistory.length === 1 ? 'попытку' : gaHistory.length < 5 ? 'попытки' : 'попыток'}!</p>
            <button onClick={resetGame} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">
              Новая игра
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={makeGAGuess}
                disabled={isAutoPlaying}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium disabled:opacity-50"
              >
                Ход ГА
              </button>
              <button
                onClick={handleAutoPlay}
                className={`flex-1 py-3 rounded-xl font-medium text-white transition-colors ${
                  isAutoPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-600'
                }`}
              >
                {isAutoPlaying ? 'Стоп' : 'Автоигра'}
              </button>
            </div>
            <div className="border-t pt-4">
               <h3 className="font-bold text-gray-700 mb-3">История попыток ГА:</h3>
               <GuessHistory history={gaHistory} showGeneration />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px]">
        {gameStarted && !gameWon ? (
          <GAPanel stats={currentGAStats} ga={gaRef.current} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-300 italic text-center">
            Здесь будет визуализация <br/> работы алгоритма
          </div>
        )}
      </div>
    </div>
  );
}
