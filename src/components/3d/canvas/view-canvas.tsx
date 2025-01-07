import { Canvas } from "@react-three/fiber";
import { View, Loader } from "@react-three/drei";
import React from "react";

type Props = {};

const ViewCanvas = ({}: Props) => {
  return (
    <React.Fragment>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{
          fov: 30,
        }}
      >
        <React.Suspense fallback={null}>
          <View.Port />
        </React.Suspense>
      </Canvas>
      <Loader />
    </React.Fragment>
  );
};

export default ViewCanvas;
