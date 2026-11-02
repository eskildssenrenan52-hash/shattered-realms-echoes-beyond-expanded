# Shattered Realms: Echoes Beyond — expansão ativa

- [x] Importar o repositório ao workspace gerenciado, instalar com lockfile, ativar diagnósticos TypeScript e confirmar a base: 125 testes e `tsc --noEmit` aprovados antes das alterações.
- [x] Criar em Potos o Mapa dos Atos, perto do Oráculo, com os cinco reinos do Ato I ao V e lacres ligados à conclusão real das missões principais (`m6` no Ato I e cadeia de Ato nos seguintes).
- [x] Tornar cidades de Ato interativas: moradores desenhados, diálogo, marco de confiança que abre o caminho e baús extras determinísticos nas salas escondidas.
- [x] Implementar o runtime de ondas antes do chefe e travessias contra o tempo com HUD, reinício e recompensa/progressão pelo mesmo ID de Saga.
- [x] Integrar no renderer web oito marcos de pixel art gerados por IA para Relicário, Origâmia, Ventre do Leviatã e os cinco reinos dos Atos, com fallback manual enquanto a imagem é carregada.
- [x] Incluir oito WebP locais e leves no bundle web e no build Android offline; validar que os oito arquivos estão no pacote, sem dependência de `/manus-storage/`.
- [x] Expandir o Atlas: marcador do Mapa dos Atos, lista de cinco reinos, oito ilhas do Arquipélago e todos os biomas secretos com estados de descoberta.
- [x] Acrescentar cinco cidades-reinos pós-Ato V (Ecos Além), cada uma com cidade, baús, corrida, ondas, chefe, recompensa e gate próprio, além de 120 crônicas determinísticas separadas dos cinco reinos dos Atos.
- [x] Transformar os dez sistemas de Ecos Além em fluxos jogáveis, com entradas, progresso visível e consequências persistentes em saves compatíveis.
- [x] Validar o resultado: 30 arquivos de teste e 144 testes aprovados; TypeScript sem erros; build web e pacote offline concluídos; ESLint aprovado nos módulos novos; rota `/odyssey` carregada no navegador e tutorial inicial conferido visualmente.

## Expansão pós-campanha — Cidadela de Gehenna

- [x] Preservar as oito zonas, quests, história e IDs de save da Saga Gehenna; adicionar uma entrada física da cidadela no extremo remoto do mundo.
- [x] Aplicar 5× HP a todos os bosses (incluindo Ecos, chefes de masmorra, Saga e líderes de ilhas) sem duplicar multiplicadores; aplicar 3× somente a contato/investida corpo a corpo. Removida a redução antiga de um terço dos chefes de ilha.
- [x] Dar a bosses cinco fases progressivas com telegráficos/FX próprios, sem alterar dano de projéteis pela multiplicação melee.
- [x] Criar um modo de cidadela de 100 andares reaproveitando o gerador: dez temas, guardiões a cada 10 andares, inimigos escalados e checkpoints a cada 5.
- [x] Desbloquear a cidadela após derrotar Azrakel na Saga; incluir entrada no mapa e salvar progresso sem usar o recorde do Abismo existente.
- [x] Colocar Azrakel desperto no trono do andar 100, com arte IA no jogo e uma cutscene final inédita.
- [x] Adicionar recompensas/crafting que sustentem a progressão longa e substituir os layouts no avanço de andar para não manter mapas antigos acumulados na memória.
- [x] Testar escala de HP/melee/fases, chefes, pisos/checkpoints, save legado, cutscene/recompensas, TypeScript, suíte completa, build offline e rota web no navegador.
- [ ] Instalar/testar o APK em dispositivo/emulador Android. Este ambiente não contém Android SDK, Gradle, ADB ou KVM; o pacote offline foi gerado e validado, mas a instalação nativa continua pendente.

## Expansão anterior — concluída

- [x] Arsenal novo de chefes, oito ataques exclusivos, FX por ação e encontros gêmeos de 5%.
- [x] 80 animações, 18 tons e 40 efeitos adicionais gerados por IA (até 1.440 combinações).
- [x] APK offline compilado e distribuição local validada no navegador; instalação nativa ainda depende de dispositivo/emulador.
