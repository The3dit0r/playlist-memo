import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./index.css";

import { Library } from "../../icons/Library";
import { Home } from "../../icons/Home";
import { Settings } from "../../icons/Settings";
import { Search } from "../../icons/Search";

import SearchPanel from "./panels/SearchPanel";
import PostLoginPanel from "./panels/PostLoginPanel";
import LibraryPanel from "./panels/LibraryPanel";
import SettingsPanel from "./panels/SettingsPanel";

import { useTheme } from "../../context/ThemeContext";
import MButton from "../../components/MButton";
import HomePanel from "./panels/HomePanel";
import TrackPanel from "./panels/TrackPanel";

export default function SidePanel() {
  const theme = useTheme();

  return (
    <div className="side-panel" style={{ width: theme.sbWidth }}>
      <Routes>
        <Route path="/search" element={<SearchPanel />} />
        <Route path="/login" element={<PostLoginPanel />} />
        <Route path="/library" element={<LibraryPanel />} />
        <Route path="/settings" element={<SettingsPanel />} />
        <Route path="/track/:id" element={<TrackPanel />} />
        <Route path="/" element={<HomePanel />} />
      </Routes>

      <div className="nav-bar flex aictr spbtw">
        <NavButton icon={<Home />} name="Home" path="/" exact />
        <NavButton icon={<Library />} name="Library" path="/library" />
        <NavButton icon={<Search />} name="Search" path="/search" />
        <NavButton icon={<Settings />} name="Settings" path="/settings" />
      </div>
    </div>
  );
}

type NavBttProps = {
  icon: React.ReactNode;
  name: string;
  path: string;
  exact?: boolean;
};

function NavButton(props: NavBttProps) {
  const theme = useTheme();

  const nav = useNavigate();
  const { pathname } = useLocation();

  const { icon, name, path, exact } = props;
  const active = exact ? pathname === path : pathname.startsWith(path);

  function navigate() {
    if (active) {
      return;
    }

    return nav(path);
  }

  return (
    <MButton
      onClick={navigate}
      className="flex aictr jcctr jcctr half-bdrd"
      style={{
        height: "100%",
        fontWeight: 600,
        border: "none",
        flex: 1,
      }}
      hBgColor="#fff4"
      hColor="#fff"
      active={active}
    >
      {icon}
      {theme.sbWidth > 599 ? name : ""}
    </MButton>
  );
}
