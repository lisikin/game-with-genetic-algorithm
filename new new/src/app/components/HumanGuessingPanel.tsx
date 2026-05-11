import { useState, useEffect } from 'react';
import { GuessResult } from '../App';
import { generateRandomSecret, calculateBullsAndCows, isValidGuess } from '../utils/gameLogic';
import { GuessHistory } from './GuessHistory';

interface HumanGuessingPanelProps {
  gameStarted: boolean;
  onGameStart: () => void;
  onRestart: () => void;
}

export function HumanGuessingPanel({ gameStarted, onGameStart, onRestart }: HumanGuessingPanelProps) {
  const [secretNumber, setSecretNumber] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [history, setHistory] = useState<GuessResult[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState('');

  // Генерируем число при создании компонента
  useEffect(() => {
    setSecretNumber(generateRandomSecret());
  }, []);

  const handleGuess = () => {
    setError('');
    if (!isValidGuess(currentGuess)) {
      setError('Введите 4 уникальные цифры');
      return;
    }

    const { bulls, cows } = calculateBullsAndCows(secretNumber, currentGuess);
    const result: GuessResult = {
      guess: currentGuess,
      bulls,
      cows,
      turn: history.length + 1
    };

    setHistory([result, ...history]);
    setCurrentGuess('');

    if (bulls === 4) setGameWon(true);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Ваша очередь угадывать</h2>
        
        {!gameStarted ? (
          <button onClick={onGameStart} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">
            Начать игру
          </button>
        ) : gameWon ? (
          <div className="text-center">
            <h3 className="text-2xl text-green-600 font-bold mb-4">Вы угадали! 🎉</h3>
            <p className="mb-6 text-gray-600">Число: <strong>{secretNumber}</strong></p>
            <p className="text-gray-600 mb-6">Вы решили задачу за {history.length} {history.length === 1 ? 'попытку' : history.length < 5 ? 'попытки' : 'попыток'}!</p>
            <button onClick={onRestart} className="px-8 py-3 bg-indigo-600 text-white rounded-lg">
              Новая игра
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full p-4 border-2 rounded-xl text-3xl font-mono text-center"
              placeholder="1234"
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()} 
            />
            <button onClick={handleGuess} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">
              Угадать
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-bold mb-4 border-b pb-2 text-indigo-900">Ваши попытки</h3>
        <GuessHistory history={history} />
      </div>
    </div>
  );
}