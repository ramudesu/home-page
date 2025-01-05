import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
import React from "react";
import BmwModel from "../bmw-model";
import CarPortModelImport from "../car-port/car-port-model-import";
import CanvasLoader from "../canvas-loader";

type Props = {};

const ViewCanvas = ({}: Props) => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false, preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        far: 200,
        near: 0.1,
      }}
    >
      <React.Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <CarPortModelImport />
        <BmwModel />
      </React.Suspense>

      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
      <Preload all />
    </Canvas>
  );
};

export default ViewCanvas;
