import { GAStats, GeneticAlgorithm } from '../utils/geneticAlgorithm';

interface GAPanelProps {
  stats: GAStats | null;
  ga: GeneticAlgorithm;
}

export function GAPanel({ stats, ga }: GAPanelProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        🤖 Генетический алгоритм
      </h2>

      {!stats ? (
        <div className="text-center text-gray-500 py-8">
          Ожидание первой попытки...
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-xs text-gray-500 mb-1">Поколение</div>
              <div className="text-2xl font-bold text-purple-700">{stats.generation}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-xs text-gray-500 mb-1">Популяция</div>
              <div className="text-2xl font-bold text-purple-700">{stats.populationSize}</div>
            </div>
          </div>

          {/* Selected Guess */}
          <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-purple-300">
            <div className="text-sm text-gray-600 mb-2">Выбранная попытка:</div>
            <div className="font-mono text-3xl font-bold text-center text-purple-900 mb-2">
              {stats.selectedGuess}
            </div>
            <div className="text-xs text-gray-500 italic">
              {stats.selectionReason}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
