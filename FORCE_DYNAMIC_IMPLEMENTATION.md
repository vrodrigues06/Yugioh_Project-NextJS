# Implementação Force-Dynamic - Yugioh Project

## Resumo das Mudanças

Este documento descreve as implementações realizadas para transformar as requisições de personagens e torneios em force-dynamic, garantindo que as informações sejam sempre atualizadas.

## 🎯 Objetivos Alcançados

1. **Dados Sempre Atualizados**: Todas as queries agora buscam dados frescos do servidor
2. **Invalidação Inteligente**: Mutações invalidam e refetcham queries relacionadas automaticamente
3. **Configuração Centralizada**: Configurações de force-dynamic centralizadas no ReactQueryProvider
4. **Funções Utilitárias**: Código reutilizável para invalidação de queries

## 📁 Arquivos Modificados

### Configuração Global

- `src/components/ReactQueryProvider.tsx` - Configuração force-dynamic global
- `src/lib/react-query-config.ts` - Funções utilitárias para invalidação
- `src/hooks/useForceDynamic.tsx` - Hook personalizado para gerenciar force-dynamic

### Hooks de Personagens

- `src/hooks/personagens/useAllPersonagens.tsx` - Force-dynamic implementado
- `src/hooks/personagens/usePersonagensByGen.tsx` - Force-dynamic implementado
- `src/hooks/personagens/usePersonagemByName.tsx` - Force-dynamic implementado
- `src/hooks/personagens/useCreatePersonagem.tsx` - Invalidação melhorada
- `src/hooks/personagens/useEditPersonagens.tsx` - Invalidação melhorada

### Hooks de Torneios

- `src/hooks/torneios/useAllTorneios.tsx` - Force-dynamic implementado
- `src/hooks/torneios/useTorneiosByGen.tsx` - Force-dynamic implementado
- `src/hooks/torneios/useTorneioByYear.tsx` - Force-dynamic implementado
- `src/hooks/torneios/useCreateTorneio.tsx` - Invalidação melhorada
- `src/hooks/torneios/useFinalizarTorneio.tsx` - Invalidação melhorada
- `src/hooks/torneios/useUpdateClassificacao.tsx` - Invalidação melhorada
- `src/hooks/torneios/useUpdateMatches.tsx` - Invalidação melhorada

### Hooks de Mundiais

- `src/hooks/mundial/useMundiais.tsx` - Force-dynamic implementado
- `src/hooks/mundial/useCreateMundial.tsx` - Invalidação melhorada
- `src/hooks/mundial/useFinalizadorMundial.tsx` - Invalidação melhorada
- `src/hooks/mundial/useUpdateClassificacaoMundia.tsx` - Invalidação melhorada
- `src/hooks/mundial/useUpdateMatchesMundial.tsx` - Invalidação melhorada

### Hooks de Rankings

- `src/hooks/rankings/useAllRankings.tsx` - Force-dynamic implementado
- `src/hooks/rankings/useRankingByYear.tsx` - Force-dynamic implementado

### Componentes

- `src/components/personagens/personagens-list/personagem-list-item-modal.tsx` - Invalidação melhorada

## 🔧 Configurações Implementadas

### Force-Dynamic Global

```typescript
// Configuração no ReactQueryProvider
defaultOptions: {
  queries: {
    staleTime: 0, // Sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz quando janela ganha foco
    refetchOnMount: true, // Refaz quando componente é montado
    refetchOnReconnect: true, // Refaz quando reconecta à internet
    retry: 2, // 2 tentativas em caso de erro
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    retry: 1, // 1 tentativa para mutações
  },
}
```

### Funções Utilitárias

```typescript
// Invalidação de personagens
invalidatePersonagemQueries(queryClient);

// Invalidação de torneios
invalidateTorneioQueries(queryClient);

// Invalidação de mundiais
invalidateMundialQueries(queryClient);
```

## 🚀 Benefícios

### Para o Usuário

- **Dados Sempre Atualizados**: Informações sempre refletem o estado mais recente
- **Experiência Consistente**: Não há dados desatualizados em diferentes abas/janelas
- **Feedback Imediato**: Mudanças são refletidas instantaneamente

### Para o Desenvolvedor

- **Código Mais Limpo**: Funções utilitárias centralizadas
- **Manutenibilidade**: Configurações centralizadas e reutilizáveis
- **Performance**: Invalidação inteligente evita refetches desnecessários

## 📋 Cenários Cobertos

### Criação de Personagens

- ✅ Query de todos os personagens invalidada
- ✅ Queries de personagens por geração invalidadas
- ✅ Queries de personagem específico invalidadas

### Criação de Torneios

- ✅ Query de todos os torneios invalidada
- ✅ Queries de torneios por geração invalidadas
- ✅ Queries de torneio específico invalidadas
- ✅ Queries de ranking invalidadas

### Finalização de Torneios

- ✅ Todas as queries de torneios invalidadas
- ✅ Queries de ranking invalidadas
- ✅ Queries de personagens (para atualizar pontuações) invalidadas

### Atualização de Personagens

- ✅ Status de atualização refletido imediatamente
- ✅ Todas as queries relacionadas invalidadas

### Mundiais

- ✅ Queries de mundiais invalidadas
- ✅ Queries de ranking mundial invalidadas

## 🔄 Fluxo de Atualização

1. **Usuário executa ação** (criar, editar, finalizar)
2. **Mutação é executada** no servidor
3. **onSuccess é chamado** com invalidação de queries
4. **Queries são refetchadas** automaticamente
5. **UI é atualizada** com dados frescos

## 🎯 Próximos Passos

- [ ] Monitorar performance com force-dynamic
- [ ] Implementar cache inteligente se necessário
- [ ] Adicionar indicadores de loading durante refetch
- [ ] Considerar implementar optimistic updates

## 📝 Notas Técnicas

- **staleTime: 0** garante que dados nunca sejam considerados "frescos"
- **refetchOnWindowFocus** atualiza dados quando usuário volta à aba
- **refetchOnMount** garante dados atualizados ao navegar entre páginas
- **invalidateQueries + refetchQueries** garante atualização imediata
