import "./index.css";

import { LoadingAnimation } from "@components/Loading";
import { CTable } from "@components/CTable";

import PlayButton from "@components/others/PlayButton";
import { ItemLink } from "@components/others/Link";

import { useAlbum, useAlbumTracks } from "@hooks/external/album";

import { durationFormat, getImageURL } from "@utils/parser";

export default function AlbumPreview({ id }: { id: string }) {
  const data = useAlbum(id);
  const tracks = useAlbumTracks(id);

  if (data.status === "pending" || data.status === "standby") {
    return <LoadingAnimation text="" />;
  }

  if (data.status === "rejected") {
    return (
      <div className="album-preview">
        A problem occured while fetching album data
      </div>
    );
  }

  const { images, artists, name } = data.response.data;

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
          <ItemLink
            name={name}
            id={id}
            type="album"
            className="bold two-line-ellip"
          />
          <div className="subtext list">
            {artists.map((a) => (
              <ItemLink {...a} />
            ))}
          </div>
        </div>
        <PlayButton style={{ margin: 8 }} size={50} />
      </div>
      <div className="tracks">
        <CTable renderArr={tracks?.response?.data?.items || []}>
          {/* // TODO: Temporary fix for useAPIGet hooks
          //  # brief: multiple checks needed to verify
          //  # existance of the data, should be made into a hook
          //  */}
          {(item: any) => {
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
