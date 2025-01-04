import { Canvas } from "@react-three/fiber";

type Props = {};

const Cube = ({}: Props) => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      // className="fixed top-0 left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none z-[30]"
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{
        fov: 30,
      }}
    >
      <mesh rotation={[0.5, 0.5, 0]} position={[1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <ambientLight intensity={2} />
      <spotLight intensity={3} position={[1, 1, 1]} />
    </Canvas>
  );
};

export default Cube;
