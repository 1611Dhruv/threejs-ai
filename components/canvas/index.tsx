"use client";
import { Canvas } from "@react-three/fiber";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { Center, Environment } from "@react-three/drei";

export function CanvasModel() {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 0],
        fov: 25,
      }}
      gl={{
        preserveDrawingBuffer: true,
      }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
}
