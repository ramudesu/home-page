import React from "react";
import { Group } from "three";
import Tesla from "./tesla";

type Props = {
  scale?: number;
  children?: React.ReactNode;
};

const TeslaWrap = React.forwardRef<Group, Props>(
  ({ scale, children, ...props }, ref) => {
    return (
      <group ref={ref} {...props}>
        {children}
        <Tesla scale={scale} />
      </group>
    );
  },
);

export default TeslaWrap;
