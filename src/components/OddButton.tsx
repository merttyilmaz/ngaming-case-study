import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectOutcomeIdFor, toggleSelection } from "../store/basketSlice";

interface OddButtonProps {
  matchId: string;
  matchName: string;
  marketId: string;
  marketName: string;
  outcomeId: string;
  outcomeName: string;
  odd: number;
  mbs: string;
}

function OddButton({
  matchId,
  matchName,
  marketId,
  marketName,
  outcomeId,
  outcomeName,
  odd,
  mbs,
}: OddButtonProps) {
  const dispatch = useAppDispatch();
  const key = `${matchId}:${marketId}`;
  // Only this match+market slot is read, so clicking one odd never
  // re-renders odd cells that belong to other matches.
  const selectedOutcomeId = useAppSelector(selectOutcomeIdFor(key));
  const isSelected = selectedOutcomeId === outcomeId;

  return (
    <button
      type="button"
      onClick={() =>
        dispatch(
          toggleSelection({
            key,
            matchId,
            matchName,
            marketId,
            marketName,
            outcomeId,
            outcomeName,
            odd,
            mbs,
          }),
        )
      }
      className={`h-full w-full text-center text-sm ${isSelected ? "bg-yellow-300 font-bold" : "hover:bg-gray-100"}`}
    >
      {odd.toFixed(2)}
    </button>
  );
}

export default memo(OddButton);
