import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AddToPlaylist } from "@icons/AddToPlaylist";
import { AddToQueue } from "@icons/AddToQueue";
import { Like } from "@icons/Like";
import { More } from "@icons/More";

import PlayButton from "@components/others/PlayButton";
import AlbumPreview from "@components/AlbumPreview";
import { LoadingAnimation } from "@components/Loading";
import { ItemLinkList } from "@components/others/Link";

import { useTheme } from "@hooks/internal";

import { getImageURL } from "@utils/parser";
import { SpotifyAPI } from "@utils/request";

type DataType = SpotifyApi.SingleTrackResponse;

export default function TrackPanel() {
  const { id = "" } = useParams();
  const theme = useTheme();

  const [data, setData] = useState<null | DataType>(null);
  const [status, setStatus] = useState(-1);

  useEffect(() => {
    if (id.length !== 22) {
      return;
    }

    const request = { valid: true };

    async function fetch() {
      setStatus(0);

      const data = await SpotifyAPI.getTrack(id);

      if (request.valid) {
        setData(data.body);
        setStatus(data.statusCode);
      }
    }

    fetch();

    return () => {
      request.valid = false;
    };
  }, [id]);

  if (!status) {
    return (
      <div className="content-wrapper">
        <LoadingAnimation text="Fetching track" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="content-wrapper flex coll aictr jcctr">
        There was an error processing your data. Please try again later
        <h3>Status code: {status}</h3>
      </div>
    );
  }

  const { name, artists, album } = data;
  const { images } = album;

  const cover = getImageURL(images, 0);

  return (
    <div
      className="content-wrapper scroller"
      style={{ backgroundImage: `url('${cover}')`, backgroundSize: "contain" }}
    >
      <div className="gradient-wrapper">
        <div className="m-header tactr">
          <div style={{ fontWeight: "bold" }}>Track</div>
        </div>
        <div style={{ padding: "16px 0" }}>
          <div
            className="cover full-bdrd"
            style={{
              backgroundImage: `url('${cover}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",

              outline: "2px solid #fffa",

              width: Math.min(296, theme.sbWidth - 60),
              margin: "auto",
              aspectRatio: 1,
            }}
          ></div>
        </div>

        <div className="metadata tactr">
          <div className="title" style={{ margin: "0.5em" }}>
            {name}
          </div>
          <ItemLinkList items={artists} />
        </div>

        <div
          className="flex jcctr aictr g-half clickables"
          style={{ padding: "32px 16px" }}
        >
          <More />
          <Like />
          <PlayButton />
          <AddToQueue />
          <AddToPlaylist />
        </div>

        <div style={{ padding: 8 }}>
          <LyricsDisplay />

          <h4 className="tactr frame">This track is a part of</h4>
          <AlbumPreview id={album.id} />
        </div>
      </div>
    </div>
  );
}

function LyricsDisplay() {
  return (
    <div className="lyrics-display">
      <div
        style={{
          textAlign: "center",
          background: "#fff1",
          borderRadius: 8,
          padding: "32px 16px",
        }}
      >
        Sorry, but lyrics is not currently available
      </div>
    </div>
  );
}
