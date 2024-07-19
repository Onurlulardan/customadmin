export const requestSort = (key, sortConfig, setSortConfig) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
    }
    setSortConfig({ key, direction });
};

export const getSortedData = (data, sortConfig) => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
        sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    }
    return sortableItems;
};

export const getFilteredData = (data, columns, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter((item) =>
        columns.some((col) =>
            String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};

export const toggleColumnVisibility = (key, hiddenColumns, setHiddenColumns) => {
    setHiddenColumns((prev) =>
        prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
};
