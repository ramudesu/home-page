import { useGLTF } from "@react-three/drei";
import React from "react";
import { Group } from "three";

type Props = {
  scale?: number;
};

useGLTF.preload("/models/new_car_port/new-car-port.gltf");

const NewCarPortModel = React.forwardRef<Group, Props>(
  ({ scale = 0.005, ...props }, ref) => {
    const { scene } = useGLTF("/models/new_car_port/new-car-port.gltf");

    return (
      <group
        ref={ref}
        dispose={null}
        position={[1.5, 0, 0]}
        rotation={[Math.PI, -(Math.PI * 3) / 8, Math.PI / 2]}
        {...props}
      >
        <primitive object={scene} scale={scale} position-y={0} rotation-y={0} />
      </group>
    );
  },
);

export default NewCarPortModel;
