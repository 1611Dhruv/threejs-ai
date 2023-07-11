import { useSnapshot } from "valtio";
import state from "@/store";
import { CSSProperties, Key } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

type TabProps = {
  tab: {
    name: Key;
    icon: StaticImageData;
  };
  handleClick: Function;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
};

export default function Tab({
  tab,
  handleClick,
  isFilterTab = false,
  isActiveTab = false,
}: TabProps) {
  const snap = useSnapshot(state);
  const activeCondition = isFilterTab && isActiveTab;
  const activeStyles: CSSProperties = activeCondition
    ? { backgroundColor: snap.color + "bf" }
    : {
        backgroundColor: "transparent",
        opacity: 1,
      };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      }`}
      onClick={() => {
        handleClick();
      }}
      style={activeStyles}
    >
      <Image
        src={tab.icon}
        alt={tab.name.toString()}
        className={`${
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12,h-11/12 object-contain"
        }`}
      />
    </div>
  );
}
