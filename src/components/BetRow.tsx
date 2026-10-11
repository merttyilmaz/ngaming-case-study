import { memo } from "react";
import type { Match, MarketGroup, Outcome } from "../types";
import OddButton from "./OddButton";
import { DATA_ROW_HEIGHT, GRID_TEMPLATE_COLUMNS, META_ROW_HEIGHT, ODD_COLUMNS } from "./tableLayout";

function findOutcome(group: MarketGroup | undefined, name: string): Outcome | undefined {
  if (!group) return undefined;
  return Object.values(group.OC).find((oc) => oc.N === name);
}

interface BetRowProps {
  match: Match;
}

function BetRow({ match }: BetRowProps) {
  const marketCount = Object.keys(match.OCG).length;
  const mainMarket = match.OCG["1"];

  return (
    <div className="border-b border-gray-300">
      {/* label row: date/day/league + generic pick-name headers, same shape as the data row below */}
      <div
        className="grid items-center bg-gray-100 text-xs text-gray-600"
        style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS, height: META_ROW_HEIGHT }}
      >
        <div className="truncate border-r border-gray-300 px-1">
          {match.D} {match.DAY} {match.LN}
        </div>
        <div className="truncate border-r border-gray-300 px-1">Yorumlar</div>
        <div className="border-r border-gray-300 px-1" />
        {ODD_COLUMNS.map((col) => (
          <div key={col.key} className="border-r border-gray-300 px-1 text-center">
            {col.header}
          </div>
        ))}
        <div className="px-1 text-center">+99</div>
      </div>

      {/* data row: match info + actual odds, blank where this match has no such market */}
      <div
        className="grid items-center text-sm"
        style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS, height: DATA_ROW_HEIGHT }}
      >
        <div className="truncate border-r border-gray-200 px-1">
          <span className="font-bold">{match.C}</span> {match.T} {match.N}
        </div>
        <div className="truncate border-r border-gray-200 px-1 text-gray-500">Yorumlar</div>
        <div className="border-r border-gray-200 px-1 text-center">{mainMarket?.MBS}</div>
        {ODD_COLUMNS.map((col) => {
          const group = match.OCG[col.groupId];
          const outcome = findOutcome(group, col.outcomeName);
          return (
            <div key={col.key} className="h-full border-r border-gray-200">
              {group && outcome && (
                <OddButton
                  matchId={match.C}
                  matchName={match.N}
                  marketId={group.ID}
                  marketName={group.N}
                  outcomeId={outcome.ID}
                  outcomeName={outcome.N}
                  odd={Number(outcome.O)}
                  mbs={group.MBS}
                />
              )}
            </div>
          );
        })}
        <div className="px-1 text-center">{marketCount}</div>
      </div>
    </div>
  );
}

export default memo(BetRow);
