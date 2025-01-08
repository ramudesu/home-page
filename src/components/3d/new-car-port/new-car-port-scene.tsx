import { Environment, Float, OrbitControls } from "@react-three/drei";
import React from "react";
import { use3dReadyStore } from "@/stores/use-3d-ready-store";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewCarPortWrap from "./new-car-port-wrap";
import TeslaWrap from "./tesla-wrap";
import { useThree } from "@react-three/fiber";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  scrollTriggerRef: React.RefObject<HTMLDivElement>;
  orbitable: boolean;
  setOrbitable: (value: boolean) => void;
};

const NewCarPortScene = ({
  scrollTriggerRef,
  orbitable,
  setOrbitable,
}: Props) => {
  const { camera, gl } = useThree();

  const initialPosition = React.useMemo(() => camera.position.clone(), []);
  const initialRotation = React.useMemo(() => camera.rotation.clone(), []);

  const carPort1GroupRef = React.useRef<Group>(null);
  // const carPort2GroupRef = React.useRef<Group>(null);
  // const carPort3GroupRef = React.useRef<Group>(null);

  const tesla1GroupRef = React.useRef<Group>(null);
  const tesla2GroupRef = React.useRef<Group>(null);
  const tesla3GroupRef = React.useRef<Group>(null);
  const tesla4GroupRef = React.useRef<Group>(null);

  const finishScrollRef = React.useRef<boolean>(false);

  const [floatable, setFloatable] = React.useState(true);

  const { isReady } = use3dReadyStore();

  useGSAP(
    () => {
      if (
        !carPort1GroupRef.current ||
        !tesla1GroupRef.current ||
        !tesla2GroupRef.current ||
        !tesla3GroupRef.current ||
        !tesla4GroupRef.current ||
        !scrollTriggerRef.current
      )
        return;

      isReady();

      // * Car Port 1
      gsap.set(carPort1GroupRef.current.scale, {
        x: 0.005,
        y: 0.005,
        z: 0.005,
      });
      gsap.set(carPort1GroupRef.current.rotation, {
        x: Math.PI,
        y: -(Math.PI * 3) / 8,
        z: Math.PI / 2,
      });
      gsap.set(carPort1GroupRef.current.position, {
        x: 1.75,
        y: 0,
        z: 0,
      });

      // * Tesla 1
      gsap.set(tesla1GroupRef.current.position, {
        x: -5,
        y: -0.5,
        z: 0.55,
      });
      gsap.set(tesla1GroupRef.current.scale, {
        x: 0.35,
        y: 0.35,
        z: 0.35,
      });
      gsap.set(tesla1GroupRef.current.rotation, {
        y: -Math.PI / 2,
      });

      // * Tesla 2
      gsap.set(tesla2GroupRef.current.position, {
        x: 5,
        y: -0.5,
        z: 0.55,
      });
      gsap.set(tesla2GroupRef.current.scale, {
        x: 0.35,
        y: 0.35,
        z: 0.35,
      });
      gsap.set(tesla2GroupRef.current.rotation, {
        y: Math.PI / 2,
      });

      // * Tesla 3
      gsap.set(tesla3GroupRef.current.position, {
        x: -5,
        y: -0.5,
        z: -1.55,
      });
      gsap.set(tesla3GroupRef.current.scale, {
        x: 0.35,
        y: 0.35,
        z: 0.35,
      });
      gsap.set(tesla3GroupRef.current.rotation, {
        y: -Math.PI / 2,
      });

      // * Tesla 4
      gsap.set(tesla4GroupRef.current.position, {
        x: 5,
        y: -0.5,
        z: -1.55,
      });
      gsap.set(tesla4GroupRef.current.scale, {
        x: 0.35,
        y: 0.35,
        z: 0.35,
      });
      gsap.set(tesla4GroupRef.current.rotation, {
        y: Math.PI / 2,
      });

      const scrollTl = gsap.timeline({
        invalidateOnRefresh: true,
        defaults: {
          duration: 3,
        },
        onStart: () => {
          setFloatable(false);
        },
        onReverseComplete: () => {
          setFloatable(true);
        },
      });

      scrollTl
        .to(carPort1GroupRef.current.position, {
          x: 0,
          y: -0.5,
          z: -0.5,
        })
        .to(carPort1GroupRef.current.rotation, {
          x: 0,
          y: -Math.PI / 2,
          z: 0,
        })
        .to(tesla1GroupRef.current.position, {
          x: -1,
        })
        .to(tesla2GroupRef.current.position, {
          x: 1,
        })
        .to(tesla3GroupRef.current.position, {
          x: -1,
        })
        .to(tesla4GroupRef.current.position, {
          x: 1,
        });

      const scrollTriggerInstance = ScrollTrigger.create({
        animation: scrollTl,
        trigger: scrollTriggerRef.current,
        start: "top top",
        end: () => "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (
            window.scrollY > 20 &&
            window.scrollY < self.end - 50 &&
            finishScrollRef.current
          ) {
            // Only call once the user was scrolling up since finished
            if (orbitable) {
              setOrbitable(false);
            }

            // Reset position in case user has rotate the models
            camera.position.copy(initialPosition);
            camera.rotation.copy(initialRotation);
            camera.updateProjectionMatrix();
            gl.domElement.dispatchEvent(new Event("change")); // Trigger OrbitControls update

            finishScrollRef.current = false;
          } else if (window.scrollY >= self.end) {
            finishScrollRef.current = true;

            if (!orbitable) {
              setOrbitable(true);
            }
          }
        },
      });

      return () => {
        scrollTriggerInstance.kill();
        scrollTl.kill();
      };
    },
    { dependencies: [orbitable, camera, gl] },
  );

  return (
    <group>
      <OrbitControls
        enableRotate={orbitable}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableDamping={false}
        enablePan={false}
      />
      <Float
        speed={floatable ? 1.5 : 0} // Animation speed, defaults to 1
        rotationIntensity={floatable ? 0.1 : 0} // XYZ rotation intensity, defaults to 1
        floatIntensity={floatable ? 0.1 : 0} // Up/down float intensity, works like a multiplier with floatingRange, defaults to 1
        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <NewCarPortWrap ref={carPort1GroupRef} />
      </Float>
      {/* <NewCarPortModel groupRef={carPort2GroupRef} />
      <NewCarPortModel groupRef={carPort3GroupRef} /> */}
      <TeslaWrap ref={tesla1GroupRef} />
      <TeslaWrap ref={tesla2GroupRef} />
      <TeslaWrap ref={tesla3GroupRef} />
      <TeslaWrap ref={tesla4GroupRef} />

      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
    </group>
  );
};

export default NewCarPortScene;
