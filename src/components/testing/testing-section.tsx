import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../aceternity-ui/text-reveal-card";
import { images, jsons } from "@/constants";
import { Compare } from "../aceternity-ui/compare";
import Lottie from "lottie-react";
import { HoverEffect } from "../aceternity-ui/card-hover-effect";
import React from "react";
import { HoverBorderGradient } from "../aceternity-ui/hover-border-gradient";
import { Button as MovingBorderButton } from "../aceternity-ui/moving-border";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMounted } from "usehooks-ts";
import { BentoGridDemo } from "./bento-grid-demo";
import { InfiniteMovingCardsDemo } from "../aceternity-ui/demo/infinite-moving-card-demo";
import { LensDemo } from "../aceternity-ui/demo/lens-demo";
import { Separator } from "../ui/separator";
import { TimelineDemo } from "../aceternity-ui/demo/timeline-demo";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

const TestingSection = ({}: Props) => {
  const isMounted = useIsMounted();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const leftSectionRef = React.useRef<HTMLDivElement>(null);
  const rightSectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isMounted) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftSectionRef.current,
    });

    // Clean up on unmount
    return () => {
      scrollTriggerInstance.kill();
    };
  }, [isMounted]);

  return (
    <React.Fragment>
      <div
        ref={scrollRef}
        className="w-full flex items-stretch justify-start *:flex-shrink-0"
      >
        <div ref={leftSectionRef} className="w-1/2">
          <div className="w-full h-screen relative">
            <Compare
              firstImage={images.side_01}
              secondImage={images.side_02}
              firstImageClassName="w-full h-full object-cover object-left-top rounded-none"
              secondImageClassname="w-full h-full object-cover object-left-top rounded-none"
              className="w-full h-full rounded-none pointer-events-none"
              slideMode="drag"
              autoplay={true}
              autoplayDuration={5000}
              showHandlebar={false}
              initialSliderPercentage={0}
            />
            <div className="absolute bottom-[2.4rem] right-0 translate-x-1/2 z-50">
              <Lottie
                animationData={jsons.shirokuma02}
                className="h-[12em] -rotate-[34deg]"
              />
            </div>
          </div>
        </div>
        <div ref={rightSectionRef} className="w-1/2 py-10 px-20 z-50">
          <h2 className="font-bold text-xl uppercase text-black/85 mb-4">
            hover to reveal text
          </h2>
          <div className="w-full flex items-center justify-center">
            <TextRevealCard
              text={"1000円"}
              revealText={"0円"}
              className="w-full"
            >
              <TextRevealCardTitle>
                Sometimes, you just need to see it.
              </TextRevealCardTitle>
              <TextRevealCardDescription>
                This is a text reveal card. Hover over the card to reveal the
                hidden text.
              </TextRevealCardDescription>
            </TextRevealCard>
          </div>
          <Separator className="my-6" />
          <h2 className="font-bold text-xl uppercase text-black/85 mb-4">
            Card Hover Effect
          </h2>
          <HoverEffect items={projects} className="py-0" />
          <Separator className="my-6" />
          <div className="flex flex-row">
            <div className="basis-1/2 flex flex-col">
              <h2 className="font-bold text-xl uppercase text-black/85 mb-4">
                Hover Border Gradient
              </h2>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <span>Aceternity UI</span>
              </HoverBorderGradient>
            </div>
            <div>
              <h2 className="font-bold text-xl uppercase text-black/85 mb-4">
                Moving Border Button
              </h2>
              <MovingBorderButton
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Borders are cool
              </MovingBorderButton>
            </div>
          </div>
          <Separator className="my-6" />
          <h2 className="font-bold text-xl uppercase text-black/85 mb-4">
            Bento grid demo
          </h2>
          <BentoGridDemo />
        </div>
      </div>
      <div className="w-full min-h-screen">
        <InfiniteMovingCardsDemo />
        <Separator />
        <LensDemo />
        <TimelineDemo />
        {/* <TracingBeamDemo /> */}
      </div>
    </React.Fragment>
  );
};

export default TestingSection;
