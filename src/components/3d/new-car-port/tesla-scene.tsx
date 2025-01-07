import { Environment, OrbitControls } from "@react-three/drei";
import React from "react";
import TeslaModel from "./tesla-model";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  scrollTriggerRef: React.RefObject<HTMLDivElement>;
};

const TeslaScene = ({ scrollTriggerRef }: Props) => {
  const tesla1GroupRef = React.useRef<Group>(null);
  const [orbitable, setOrbitable] = React.useState(false);

  useGSAP(() => {
    if (!tesla1GroupRef.current) return;

    gsap.set(tesla1GroupRef.current.position, {
      x: -5,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTriggerRef.current,
        start: "bottom bottom",
        end: () => "+=" + window.innerHeight * 2,
        scrub: 1,
        pin: true,
        markers: true,
      },
    });

    scrollTl.to(tesla1GroupRef.current.position, {
      x: 0,
    });
  });

  return (
    <React.Fragment>
      <OrbitControls
        enableZoom={false}
        enableRotate={orbitable}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <TeslaModel groupRef={tesla1GroupRef} />
      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
    </React.Fragment>
  );
};

export default TeslaScene;
