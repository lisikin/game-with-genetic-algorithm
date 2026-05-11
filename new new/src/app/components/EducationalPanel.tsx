import { useState } from 'react';

export function EducationalPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-2xl font-bold text-indigo-900">
          Справочная информация о генетических алгоритмах
        </h2>
        <span className="text-2xl">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-6 space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-600">
              <strong>Генетический алгоритм (ГА)</strong> — это метод оптимизации, вдохновленный естественной эволюцией.
              Эта игра демонстрирует, как ГА решает головоломку «Быки и коровы» через методы эволюции.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-xl"></span> 1. Представление
              </h3>
              <p className="text-sm text-gray-700">
                Каждая особь (хромосома) - это 4-значная последовательность уникальных цифр.
                Пример: [5, 2, 8, 1] представляет попытку «5281».
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <span className="text-xl"></span> 2. Приспособленность (Fitness)
              </h3>
              <p className="text-sm text-gray-700">
                Оценивает, насколько попытка соответствует предыдущим ответам.
                Мы вычитаем штрафы за каждую несовпадающую подсказку (быков и коров). Чем меньше штраф, тем выше приспособленность особи
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span className="text-xl"></span> 3. Селекция
              </h3>
              <p className="text-sm text-gray-700">
                Турнирная селекция: случайно выбираем 8 особей, берем самую приспособленную.
                Лучшие особи имеют больше шансов стать родителями следующего поколения.
              </p>
            </div>

           <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                <span className="text-xl"></span>  4. Скрещивание
              </h3>
              <p className="text-sm text-gray-700">
                Объединяем двух родителей в случайной точке. Если в числе ребенка возникают дубликаты цифр, мы заменяем их на случайные неиспользованные цифры.
              </p>
            </div>

           <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-900 mb-2 flex items-center gap-2">
                <span className="text-xl"></span> 5. Мутация
              </h3>
              <p className="text-sm text-gray-700">
                С вероятностью 20% мы меняем местами две цифры или заменяем одну цифру на совершенно новую (которой еще нет в числе). Это вносит генетическое разнообразие.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <span className="text-xl"></span> 6. Элитизм
              </h3>
              <p className="text-sm text-gray-700">
                Сохраняем топ 10% (15 особей) лучших особей без изменений в следующем поколении.
                Это гарантирует, что хорошие решения не будут потеряны в процессе эволюции.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-2 border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-2">Цикл эволюции</h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Генерируем начальную случайную популяцию (150 особей)</li>
              <li>Оцениваем приспособленность каждой особи по отношению к истории игры</li>
              <li>Выбираем родителей с помощью турнирной селекции</li>
              <li>Создаем потомков через скрещивание</li>
              <li>Применяем мутацию к потомкам</li>
              <li>Сохраняем элитных особей</li>
              <li>Повторяем до нахождения полностью согласованного решения (или 200 поколений)</li>
              <li>Используем лучшую особь как следующую попытку</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">Почему это работает для игры «Быки и коровы»</h3>
            <p className="text-sm text-gray-700 mb-2">
              ГА не знает секретное число, но учится на обратной связи. После каждой попытки:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside ml-4">
              <li>Популяция эволюционирует в сторону попыток, максимально согласованных со всей предыдущей историей</li>
              <li>Ошибочные паттерны отсеиваются через селекционное давление алгоритма</li>
              <li>Скрещивание объединяет успешные частичные комбинации цифр</li>
              <li>Мутация позволяет находить цифры, которых не было в родителях</li>
              <li>В конечном итоге только правильный ответ имеет нулевой штраф приспособленности!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
