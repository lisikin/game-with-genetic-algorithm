import { GuessResult } from '../App';

interface GuessHistoryProps {
  history: GuessResult[];
  showGeneration?: boolean;
}

export function GuessHistory({ history, showGeneration = false }: GuessHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Попыток пока нет
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {history.map((result, index) => (
        <div
          key={`${result.turn}-${result.guess}-${index}`}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-semibold w-12">#{result.turn}</span>
            <span className="font-mono text-xl font-bold text-gray-800">
              {result.guess}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded">
              <span className="text-2xl">🐂</span>
              <span className="font-bold text-green-700">{result.bulls}</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded">
              <span className="text-2xl">🐄</span>
              <span className="font-bold text-yellow-700">{result.cows}</span>
            </div>
            {showGeneration && result.generation !== undefined && (
              <div className="text-xs text-gray-500 ml-2">
                gen: {result.generation}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}