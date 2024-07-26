import React from "react";
import { Menu } from "../../../components/menu";
import { FaChevronDown } from "react-icons/fa6";
import { Accordion } from "../../../components/accordion";
import { Modal } from "../../../components/modal";

const menuItems = [
  { label: "Profile", key: "profile" },
  { label: "Settings", key: "settings" },
  { label: "Logout", key: "logout" },
];

const accordionItems = [
  {
    label: "Section 1",
    content: "Content for section 1",
  },
  {
    label: "Section 2",
    content: "Content for section 2",
  },
  {
    label: "Section 3",
    content: "Content for section 3",
  },
];

const Favorites = () => {
  const handleItemClick = (item) => {
    switch (item.key) {
      case "profile":
        alert("Profile clicked");
        break;
      case "settings":
        alert("Settings clicked");
        break;
      case "logout":
        alert("Logout clicked");
        break;
      default:
        alert("Unknown action");
    }
  };

  return (
    <div>
      {" "}
      <Menu
        buttonLabel="Menu"
        items={menuItems}
        onItemClick={handleItemClick}
        rightIcon={<FaChevronDown />}
        colorScheme={"blue"}
      />
      <Accordion
        items={accordionItems}
        allowMultiple={true}
        defaultIndex={[0]}
      />
      <Modal
        title="Başlık"
        bodyContent={<p>Modal içeriği</p>}
        footerContent={<p>Footer içeriği</p>}
        size="lg"
        closeButton={true}
        triggerButtonLabel="Modalı Aç"
        triggerButtonProps={{ colorScheme: "blue" }}
      />
    </div>
  );
};

export default Favorites;
