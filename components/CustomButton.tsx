import { CSSProperties, ReactElement } from "react";
import state from "@/store/index";
import { useSnapshot } from "valtio";

import { getContrastingColor } from "@/config/helpers";
import BouncingDotsLoader from "./BouncingDots";

type CustomButtonProps = {
  buttonTheme: String;
  title: String | ReactElement;
  customStyles: String;
  handleClick: Function;
  isLoader?: boolean;
};

export default function CustomButton({
  buttonTheme,
  title,
  customStyles,
  handleClick,
  isLoader,
}: CustomButtonProps) {
  const snap = useSnapshot(state);

  const generateStyle = (style: String): CSSProperties => {
    if (style === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (style === "outline") {
      return {
        borderWidth: "1.4px",
        borderColor: snap.color,
        color: snap.color,
        backgroundColor: getContrastingColor(snap.color) + "74",
      };
    }
    return {};
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(buttonTheme)}
      onClick={() => {
        handleClick();
      }}
    >
      {isLoader ? (
        <BouncingDotsLoader
          size="8px"
          color={getContrastingColor(state.color)}
        />
      ) : (
        title
      )}
    </button>
  );
}
