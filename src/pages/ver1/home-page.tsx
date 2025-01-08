import ViewCanvas from "@/components/3d/canvas/view-canvas";
import HeroVer1 from "@/components/hero/ver1";
import HeroVer2 from "@/components/hero/ver2";
import ParallaxVer1 from "@/components/parallax/ver1";
import TestingSection from "@/components/testing/testing-section";
import { useDocumentTitle } from "usehooks-ts";

type Props = {};

const HomePage = ({}: Props) => {
  useDocumentTitle("Shirokuma Corp Home Page | Sample");

  return (
    <div className="w-full">
      <HeroVer2 />
      {/* <HeroVer3 /> */}
      <HeroVer1 />
      <ParallaxVer1 />
      <TestingSection />
      <ViewCanvas />
    </div>
  );
};

export default HomePage;
