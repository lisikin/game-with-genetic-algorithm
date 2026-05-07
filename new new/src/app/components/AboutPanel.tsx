export function AboutPanel() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
        Об игре 
      </h2>

      {/* Правила игры */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Правила игры</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>"Быки и Коровы"</strong> - это классическая логическая игра, в которой один игрок 
            загадывает секретное 4-значное число с цифрами от 0 до 9, а другой игрок 
            пытается его угадать. Цифры в числе не повторяются.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-900">Обозначение:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-2xl mr-2">🐂</span>
                <div>
                  <strong>Бык</strong> - правильная цифра стоит на правильном месте
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-2">🐄</span>
                <div>
                  <strong>Корова</strong> - правильная цифра стоит на неправильном месте
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-900">Пример:</h4>
            <p className="mb-2">Секретное число: <span className="font-mono font-bold text-lg">5827</span></p>
            <ul className="space-y-1 text-sm">
              <li>Попытка <span className="font-mono font-bold">1234</span> → 0 быков, 1 корова (есть цифра 2, но не на своем месте)</li>
              <li>Попытка <span className="font-mono font-bold">5678</span> → 1 бык, 1 корова (5 на месте, 7 есть, но не на месте)</li>
              <li>Попытка <span className="font-mono font-bold">5821</span> → 3 быка, 0 коров (5, 8, 2 на своих местах)</li>
              <li>Попытка <span className="font-mono font-bold">5827</span> → 4 быка, 0 коров <strong>Победа!</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Режимы игры */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Режимы игры</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Режим 1: Человек против генетического алгоритма</h4>
            <p className="text-gray-700 text-sm">
              Вы загадываете секретное число, а генетический алгоритм пытается его отгадать.
              Наблюдайте за решением в реальном времени
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Режим 2: Человек отгадывает</h4>
            <p className="text-gray-700 text-sm">
              Компьютер загадывает секретное число, а вы пытаетесь его угадать.
              Получайте обратную связь и улучшайте свои догадки
            </p>
          </div>
        </div>
      </section>

      {/* О генетическом алгоритме */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">О генетическом алгоритме в игре</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            В данной реализации используется <strong>генетический алгоритм</strong> — метод оптимизации, 
            вдохновленный процессом естественного отбора. ГА эволюционирует популяцию возможных решений, 
            используя операции селекции, скрещивания и мутации.
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-indigo-900">Основные компоненты:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Популяция:</strong> 150 случайных 4-значных чисел</li>
              <li><strong>Приспособленность:</strong> минимизация штрафов за несовпадение быков/коров с историей</li>
              <li><strong>Селекция:</strong> турнирная селекция (8 кандидатов)</li>
              <li><strong>Скрещивание:</strong> одноточечное со случайным заполнением дубликатов</li>
              <li><strong>Мутация:</strong> перестановка или замена случайной цифры (20%)</li>
              <li><strong>Элитизм:</strong> сохранение 15 лучших особей (10%)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Авторство */}
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg border-2 border-indigo-300">
        <h3 className="text-2xl font-semibold text-indigo-900 mb-3 text-center">Автор проекта</h3>
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-gray-800">Уфимцева Алиса Александровна</p>
          <p className="text-gray-700">Студентка ОФ-423/095-4-1</p>
          <p className="text-gray-700">Факультет естественного и математического образования ЮУрГГПУ</p>
          <p className="text-gray-700">2026 год</p>
          <div className="mt-4 pt-4 border-t border-indigo-300">
            <p className="text-sm text-gray-600 italic">
              Проект создан для демонстрации применения генетического алгоритма 
              в решении задач оптимизации и поиска.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}