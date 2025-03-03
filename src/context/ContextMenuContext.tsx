import { useState, createContext, useEffect, useContext, useRef } from "react";

type Option = {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
} | null;

type CtxType = {
  options: Option[];
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  active: boolean;

  show(options: CtxType["options"], position: CtxType["position"]): void;
  hide(): void;
};

export const ContextMenuContext = createContext<CtxType | null>(null);

export function ContextMenuProvider(props: { children: React.ReactNode }) {
  const selfRef = useRef<HTMLDivElement | null>(null);

  const { children } = props;

  const [active, setActive] = useState(false);
  const [options, setOptions] = useState<CtxType["options"]>([]);
  const [position, setPosition] = useState<CtxType["position"]>({
    top: 0,
    left: 0,
  });

  function show(options: CtxType["options"], position: CtxType["position"]) {
    setPosition(position);
    setOptions(options);

    setActive(true);
    selfRef.current?.focus();
  }

  function hide() {
    setActive(false);
  }

  useEffect(() => {
    window.addEventListener("mousedown", hide);
    window.addEventListener("scroll", hide);

    return () => {
      window.removeEventListener("mousedown", hide);
      window.removeEventListener("scroll", hide);
    };
  }, [active]);

  const value = { options, position, active, show, hide };

  return (
    <ContextMenuContext.Provider value={value}>
      <ContextMenu reff={selfRef} />
      {children}
    </ContextMenuContext.Provider>
  );
}

function ContextMenu({ reff }: { reff: any }) {
  const menu = useContext(ContextMenuContext);
  if (!menu) return <></>;

  const { hide, position, options, active } = menu;

  const cancel = (e: any) => e.stopPropagation();

  return (
    <div
      className="context-menu"
      style={{ ...position, display: active ? "" : "none" }}
      onMouseDown={cancel}
      tabIndex={0}
      onScroll={cancel}
      onBlur={hide}
      ref={reff}
    >
      {options.map((option, i) => {
        if (!option) {
          return <hr key={i} />;
        }

        return (
          <div className="option flex aictr" onClick={option.onClick} key={i}>
            <div className="icon flex aictr">{option.icon}</div>
            {option.text}
          </div>
        );
      })}
    </div>
  );
}
