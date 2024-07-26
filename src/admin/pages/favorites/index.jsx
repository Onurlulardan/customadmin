import React from "react";
import { Menu } from "../../../components/menu";

const menuItems = [
  { label: "Profile", onClick: () => alert("Profile clicked") },
  { label: "Settings", onClick: () => alert("Settings clicked") },
  { label: "Logout", onClick: () => alert("Logout clicked") },
];

const Favorites = () => {
  return (
    <div>
      {" "}
      <Menu buttonLabel="Menu" items={menuItems} />
    </div>
  );
};

export default Favorites;
