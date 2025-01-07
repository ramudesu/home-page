import { Canvas } from "@react-three/fiber";
import React from "react";
import CanvasLoader from "../canvas-loader";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
import FloatingCan from "./floating-can";

type Props = {};

const SodaCanCanvas = ({}: Props) => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{
        fov: 30,
      }}
    >
      <React.Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <FloatingCan scale={2} />
      </React.Suspense>

      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
      <Preload all />
    </Canvas>
  );
};

export default SodaCanCanvas;
