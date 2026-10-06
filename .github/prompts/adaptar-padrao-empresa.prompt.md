---
name: "Adaptar projeto ao padrão da empresa"
description: "Adapta um projeto web existente à arquitetura de componentes e ao cliente de API compartilhado da empresa, preservando compatibilidade com navegador e GitHub Pages."
argument-hint: "Informe a pasta de referência dos componentes, o api-client.js ou requisitos adicionais (opcional)."
agent: "agent"
---

Adapte todas as páginas e integrações existentes deste projeto web ao padrão de componentes e integração de API da empresa, implementando as mudanças necessárias no workspace atual.

## Referências

- Use como referência padrão os componentes em `D:\Projetos Temporarios\PINGOBRAS\src\components\base` e o `api-client.js` desse projeto, se estiverem acessíveis.
- Considere os arquivos e requisitos fornecidos em `$ARGUMENTS` como substituições ou complementos dessas referências.
- O diretório de referência é somente leitura: não altere o projeto de origem.
- A listagem de nomes de arquivos não define contratos. Leia as implementações reais antes de reproduzi-las ou integrá-las. Se a referência não estiver acessível, não invente seu conteúdo; informe a limitação e use apenas padrões verificáveis no workspace.

## Fluxo

1. Leia as instruções aplicáveis, o README e os pontos de entrada do projeto. Localize as páginas, scripts, estilos, integrações HTTP e padrões de interface existentes.
2. Inspecione os componentes de referência e o `api-client.js`. Identifique suas assinaturas, dependências, comportamento, convenções de importação e tratamento de erros.
3. Compare esses contratos com a arquitetura atual e defina uma migração coerente para todo o projeto. Preserve funcionalidades e APIs públicas existentes; padronize todas as páginas e integrações existentes sem reescrever partes que já atendam ao padrão.
4. Implemente os componentes reutilizáveis e a integração compartilhada de API nos locais e formatos compatíveis com o projeto. Atualize todas as páginas e usos existentes necessários para concluir a migração.
5. Valide a mudança com as verificações disponíveis no repositório. Confira também referências de arquivos, carregamento de scripts e comportamento de caminhos em subdiretórios.

## Restrições técnicas

- O sistema roda diretamente no navegador e é publicado como site estático no GitHub Pages. Não introduza backend obrigatório, etapa de build, bundler ou dependência de servidor Node.
- Mantenha os formatos de JavaScript já adotados. Só use módulos ES se forem compatíveis com os navegadores alvo e com a estrutura atual; não misture módulos e scripts clássicos sem uma razão concreta.
- Use caminhos relativos adequados ao GitHub Pages. Evite caminhos iniciados por `/` quando puderem quebrar a publicação em um subcaminho.
- Centralize chamadas HTTP no `api-client.js` existente ou em um cliente compatível com o padrão verificado. Não replique `fetch`, URLs-base ou tratamento de erros em componentes e páginas.
- Não invente endpoints, contratos de resposta ou credenciais. Preserve configurações existentes e sinalize os dados externos que não puderem ser confirmados.
- Mantenha a interface acessível, semântica e responsiva, respeitando Bootstrap e as convenções visuais já presentes no projeto.
- Preserve os fluxos de autenticação e proteção de páginas. Trate dados externos como não confiáveis e não exponha segredos no código do navegador.
- Evite refatorações não relacionadas. Faça a menor mudança que estabeleça o padrão de forma consistente.

## Resultado

Ao concluir, resuma brevemente:

- o padrão identificado nas referências e como foi aplicado;
- os principais arquivos alterados;
- as verificações executadas e seus resultados;
- limitações ou decisões que dependam de informação indisponível.

Faça as alterações no workspace; não se limite a apresentar um plano. Pergunte antes apenas se uma informação ausente impedir uma decisão segura sobre contrato ou comportamento.