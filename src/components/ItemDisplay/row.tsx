type Props = {
  image?: string;
  name: string;
  subtext: string;
} & JSX.IntrinsicElements["div"];

export default function RowItem(props: Props) {
  const { className, style, name, image, subtext, ...divProps } = props;

  const clssArr = ["flex aictr"];
  if (className) {
    clssArr.push(className);
  }

  return (
    <div
      style={{
        padding: "6px",
        gap: 8,

        ...style,
      }}
      className={clssArr.join(" ")}
      {...divProps}
    >
      {!image || (
        <img
          src={image}
          width={64}
          height={64}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      )}
      <div className="info">
        <div style={{ fontWeight: "600" }} className="line-ellip">
          {name || "Unnamed"}
        </div>
        <div className="subtext line-ellip">{subtext}</div>
      </div>
    </div>
  );
}
