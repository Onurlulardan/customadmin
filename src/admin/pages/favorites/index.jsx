import React from "react";
import { Menu } from "../../../components/menu";
import { FaChevronDown } from "react-icons/fa6";
import { Accordion } from "../../../components/accordion";
import { Modal } from "../../../components/modal";
import { Box, Flex } from "@chakra-ui/react";
import { List } from "../../../components/list";
import { MdCheckCircle } from "react-icons/md";

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

const items = ["Item 1", "Item 2", "Item 3"];

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
    <Flex gap={4} direction={"column"} bg={"white"} p={4}>
      <Box mb={4}>
        <Menu
          buttonLabel="Menu"
          items={menuItems}
          onItemClick={handleItemClick}
          rightIcon={<FaChevronDown />}
          colorScheme={"blue"}
        />
      </Box>
      <Box mb={4}>
        <Accordion
          items={accordionItems}
          allowMultiple={true}
          defaultIndex={[0]}
        />
      </Box>
      <Box mb={4}>
        <Modal
          title="Başlık"
          bodyContent={<p>Modal içeriği</p>}
          footerContent={<p>Footer içeriği</p>}
          size="lg"
          closeButton={true}
          triggerButtonLabel="Modalı Aç"
          triggerButtonProps={{ colorScheme: "blue" }}
        />
      </Box>
      <Box>
        <List
          items={items}
          icon={MdCheckCircle}
          spacing={4}
          listProps={{ styleType: "none" }}
          listItemProps={{ fontSize: "lg", color: "blue.500" }}
          iconProps={{ color: "green.500" }}
        />
      </Box>
    </Flex>
  );
};

export default Favorites;
