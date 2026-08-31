/**
 * Opções de seleção única dos chips de filtro (seções 6.1 e RF03/RF04 do OVERVIEW).
 */

export const BudgetOptions = ['Até R$50', 'R$50–150', 'R$150–300', 'Sem limite'] as const;

export const OccasionOptions = [
  'Aniversário',
  'Natal',
  'Namorados',
  'Sem motivo especial',
] as const;

export type BudgetOption = (typeof BudgetOptions)[number];
export type OccasionOption = (typeof OccasionOptions)[number];
