export async function getFromServer(path: any) {
    let responseData = null
    try {
        const response = await fetch(path);
        if (!response.ok)
            return Promise.reject(response);
        else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
    return responseData
}