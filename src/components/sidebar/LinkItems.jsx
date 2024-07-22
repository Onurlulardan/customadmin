import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Dashboard", icon: FiTrendingUp, path: "/admin/dashboard" },
  { name: "Form", icon: FiCompass, path: "/admin/form" },
  { name: "Favourites", icon: FiStar, path: "/favourites" },
  { name: "Settings", icon: FiSettings, path: "/settings" },
];

export default LinkItems;
