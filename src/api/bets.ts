import type { Match } from "../types";

const BETS_URL = "https://nesine-case-study.onrender.com/bets";

export async function fetchBets(): Promise<Match[]> {
  const res = await fetch(BETS_URL);
  if (!res.ok) throw new Error(`Bets request failed: ${res.status}`);
  return res.json();
}
