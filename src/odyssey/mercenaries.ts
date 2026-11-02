import type { Game, Enemy } from "./engine";

export type MercRarity = "comum" | "incomum" | "raro" | "epico" | "lendario";
export type MercRole = "guardiao" | "duelista" | "mago" | "curandeira" | "lenda";
export type MercState = "reserva" | "ativo" | "recuando" | "recuperando";

export interface MercenaryDef {
  id: string;
  name: string;
  title: string;
  rarity: MercRarity;
  role: MercRole;
  element: string;
  portrait: string;
  maxHp: number;
  atk: number;
  def: number;
  speed: number;
  attackRange: number;
  attackCooldown: number;
  recoverySeconds: number;
  lore: string;
  contract: string;
  skill: string;
  color: string;
}

export interface MercenaryRecord {
  id: string;
  level: number;
  xp: number;
  bond: number;
  hp: number;
  state: MercState;
  recovery: number;
  victories: number;
  attacks: number;
  storyBeat: number;
  cooldown: number;
  x: number;
  y: number;
}

export interface MercenaryState {
  roster: MercenaryRecord[];
  active: [string | null, string | null];
  contractSeals: number;
  pity: number;
  totalRolls: number;
  chapters: string[];
  duoBonds: string[];
}

const M = (d: MercenaryDef): MercenaryDef => d;
export const MERCENARIES: MercenaryDef[] = [
  M({ id: "ferrovia", name: "Ferrovia", title: "A Muralha que Caminha", rarity: "comum", role: "guardiao", element: "ferro", portrait: "/mercenaries/runtime/ferrovia.webp", maxHp: 92, atk: 9, def: 8, speed: 42, attackRange: 24, attackCooldown: 1.8, recoverySeconds: 38, lore: "Ferrovia escolta refugiados pelas estradas onde a guerra deixou placas sem nome.", contract: "Ela não pede glória: pede que ninguém fique para trás.", skill: "Interposição: reduz em 24% o dano que chega ao herói quando está perto.", color: "#7fc8c0" }),
  M({ id: "mae-das-brumas", name: "Mae das Brumas", title: "A Faca que Escuta", rarity: "incomum", role: "duelista", element: "bruma", portrait: "/mercenaries/runtime/mae-das-brumas.webp", maxHp: 66, atk: 16, def: 3, speed: 70, attackRange: 40, attackCooldown: 1.15, recoverySeconds: 46, lore: "Mae aprendeu a contar passos em cidades onde a memória era uma moeda proibida.", contract: "Ela aceita ouro, mas fica por histórias que ainda não terminaram.", skill: "Passo Nebuloso: a cada terceiro golpe, aplica lentidão breve no alvo.", color: "#a998ff" }),
  M({ id: "irmao-cinzas", name: "Irmão Cinzas", title: "O Fogo que Lembra", rarity: "raro", role: "mago", element: "brasa", portrait: "/mercenaries/runtime/irmao-cinzas.webp", maxHp: 58, atk: 23, def: 2, speed: 35, attackRange: 112, attackCooldown: 2.2, recoverySeconds: 55, lore: "Seu mosteiro queimou sem testemunhas. Ele guarda as cinzas para que o nome dos mortos não se dissolva.", contract: "Cada contrato é uma fogueira pequena contra o esquecimento.", skill: "Carvão Vivo: o impacto atinge inimigos próximos por 45% do dano.", color: "#ff9764" }),
  M({ id: "lia-azul", name: "Lia Azul", title: "Cartógrafa das Marés", rarity: "epico", role: "curandeira", element: "maré", portrait: "/mercenaries/runtime/lia-azul.webp", maxHp: 72, atk: 11, def: 4, speed: 48, attackRange: 88, attackCooldown: 2.4, recoverySeconds: 62, lore: "Lia mapeia rotas que só existem quando duas pessoas confiam uma na outra.", contract: "Ela entrou na companhia para devolver ao mundo os caminhos que o medo apagou.", skill: "Maré de Retorno: cura o herói e aliados próximos a cada 9 segundos.", color: "#6ee7ff" }),
  M({ id: "rei-sem-rosto", name: "Rei Sem Rosto", title: "O Último Juramento", rarity: "lendario", role: "lenda", element: "ouro", portrait: "/mercenaries/runtime/rei-sem-rosto.webp", maxHp: 108, atk: 28, def: 7, speed: 58, attackRange: 48, attackCooldown: 1.35, recoverySeconds: 78, lore: "Ele removeu a coroa para que o povo pudesse reconhecer o próprio rosto nos salões do reino.", contract: "Seu contrato só se completa quando a companhia vence sem abandonar ninguém.", skill: "Duelo Real: aumenta o dano do grupo em 12% enquanto estiver saudável.", color: "#ffd15c" }),
];
export const MERC_BY_ID = Object.fromEntries(MERCENARIES.map((m) => [m.id, m]));
export const MERC_RARITY: Record<MercRarity, { label: string; color: string; weight: number }> = {
  comum: { label: "Comum", color: "#c6c6c6", weight: 58 }, incomum: { label: "Incomum", color: "#75d68c", weight: 25 }, raro: { label: "Raro", color: "#66a7ff", weight: 11 }, epico: { label: "Épico", color: "#c477ff", weight: 5 }, lendario: { label: "Lendário", color: "#ffd15c", weight: 1 },
};

