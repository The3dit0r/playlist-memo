import { FaPause, FaPlay } from "react-icons/fa";

type Props = {
  size?: number;
  playing?: boolean;
  bgcolor?: string;
  color?: string;
} & JSX.IntrinsicElements["div"];

export default function PlayButton(props: Props) {
  const {
    size = 60,
    playing = false,
    bgcolor = "var(--caccent)",
    color = "#fff",
    className,
    style,

    ...rest
  } = props;

  const clssArr = ["flex aictr jcctr clickable"];
  if (className) clssArr.push(className);

  const iconSize = Math.max(8, size * 0.38);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgcolor,
        borderRadius: 12,
        color,

        ...style,
      }}
      className={clssArr.join(" ")}
      {...rest}
    >
      {!playing ? (
        <FaPlay size={iconSize} style={{ marginLeft: 4 }} />
      ) : (
        <FaPause size={iconSize} />
      )}
    </div>
  );
}
