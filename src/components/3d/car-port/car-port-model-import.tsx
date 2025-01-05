import { useGLTF } from "@react-three/drei";
import React from "react";
import { Group, Object3DEventMap } from "three";

type Props = {};

const CarPortModelImport = (props: Props) => {
  const ref = React.useRef<Group<Object3DEventMap>>(null);

  const { scene } = useGLTF("/models/car_port/Main.gltf");

  return (
    <group
      ref={ref}
      dispose={null}
      {...props}
      rotation={[0, Math.PI, 0]}
      position={[10, -3, 45]}
    >
      <primitive object={scene} scale={2} position-y={0} rotation-y={0} />
    </group>
  );
};

useGLTF.preload("/models/car_port/Main.gltf");

export default CarPortModelImport;
