// mcq.model.ts
export interface McqOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Mcq {
  question: string;
  options: McqOptions;
  answer: string;
}
