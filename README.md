# LDA CyberWatch

**Visibilidade para sua infraestrutura. Decisões mais claras para sua segurança.**

O LDA CyberWatch é um protótipo de plataforma web para organizar indicadores de disponibilidade, exposição e segurança de redes. Foi pensado para usuários domésticos, pequenos provedores e administradores independentes que precisam entender o que merece atenção sem depender de uma equipe especializada.

O projeto atual é uma interface estática com integrações para um serviço externo. As métricas do dashboard são ilustrativas; o site não executa varreduras ou testes de rede por conta própria.

## Funcionalidades

- Painel demonstrativo de ocorrências por severidade.
- Inventário de sistemas com estados e disponibilidade de exemplo.
- Fluxo de autenticação por código conectado ao serviço configurado.
- Consulta, validação e emissão de registros técnicos.
- Gerador de relatório com escopo, metodologia, conclusão, achados e recomendações, exportado pela impressão do navegador.
- Navegação, cabeçalho e rodapé compartilhados entre páginas.
- Componentes de interface que inserem conteúdo remoto como texto, sem interpretá-lo como HTML.

## Páginas

| Caminho | Finalidade |
| --- | --- |
| `index.html` | Apresentação, recursos, roadmap e informações institucionais |
| `dashboard/` | Indicadores ilustrativos e gráfico mensal |
| `sistemas/` | Inventário demonstrativo |
| `login/` | Solicitação e validação do código de acesso |
| `user/` | Área protegida de demonstração |
| `sys/forbidden/` | Estado de acesso não autorizado |
| `certifild/index.html` | Emissão de documento técnico |
| `certifild/certificados/` | Consulta de registros |
| `certifild/valid/` | Validação de identificador |

## Arquitetura atual

- HTML semântico, Bootstrap 5 e JavaScript nativo; sem bundler ou etapa de build.
- `src/components/base/` contém builders reutilizáveis para elementos, títulos, links, botões, cards, badges e estados de interface. Texto dinâmico é configurado com `textContent`.
- `src/components/site-shell.js` monta navegação e rodapé e resolve URLs a partir da localização do módulo, mantendo compatibilidade com publicação em subdiretório no GitHub Pages.
- `src/js/api-client.js` centraliza o transporte HTTP e a base `/api/` atualmente utilizada, gerando um `x-nonce` único e `x-timestamp` em milissegundos em cada chamada. Os módulos mantêm a interpretação específica das respostas de cada endpoint.
- `src/css/style.css` reúne o tema, os componentes visuais, estados de foco e a preferência por movimento reduzido.

### Endpoints já configurados

O cliente usa `https://pingobras-sg.onrender.com/api/` e conserva os caminhos existentes: `auth/request-code`, `auth/verify-code`, `crt/all`, `crt/valid` e `crt/register`. Os contratos do serviço remoto não são definidos neste repositório; mudanças de payload ou autenticação precisam ser confirmadas com o backend.

## Arquitetura recomendada para evolução

1. **Agentes de coleta:** serviço leve e somente leitura, com escopo explícito, comunicação de saída autenticada e configuração assinada. Não exponha o painel de administração diretamente à rede monitorada.
2. **API de ingestão:** gateway com autenticação por organização, autorização por ativo, rate limiting, validação de payload e trilha de auditoria. Segredos ficam no servidor, nunca no JavaScript público.
3. **Processamento:** fila para eventos e tarefas agendadas, deduplicação e correlação de alertas. Playbooks começam em modo de recomendação e só executam ações após aprovação explícita.
4. **Persistência:** PostgreSQL para contas, ativos, escopos e auditoria; armazenamento de séries temporais para métricas; armazenamento de objetos para evidências e relatórios. Defina retenção e exclusão desde o início.
5. **Acesso remoto:** OIDC ou passkeys, MFA, RBAC por organização e sessões revogáveis. Para acesso de operadores, prefira VPN ou túnel privado com menor privilégio.
6. **Integrações:** API versionada, webhooks assinados, exportação CSV/PDF e conectores opcionais para provedores de alerta. Documente limites e contratos antes de publicar cada integração.

