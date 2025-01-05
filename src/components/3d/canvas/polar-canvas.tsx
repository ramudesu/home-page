import { Canvas } from "@react-three/fiber";
import React from "react";
import PolarBearModel from "../polar-bear-model";
import { Environment, Preload } from "@react-three/drei";
import CanvasLoader from "../canvas-loader";

type Props = {};

const PolarCanvas = ({}: Props) => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
      shadows
      camera={{
        fov: 45,
        far: 200,
        near: 0.1,
      }}
    >
      <React.Suspense fallback={<CanvasLoader />}>
        <PolarBearModel />
      </React.Suspense>
      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
      <Preload all />
    </Canvas>
  );
};

export default PolarCanvas;
