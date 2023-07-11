import { CSSProperties } from "react";

const BouncingDotsLoader = ({
  color,
  size,
}: {
  color: string;
  size: string;
}) => {
  const dotStyle: CSSProperties = {
    width: size,
    height: size,
    margin: "2px 2px",
    borderRadius: "50%",
    backgroundColor: color,
    opacity: "1",
    animation: "bouncing-loader 0.5s infinite alternate",
  };
  return (
    <div className="bouncing-loader h-min">
      <div style={dotStyle}></div>
      <div style={{ ...dotStyle, ...{ animationDelay: "0.2s" } }}></div>
      <div style={{ ...dotStyle, ...{ animationDelay: "0.4s" } }}></div>
    </div>
  );
};

export default BouncingDotsLoader;
