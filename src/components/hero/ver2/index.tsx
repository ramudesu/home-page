import { AuroraBackground } from "@/components/aceternity-ui/aurora-background";
import GlobalScrollDown from "@/components/hoc/global-scroll-down";
import HoverEffectButton from "@/components/hover-effect-button";
import { jsons } from "@/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lottie from "lottie-react";
import React from "react";

gsap.registerPlugin(useGSAP);

type Props = {};

const HeroVer2 = ({}: Props) => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set("#shirokuma-power-name", {
      opacity: 1,
    })
      .from("#shirokuma-power-name > div", {
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
  });

  return (
    <AuroraBackground className="items-start justify-center">
      <div className="w-full grid grid-cols-2">
        <div className="relative flex flex-col gap-4 px-4 pl-20">
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
          <div id="shirokuma-power-welcome" className="text-5xl font-bold">
            {["へ", "よ", "う", "こ", "そ"].map((char, i) => (
              <span
                key={i}
                className={cn("split-char", i > 0 && "text-sky-500")}
              >
                {char}
              </span>
            ))}
            {/* <span className={cn("split-char", "")}>へ</span>
            <span className={cn("split-char", "text-blue-400")}>よ</span>
            <span className={cn("split-char", "text-blue-400")}>う</span>
            <span className={cn("split-char", "text-blue-400")}>こ</span>
            <span className={cn("split-char", "text-blue-400")}>そ</span> */}
          </div>
          <div
            id="shirokuma-power-description"
            className="font-extralight text-2xl dark:text-neutral-200 py-4"
          >
            日本だけではなく、世界でいちばん安い電気を提供します。
          </div>
          <HoverEffectButton
            id="hover-effect-button"
            className="shadow-md"
            textClassName="text-lg font-bold"
          >
            <React.Fragment>始めよう</React.Fragment>
          </HoverEffectButton>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default GlobalScrollDown(HeroVer2, "black");
