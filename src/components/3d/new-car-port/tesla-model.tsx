import { useGLTF } from "@react-three/drei";
import React from "react";
import { Group } from "three";

type Props = {
  scale?: number;
};

useGLTF.preload("/models/new_car_port/tesla.gltf");

const TeslaModel = React.forwardRef<Group, Props>(
  ({ scale = 0.35, ...props }, ref) => {
    const { scene } = useGLTF("/models/new_car_port/tesla.gltf");

    return (
      <group
        ref={ref}
        dispose={null}
        // position={[0, -0.75, 0]}
        // rotation={[0, Math.PI / 2, 0]}
        {...props}
      >
        <group>
          <primitive
            object={scene}
            scale={scale}
            position-y={0}
            rotation-y={0}
          />
        </group>
      </group>
    );
  },
);

export default TeslaModel;