## Roadmap sugerido

- Inventário de ativos com propriedade, autorização, criticidade e janela de manutenção.
- Checagens de disponibilidade, latência e validade de certificados TLS.
- Correlação de exposição com CVEs, versão afetada, evidência e recomendação de correção.
- Alertas por limiar com janela de silêncio, deduplicação e histórico de confirmação.
- Relatórios periódicos de tendência, risco aceito e itens corrigidos.
- Exportação e API para integração com ferramentas dos pequenos provedores.
- Simulações seguras em laboratório, separadas de qualquer ativo de produção.

## Direção de UI/UX

Preserve o tema escuro com ciano para telemetria e verde para estado saudável; reserve âmbar e vermelho para atenção e incidente. Use gráficos com período e unidade explícitos, tabelas filtráveis, hierarquia clara e linguagem que explique impacto e próxima ação. Neon e animações devem apoiar estados, não competir com os dados. Respeite teclado, contraste, leitores de tela e `prefers-reduced-motion`.

## Identidade e domínios

Slogan recomendado: **“Enxergue os riscos. Proteja o que importa.”**

Possíveis nomes para pesquisa de disponibilidade (nenhum domínio foi verificado):

- `netpulse.dev`
- `watchmesh.app`
- `radarstack.io`
- `signalfort.app`
- `packetwatch.net`
- `sentinellink.dev`
- `cyberradar.app`
- `netlume.io`

## Texto institucional

O LDA CyberWatch ajuda você a entender a saúde e a exposição da sua rede. Reúna indicadores, acompanhe mudanças e organize riscos em uma visão objetiva, com recomendações que fazem sentido para quem administra uma infraestrutura todos os dias. Comece pelo essencial: saiba quais ativos estão no escopo, o que mudou e qual é o próximo passo mais importante.

Para residências, pequenos provedores e equipes independentes, a proposta é tornar a segurança mais acessível sem esconder a complexidade necessária para tomar boas decisões. Monitoramento e testes devem ocorrer somente em sistemas próprios ou com autorização documentada.

## Ideias para diferenciar o produto

- **Mapa de impacto:** relacione um alerta aos serviços e usuários que podem ser afetados.
- **Explicação em dois níveis:** resumo direto para decisão e evidências técnicas expansíveis.
- **Orçamento de exposição:** mostre a evolução dos serviços publicados e do tempo até correção.
- **Modo de manutenção:** pause alertas esperados sem apagar o histórico.
- **Relatório de confiança:** registre origem, horário, versão do agente e integridade das evidências.
- **Laboratório de aprendizado:** reproduza achados em ambiente isolado, sem testar alvos externos.

## Desenvolvimento local

Não há gerenciador de pacotes nem processo de build. Sirva o diretório raiz com um servidor estático, por exemplo:

```powershell
python -m http.server 8000
```

Abra `http://localhost:8000`. Para produção, configure o domínio base, HTTPS e cabeçalhos de segurança na hospedagem. O HTML não consegue substituir cabeçalhos HTTP como CSP, HSTS e `X-Content-Type-Options`.

## Limitações e segurança

- O dashboard e a lista de sistemas são demonstrações, não telemetria operacional.
- A autenticação do frontend inclui token demonstrativo em `localStorage`; a autorização precisa ser imposta pelo backend.
- O cabeçalho `CyberWatch2026` usado pelas integrações é entregue ao navegador e não deve ser tratado como segredo. Antes de produção, remova credenciais do cliente e implemente autenticação e autorização no servidor; confirme a compatibilidade do backend antes de retirar o cabeçalho.
- A API registra somente ID, empresa, sistema, capacidade e data. Os campos complementares entram no PDF impresso, mas não são persistidos nem confirmados na validação pública.
- O relatório é exportado pela impressão do navegador (destino “Salvar como PDF”); ele não executa nem comprova testes de capacidade ou segurança.
- Publique políticas de privacidade, cookies e termos revisadas para a operação real. Os textos exibidos no protótipo são avisos informativos, não aconselhamento jurídico.
