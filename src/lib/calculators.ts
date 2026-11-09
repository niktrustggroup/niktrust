/** Deterministic, non-authoritative trading calculators. Inputs are user-supplied; no broker-specific values are assumed. */
export type CalcResult = { ok: true; value: number; details: Record<string, number> } | { ok: false; error: string };
const bad = (...v: number[]) => v.some(x => !Number.isFinite(x) || x <= 0);

/** Pip value in account currency = lots × contract size × pip size × (quote→account rate). */
export function pipValue(lots: number, contractSize: number, pipSize: number, quoteToAccount: number): CalcResult {
  if (bad(lots, contractSize, pipSize, quoteToAccount)) return { ok: false, error: 'همهٔ مقادیر باید عدد مثبت باشند.' };
  return { ok: true, value: lots * contractSize * pipSize * quoteToAccount, details: {} };
}
/** Position size (lots) = (balance × risk%) ÷ (stop in pips × pip value per 1 lot). */
export function positionSize(balance: number, riskPct: number, stopPips: number, pipValuePerLot: number): CalcResult {
  if (bad(balance, riskPct, stopPips, pipValuePerLot)) return { ok: false, error: 'همهٔ مقادیر باید عدد مثبت باشند.' };
  if (riskPct > 100) return { ok: false, error: 'درصد ریسک نمی‌تواند بیشتر از ۱۰۰ باشد.' };
  const risk = balance * riskPct / 100;
  return { ok: true, value: risk / (stopPips * pipValuePerLot), details: { risk } };
}
/** Required margin in account currency = lots × contract size × price ÷ leverage × (quote→account rate). */
export function requiredMargin(lots: number, contractSize: number, price: number, leverage: number, quoteToAccount: number): CalcResult {
  if (bad(lots, contractSize, price, leverage, quoteToAccount)) return { ok: false, error: 'همهٔ مقادیر باید عدد مثبت باشند.' };
  const notional = lots * contractSize * price * quoteToAccount;
  return { ok: true, value: notional / leverage, details: { notional } };
}
