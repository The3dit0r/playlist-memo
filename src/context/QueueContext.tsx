import { createContext, useState } from "react";

type ItemT = {
  name: string;
  id: string;
  images: { url: string }[];
  artists: { id: string; name: string; type: "artist" }[];

  album: {
    name: string;
    id: string;
    album_type: string;
    type: "album";
  };
  duration_ms: number;
};

type QueueCtxType = {
  items: ItemT[];
  current: ItemT | null;
  queue: ItemT[];

  addItems(index: number, ...items: ItemT[]): void;
  playItems(...items: ItemT[]): void;
  moveItems(destination: number, ...indexes: number[]): void;
  removeItems(...indexes: number[]): ItemT[];
  skipNext(count?: number): ItemT[];
  removeAll(): ItemT[];
};

export const QueueContext = createContext<QueueCtxType | null>(null);

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [__items, setItems] = useState<ItemT[]>([]);

  function current() {
    return __items[0] || null;
  }

  function queue() {
    return __items.slice(1);
  }

  function indexOutBound(i: number) {
    return i < 0 || i > __items.length - 1;
  }

  function reboundIndex(i: number) {
    if (i < 0) return 0;
    if (i > __items.length - 1) __items.length - 1;
    return i;
  }

  function addItems(index: number, ...items: ItemT[]) {
    index = reboundIndex(index);

    const newItems = [...__items];
    newItems.splice(index, 0, ...items);
    setItems(newItems);
  }

  function playItems(...items: ItemT[]) {
    setItems(items);
  }

  function moveItems(dest: number, ...indexes: number[]) {
    const rawItems: (ItemT | 0)[] = [...__items];
    const moved: ItemT[] = [];

    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      if (indexOutBound(index)) continue;

      if (!rawItems[index]) continue;

      const m = rawItems.splice(index, 1, 0)[0];
      if (!m) continue;

      moved.push(m);
    }

    const newItems = rawItems.filter((a) => a !== 0);
    newItems.splice(dest, 0, ...moved);
    setItems(newItems);
  }

  function removeItems(...indexes: number[]) {
    const rawItems: (ItemT | 0)[] = [...__items];
    const removed: ItemT[] = [];

    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      if (indexOutBound(index)) continue;

      const m = rawItems.splice(index, 1, 0)[0];
      if (!m) continue;

      removed.push(m);
    }

    const newItems = rawItems.filter((a) => !!a);
    setItems(newItems);

    return removed;
  }

  function removeAll() {
    setItems([]);
    return __items;
  }

  function skipNext(count = 1) {
    const newItems = [...__items];
    const skipped: ItemT[] = [];

    while (count-- >= 0) {
      const t = newItems.shift();
      if (!t) break;

      skipped.push(t);
    }

    setItems(newItems);
    return skipped;
  }

  const value = {
    items: __items,
    current: current(),
    queue: queue(),

    addItems,
    playItems,
    moveItems,
    removeItems,
    removeAll,

    skipNext,
  };

  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
}

export type { ItemT as Playable };
