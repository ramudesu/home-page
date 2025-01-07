import React from "react";
import { Group } from "three";
import NewCarPort from "./new-car-port";

type Props = {
  scale?: number;
  children?: React.ReactNode;
};

const NewCarPortWrap = React.forwardRef<Group, Props>(
  ({ scale, children, ...props }, ref) => {
    return (
      <group ref={ref} {...props}>
        {children}
        <NewCarPort scale={scale} />
      </group>
    );
  },
);

export default NewCarPortWrap;
