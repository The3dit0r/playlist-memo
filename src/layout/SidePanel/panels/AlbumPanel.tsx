import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AddToPlaylist } from "@icons/AddToPlaylist";
import { AddToQueue } from "@icons/AddToQueue";
import { Search } from "@icons/Search";
import { Like } from "@icons/Like";
import { More } from "@icons/More";

import PlayButton from "@components/others/PlayButton";
import RowItem from "@components/ItemDisplay/row";
import { ItemLink, ItemLinkList } from "@components/others/Link";
import { LoadingAnimation } from "@components/Loading";
import { TextInput } from "@components/input";
import { CTable } from "@components/CTable";

import { useAlbum, useAlbumTracks } from "@hooks/external/album";
import { useTheme } from "@hooks/internal";

import { capitalize, durationFormat, getImageURL } from "@utils/parser";

export default function AlbumPanel() {
  const theme = useTheme();

  const { id = "" } = useParams();
  const { status, response } = useAlbum(id);

  if (status === "pending" || status === "standby") {
    return <LoadingPanel />;
  }

  if (status === "rejected") {
    return <ErrorPanel />;
  }

  const { name, images, artists, album_type } = response.data;
  const cover = getImageURL(images);

  return (
    <div
      className="content-wrapper scroller"
      style={{
        backgroundImage: `url('${cover}')`,
        backgroundSize: "contain",
      }}
    >
      <div className="gradient-wrapper">
        <div className="m-header tactr">
          <div style={{ fontWeight: "bold" }}>{capitalize(album_type)}</div>
        </div>

        <div style={{ padding: "16px 0" }}>
          <div
            className="cover full-bdrd"
            style={{
              backgroundImage: `url('${cover}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",

              width: Math.min(266, theme.sbWidth - 60),
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

        <TopTracksTable />
      </div>
    </div>
  );
}

function TopTracksTable() {
  const navigate = useNavigate();

  const { id = "" } = useParams();
  const { status, response } = useAlbumTracks(id);

  const query = useState("");

  if (status === "pending" || status === "standby") {
    return <LoadingAnimation />;
  }

  if (status === "rejected") {
    return <></>;
  }

  const { items } = response.data;
  const rowHeight = 65;

  const renderArr = items.filter((item) => {
    const name = item.name.toLowerCase();
    const artists = item.artists.map((a) => a.name).join(", ");
    const q = query[0].toLowerCase();

    return name.includes(q) || artists.toLowerCase().includes(q);
  });

  return (
    <div style={{ padding: 8, minHeight: rowHeight * items.length }}>
      <TextInput
        icon={<Search />}
        style={{ marginBottom: 16 }}
        state={query}
        placeholder={`Search in ${items.length} tracks`}
      />

      <CTable renderArr={renderArr}>
        {(item) => {
          return (
            <RowItem
              name={[`${item.track_number}. `, <ItemLink {...item} />]}
              subtext={<ItemLinkList items={item.artists} />}
              onDoubleClick={() => navigate(`/track/${item.id}`)}
              style={{ padding: "0 16px" }}
              others={durationFormat(item.duration_ms, ":")}
              height={rowHeight}
            />
          );
        }}
      </CTable>
    </div>
  );
}

function LoadingPanel() {
  return (
    <div className="content-wrapper flex aictr jcctr">
      <LoadingAnimation text="" />
    </div>
  );
}

function ErrorPanel() {
  return (
    <div className="content-wrapper flex tactr jcctr coll">
      <div style={{ fontWeight: 700, fontSize: "3em" }}>404</div>
      <p>We encountered an error while trying to get what you need</p>
      <p>Please try again later</p>
    </div>
  );
}
