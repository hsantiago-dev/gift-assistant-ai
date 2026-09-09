/**
 * Cópias de tela centralizadas (alinhadas ao protótipo em .docs/PROTOTYPE.md).
 * Manter aqui para trocas futuras sem mexer no componente.
 */

export const Copy = {
  appBarTitle: 'Assistente de Presentes',
  home: {
    title: 'Para quem é o presente?',
    subtitle: 'Conte um pouco sobre a pessoa e eu te ajudo a encontrar algo especial.',
    budgetLabel: 'Orçamento',
    occasionLabel: 'Ocasião',
    generate: 'Gerar sugestões',
  },
  loading: {
    title: 'Pensando em ideias para você...',
    description: 'Estamos vasculhando as melhores opções baseadas no perfil que você nos contou.',
  },
  error: {
    title: 'Ops, não consegui gerar sugestões agora.',
    description:
      'Parece que nossa fita de presente deu um nó. Não se preocupe, podemos tentar desenrolar isso juntos.',
    retry: 'Tentar novamente',
  },
  results: {
    title: 'Ideias Perfeitas',
    subtitle: 'Encontramos algumas sugestões pensadas com carinho baseadas nas suas respostas.',
    empty: 'Nenhuma sugestão encontrada ou dados inválidos. Volte e tente gerar novamente.',
    back: 'Voltar',
  },
} as const;