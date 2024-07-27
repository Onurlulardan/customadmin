import React from "react";
import PropTypes from "prop-types";
import { Box, List as ChakraList, ListItem, ListIcon } from "@chakra-ui/react";

const List = ({
  items,
  renderItem,
  icon,
  spacing = 2,
  listProps,
  listItemProps,
  iconProps,
  leftSpace = 0,
  ...props
}) => {
  return (
    <Box {...props} pl={leftSpace}>
      <ChakraList spacing={spacing} {...listProps}>
        {items.map((item, index) => (
          <ListItem key={index} {...listItemProps}>
            {icon && <ListIcon as={icon} {...iconProps} />}
            {renderItem ? renderItem(item, index) : item}
          </ListItem>
        ))}
      </ChakraList>
    </Box>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func,
  icon: PropTypes.elementType,
  spacing: PropTypes.number,
  listProps: PropTypes.object,
  listItemProps: PropTypes.object,
  iconProps: PropTypes.object,
  leftSpace: PropTypes.number,
};

export default List;
