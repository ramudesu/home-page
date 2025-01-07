import { useAnimations, useGLTF } from "@react-three/drei";
import React from "react";
import { Group, Object3DEventMap } from "three";
// import * as THREE from "three";

type Props = {};

useGLTF.preload("/models/polar.glb");

const PolarBearModel = ({ ...props }: Props) => {
  const ref = React.useRef<Group<Object3DEventMap>>(null);

  const { scene, animations } = useGLTF("/models/polar.glb");

  const { actions } = useAnimations(animations, ref);

  React.useEffect(() => {
    const action = actions["Urso_RIG|Urso_RIGAction"];

    if (action) {
      action.play();
    }
  }, []);

  return (
    <group ref={ref} dispose={null} {...props} position={[0, -0.3, 1.05]}>
      <primitive object={scene} scale={0.005} position-y={0} rotation-y={0} />
    </group>
  );
};

export default PolarBearModel;
