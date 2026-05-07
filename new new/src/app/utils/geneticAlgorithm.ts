import { calculateBullsAndCows } from './gameLogic';

export type Individual = number[];

export interface GAHistory {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GAStats {
  generation: number;
  populationSize: number;
  bestFitness: number;
  totalHistory: number;
  selectedGuess: string;
  selectionReason: string;
}

export interface GAGenerationLog {
  generation: number;
  avgFitness: number;
  bestFitness: number;
  topIndividuals: string[];
}

interface PopulationMember {
  individual: Individual;
  fitness: number;
}

export class GeneticAlgorithm {
  // Увеличенные параметры для лучшей сходимости
  private populationSize = 150;
  private mutationRate = 0.2;
  private eliteSize = 15;
  private tournamentSize = 8;
  private maxGenerations = 200;
  
  private population: Individual[] = [];
  private evaluatedPopulation: PopulationMember[] = [];
  private history: GAHistory[] = [];
  private generationLogs: GAGenerationLog[] = [];

  constructor() {
    this.initializePopulation();
  }

  private initializePopulation(): void {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push(this.generateRandomIndividual());
    }
  }

  private generateRandomIndividual(): Individual {
    const digits: number[] = [];
    const available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * available.length);
      digits.push(available[idx]);
      available.splice(idx, 1);
    }
    
    return digits;
  }

  private individualToString(individual: Individual): string {
    return individual.join('');
  }

  // Новая градиентная функция приспособленности
  private calculateFitness(individual: Individual): number {
    if (this.history.length === 0) return 0;
    
    let fitness = 0;
    const guessString = this.individualToString(individual);
    
    for (const record of this.history) {
      const { bulls, cows } = calculateBullsAndCows(record.guess, guessString);
      
      // Считаем ошибку: насколько наш текущий кандидат отличается от реального ответа
      const bullDiff = Math.abs(bulls - record.bulls);
      const cowDiff = Math.abs(cows - record.cows);
      
      // Максимальная сумма ошибок = 8. Вычитаем ошибку из 8, чтобы получить положительный балл
      fitness += 8 - (bullDiff + cowDiff);
      
      // Даем бонус за полное совпадение паттерна
      if (bullDiff === 0 && cowDiff === 0) {
        fitness += 7; // В сумме идеальное совпадение дает 15 очков за запись истории
      }
    }
    
    return fitness;
  }

  private tournamentSelection(): Individual {
    // Выбираем из уже оцененной популяции для скорости
    let best = this.evaluatedPopulation[Math.floor(Math.random() * this.evaluatedPopulation.length)];
    
    for (let i = 1; i < this.tournamentSize; i++) {
      const candidate = this.evaluatedPopulation[Math.floor(Math.random() * this.evaluatedPopulation.length)];
      if (candidate.fitness > best.fitness) {
        best = candidate;
      }
    }
    
    return [...best.individual];
  }

  private crossover(parent1: Individual, parent2: Individual): Individual {
    const crossoverPoint = Math.floor(Math.random() * 3) + 1;  // 1, 2 или 3
    const child: number[] = [];
    const used = new Set<number>();
    
    // Take first part from parent1
    for (let i = 0; i < crossoverPoint; i++) {
      child.push(parent1[i]);
      used.add(parent1[i]);
    }
    
    // Try to fill from parent2
    for (let i = crossoverPoint; i < 4; i++) {
      if (!used.has(parent2[i])) {
        child.push(parent2[i]);
        used.add(parent2[i]);
      } else {
        // Если цифра уже есть (дубликат), берем СЛУЧАЙНУЮ неиспользованную цифру
        const available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(d => !used.has(d));
        const randomDigit = available[Math.floor(Math.random() * available.length)];
        child.push(randomDigit);
        used.add(randomDigit);
      }
    }
    
    return child;
    }
    
    private mutate(individual: Individual): Individual {
    if (Math.random() > this.mutationRate) {
      return individual;
    }
    
    const mutated = [...individual];
    
    // 50% шанс переставить две цифры местами, 50% шанс заменить цифру на новую
    if (Math.random() < 0.5) {
      const idx1 = Math.floor(Math.random() * 4);
      let idx2 = Math.floor(Math.random() * 4);
      while (idx1 === idx2) {
        idx2 = Math.floor(Math.random() * 4);
      }
      [mutated[idx1], mutated[idx2]] = [mutated[idx2], mutated[idx1]];
    } else {
      const idx = Math.floor(Math.random() * 4);
      const used = new Set(mutated);
      const available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(d => !used.has(d));
      mutated[idx] = available[Math.floor(Math.random() * available.length)];
    }
    
    return mutated;
  }

  public evolve(): GAStats {
    let generation = 0;
    let bestFitness = -1;
    // Максимально возможный фитнес: 15 очков за каждую историю
    const targetFitness = this.history.length * 15;

    while (generation < this.maxGenerations) {
      generation++;
      
      // Оцениваем популяцию только один раз за поколение
      this.evaluatedPopulation = this.population.map(ind => ({
        individual: ind,
        fitness: this.calculateFitness(ind)
      }));
      
      // Сортируем по убыванию приспособленности
      this.evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);
      
      const currentBest = this.evaluatedPopulation[0];
      
      if (currentBest.fitness > bestFitness) {
        bestFitness = currentBest.fitness;
      }
      
      // Логируем статистику
      const avgFitness = this.evaluatedPopulation.reduce((sum, p) => sum + p.fitness, 0) / this.evaluatedPopulation.length;
      this.generationLogs.push({
        generation,
        avgFitness,
        bestFitness: currentBest.fitness,
        topIndividuals: this.evaluatedPopulation.slice(0, 3).map(p => this.individualToString(p.individual))
      });
      
      // Если нашли идеально подходящее число - досрочно завершаем эволюцию
      if (currentBest.fitness === targetFitness) {
        break;
      }
      
      // Создаем новую популяцию
      const newPopulation: Individual[] = [];
      
      // Элитизм: сохраняем лучших
      for (let i = 0; i < this.eliteSize; i++) {
        newPopulation.push([...this.evaluatedPopulation[i].individual]);
      }
      
      // Инъекция случайных особей для разнообразия
      const randomCount = Math.floor(this.populationSize * 0.05);
      for (let i = 0; i < randomCount; i++) {
        newPopulation.push(this.generateRandomIndividual());
      }
      
      // Заполняем остаток скрещиванием и мутацией
      while (newPopulation.length < this.populationSize) {
        const parent1 = this.tournamentSelection();
        const parent2 = this.tournamentSelection();
        let child = this.crossover(parent1, parent2);
        child = this.mutate(child);
        newPopulation.push(child);
      }
      
      this.population = newPopulation;
    }

    // Если эволюция шла до последнего поколения без брейка, нужно оценить финальную популяцию
    if (generation === this.maxGenerations) {
      this.evaluatedPopulation = this.population.map(ind => ({
        individual: ind,
        fitness: this.calculateFitness(ind)
      }));
      this.evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);
    }
    
    // Получаем сет уже сделанных ранее попыток
    const triedGuesses = new Set(this.history.map(h => h.guess));
    
    // Находим лучшую особь, которую мы еще НЕ пробовали
    let selectedIndividual = this.evaluatedPopulation[0].individual;
    let selectedFitness = this.evaluatedPopulation[0].fitness;
    
    for (const score of this.evaluatedPopulation) {
      const guessString = this.individualToString(score.individual);
      if (!triedGuesses.has(guessString)) {
        selectedIndividual = score.individual;
        selectedFitness = score.fitness;
        break;
      }
    }
    
    // Фолбэк: если все лучшие особи уже были испробованы (крайне редко)
    const selectedGuessString = this.individualToString(selectedIndividual);
    if (triedGuesses.has(selectedGuessString)) {
      selectedIndividual = this.generateRandomIndividual();
      selectedFitness = this.calculateFitness(selectedIndividual);
    }
    
    let selectionReason = '';
    if (targetFitness > 0) {
      if (selectedFitness === targetFitness) {
        selectionReason = `Идеальный кандидат: полностью согласован со всей историей`;
      } else {
        const matchPercentage = Math.max(0, Math.round((selectedFitness / targetFitness) * 100));
        selectionReason = `Лучший кандидат (соответствие истории: ${matchPercentage}%)`;
      }
    } else {
       selectionReason = 'Случайная начальная попытка из популяции';
    }

    return {
      generation,
      populationSize: this.populationSize,
      bestFitness: selectedFitness,
      totalHistory: this.history.length,
      selectedGuess: this.individualToString(selectedIndividual),
      selectionReason
    };
  }

  public addHistory(guess: string, bulls: number, cows: number): void {
    this.history.push({ guess, bulls, cows });
  }

  public getGenerationLogs(): GAGenerationLog[] {
    return this.generationLogs;
  }

  public clearLogs(): void {
    this.generationLogs = [];
  }

  public reset(): void {
    this.history = [];
    this.generationLogs = [];
    this.initializePopulation();
  }
}