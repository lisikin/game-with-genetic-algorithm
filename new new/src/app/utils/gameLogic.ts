export function validateSecretNumber(input: string): { valid: boolean; message?: string } {
  if (input.length !== 4) {
    return { valid: false, message: 'Должно быть ровно 4 цифры' };
  }
  
  if (!/^\d{4}$/.test(input)) {
    return { valid: false, message: 'Должно содержать только цифры (0-9)' };
  }
  
  const digits = input.split('');
  const uniqueDigits = new Set(digits);
  if (uniqueDigits.size !== 4) {
    return { valid: false, message: 'Все 4 цифры должны быть уникальными' };
  }
  
  return { valid: true };
}

export function calculateBullsAndCows(secret: string, guess: string): { bulls: number; cows: number } {
  let bulls = 0;
  let cows = 0;
  
  for (let i = 0; i < 4; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }
  
  return { bulls, cows };
}

export function generateRandomSecret(): string {
  const digits: number[] = [];
  const available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(Math.random() * available.length);
    digits.push(available[idx]);
    available.splice(idx, 1);
  }
  
  return digits.join('');
}

// Alias for compatibility
export const generateSecretNumber = generateRandomSecret;

export function isValidGuess(guess: string): boolean {
  if (guess.length !== 4) return false;
  if (!/^\d{4}$/.test(guess)) return false;
  
  const digits = guess.split('');
  const uniqueDigits = new Set(digits);
  return uniqueDigits.size === 4;
}