import { Heading, Pane, Tab, Tablist } from "evergreen-ui";
import { memo, useState } from "react";

import AppSidebar from "../../components/layouts/AppSidebar";
import { styles } from "../../configs/styles";
import ChangeAvatar from "./ChangeAvatar";
import ChangePassword from "./ChangePassword";
import ChangeProfile from "./ChangeProfile";
import DeleteAccount from "./DeleteAccount";

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = [
    {
      title: "Profile",
      component: <ChangeProfile />,
    },
    {
      title: "Change Avatar",
      component: <ChangeAvatar />,
    },
    {
      title: "Change Password",
      component: <ChangePassword />,
    },
    {
      title: "Delete Account",
      component: <DeleteAccount />,
    },
  ];

  return (
    <AppSidebar>
      <div className="p-3">
        <Heading is="h1" size={styles.fontSizeH1}>
          Profile
        </Heading>
        <hr />

        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${index}`}
            >
              {tab.title}
            </Tab>
          ))}
        </Tablist>
        <Pane padding={16} background="tint1" flex="1">
          {tabs.map((tab, index) => (
            <Pane
              key={index}
              id={`panel-${index}`}
              role="tabpanel"
              aria-labelledby={tab.title}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? "block" : "none"}
            >
              <div>{tab.component}</div>
            </Pane>
          ))}
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
