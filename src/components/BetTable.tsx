import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadBets } from "../store/betsSlice";
import BetRow from "./BetRow";
import { ROW_HEIGHT } from "./tableLayout";

export default function BetTable() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.bets);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(loadBets());
  }, [dispatch]);

  // Only ~30 matches (60 sub-rows) ever exist in the DOM at once, no matter
  // how long the list is - this is what keeps 3000 matches cheap to render
  // on old phones.
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  if (status === "loading" || status === "idle") {
    return <p className="p-4">Yükleniyor...</p>;
  }

  if (status === "failed") {
    return (
      <div className="p-4">
        <p>Maçlar yüklenemedi: {error}</p>
        <button onClick={() => dispatch(loadBets())} className="mt-2 border border-gray-400 px-2 py-1">
          Tekrar dene
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="p-4">Maç bulunamadı</p>;
  }

  return (
    <div>
      <p className="mb-1 px-1 text-sm">Event Count: {items.length}</p>
      <div className="border border-gray-300">
        <div ref={scrollRef} className="overflow-auto" style={{ height: "calc(100vh - 100px)" }}>
          <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <BetRow match={items[virtualRow.index]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
