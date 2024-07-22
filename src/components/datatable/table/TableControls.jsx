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
}) => {
  return (
    <Flex justify="space-between" mb={4} gap={4}>
      <HStack spacing={2}>
        <Tooltip label="Yeni Kayıt Ekle" placement="top-start">
          <Button>
            <IoIosAdd size={30} />
          </Button>
        </Tooltip>
      </HStack>
      <HStack spacing={2}>
        {selectable && selectedRows.length > 0 && (
          <Tooltip label="Tümünü Sil" placement="top-start">
            <Button
              colorScheme="red"
              onClick={() => handleDeleteSelected(selectedRows)}
            >
              <MdDeleteForever />
            </Button>
          </Tooltip>
        )}
        <Tooltip label="Yenile" placement="top-start">
          <Button onClick={handleRefresh}>
            <IoMdRefresh />
          </Button>
        </Tooltip>
        <Tooltip label="Filtreleri Temizle" placement="top-start">
          <Button onClick={handleClearFilter}>
            <FaFilterCircleXmark />
          </Button>
        </Tooltip>
        <Menu closeOnSelect={false}>
          <Tooltip label="Kolonları Göster/Gizle" placement="top-start">
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
        <Input
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="auto"
        />
      </HStack>
    </Flex>
  );
};

export default TableControls;
