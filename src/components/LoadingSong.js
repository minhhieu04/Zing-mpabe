import React, { memo } from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingSong = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="3"
      animationDuration="0.75"
      width="32"
      visible={true}
    />
  );
};

export default memo(LoadingSong);
