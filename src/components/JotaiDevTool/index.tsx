import { memo } from "react";
import { useAtomsDebugValue } from 'jotai/devtools'

const Component = () => {
  useAtomsDebugValue();
  return null;
};

export default memo(Component);
