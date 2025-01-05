import { useGLTF } from "@react-three/drei";
import React from "react";
import { Group, Object3DEventMap } from "three";

type Props = {};

const BmwModel = ({ ...props }: Props) => {
  const ref = React.useRef<Group<Object3DEventMap>>(null);

  const { scene } = useGLTF("/models/bmw_m6_gran_coupe.glb");

  return (
    <group
      ref={ref}
      dispose={null}
      {...props}
      rotation={[0, Math.PI / 2, 0]}
      position={[0, -0.75, 1.2]}
    >
      <primitive object={scene} scale={0.5} position-y={0} rotation-y={0} />
    </group>
  );
};

useGLTF.preload("/models/bmw_m6_gran_coupe.glb");

export default BmwModel;
