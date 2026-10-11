// Fixed market-pick layout used by the real bulletin: every match gets the
// same 18 columns, blank wherever that match doesn't offer the market.
// groupId/outcomeName are looked up per match; this dataset only ever fills
// in group "1" (1/X), "5" (Alt/Üst) and "2" (1-X/1-2/X-2) - the rest render
// blank, same as the reference.
export interface OddColumn {
  key: string;
  header: string;
  groupId: string;
  outcomeName: string;
}

export const ODD_COLUMNS: OddColumn[] = [
  { key: "g1-1", header: "1", groupId: "1", outcomeName: "1" },
  { key: "g1-x", header: "x", groupId: "1", outcomeName: "X" },
  { key: "g1-2", header: "2", groupId: "1", outcomeName: "2" },
  { key: "g5-alt", header: "Alt", groupId: "5", outcomeName: "Alt" },
  { key: "g5-ust", header: "Üst", groupId: "5", outcomeName: "Üst" },
  { key: "h1", header: "H1", groupId: "3", outcomeName: "H1" },
  { key: "g3-1", header: "1", groupId: "3", outcomeName: "1" },
  { key: "g3-x", header: "x", groupId: "3", outcomeName: "X" },
  { key: "g3-2", header: "2", groupId: "3", outcomeName: "2" },
  { key: "h2", header: "H2", groupId: "4", outcomeName: "H2" },
  { key: "g2-1x", header: "1-X", groupId: "2", outcomeName: "1-X" },
  { key: "g2-12", header: "1-2", groupId: "2", outcomeName: "1-2" },
  { key: "g2-x2", header: "X-2", groupId: "2", outcomeName: "X-2" },
  { key: "var", header: "Var", groupId: "6", outcomeName: "Var" },
  { key: "yok", header: "Yok", groupId: "6", outcomeName: "Yok" },
];

// info column | "Yorumlar" | MBS badge | 15 odd columns | market count
export const GRID_TEMPLATE_COLUMNS =
  "230px 90px 40px " + "50px ".repeat(ODD_COLUMNS.length) + "50px";

export const META_ROW_HEIGHT = 22;
export const DATA_ROW_HEIGHT = 26;
export const ROW_HEIGHT = META_ROW_HEIGHT + DATA_ROW_HEIGHT;
