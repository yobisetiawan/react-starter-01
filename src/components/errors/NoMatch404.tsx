import { Heading, Link, Pane } from "evergreen-ui";
import { memo } from "react";
import { Link as RouteLink } from "react-router-dom";
import { styles } from "../../configs/styles";

const Page = () => {
  return (
    <div className="text-center p-5 my-5">
      <Heading is="h1" size={styles.fontSizeH1}>
        404, Nothing Here!
      </Heading>
      <Pane>
        <Link is={RouteLink} to="/">
          Go to the home page
        </Link>
      </Pane>
    </div>
  );
};

export default memo(Page);
