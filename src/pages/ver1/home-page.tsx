import HeroVer1 from "@/components/hero/ver1";
import HeroVer2 from "@/components/hero/ver2";
import ParallaxVer1 from "@/components/parallax/ver1";
import ComparisonSection from "@/components/testing/comparison-section";

type Props = {};

const HomePage = ({}: Props) => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroVer2 />
      <HeroVer1 />
      <ParallaxVer1 />
      <ComparisonSection />
    </div>
  );
};

export default HomePage;
