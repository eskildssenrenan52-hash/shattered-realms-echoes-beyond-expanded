# Shattered Realms: Echoes Beyond — expansão ativa

- [x] Importar o repositório ao workspace gerenciado, instalar com lockfile, ativar diagnósticos TypeScript e confirmar a base: 125 testes e `tsc --noEmit` aprovados antes das alterações.
- [x] Criar em Potos o Mapa dos Atos, perto do Oráculo, com os cinco reinos do Ato I ao V e lacres ligados à conclusão real das missões principais (`m6` no Ato I e cadeia de Ato nos seguintes).
- [x] Tornar cidades de Ato interativas: moradores desenhados, diálogo, marco de confiança que abre o caminho e baús extras determinísticos nas salas escondidas.
- [x] Implementar o runtime de ondas antes do chefe e travessias contra o tempo com HUD, reinício e recompensa/progressão pelo mesmo ID de Saga.
- [x] Integrar no renderer web oito marcos de pixel art gerados por IA para Relicário, Origâmia, Ventre do Leviatã e os cinco reinos dos Atos, com fallback manual enquanto a imagem é carregada.
- [ ] Baixar e empacotar esses oito marcos no build offline/APK, depois de a geração assíncrona terminar, sem depender de `/manus-storage/`.
- [x] Expandir o Atlas: marcador do Mapa dos Atos, lista de cinco reinos, oito ilhas do Arquipélago e todos os biomas secretos com estados de descoberta.
- [x] Acrescentar cinco cidades-reinos pós-Ato V (Ecos Além), cada uma com cidade, baús, corrida, ondas, chefe, recompensa e gate próprio, além de 120 crônicas determinísticas separadas dos cinco reinos dos Atos.
- [ ] Transformar os dez sistemas criativos de Ecos Além (por enquanto listados honestamente como horizontes planejados) em fluxos com entrada, progresso e consequência persistente.
- [x] Validar novamente a suíte completa (28 arquivos, 131 testes), `tsc --noEmit`, build de produção e servidor HTTP; cobrir em teste o percurso fim do Ato I → Travessias da Manopla e corrigir as regressões confirmadas antes do checkpoint.

## Expansão pós-campanha — Cidadela de Gehenna
- [ ] Preservar as oito zonas, quests, história e IDs de save da Saga Gehenna; adicionar uma entrada física da cidadela no extremo remoto do mundo.
- [ ] Aplicar 5× HP a todos os bosses (incluindo Ecos, chefes de masmorra, Saga e líderes de ilhas) sem duplicar multiplicadores; aplicar 3× somente a contato/investida corpo a corpo.
- [ ] Dar a bosses cinco fases progressivas com telegráficos/FX próprios, sem alterar dano de projéteis pela multiplicação melee.
- [ ] Criar um modo de cidadela de 100 andares reaproveitando o gerador: dez temas, guardiões a cada 10 andares, inimigos escalados e checkpoints a cada 5.
- [ ] Desbloquear a cidadela após derrotar Azrakel na Saga; incluir entrada no mapa e salvar progresso sem usar o recorde do Abismo existente.
- [ ] Colocar Azrakel desperto no trono do andar 100, com arte IA no jogo e uma cutscene final inédita.
- [ ] Adicionar recompensas/crafting que sustentem a progressão longa; limitar cache de floors/layouts para não acumular mapas de 15 MB na memória.
- [ ] Testar escala de HP/melee/fases, chefes, 100 pisos/checkpoints, save legado, cutscene/recompensas, TypeScript, suíte, build offline/APK e browser.
- [ ] Instalar/testar APK em dispositivo/emulador Android (pendente se não houver emulator/KVM disponível).

## Expansão anterior — concluída
- [x] Arsenal novo de chefes, oito ataques exclusivos, FX por ação e encontros gêmeos de 5%.
- [x] 80 animações, 18 tons e 40 efeitos adicionais gerados por IA (até 1.440 combinações).
- [x] APK offline compilado e distribuição local validada no navegador; instalação nativa ainda depende de dispositivo/emulador.
