export interface Outcome {
  ID: string;
  O: string; // odd value, e.g. "3.60"
  N: string; // outcome label, e.g. "1", "X", "Alt"
}

export interface MarketGroup {
  ID: string;
  N: string; // market name, e.g. "Maç Sonucu"
  MBS: string; // market button state badge shown next to odds
  OC: Record<string, Outcome>;
}

export interface Match {
  C: string; // match code, used as id
  N: string; // match name, e.g. "PSV - AS Roma"
  D: string; // date, "12.08.2023"
  T: string; // time, "01:59"
  DAY: string; // day name, e.g. "Perşembe"
  LN: string; // league name
  OCG: Record<string, MarketGroup>;
}

export interface Selection {
  key: string; // `${matchId}:${marketId}`
  matchId: string;
  matchName: string;
  marketId: string;
  marketName: string;
  outcomeId: string;
  outcomeName: string;
  odd: number;
  mbs: string;
}
