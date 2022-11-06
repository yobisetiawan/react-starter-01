import { Heading, Paragraph } from "evergreen-ui";
import { memo } from "react";

import AppFullLayout from "../../components/layouts/AppFullLayout";
import { styles } from "../../configs/styles";

const Page = () => {
  return (
    <AppFullLayout>
      <div className="container p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Heading is="h1" marginBottom={20} size={styles.fontSizeH1}>
              About
            </Heading>
            <Paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Paragraph>
          </div>
        </div>
      </div>
    </AppFullLayout>
  );
};

export default memo(Page);
