import React from "react";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

const Menu = ({ buttonLabel, items, onItemClick }) => {
  return (
    <ChakraMenu>
      <MenuButton as={Button}>{buttonLabel}</MenuButton>
      <MenuList>
        {items.map((item, index) => (
          <MenuItem key={index} onClick={() => onItemClick(item)}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </ChakraMenu>
  );
};

export default Menu;
