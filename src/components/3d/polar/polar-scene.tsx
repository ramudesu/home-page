import { Environment } from "@react-three/drei";
import React from "react";
import PolarBearModel from "./polar-bear-model";
import { Group } from "three";

type Props = {};

const PolarScene = ({}: Props) => {
  const groupRef = React.useRef<Group>(null);

  return (
    <React.Fragment>
      <group ref={groupRef}>
        <PolarBearModel />
      </group>
      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
    </React.Fragment>
  );
};

export default PolarScene;
