import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearBasket,
  removeSelection,
  selectCombinedOdds,
  selectPotentialPayout,
  selectSelectionList,
  selectStake,
  setStake,
} from "../store/basketSlice";

export default function Basket() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selections = useAppSelector(selectSelectionList);
  const stake = useAppSelector(selectStake);
  const combinedOdds = useAppSelector(selectCombinedOdds);
  const payout = useAppSelector(selectPotentialPayout);

  return (
    <div className="fixed bottom-4 right-4">
      {open && (
        <div className="mb-2 w-80 border border-gray-400 bg-white p-2 text-sm shadow">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-bold">Kuponum ({selections.length})</span>
            <button onClick={() => dispatch(clearBasket())} className="text-gray-600 underline">
              Temizle
            </button>
          </div>
          {selections.length === 0 ? (
            <p className="text-gray-500">Henüz seçim yok</p>
          ) : (
            <>
              <ul className="mb-2 max-h-60 overflow-auto">
                {selections.map((s) => (
                  <li
                    key={s.key}
                    className="flex items-center justify-between border-b border-gray-200 py-1"
                  >
                    <div className="truncate pr-2">
                      {s.mbs} Kod: {s.matchId} Maç: {s.matchName} Oran: {s.odd.toFixed(2)}
                    </div>
                    <button
                      onClick={() => dispatch(removeSelection(s.key))}
                      className="px-1 text-gray-600"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between py-1">
                <label htmlFor="stake">Miktar</label>
                <input
                  id="stake"
                  type="number"
                  min={0}
                  value={stake}
                  onChange={(e) => dispatch(setStake(Number(e.target.value)))}
                  className="w-20 border border-gray-400 px-1 text-right"
                />
              </div>
              <div className="flex justify-between py-1">
                <span>Toplam Oran</span>
                <span>{combinedOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>Toplam Tutar</span>
                <span>{payout.toFixed(2)} TL</span>
              </div>
            </>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="border border-gray-400 bg-white px-3 py-2 font-bold shadow"
      >
        Kuponum ({selections.length})
      </button>
    </div>
  );
}
