import "./index.css";

import {
  MdRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

import PlayButton from "../../components/others/PlayButton";
import { CTable } from "../../components/CTable";

export default function MainPlayer() {
  return (
    <div className="main-player">
      <Metadata />
      <Progress />
      <Queuelist />
    </div>
  );
}

function Metadata() {
  let curTitle = "Asymptotic",
    curSubtitle = "Album",
    curDesc = "Louie Zong",
    curCover =
      "https://i.scdn.co/image/ab67616d00001e0222e1967c131a721421f5d959";

  return (
    <div className="metadata flex g-half full-bdrd">
      <div
        className="cover-art half-bdrd"
        style={{ backgroundImage: `url('${curCover}')` }}
      ></div>
      <div className="info flex jcctr coll flex-1">
        <div className="subtitle">{curSubtitle}</div>
        <div className="title">{curTitle}</div>
        <div className="desc">{curDesc}</div>
      </div>

      <div className="controls flex aictr g-half clickables">
        <MdShuffle />
        <MdSkipPrevious size="1.5em" />
        <PlayButton />
        <MdSkipNext size="1.5em" />
        <MdRepeat />
      </div>
    </div>
  );
}

function Queuelist() {
  return (
    <div className="queuelist scroller" style={{ padding: 16 }}>
      <CTable renderArr={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]}>
        {(item, index) => (
          <div className="flex aictr" style={{ height: 60 }}>
            <div style={{ width: 60, textAlign: "center" }}>{index + 1}</div>
            <div className="flex-1">
              <div style={{ fontWeight: "bold" }}>Queue Song Title</div>
              <div>Song Artist 1, Song Artist 2</div>
            </div>
            <div style={{ width: "35%" }}>Song's Album</div>
            <div>03:24</div>
            <div style={{ width: 60 }}></div>
          </div>
        )}
      </CTable>
    </div>
  );
}

function Progress() {
  return (
    <div className="progress">
      <div className="stamp flex spbtw">
        <span>00:00</span>
        <span>01:30</span>
      </div>
    </div>
  );
}
