import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react";

const ContextMenu = ({ items, onClose, rowData, position, onItemClick }) => {
  return (
    <Menu isOpen={true} onClose={onClose} placement="bottom-start">
      <MenuButton
        style={{
          position: "absolute",
          top: position.mouseY,
          left: position.mouseX,
        }}
      />
      <MenuList>
        {items.map((item) => (
          <MenuItem
            key={item.key}
            onClick={() => onItemClick(item.key, rowData)}
          >
            {item.icon && <Icon as={item.icon} mr={2} />}
            {item.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ContextMenu;
