import { useGLTF } from "@react-three/drei";
import React from "react";
import { Group, Object3DEventMap } from "three";

type Props = {
  scale?: number;
};

useGLTF.preload("/models/bmw_m6_gran_coupe.glb");

const BmwModel = ({ scale = 0.35, ...props }: Props) => {
  const ref = React.useRef<Group<Object3DEventMap>>(null);

  const { scene } = useGLTF("/models/bmw_m6_gran_coupe.glb");

  return (
    <group
      ref={ref}
      dispose={null}
      // rotation={[0, Math.PI / 2, 0]}
      // position={[0, -0.75, 0]}
      {...props}
    >
      <primitive object={scene} scale={scale} position-y={0} rotation-y={0} />
    </group>
  );
};

export default BmwModel;
