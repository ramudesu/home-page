import { Environment, OrbitControls } from "@react-three/drei";
import FloatingCan from "./floating-can";
import React from "react";
import { Group } from "three";

type Props = {};

const SodaCanScene = ({}: Props) => {
  const groupRef = React.useRef<Group>(null);

  return (
    <React.Fragment>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
      <group ref={groupRef}>
        <FloatingCan scale={2} />
      </group>
      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
    </React.Fragment>
  );
};

export default SodaCanScene;
