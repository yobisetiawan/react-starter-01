import { Alert, CrossIcon, IconButton } from "evergreen-ui";
import { useAtom } from "jotai";
import React, { memo, useState } from "react";

import { authUserAtom } from "../../storage/auth";

interface Props {
  children: React.ReactNode;
}

const Component = ({ children }: Props) => {
  const [user] = useAtom(authUserAtom);

  const [show, setShow] = useState(true);

  return (
    <>
      {user?.email_verified_at == null && show && (
        <div className="p-3 app-fixed-warning">
          <Alert intent="warning" title="Warning">
            <div className="d-flex align-items-center justify-content-between">
              <div>Your email is not verified, Please verify first!</div>

              <IconButton
                icon={CrossIcon}
                onClick={() => setShow(false)}
              ></IconButton>
            </div>
          </Alert>
        </div>
      )}

      {children}
    </>
  );
};

export default memo(Component);
