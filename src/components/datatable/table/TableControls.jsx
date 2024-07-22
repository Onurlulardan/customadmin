import React from "react";
import {
  Flex,
  HStack,
  Input,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { IoMdRefresh, IoIosAdd } from "react-icons/io";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const TableControls = ({
  searchTerm,
  setSearchTerm,
  selectable,
  selectedRows,
  handleDeleteSelected,
  handleRefresh,
  handleClearFilter,
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  setHiddenColumns,
  toolbarButtons,
  onToolbarButtonClick,
}) => {
  return (
    <Flex justify="space-between" mb={4} gap={4} align={"center"}>
      <HStack spacing={2}>
        {toolbarButtons.map((button) => (
          <Tooltip key={button.key} label={button.header} placement="top">
            <Button onClick={() => onToolbarButtonClick(button.key)}>
              {button.icon && <Icon as={button.icon} mr={2} />}
              {button.header}
            </Button>
          </Tooltip>
        ))}
      </HStack>
      <HStack spacing={2}>
        <Input
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="auto"
        />
        {selectable && selectedRows.length > 0 && (
          <Tooltip label="Tümünü Sil" placement="top">
            <Button
              colorScheme="red"
              onClick={() => handleDeleteSelected(selectedRows)}
            >
              <MdDeleteForever />
            </Button>
          </Tooltip>
        )}
        <Tooltip label="Yenile" placement="top">
          <Button onClick={handleRefresh}>
            <IoMdRefresh />
          </Button>
        </Tooltip>
        <Tooltip label="Filtreleri Temizle" placement="top">
          <Button onClick={handleClearFilter}>
            <FaFilterCircleXmark />
          </Button>
        </Tooltip>
        <Menu closeOnSelect={false}>
          <Tooltip label="Kolonları Göster/Gizle" placement="top">
            <MenuButton as={Button}>
              <BiHide />
            </MenuButton>
          </Tooltip>
          <MenuList>
            {columns.map(
              (col) =>
                col.visible !== false && (
                  <MenuItem key={col.key}>
                    <Checkbox
                      isChecked={!hiddenColumns.includes(col.key)}
                      onChange={() =>
                        toggleColumnVisibility(
                          col.key,
                          hiddenColumns,
                          setHiddenColumns
                        )
                      }
                    >
                      {col.header}
                    </Checkbox>
                  </MenuItem>
                )
            )}
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TableControls;
