import React from "react";
import { Menu } from "../../../components/menu";
import { FaChevronDown } from "react-icons/fa6";

const menuItems = [
  { label: "Profile", key: "profile" },
  { label: "Settings", key: "settings" },
  { label: "Logout", key: "logout" },
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
    </div>
  );
};

export default Favorites;
