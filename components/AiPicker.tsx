"use client";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  useRef,
  CSSProperties,
} from "react";
import CustomButton from "./CustomButton";

import state from "@/store";
import { useSnapshot } from "valtio";
import { Tooltip } from "react-tooltip";
import BouncingDotsLoader from "./BouncingDots";
import { getContrastingColor } from "@/config/helpers";

export default function AiPicker({
  handleDecal,
}: {
  handleDecal: (type: "logo" | "full", result: String) => void;
}) {
  const snap = useSnapshot(state);
  const serverRef = useRef<HTMLTextAreaElement>(null);
  const aiRef = useRef<HTMLTextAreaElement>(null);
  const [changingServer, setChangingServer] = useState(false);
  const [selected, setSelected] = useState(-1);

  const handleGenerate = () => {
    state.generatingImage = true;
    if (aiRef.current !== null && aiRef.current.value !== null) {
      const imgResp = fetch(state.backend_url + "/generate", {
        method: "POST",
        body: JSON.stringify({
          text: aiRef.current.value,
          num_images: 4,
          steps: 50,
        }),
      }).then(async (resp) => {
        if (!resp.ok && snap.generatingImage) {
          alert("Something went wrong");
          state.generatingImage = false;
          return;
        }
        const data = await resp.json();
        // @ts-ignore
        state.images = data["generatedImgs"].map(
          (img: string) => "data:image/png;base64," + img
        );
        state.generatingImage = false;
      });
    }
  };

  const changeServer = () => {
    if (serverRef.current != null && serverRef.current.value != null) {
      const backend_url = serverRef.current!.value!;
      const status = fetch(backend_url).then((resp) => {
        //@ts-ignore
        if (resp.status !== 200) {
          alert("Error fetching server");
          setChangingServer(false);
          return "error";
        }
        state.backend_url = backend_url;
        setChangingServer(false);
        return "ok";
      });
      setChangingServer(true);
    }
  };

  let child;

  if (!child && state.images.length !== 0) {
    let k = 0;
    const color = snap.color.toLowerCase();
    const selectedStyle: CSSProperties = {
      boxShadow: "0 0 3px 3px " + color,
    };
    const imgMap = state.images.map((image) => [image, k++]);
    child = (
      <div key="img_div">
        <div className="flex flex-wrap gap-2 justify-center">
          {imgMap.map((img) => {
            // @ts-ignore
            return (
              <img
                key={img[1]}
                // @ts-ignore
                src={img[0]}
                className={`w-[70px] h-[70px] `}
                style={selected == img[1] ? selectedStyle : {}}
                onClick={() => {
                  if (selected == img[1]) {
                    setSelected(-1);
                  } else {
                    setSelected(img[1]);
                  }
                }}
              ></img>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <CustomButton
            title={"Logo"}
            buttonTheme="outline"
            handleClick={() => {
              if (selected == -1) {
                alert("Please select a image");
                return;
              }
              handleDecal("logo", snap.images[selected]);
            }}
            customStyles={"text-xs"}
          />
          <CustomButton
            title={"Full"}
            buttonTheme="filled"
            handleClick={() => {
              if (selected == -1) {
                alert("Please select a image");
                return;
              }
              handleDecal("full", snap.images[selected]);
            }}
            customStyles={"text-xs"}
          />
        </div>
        <div className="flex justify-center align-middle mt-2">
          <CustomButton
            key={"new_prompt"}
            title={"New Prompt"}
            buttonTheme={"filled"}
            customStyles={"text-xs"}
            handleClick={() => {
              state.images = [];
            }}
          />
        </div>
      </div>
    );
  }
  if (!child && snap.generatingImage) {
    child = (
      <div
        key={"img_select_div"}
        className="flex flex-col w-full h-full justify-evenly content-center"
      >
        <BouncingDotsLoader size="14px" color={state.color} />
      </div>
    );
  }

  if (!child && state.backend_url === "") {
    child = (
      <div
        key={"server_select_div"}
        className={"flex flex-col align-middle w-full"}
      >
        <textarea
          key="server_ta"
          ref={serverRef}
          className="text-sm h-[130px] rounded-lg bg-white/40 border-black/25 border resize-none px-4 py-2"
          placeholder="Enter the https://xxxxx.trycloudflare.com link"
        />
        <div className="flex flex-wrap gap-3 mt-[14px]">
          <CustomButton
            key={"colab"}
            buttonTheme="filled"
            title="To Google Colab"
            customStyles={"colab_button text-[12px] max-w-max"}
            handleClick={() => {
              window.open(
                "https://colab.research.google.com/drive/1HXtYYa6crWPIKLuGliQ95WnOpJSVX2DD?usp=sharing",
                "_blank"
              );
            }}
          />
          <CustomButton
            key={"conn_server"}
            buttonTheme="filled"
            isLoader={changingServer}
            title={"Change Server"}
            customStyles={"text-[12px] server_button"}
            handleClick={() => {
              changeServer();
            }}
          />
        </div>
      </div>
    );
  }

  if (!child && state.images.length == 0) {
    child = (
      <div
        key={"promt_select_div"}
        className={"flex flex-col align-middle w-full"}
      >
        <textarea
          key="ai_ta"
          ref={aiRef}
          className="text-sm h-[130px] rounded-lg bg-white/40 border-black/25 border resize-none px-4 py-2"
          placeholder="Enter your AI prompt..."
        />
        <div className="flex flex-wrap gap-3 mt-[14px]">
          <CustomButton
            key={"img"}
            buttonTheme="filled"
            title="Generate Image"
            customStyles={"text-[12px] max-w-max"}
            handleClick={() => {
              handleGenerate();
            }}
          />
          <CustomButton
            key={"dc_server"}
            buttonTheme="filled"
            title={"Disconnect Server"}
            customStyles={"text-[12px] server_button"}
            handleClick={() => {
              state.backend_url = "";
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="aipicker-container">
      <Tooltip
        anchorSelect={".colab_button"}
        place="bottom"
        style={{ width: "100%" }}
      >
        We unfortunately don't provide a image generation ai. You can set one up
        yourself by clicking on this button. It will redirect you to a google
        colab page, kindly follow the instructions there.
      </Tooltip>
      <Tooltip
        anchorSelect={".server_button"}
        style={{ width: "100%" }}
        place="bottom"
      >
        {state.backend_url === ""
          ? "You are not currently connected to any server."
          : `Change the existing server from ${state.backend_url}`}
      </Tooltip>
      {child}
    </div>
  );
}
