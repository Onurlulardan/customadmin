export const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        let message = "An error occurred...";

        if (data?.message) {
            message = data.message;
        } else {
            message = data;
        }
        return { error: true, message };
    }

    return data;
};

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
    return data.filter((item) =>
        columns.some((col) =>
            String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};
