import React from "react";
import PropTypes from "prop-types";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

const Menu = ({
  buttonLabel,
  items,
  onItemClick,
  rightIcon,
  colorScheme = "gray",
}) => {
  return (
    <ChakraMenu>
      <MenuButton colorScheme={colorScheme} as={Button} rightIcon={rightIcon}>
        {buttonLabel}
      </MenuButton>
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

Menu.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  rightIcon: PropTypes.element,
  colorScheme: PropTypes.string,
};

export default Menu;
