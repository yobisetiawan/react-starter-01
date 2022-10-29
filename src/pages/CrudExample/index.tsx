import { Heading, Link, Pane, Paragraph } from "evergreen-ui";
import { useAtom } from "jotai";
import { memo } from "react";
import { Link as RouteLink } from "react-router-dom";
import AppSidebar from "../../components/layouts/AppSidebar";
import { styles } from "../../configs/styles";
import { authTokenAtom } from "../../storage/auth";

const Page = () => {
  const [token] = useAtom(authTokenAtom);
  return (
    <AppSidebar>
      <div className="p-3">
        <Heading is="h1" size={styles.fontSizeH1}>
          CRUD Example
        </Heading>
        <hr />
        <Pane>
          <Paragraph>{token}</Paragraph>
          <Link is={RouteLink} to="/">
            Go to the home page
          </Link>
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
