import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { ModeSelector } from './components/ModeSelector';
import { EducationalPanel } from './components/EducationalPanel';
import { AboutPanel } from './components/AboutPanel';

export type GameMode = 'human-vs-ga' | 'human-guesses';

export interface GuessResult {
  guess: string;
  bulls: number;
  cows: number;
  turn: number;
  generation?: number;
}

function App() {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [gameId, setGameId] = useState(0);

  const handleModeSelect = (selectedMode: GameMode) => {
    setMode(selectedMode);
    setGameStarted(false);
    setShowAbout(false);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setMode(null);
    // При каждом выходе в меню увеличиваем ID. 
    // Это заставит React полностью пересоздать компонент GameBoard,
    // что гарантирует сброс загаданного числа.
    setGameId(prev => prev + 1);
  };

  const handleRestartSession = () => {
    setGameStarted(false);
    setGameId(prev => prev + 1); // Обнуляем текущую игру, не выходя в меню
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 relative">
  {/* Основной контейнер теперь имеет relative, чтобы кнопка позиционировалась относительно него */}
    <div className="max-w-7xl mx-auto relative">
      {/* Кнопка теперь привязана к правому краю контента (right-0) */}
      <div className="flex flex-col md:flex-row md:justify-end mb-6 md:mb-0 md:absolute md:top-0 md:right-0 z-50"></div>
      <button
        onClick={toggleAbout}
        className="flex items-center justify-center gap-2 px-5 py-2.5 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-full transition-all border border-indigo-200 bg-white/70 backdrop-blur-md shadow-sm hover:scale-105 active:scale-95"
      >
        {showAbout ? (
          <><span className="text-xl">←</span> Вернуться к игре</>
        ) : (
          <><span className="text-xl"></span> Об игре</>
        )}
      </button>
    </div>

    <div className="max-w-7xl mx-auto">
      {/* Добавили небольшой отступ сверху (pt-8), чтобы на мобилках заголовок не прилипал */}
      <header className="text-center mb-10 pt-4 md:pt-4">
        <h1 className="text-4xl md:text-6xl font-black text-indigo-900 mb-3 tracking-tight">
          🐂 Быки и Коровы 🐄
        </h1>
        <p className="text-gray-500 text-base md:text-lg font-medium italic">
          Генетический алгоритм против человеческой логики
        </p>
        </header>

        {showAbout ? (
          <AboutPanel />
        ) : !mode ? (
          <ModeSelector onSelectMode={handleModeSelect} />
        ) : (
          <>
            <button onClick={handleNewGame} className="mb-8 flex items-center gap-2 px-5 py-2.5 text-indigo-600 font-bold hover:bg-indigo-50 rounded-full transition-all border-2 border-indigo-100 bg-white shadow-sm hover:border-indigo-300 hover:scale-105 active:scale-95 group">
             <span className="transition-transform group-hover:-translate-x-1">←</span>
              В меню
            </button>
            <GameBoard
              key={gameId} // ЭТОТ КЛЮЧ РЕШАЕТ ВСЕ ПРОБЛЕМЫ СО СБРОСОМ
              mode={mode}
              gameStarted={gameStarted}
              onGameStart={() => setGameStarted(true)}
              onRestart={handleRestartSession}
            />
          </>
        )}
        {!showAbout && <EducationalPanel />}
      </div>
    </div>
  );
}

export default App;