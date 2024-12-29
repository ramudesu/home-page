import HeroVer1 from "@/components/hero/ver1";
import ParallaxVer1 from "@/components/parallax/ver1";

type Props = {};

const HomePage = ({}: Props) => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroVer1 />
      <ParallaxVer1 />
    </div>
  );
};

export default HomePage;
