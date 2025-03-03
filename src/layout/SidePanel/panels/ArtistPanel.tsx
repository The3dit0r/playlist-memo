import { useNavigate, useParams } from "react-router-dom";

import { MdAlbum } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { More } from "@icons/More";
import { Like } from "@icons/Like";

import PlayButton from "@components/others/PlayButton";
import RowItem from "@components/ItemDisplay/row";
import { LoadingAnimation } from "@components/Loading";
import { ItemLinkList } from "@components/others/Link";
import { CTable } from "@components/CTable";

import {
  useArtist,
  useArtistAlbums,
  useArtistApperances,
  useArtistTopTracks,
} from "@hooks/external/artist";
import { useTheme } from "@hooks/internal";

import { durationFormat, getImageURL } from "@utils/parser";

export default function ArtistPanel() {
  const theme = useTheme();

  const { id = "" } = useParams();
  const { status, response } = useArtist(id);

  if (status === "pending" || status === "standby") {
    return <LoadingPanel />;
  }

  if (status === "rejected") {
    return <ErrorPanel />;
  }

  const { name, images, followers } = response.data;
  const cover = getImageURL(images);

  return (
    <div className="content-wrapper scroller" style={{
        backgroundImage: `url('${cover}')`,
    }}>
      <div className="gradient-wrapper">
        <div className="m-header tactr">
          <div style={{ fontWeight: "bold" }}>Artist</div>
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
          <div>{followers.total.toLocaleString()} followers</div>
        </div>

        <div
          className="flex jcctr aictr g-half clickables"
          style={{ padding: "32px 16px" }}
        >
          <More />
          <PlayButton paused />
          <Like />
        </div>

        <TopTracksTable />
        <AlbumsTable />
        <AppearedOnTable />
      </div>
    </div>
  );
}

function TopTracksTable() {
  const navigate = useNavigate();

  const { id = "" } = useParams();
  const { status, response } = useArtistTopTracks(id);

  if (status === "pending" || status === "standby") {
    return <LoadingAnimation />;
  }

  if (status === "rejected") {
    return <></>;
  }

  const { tracks = [] } = response.data;

  if (!tracks.length) {
    return <></>;
  }

  return (
    <>
      <h3 className="section-header sticky">
        <BsStars />
        Artist's popular songs
      </h3>
      <CTable renderArr={tracks} style={{ padding: 8 }}>
        {(item) => {
          return (
            <RowItem
              name={item.name}
              subtext={<ItemLinkList items={item.artists} />}
              image={getImageURL(item.album.images, 3)}
              onDoubleClick={() => navigate(`/track/${item.id}`)}
              height={55}
              others={durationFormat(item.duration_ms)}
            />
          );
        }}
      </CTable>
    </>
  );
}

function AlbumsTable() {
  const navigate = useNavigate();

  const { id = "" } = useParams();
  const { status, response } = useArtistAlbums(id);

  if (status === "pending" || status === "standby") {
    return <LoadingAnimation />;
  }

  if (status === "rejected") {
    return <></>;
  }

  const { items } = response.data;

  if (!items.length) {
    return <></>;
  }

  return (
    <>
      <h3 className="section-header sticky">
        <MdAlbum />
        Artist's discography
      </h3>
      <CTable renderArr={items} style={{ padding: 8 }}>
        {(item) => {
          return (
            <RowItem
              name={item.name}
              subtext={<ItemLinkList items={item.artists} />}
              image={getImageURL(item.images, 3)}
              onDoubleClick={() => navigate(`/album/${item.id}`)}
              height={55}
            />
          );
        }}
      </CTable>
    </>
  );
}

function AppearedOnTable() {
  const navigate = useNavigate();

  const { id = "" } = useParams();
  const { status, response } = useArtistApperances(id);

  if (status === "pending" || status === "standby") {
    return <LoadingAnimation />;
  }

  if (status === "rejected") {
    return <></>;
  }

  const { items } = response.data;

  if (!items.length) {
    return <></>;
  }

  return (
    <>
      <h3 className="section-header sticky">Appeared on</h3>
      <CTable renderArr={items} style={{ padding: 8 }}>
        {(item) => {
          return (
            <RowItem
              name={item.name}
              subtext={<ItemLinkList items={item.artists} />}
              image={getImageURL(item.images, 3)}
              onDoubleClick={() => navigate(`/album/${item.id}`)}
              height={55}
            />
          );
        }}
      </CTable>
    </>
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
