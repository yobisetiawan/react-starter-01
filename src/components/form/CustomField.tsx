import { ErrorIcon, Strong, Text } from "evergreen-ui";
import React, { memo } from "react";

interface Props {
  validationMessage?: string;
  label: string;
  children: React.ReactNode;
}

const Component = ({ label, validationMessage, children }: Props) => {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <Strong>{label}</Strong>
      </div>
      {children}
      {validationMessage && (
        <div>
          <ErrorIcon color="danger" marginRight={5} size={14} />{" "}
          <Text color="danger" size={300}>
            {validationMessage}
          </Text>
        </div>
      )}
    </div>
  );
};

export default memo(Component);
