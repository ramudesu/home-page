import React from "react";
import TeslaScene from "@/components/3d/new-car-port/tesla-scene";
import { View } from "@react-three/drei";

type Props = {};

const CarPortPreview = ({}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-screen" ref={containerRef}>
      <View className="car-port-preview w-full h-full flex items-center justify-center">
        <TeslaScene scrollTriggerRef={containerRef} />
      </View>
    </div>
  );
};

export default CarPortPreview;
