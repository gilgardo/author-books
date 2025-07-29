import clsx from "clsx";
import type { FC } from "react";

interface Props {
  visible?: boolean;
}

const LoadingIndicator: FC<Props> = ({ visible }) => {
  return (
    <div
      className={clsx(
        visible ? "block" : "hidden",
        "fixed z-[100] inset-0 bg-white flex items-center justify-center"
      )}>
      ...
    </div>
  );
};

export default LoadingIndicator;
