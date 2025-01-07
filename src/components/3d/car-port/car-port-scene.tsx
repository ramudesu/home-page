import { Environment } from "@react-three/drei";
import BmwModel from "./bmw-model";
import CarPortModelImport from "./car-port-model-import";
import React from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { use3dReadyStore } from "@/stores/use-3d-ready-store";

gsap.registerPlugin(useGSAP);

type Props = {};

const CarPortScene = ({}: Props) => {
  const { isReady } = use3dReadyStore();
  const groupRef = React.useRef<Group>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    isReady();
  });

  return (
    <React.Fragment>
      <group ref={groupRef}>
        <CarPortModelImport />
        <BmwModel />
      </group>
      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
    </React.Fragment>
  );
};

export default CarPortScene;
