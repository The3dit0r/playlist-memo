import "./index.css";

type Props = {
  hColor?: string;
  hBgColor?: string;
  color?: string;
  disabled?: boolean;
  active?: boolean;
} & JSX.IntrinsicElements["div"];

export default function MButton({
  children = <></>,
  className = "",
  color = "#fff",
  hColor = "#000",
  hBgColor = "#fff",
  disabled = false,
  active = false,
  style = {},
  ...divProps
}: Props) {
  className += " main-button half-bdrd";
  if (disabled) className += " disabled";
  if (active) className += " active";

  return (
    <div
      className={className}
      style={
        {
          "--c": color,
          "--hc": hColor,
          "--hbgc": hBgColor,

          ...style,
          justifyContent: "center",
        } as any
      }
      {...divProps}
    >
      {children}
    </div>
  );
}
