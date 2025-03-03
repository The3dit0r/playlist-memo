import { useState, useEffect } from "react";
import "./index.css";

import { LoadingAnimation } from "../Loading";
import { CTable } from "../CTable";

import { SpotifyAPI } from "../../utils/request";
import { durationFormat, getImageURL } from "../../utils/parser";

import PlayButton from "../others/PlayButton";
import { ItemLink } from "../others/Link";

interface DataType {
  album: SpotifyApi.SingleAlbumResponse | null;
  tracks: SpotifyApi.TrackObjectSimplified[];
}

export default function AlbumPreview({ id }: { id: string }) {
  const [data, setData] = useState<DataType["album"]>(null);
  const [tracks, setTracks] = useState<DataType["tracks"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id.length !== 22) return;

    const request = { valid: true };

    async function loadData() {
      setLoading(true);
      const data = await SpotifyAPI.getAlbum(id);
      if (request.valid) {
        setData(data.body);
        setLoading(false);
      }
    }

    async function loadTracks() {
      const data = await SpotifyAPI.getAlbumTracks(id, {
        offset: 0,
        limit: 50,
      });

      if (request.valid) {
        setTracks(data.body.items);
      }
    }

    loadData();
    loadTracks();

    return () => {
      request.valid = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingAnimation text="" />;
  }

  if (!data) {
    return (
      <div className="album-preview">
        A problem occured while fetching album data
      </div>
    );
  }

  const { images, artists } = data;

  const cover = getImageURL(images);

  return (
    <div className="album-preview">
      <div
        className="info flex aictr g-half"
        style={{
          backgroundImage: `linear-gradient(#0008,#0009), url('${cover}')`,
          backgroundPosition: "center",
        }}
      >
        <img src={cover} width={80} />
        <div className="metadata flex-1">
          <ItemLink {...data} className="bold two-line-ellip" />
          <div className="subtext list">
            {artists.map((a) => (
              <ItemLink {...a} />
            ))}
          </div>
        </div>
        <PlayButton style={{ margin: 8 }} size={50} />
      </div>
      <div className="tracks">
        <CTable renderArr={tracks}>
          {(item) => {
            return (
              <div
                className="flex aictr"
                style={{ height: 60, padding: "0 16px" }}
              >
                <div className="flex-1">
                  <div className="bold line-ellip">
                    {item.track_number}. {item.name}
                  </div>
                  <div className="subtext list line-ellip">
                    {artists.map((a) => (
                      <span>{a.name}</span>
                    ))}
                  </div>
                </div>
                <div>{durationFormat(item.duration_ms)}</div>
              </div>
            );
          }}
        </CTable>
      </div>
    </div>
  );
}
