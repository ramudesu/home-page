import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/soda-can/Soda-can.gltf");

const flavorTextures = {
  lemonLime: "/models/soda-can/labels/lemon-lime.png",
  grape: "/models/soda-can/labels/grape.png",
  blackCherry: "/models/soda-can/labels/cherry.png",
  strawberryLemonade: "/models/soda-can/labels/strawberry.png",
  watermelon: "/models/soda-can/labels/watermelon.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanModelProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCanModel({
  flavor = "blackCherry",
  scale = 2,
  ...props
}: SodaCanModelProps) {
  const { nodes } = useGLTF("/models/soda-can/Soda-can.gltf");

  const labels = useTexture(flavorTextures);

  // Fixes upside down labels
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
