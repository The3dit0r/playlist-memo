import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingAnimation } from "../../../components/Loading";

import { useTheme } from "../../../context/ThemeContext";
import RowItem from "../../../components/ItemDisplay/row";

import { capitalize, getImageURL } from "../../../utils/parser";
import { SpotifyAPI } from "../../../utils/request";
import AlbumPreview from "../../../components/AlbumPreview";
import PlayButton from "../../../components/others/PlayButton";
import { AddToPlaylist } from "../../../icons/AddToPlaylist";
import { AddToQueue } from "../../../icons/AddToQueue";
import { Like } from "../../../icons/Like";
import { More } from "../../../icons/More";

type DataType = SpotifyApi.SingleTrackResponse;

export default function TrackPanel() {
  const nav = useNavigate();

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
    <div className="content-wrapper scroller">
      <div className="header tactr">
        <div style={{ fontWeight: "bold" }}>Track</div>
      </div>
      <div style={{ padding: "16px 0" }}>
        <div
          className="cover full-bdrd"
          style={{
            backgroundImage: `url('${cover}')`,
            backgroundSize: "contain",
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
        <div className="list">
          {artists.map((a) => [<span>{a.name}</span>])}
        </div>
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

      <h4 className="tactr">This track is a part of</h4>
      <AlbumPreview id={album.id} />
    </div>
  );
}
