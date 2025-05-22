import { useState } from "react";
import "./index.css";

import { Close } from "@icons/Close";

type TextProps = {
  icon?: React.ReactNode;
  state?: [string, React.Dispatch<React.SetStateAction<string>>];
} & JSX.IntrinsicElements["input"];

export function TextInput(props: TextProps) {
  const { icon, state, style, className, onChange, onInput, ...rest } = props;
  const local = useState("");

  const [value, setter] = state || local;

  const clssArr = ["text-input"];
  if (className) {
    clssArr.push(className);
  }

  function handleChanges(e: any) {
    setter(e.target.value);
  }

  return (
    <div className={clssArr.join(" ")} style={style}>
      <div className="icon flex aictr">{icon}</div>
      <input
        {...rest}
        onInput={(e) => {
          handleChanges(e);
          if (onInput) onInput(e);
        }}
        onChange={(e) => {
          handleChanges(e);
          if (onChange) onChange(e);
        }}
        value={value}
      />
      <div className="icon action">
        {!value || <Close className="clickable" onClick={() => setter("")} />}
      </div>
    </div>
  );
}