export const freshMercenaryState = (): MercenaryState => ({ roster: [], active: [null, null], contractSeals: 3, pity: 0, totalRolls: 0, chapters: [], duoBonds: [] });
const seededRecord = (id: string): MercenaryRecord => ({ id, level: 1, xp: 0, bond: 0, hp: MERC_BY_ID[id]!.maxHp, state: "reserva", recovery: 0, victories: 0, attacks: 0, storyBeat: 0, cooldown: 0, x: 0, y: 0 });
export function sanitizeMercenaryState(raw: unknown): MercenaryState {
  const base = freshMercenaryState(); if (!raw || typeof raw !== "object") return base; const r = raw as Partial<MercenaryState>;
  const roster = Array.isArray(r.roster) ? r.roster.filter((x): x is MercenaryRecord => !!x && typeof x === "object" && typeof (x as MercenaryRecord).id === "string" && !!MERC_BY_ID[(x as MercenaryRecord).id]).map((x) => ({ ...seededRecord(x.id), ...x, hp: Math.max(0, Math.min(MERC_BY_ID[x.id]!.maxHp + x.level * 8, Number(x.hp) || 0)) })) : [];
  const active: [string | null, string | null] = [Array.isArray(r.active) && typeof r.active[0] === "string" ? r.active[0] : null, Array.isArray(r.active) && typeof r.active[1] === "string" ? r.active[1] : null];
  return { roster, active: active.map((id) => roster.some((m) => m.id === id) ? id : null) as [string | null, string | null], contractSeals: Math.max(0, Number(r.contractSeals) || 0), pity: Math.max(0, Number(r.pity) || 0), totalRolls: Math.max(0, Number(r.totalRolls) || 0), chapters: Array.isArray(r.chapters) ? r.chapters.filter((x): x is string => typeof x === "string") : [], duoBonds: Array.isArray(r.duoBonds) ? r.duoBonds.filter((x): x is string => typeof x === "string") : [] };
}
const record = (g: Game, id: string) => g.mercenaries.roster.find((m) => m.id === id);
const maxHp = (m: MercenaryRecord) => MERC_BY_ID[m.id]!.maxHp + (m.level - 1) * 8;
export const activeMercenaries = (g: Game) => g.mercenaries.active.map((id) => id ? record(g, id) : undefined).filter((m): m is MercenaryRecord => !!m && m.state === "ativo");
export const mercGuardMult = (g: Game) => activeMercenaries(g).some((m) => MERC_BY_ID[m.id]!.role === "guardiao" && Math.hypot(m.x - g.p.x, m.y - g.p.y) < 70) ? 0.76 : 1;
export const mercDamageMult = (g: Game) => activeMercenaries(g).some((m) => MERC_BY_ID[m.id]!.role === "lenda" && m.hp > maxHp(m) * 0.5) ? 1.12 : 1;
export function recruitMercenary(g: Game, id: string) { if (!MERC_BY_ID[id] || record(g, id)) return false; g.mercenaries.roster.push(seededRecord(id)); g.mercenaries.chapters.push(`contract:${id}:1`); return true; }
export function rollMercenary(g: Game, currency: "gold" | "seal" = "gold"): MercenaryDef | null {
  const cost = currency === "gold" ? 140 : 1; if (currency === "gold" && g.p.gold < cost || currency === "seal" && g.mercenaries.contractSeals < cost) return null;
  if (currency === "gold") g.p.gold -= cost; else g.mercenaries.contractSeals -= cost;
  const guaranteed = g.mercenaries.pity >= 9; const pool = MERCENARIES.filter((m) => !record(g, m.id) || guaranteed); const minRarity = guaranteed ? 3 : 0; const eligible = pool.filter((m) => ["comum", "incomum", "raro", "epico", "lendario"].indexOf(m.rarity) >= minRarity); const total = eligible.reduce((n, m) => n + MERC_RARITY[m.rarity].weight, 0); let n = Math.random() * total; const chosen = eligible.find((m) => (n -= MERC_RARITY[m.rarity].weight) <= 0) ?? eligible[eligible.length - 1]; if (!chosen) return null;
  g.mercenaries.pity = chosen.rarity === "raro" || chosen.rarity === "epico" || chosen.rarity === "lendario" ? 0 : g.mercenaries.pity + 1; g.mercenaries.totalRolls++; recruitMercenary(g, chosen.id); g.toast(`${chosen.name} assinou o contrato (${MERC_RARITY[chosen.rarity].label})!`, MERC_RARITY[chosen.rarity].color); return chosen;
}
export function assignMercenary(g: Game, id: string, slot: 0 | 1) { const m = record(g, id); if (!m || m.state === "recuando" || m.state === "recuperando") return false; const other = slot === 0 ? 1 : 0; if (g.mercenaries.active[other] === id) g.mercenaries.active[other] = null; g.mercenaries.active[slot] = id; m.state = "ativo"; m.hp = Math.max(1, m.hp); m.x = g.p.x - 22 + slot * 44; m.y = g.p.y + 12; updateDuo(g); g.save(); return true; }
export function dismissMercenary(g: Game, slot: 0 | 1) { const id = g.mercenaries.active[slot]; if (!id) return; const m = record(g, id); if (m) m.state = "reserva"; g.mercenaries.active[slot] = null; updateDuo(g); g.save(); }
function updateDuo(g: Game) { const [a, b] = g.mercenaries.active; if (a && b) { const key = [a, b].sort().join("+"); if (!g.mercenaries.duoBonds.includes(key)) g.mercenaries.duoBonds.push(key); } }
function startRetreat(g: Game, m: MercenaryRecord) { m.state = "recuando"; m.recovery = MERC_BY_ID[m.id]!.recoverySeconds; g.mercenaries.active = g.mercenaries.active.map((id) => id === m.id ? null : id) as [string | null, string | null]; g.toast(`${MERC_BY_ID[m.id]!.name} recuou para tratar os ferimentos.`, "#ff9a70"); }
function damageMerc(g: Game, m: MercenaryRecord, amount: number) { const d = Math.max(1, Math.round(amount - MERC_BY_ID[m.id]!.def * 0.35)); m.hp -= d; g.float(m.x, m.y - 18, `-${d}`, "#ff9a70"); if (m.hp <= maxHp(m) * 0.15) { m.hp = Math.max(1, m.hp); startRetreat(g, m); } }
export function tickMercenaries(g: Game, dt: number) {
  for (const m of g.mercenaries.roster) { const def = MERC_BY_ID[m.id]!; if (m.state === "recuando" || m.state === "recuperando") { m.recovery -= dt; m.hp = Math.min(maxHp(m), m.hp + maxHp(m) / def.recoverySeconds * dt); if (m.hp >= maxHp(m) && m.recovery <= 0) { m.hp = maxHp(m); m.state = "reserva"; g.toast(`${def.name} terminou a recuperação e pode voltar.`, "#8ff0b0"); } continue; } m.cooldown -= dt; }
  const active = activeMercenaries(g); if (!active.length || g.interior || g.depth?.kind === "tutorial") return;
  const enemies = g.enemies.filter((e) => e.alive && !e.summoned); const near = (e: Enemy) => Math.hypot(e.x - g.p.x, e.y - g.p.y) < 170; const targets = enemies.filter(near);
  active.forEach((m, slot) => { const def = MERC_BY_ID[m.id]!; const anchor = { x: g.p.x + (slot === 0 ? -24 : 24), y: g.p.y + 10 }; m.x += (anchor.x - m.x) * Math.min(1, dt * 4); m.y += (anchor.y - m.y) * Math.min(1, dt * 4); const target = targets.sort((a, b) => Math.hypot(a.x - m.x, a.y - m.y) - Math.hypot(b.x - m.x, b.y - m.y))[0]; if (target && m.cooldown <= 0 && Math.hypot(target.x - m.x, target.y - m.y) <= def.attackRange) { m.cooldown = def.attackCooldown; m.attacks++; const power = (def.atk + m.level * 2 + (m.bond >= 50 ? 4 : 0)) * mercDamageMult(g); g.damageEnemy(target, power, 0, 0, def.color, 0.72); if (def.role === "mago") for (const splash of enemies) if (splash !== target && splash.alive && Math.hypot(splash.x - target.x, splash.y - target.y) < 38) g.damageEnemy(splash, power * 0.45, 0, 0, def.color, 0.45); if (def.role === "duelista" && m.attacks % 3 === 0) target.slow = Math.max(target.slow, 2.5); if (!target.alive || target.hp <= 0) m.victories += 1; m.xp += 2; if (m.xp >= m.level * 50) { m.xp = 0; m.level++; g.toast(`${def.name} alcançou o nível ${m.level}.`, def.color); } m.bond = Math.min(100, m.bond + 0.05); }
    const danger = enemies.find((e) => e.alive && Math.hypot(e.x - m.x, e.y - m.y) < 22); if (danger && Math.random() < dt * 1.7) damageMerc(g, m, danger.atk * 0.42);
    if (def.role === "curandeira" && Math.floor(g.clock) % 9 === 0 && Math.floor(g.clock - dt) % 9 !== 0) g.p.hp = Math.min(g.maxHp(), g.p.hp + Math.round(g.maxHp() * 0.08));
  });
  const tank = active.find((m) => MERC_BY_ID[m.id]!.role === "guardiao"); if (tank && Math.hypot(tank.x - g.p.x, tank.y - g.p.y) < 70) g.p.hp = Math.min(g.maxHp(), g.p.hp + 0.02 * dt);
}
export function drawMercenaries(g: Game, c: CanvasRenderingContext2D, draws: { y: number; f: () => void }[]) { for (const [slot, id] of g.mercenaries.active.entries()) { const m = id ? record(g, id) : undefined; if (!m || m.state !== "ativo") continue; const d = MERC_BY_ID[m.id]!; draws.push({ y: m.y, f: () => { g.shadow(c, m.x, m.y, 6, 0.28); c.fillStyle = `${d.color}55`; c.beginPath(); c.arc(m.x, m.y - 11, 10, 0, Math.PI * 2); c.fill(); c.fillStyle = d.color; c.fillRect(m.x - 5, m.y - 14, 10, 11); c.fillStyle = "#f0d3aa"; c.fillRect(m.x - 4, m.y - 21, 8, 7); c.fillStyle = "#1b1830"; c.fillRect(m.x - 5, m.y - 22, 10, 3); c.fillStyle = "#251b2c"; c.fillRect(m.x - 5, m.y - 3, 4, 5); c.fillRect(m.x + 1, m.y - 3, 4, 5); c.fillStyle = "#271b22"; c.fillRect(m.x - 9, m.y - 27, 18, 2); c.fillStyle = d.color; c.fillRect(m.x - 9, m.y - 27, 18 * Math.max(0, m.hp / maxHp(m)), 2); c.font = "5px monospace"; c.textAlign = "center"; c.fillStyle = "#fff3c4"; c.fillText(d.name, m.x, m.y - 31); } }); } }
export const mercenaryStory = (id: string, chapter: number) => { const m = MERC_BY_ID[id]; if (!m) return ""; const beats = [`${m.name} chega a Potos sem pedir uma apresentação. Deixa o contrato sobre a mesa e observa se você lê as letras miúdas.`, m.lore, `${m.name} revela por que recua: sobreviver não é covardia, é a única forma de voltar para a próxima batalha.`, `${m.name} pergunta qual reino você pretende salvar quando ninguém estiver pagando para isso.`, `O contrato de ${m.name} muda de tinta. A companhia deixou de ser um serviço e virou uma promessa difícil de quebrar.`]; return beats[Math.min(chapter, beats.length - 1)]!; };
