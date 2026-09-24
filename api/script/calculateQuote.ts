export interface QuoteInput {
  hours: number;
  hourlyRate: number;
}

export interface QuoteResult {
  hours: number;
  hourlyRate: number;
  total: number;
}

export function calculateQuote(input: QuoteInput) {
  const { hourlyRate, hours } = input;

  const total = hourlyRate * hours;

  return {
    hours,
    hourlyRate,
    total,
  };
}
