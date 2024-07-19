export const baseUrl = import.meta.env.VITE_BASE_URL;

const handleResponse = async (response) => {
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

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    return handleResponse(response);
};

export const getRequest = async (url) => {
    const response = await fetch(url);

    return handleResponse(response);
};

export const deleteRequest = async (url) => {
    const response = await fetch(url, {
        method: "DELETE",
    });

    return handleResponse(response);
};

export const putRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    return handleResponse(response);
};