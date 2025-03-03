type Props = {
  image?: string;
  name: React.ReactNode;
  subtext: React.ReactNode;
  roundCover?: boolean;
  others?: React.ReactNode;
  height?: number;
} & JSX.IntrinsicElements["div"];

export default function RowItem(props: Props) {
  const {
    className,
    roundCover,
    style,
    others,
    name,
    image,
    subtext,
    height = 32,
    ...divProps
  } = props;

  const clssArr = ["flex aictr"];
  if (className) {
    clssArr.push(className);
  }

  return (
    <div
      style={{
        padding: "6px",
        gap: 8,
        height: height,

        ...style,
      }}
      className={clssArr.join(" ")}
      {...divProps}
    >
      {!image || (
        <img
          src={image}
          width={height}
          height={height}
          style={{ objectFit: "cover", borderRadius: roundCover ? 120 : 8 }}
        />
      )}
      <div className="info flex-1">
        <div style={{ fontWeight: "600" }} className="line-ellip">
          {name || "Unnamed"}
        </div>
        <div className="subtext line-ellip">{subtext}</div>
      </div>

      <div className="others" style={{ paddingLeft: 10 }}>
        {others}
      </div>
    </div>
  );
}
