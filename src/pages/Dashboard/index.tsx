import { Heading, Link, Pane } from "evergreen-ui";

import { memo } from "react";
import { Link as RouteLink } from "react-router-dom";
import AppSidebar from "../../components/layouts/AppSidebar";
import { styles } from "../../configs/styles";

const Page = () => {
  return (
    <AppSidebar>
      <div className="p-3">
        <Heading is="h1" size={styles.fontSizeH1}>
          Dashboard
        </Heading>
        <hr />
        <Pane>
          <Link is={RouteLink} to="/">
            Go to the home page
          </Link>
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
