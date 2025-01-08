import NewCarPortScene from "@/components/3d/new-car-port/new-car-port-scene";
import { AuroraBackground } from "@/components/aceternity-ui/aurora-background";
import HoverEffectButton from "@/components/hover-effect-button";
import { jsons } from "@/constants";
import { cn } from "@/lib/utils";
import { use3dReadyStore } from "@/stores/use-3d-ready-store";
import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import Lottie from "lottie-react";
import { RefreshCcw } from "lucide-react";
import React from "react";

gsap.registerPlugin(useGSAP);

type Props = {};

const HeroVer2 = ({}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [orbitable, setOrbitable] = React.useState(false);

  const { ready } = use3dReadyStore();

  useGSAP(
    () => {
      if (!ready) return;

      gsap.set("#shirokuma-power-name", {
        opacity: 1,
      });
      gsap.set("#shirokuma-power-welcome", {
        opacity: 1,
      });
      gsap.set("#shirokuma-power-description", {
        opacity: 1,
      });
      gsap.set("#hover-effect-button", {
        opacity: 1,
      });

      const tl = gsap.timeline({
        invalidateOnRefresh: true,
      });
      tl.from("#shirokuma-power-name > div", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        delay: 0.3,
        rotate: -25,
        scale: 1.3,
        ease: "back.out(3)",
      })
        .from(
          "#shirokuma-power-welcome .split-char",
          {
            opacity: 0,
            y: 40,
            stagger: 0.1,
          },
          // "+=0.5",
        )
        .from("#shirokuma-power-description", {
          opacity: 0,
          y: 30,
        })
        .from("#hover-effect-button", {
          opacity: 0,
          y: 30,
        });
    },
    { dependencies: [ready] },
  );

  return (
    <div className="w-full flex flex-col" ref={containerRef}>
      <View className="sticky top-0 -mt-[100vh] w-screen h-screen">
        <NewCarPortScene
          scrollTriggerRef={containerRef}
          orbitable={orbitable}
          setOrbitable={setOrbitable}
        />
      </View>

      <div className="grid">
        <AuroraBackground bgClassName="-scale-x-100" id="aurora-hero">
          <div className="w-full grid grid-cols-2 z-[80]">
            <div className="relative flex items-start justify-center flex-col gap-4 px-4 pl-20">
              <div
                id="shirokuma-power-name"
                className="flex items-center text-7xl font-bold dark:text-white opacity-0"
              >
                <div>しろくま</div>
                <div className="h-[4.5rem] aspect-square overflow-hidden">
                  <Lottie
                    animationData={jsons.shirokuma02}
                    className="object-cover -rotate-[34deg] scale-110"
                  />
                </div>
                <div className="text-blue-500">電力</div>
                <div className="h-[4.5rem] aspect-square overflow-hidden">
                  <Lottie
                    animationData={jsons.light}
                    className="object-cover scale-150"
                  />
                </div>
              </div>
              <div
                id="shirokuma-power-welcome"
                className="text-5xl font-bold opacity-0"
              >
                {["へ", "よ", "う", "こ", "そ"].map((char, i) => (
                  <span
                    key={i}
                    className={cn("split-char", i > 0 && "text-sky-500")}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <div
                id="shirokuma-power-description"
                className="font-extralight text-2xl dark:text-neutral-200 py-4 opacity-0"
              >
                日本だけではなく、世界でいちばん安い電気を提供します。
              </div>
              <HoverEffectButton
                id="hover-effect-button"
                className="shadow-md opacity-0"
                textClassName="text-lg font-bold"
              >
                <React.Fragment>始めよう</React.Fragment>
              </HoverEffectButton>
            </div>
          </div>
        </AuroraBackground>
        <div className="w-full h-screen bg-zinc-50 flex flex-col items-center">
          <div className="flex-1" />
          <div className="relative w-full">
            {orbitable && (
              <div className="z-[80] absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-center">
                <RefreshCcw
                  className="w-10 h-10 text-black/85 rotate-[60deg]"
                  strokeWidth={3}
                  style={{
                    transform: "rotate(60deg)",
                  }}
                />
                <p className="font-semibold text-black/85 mt-4">
                  モデルにクリック、回転できます〜
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVer2;
