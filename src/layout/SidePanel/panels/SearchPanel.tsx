import { useEffect, useState } from "react";

import { Search } from "../../../icons/Search";
import { Close } from "../../../icons/Close";
import { RiInputField } from "react-icons/ri";
import { GiSadCrab } from "react-icons/gi";

import { LoadingAnimation } from "../../../components/Loading";
import MButton from "../../../components/MButton";
import { CTable } from "../../../components/CTable";

import { SpotifyAPI } from "../../../utils/request";
import { wait } from "../../../utils/internal";
import RowItem from "../../../components/ItemDisplay/row";
import { useNavigate } from "react-router-dom";

function RLoadingPanel() {
  return (
    <div className="results">
      <LoadingAnimation />
    </div>
  );
}

function RErrorOccured({ q }: { q: string }) {
  let icon = <RiInputField size={80} />,
    text = <>Start typing to search</>;

  if (q) {
    icon = <GiSadCrab size={80} />;

    text = (
      <>
        <div>An error occured while searching for "{q}"</div>
        <div>Maybe our server is down 🙃</div>
      </>
    );
  }

  return (
    <div className="results">
      <div className="flex coll aictr jcctr g-full" style={{ height: "50vh" }}>
        {icon}
        <div
          style={{
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 2,
            padding: 32,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

type ResType = SpotifyApi.SearchResponse;

export default function SearchPanel() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<ResType | null>(null);

  function handleInput(e: any) {
    setInput(e.target.value);
  }

  useEffect(() => {
    const request = { valid: true };
    const query = input.trim();
    if (!query.length) return;

    async function load() {
      setLoading(true);
      const data = await SpotifyAPI.search(query, [
        "track",
        "album",
        "artist",
        "playlist",
      ]);

      if (request.valid) {
        setResults(data.body);
        setLoading(false);
      }
    }

    load();

    return () => {
      request.valid = false;
    };
  }, [input]);

  let ResultsDisplay = <></>;

  if (!results) {
    ResultsDisplay = <RErrorOccured q={input} />;
  } else {
    ResultsDisplay = <ResultsPanel results={results} />;
  }

  if (loading) {
    ResultsDisplay = <RLoadingPanel />;
  }

  return (
    <div
      className="content-wrapper scroller"
      style={{ padding: 8, overflowY: "scroll" }}
    >
      <div className="search-bar flex aictr">
        <Search className="icon" />
        <input
          placeholder="What are you searching for?"
          onInput={handleInput}
          onChange={handleInput}
        />
        <Close className="icon clickable" />
      </div>

      {ResultsDisplay}
    </div>
  );
}

function ResultsPanel({ results }: { results: ResType }) {
  const nav = useNavigate();
  const [curPanel, setCurPanel] = useState(0);

  const { tracks, playlists, albums, artists } = results;

  const tr = tracks?.items || [];
  const pl = playlists?.items || [];
  const al = albums?.items || [];
  const ar = artists?.items || [];

  const top = [
    ...tr.slice(0, tr.length * Number(curPanel === 0)),
    ...al.slice(0, al.length * Number(curPanel === 1)),
    ...ar.slice(0, ar.length * Number(curPanel === 2)),
    ...pl.slice(0, pl.length * Number(curPanel === 3)),
  ].filter((a) => !!a);

  function Button(p: { n: string; i: number }) {
    return (
      <MButton
        style={{ padding: "6px 16px", flex: 1 }}
        onClick={async () => {
          setCurPanel(-1);
          await wait(10);
          setCurPanel(p.i);
        }}
        active={curPanel === p.i}
      >
        {p.n}
      </MButton>
    );
  }

  return (
    <div className="results">
      <div
        className="flex"
        style={{ position: "sticky", top: 72, zIndex: 1, gap: 6 }}
      >
        <Button n="Track" i={0} />
        <Button n="Album" i={1} />
        <Button n="Artist" i={2} />
        <Button n="Playlist" i={3} />
      </div>
      <br />
      <CTable renderArr={top} key={curPanel}>
        {(item, index) => {
          let image,
            subtext = "",
            br = 8;

          if (item.type === "track") {
            image = item.album.images.slice(-1)[0]?.url;
            subtext = item.artists.map((a) => a.name).join(", ");
          } else {
            image = item.images.slice(-1)[0]?.url;

            switch (item.type) {
              case "playlist": {
                subtext = item.tracks.total + " items";
                break;
              }

              case "album": {
                subtext = item.artists.map((a) => a.name).join(", ");
                break;
              }

              case "artist": {
                subtext = item.followers.total.toLocaleString() + " followers";
                br = 120;
                break;
              }
            }
          }

          image ??= window.location.origin + "/nocover.png";
          const url = `/${item.type}/${item.id}`;

          return (
            <RowItem
              style={{
                animationDuration: `${0.2 + Math.min(0.5, 0.05 * index)}s`,
              }}
              subtext={subtext}
              image={image}
              name={item.name}
              onDoubleClick={() => nav(url)}
            />
          );
        }}
      </CTable>
    </div>
  );
}
