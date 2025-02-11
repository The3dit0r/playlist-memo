import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./index.css";

type DivProps = JSX.IntrinsicElements["div"];

type CtxType = {
  handleRowClick(index: number): void;
  indexIsActive(index: number): boolean;
};

const TableContext = createContext<CtxType | null>(null);

function useTable() {
  const data = useContext(TableContext);

  if (!data) {
    throw new Error("useTable must be used within it's provided context");
  }

  return data;
}

type Modify<T, R> = Omit<T, keyof R> & R;

type TProps<T> = Modify<
  JSX.IntrinsicElements["div"],
  {
    renderArr: T[];
    children(t: T, index: number): React.ReactNode;
  }
>;

export function CTable<T>(props: TProps<T>) {
  const { className, renderArr, children: renderFunction, ...divProps } = props;

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [keyIndex, setKeyIndex] = useState<0 | 1 | 2>(0);
  const lastIndex = useRef<number>(-1);

  function activateIndex(...index: number[]) {
    const pre: Record<number, any> = {};
    [...activeIndexes, ...index].forEach((a) => (pre[a] = 1));
    const strs = Object.keys(pre);
    const ints = strs.map((a) => parseInt(a));
    setActiveIndexes(ints);
  }

  function reactivateIndex(index: number) {
    setActiveIndexes([index]);
  }

  function deactivateIndex(...index: number[]) {
    const arr = activeIndexes.filter((i) => !index.includes(i));
    setActiveIndexes(arr);
  }

  function activateAll() {
    activateRange(0, renderArr.length - 1);
  }

  function deactivateAll() {
    setActiveIndexes([]);
  }

  function activateRange(a: number, b: number) {
    const arr: number[] = [];
    const m = Math.min(a, b);
    const r = Math.abs(a - b);

    for (let i = m; i <= m + r; i++) {
      arr.push(i);
    }

    activateIndex(...arr);
  }

  /**
   * Return the state of the index
   * / 0: inactive
   * / 1: active
   * / 2: active - first
   * / 3: active - last
   * @param i Row's index
   * @returns State of index
   */
  function indexIsActive(i: number) {
    const active = activeIndexes.includes(i);
    return active;
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      let key: 0 | 1 | 2 = 0;
      if (e.ctrlKey) key = 1;
      if (e.shiftKey) key = 2;

      setKeyIndex(key);
    }

    function disableAll() {
      setKeyIndex(0);
    }

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    window.addEventListener("blur", disableAll);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
      window.removeEventListener("blur", disableAll);
    };
  }, []);

  function handleRowClick(index: number) {
    if (index < 0 || index > renderArr.length - 1) {
      return;
    }

    const latest = lastIndex.current;

    switch (keyIndex) {
      case 0: {
        reactivateIndex(index);
        break;
      }

      case 1: {
        if (indexIsActive(index)) {
          deactivateIndex(index);
        } else {
          activateIndex(index);
        }
        break;
      }

      case 2: {
        if (latest !== -1) {
          activateRange(latest, index);
        }
        break;
      }
    }

    lastIndex.current = index;
  }

  const clssArr = ["c-table"];
  if (className) clssArr.push(className);

  const data = {
    handleRowClick,
    indexIsActive,
  };

  const rowsInternalClass = getClassesArray(activeIndexes, renderArr.length);

  return (
    <TableContext.Provider value={data}>
      <div
        className={clssArr.join(" ")}
        {...divProps}
        tabIndex={0}
        onKeyDown={(e) => {
          const key = e.key;

          if (key === "ArrowUp") {
            handleRowClick(lastIndex.current - 1);
            return;
          }

          if (key === "ArrowDown") {
            handleRowClick(lastIndex.current + 1);
            return;
          }

          if (key == "a" && e.ctrlKey) {
            activateAll();
            return;
          }

          if (key === "Escape") {
            deactivateAll();
            return;
          }
        }}
      >
        {renderArr.map((item, index) => {
          return (
            <CRow
              index={index}
              key={index}
              className={rowsInternalClass[index]}
            >
              {renderFunction(item, index)}
            </CRow>
          );
        })}
      </div>
    </TableContext.Provider>
  );
}

type RProps = { index: number } & DivProps;

export function CRow(props: RProps) {
  const { className, index, onClick, ...divProps } = props;

  const table = useTable();

  const clssArr = ["c-row"];
  if (className) clssArr.push(className);

  function handleClick(e: any) {
    table.handleRowClick(index);
    if (onClick) onClick(e);
  }

  return (
    <div className={clssArr.join(" ")} onClick={handleClick} {...divProps}>
      {props.children}
    </div>
  );
}

function getClassesArray(activeIndexes: number[], length: number) {
  const clss = "x".repeat(length).split("");
  let cur = 0;

  for (let i = 0; i < length; i++) {
    const active = activeIndexes.includes(i);

    if (active) {
      clss[i] = ["active f"][cur] || "active";
      cur = cur + 1;
    } else if (i > 0) {
      clss[i - 1] = ["x", "active s", "active l"][cur] || "active l";
      cur = 0;
    }
  }

  return clss;
}
