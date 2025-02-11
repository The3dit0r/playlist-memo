import { useEffect, useRef, useState } from "react";

import MainPlayer from "./layout/MainPlayer";
import SidePanel from "./layout/SidePanel";

import { useTheme } from "./context/ThemeContext";

export default function AppMainPanel() {
  return (
    <div className="app-wrapper usn">
      <MainPlayer />
      <Divider />
      <SidePanel />
    </div>
  );
}

function Divider() {
  const { setSidebarWidth } = useTheme();

  const [isHolding, setIsHolding] = useState(false);
  const originPoint = useRef(0);

  useEffect(() => {
    if (!isHolding) return;

    function handleMouseMove(e: MouseEvent) {
      const diff = originPoint.current - e.clientX;
      setSidebarWidth((o) => o + diff);
    }

    function handleMouseUp() {
      setIsHolding(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isHolding]);

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setIsHolding(true);
    originPoint.current = e.clientX;
  }

  const clssArr = ["app-divider"];
  if (isHolding) clssArr.push("active");

  return (
    <div className={clssArr.join(" ")} onMouseDown={handleMouseDown}>
      <div className="inner"></div>
    </div>
  );
}
