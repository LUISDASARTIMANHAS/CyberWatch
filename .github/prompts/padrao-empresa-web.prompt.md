---
description: "Padroniza documentação e páginas web para o padrão da empresa, usando componentes base, api-client e runtime de navegador/GitHub Pages."
argument-hint: "Descreva a página, tela ou módulo a atualizar..."
agent: "agent"
---

Padronize a implementação e a documentação desta aplicação web seguindo o padrão da empresa.

Contexto do projeto:
- A aplicação roda no navegador, com suporte a GitHub Pages.
- Não deve depender de backend em Node, servidor SSR ou framework pesado.
- O padrão da empresa usa componentes reutilizáveis em `src/components/base`.
- Há também o arquivo `api-client.js` para todas as chamadas de API.
- A documentação deve refletir esse padrão e manter consistência entre código e interface.
- Caso algum componente base não exista no projeto, ele deve ser criado seguindo o padrão da empresa, sem deixar a aplicação incompleta.
- A biblioteca base de componentes deve seguir a lista principal de componentes sempre presentes: alert, badge, button, card, cardBody, dom-utils, emptyState, errorState, heading, image, link, list, listItem, loading, paginationItem, paginationLink, paragraph, spinner, strong.

Objetivo:
- Atualizar ou criar a documentação do módulo/página solicitada.
- Ajustar a implementação para seguir o padrão visual e estrutural da empresa.
- Reusar componentes, estilos e convenções já definidos.
- Criar qualquer componente base ausente quando necessário para manter a padronização da solução.
- Garantir que a solução funcione corretamente em ambiente estático de navegador.

Regras obrigatórias:
- Use componentes do diretório `src/components/base` sempre que possível.
- Se algum componente principal da base não existir, crie-o antes de concluir a tarefa.
- Preserve a organização do projeto e o estilo do sistema já adotado pela empresa.
- Prefira HTML semântico, Bootstrap, acessibilidade e padrões web modernos.
- Evite soluções improvisadas ou padrões que não sigam a arquitetura do sistema.
- Se a funcionalidade exigir dados, use `api-client.js` como ponto central de integração.
- Para páginas e telas, mantenha código limpo, reutilizável e fácil de manter.
- Se a documentação estiver desatualizada, atualize os trechos relevantes com clareza e estrutura profissional.
- Também respeite os componentes de layout de nível superior em `src/components`, como `navbar`, `footer`, `modal`, `toast`, `search-modal`, `cookies`, `privacy-banner`, `scripts`, `head`, `loading`, entre outros.

Saída esperada:
- Resumo do que foi ajustado.
- Lista das páginas/arquivos impactados.
- Observações sobre como o padrão da empresa foi aplicado.
- Se relevante, indique pendências ou pontos de melhoria para a próxima etapa.

Ao trabalhar:
1. Verifique o padrão atual de componentes e documentação antes de alterar algo.
2. Mantenha a proposta alinhada ao contexto do browser/GitHub Pages.
3. Reaproveite estrutura e convenções existentes em vez de criar padrões divergentes.
4. Produza uma solução consistente com o nível corporativo exigido.
