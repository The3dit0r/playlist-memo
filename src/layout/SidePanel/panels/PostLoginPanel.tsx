import MButton from "../../../components/MButton";
import { useUserData } from "../../../context/UserContext";

export default function PostLoginPanel() {
  const { profile } = useUserData();

  if (!profile) return;

  const { images = [], display_name } = profile;

  return (
    <div className="content-wrapper flex coll aictr jcctr">
      <div style={{ padding: "32px 0" }}>
        <img src={images[0]?.url} style={{ borderRadius: 1e3, width: 175 }} />
      </div>

      <div className="tactr" style={{ padding: "32px 0" }}>
        <div style={{ fontWeight: 600 }}>You are logging in as</div>
        <h2>{display_name}</h2>
      </div>

      <MButton style={{ padding: "16px 52px" }}>View my library</MButton>
    </div>
  );
}
