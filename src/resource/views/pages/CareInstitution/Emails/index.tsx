import React, { useState } from "react";
import InboxEmail from "./InboxEmail";
import SentEmail from "./SentEmail";
import NewEmail from "./NewEmail";
import { EmailMenus } from "./EmailMenus";

const Email = () => {
  const [activeTab, setactiveTab] = useState<number>(0);

  const onTabChange = (activeTab: number) => {
    setactiveTab(activeTab);
  };

  // render component according to selected tab
  const renderComponent = () => {
    switch (activeTab) {
      case 0:
        return <InboxEmail />;
      case 1:
        return <SentEmail />;
      case 2:
        return <NewEmail />;

      default:
        break;
    }
  };
  return (
    <div>
      <EmailMenus activeTab={activeTab} onTabChange={onTabChange} />
      {renderComponent()}
    </div>
  );
};

export default Email;
