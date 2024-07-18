import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Trending", icon: FiTrendingUp, path: "/trending" },
  { name: "Explore", icon: FiCompass, path: "/explore" },
  { name: "Favourites", icon: FiStar, path: "/favourites" },
  { name: "Settings", icon: FiSettings, path: "/settings" },
];

export default LinkItems;
