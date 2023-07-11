import { Dispatch, SetStateAction } from "react";
import CustomButton from "./CustomButton";

type FilePickerProps = {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  readFile: (type: "logo" | "full") => void;
};

export default function FilePicker({
  file,
  setFile,
  readFile,
}: FilePickerProps) {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <label
          htmlFor="file-upload"
          className="filepicker-label"
          style={{
            backgroundColor: "#ffffff74",
          }}
        >
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs text-ellipsis">
          {file === undefined ? "No file selected" : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          title={"Logo"}
          buttonTheme="outline"
          handleClick={() => readFile("logo")}
          customStyles={"text-xs"}
        />
        <CustomButton
          title={"Full"}
          buttonTheme="filled"
          handleClick={() => readFile("full")}
          customStyles={"text-xs"}
        />
      </div>
    </div>
  );
}
