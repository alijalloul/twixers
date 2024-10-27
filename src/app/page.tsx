"use client";

import Model from "@/components/Model/Model";
import { useState } from "react";
import { SketchPicker } from "react-color";

import DragDrop from "@/components/DragDrop";
import Slider from "@/components/Model/_components/Slider";
import ModelContext, {
  MeshType,
  ModelInfo,
  TextureSettings,
} from "@/libs/ModelContext";

export default function Home() {
  const [selectedMesh, setSelectedMesh] = useState<MeshType>("mainBody");
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  const [modelInfo, setModelInfo] = useState<ModelInfo>({
    mainBody: "#000000",
    insideBody: "#757575",
    soles: "#FFFFFF",
    insideSoles: "#606060",
    smallFlop: "#000000",
    bigFlop: "#C4C4C4",
    laces: "#000000",
    texture: null,
  });

  const [textureSettings, setTextureSettings] = useState<TextureSettings>({
    xPos: -0.05,
    yPos: 0.05,
    xRotation: 0,
    yRotation: 0,
    scale: 0.15,
  });

  const onChangeMethod = (color: any) => {
    setModelInfo((prev) => ({
      ...prev,
      [selectedMesh]: color.hex,
    }));
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      const url = URL.createObjectURL(selectedFile);
      setTextureUrl(url);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        modelInfo,
        setModelInfo,
        selectedMesh,
        setSelectedMesh,
        textureUrl,
        setTextureUrl,
        textureSettings,
        setTextureSettings,
      }}
    >
      <div className="w-[95%]  flex justify-between items-center ">
        <div className="w-1/5 flex flex-col justify-center items-center space-y-5">
          <SketchPicker
            color={modelInfo[selectedMesh]}
            onChange={onChangeMethod}
          />

          <div className="w-full">
            <h1>Upload Texture</h1>
            <DragDrop onDrop={handleDrop} />
          </div>

          <div className="flex flex-col justify-between items-center space-y-4 w-full">
            <Slider
              text="xPos"
              value={textureSettings.xPos}
              setValue={(value) =>
                setTextureSettings((prev) => ({ ...prev, xPos: value }))
              }
            />
            <Slider
              text="yPos"
              value={textureSettings.yPos}
              setValue={(value) =>
                setTextureSettings((prev) => ({ ...prev, yPos: value }))
              }
            />
            <Slider
              text="x rotation"
              value={textureSettings.xRotation}
              setValue={(value) =>
                setTextureSettings((prev) => ({ ...prev, xRotation: value }))
              }
            />
            <Slider
              text="y rotation"
              value={textureSettings.yRotation}
              setValue={(value) =>
                setTextureSettings((prev) => ({ ...prev, yRotation: value }))
              }
            />
            <Slider
              text="scale"
              value={textureSettings.scale}
              setValue={(value) =>
                setTextureSettings((prev) => ({ ...prev, scale: value }))
              }
            />
          </div>
        </div>

        <div className="w-1/2">
          <Model className=" w-full h-full py-14 sm:py-10 sm:px-10 px-5" />
        </div>

        <div className="w-1/5 self-center flex-col justify-between items-center space-y-5">
          {[
            "mainBody",
            "insideBody",
            "soles",
            "insideSoles",
            "smallFlop",
            "bigFlop",
            "laces",
          ].map((meshName, index) => (
            <button
              key={index}
              onClick={() => setSelectedMesh(meshName as MeshType)}
              className={`w-full py-3 rounded-lg border shadow-md transition-all duration-200 ease-in-out ${
                selectedMesh === meshName
                  ? "bg-sky-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {meshName}
            </button>
          ))}
        </div>
      </div>
    </ModelContext.Provider>
  );
}
