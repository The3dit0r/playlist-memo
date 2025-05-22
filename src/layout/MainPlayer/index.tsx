import "./index.css";

import {
  MdRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { AddToPlaylist } from "@icons/AddToPlaylist";
import { AddToQueue } from "@icons/AddToQueue";
import { PlaySimple } from "@icons/PlaySimple";
import { Artist } from "@icons/Artist";
import { Album } from "@icons/Album";

import PlayButton from "@components/others/PlayButton";
import { CTable } from "@components/CTable";

import { useContextMenu, useQueue } from "@hooks/internal";
import { ItemLink, ItemLinkList } from "@components/others/Link";
import { capitalize, getImageURL } from "@utils/parser";

export default function MainPlayer() {
  return (
    <div className="main-player">
      <Metadata />
      <Progress />
      <QueueList />
    </div>
  );
}

function Metadata() {
  const { current } = useQueue();

  let curTitle = <>No track is currently playing</>,
    curSubtitle = <></>,
    curDesc = <>You should do something</>,
    curCover = location.origin + "/nocover.png";

  if (current) {
    const { album, artists, images } = current;

    curTitle = <ItemLink {...current} type="track" />;
    curSubtitle = (
      <>
        {capitalize(album.album_type)}: <ItemLink {...album} />
      </>
    );
    curDesc = <ItemLinkList items={artists} />;
    curCover = getImageURL(images);
  }

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

function QueueList() {
  const queue = useQueue();
  const contextMenu = useContextMenu();

  return (
    <div className="queuelist scroller" style={{ padding: 16 }}>
      <CTable
        renderArr={queue.queue}
        onContextMenu={({ e }) => {
          e.preventDefault();

          contextMenu.show(
            [
              { text: "Add to queue", icon: <AddToQueue /> },
              { text: "Play track", icon: <PlaySimple /> },
              { text: "Add to playlist", icon: <AddToPlaylist /> },
              null,
              { text: "Visit album page", icon: <Album /> },
              { text: "Visit artist page", icon: <Artist /> },
            ],
            { top: e.clientY, left: e.clientX }
          );
        }}
      >
        {(item, index) => (
          <div
            className="flex aictr fly-in"
            style={{
              height: 60,
              animationDuration: 0.1 + Math.min(1, index * 0.075) + "s",
            }}
          >
            <div style={{ width: 60, textAlign: "center" }}>{index + 1}</div>
            <div className="flex-1">
              <ItemLink {...item} type="track" className="bold" />
              <ItemLinkList items={item.artists} />
            </div>
            <div style={{ width: "35%" }}>
              <ItemLink {...item.album} type="album" />
            </div>
            <div>03:24</div>
            <div style={{ width: 60 }}></div>
          </div>
        )}
      </CTable>
    </div>
  );
}

function Progress() {
  const { current } = useQueue();

  if (!current) return <></>;

  return (
    <div className="progress">
      <div className="stamp flex spbtw">
        <span>00:00</span>
        <span>01:30</span>
      </div>
    </div>
  );
}
