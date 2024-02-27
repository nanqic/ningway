export async function getUri(uri: string) {
    return await (await fetch(`/api/${uri}`)).json()
}

export const fetchPageview = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_WL_SERVER}api/article?path=${location.pathname}`);
        const data = await response.json();
        return data.data[0]?.time;
    } catch (error) {
        // 处理错误
        console.error(error);
        return null;
    }
}