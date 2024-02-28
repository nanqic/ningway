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

export async function postSearchData(keywords: string, body: string) {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment/202cb962';
    const data = {
        comment: body,
        nick: 'search_' + keywords,
        url: '/202cb962'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const result = await response.json();
        // console.log(result);
    } else {
        console.error('Error:', response.status);
    }
}

export const getHotSearch = async () => {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment?path=/202cb962';
    const response = await fetch(url)
    if (response.ok) {
        const result = await response.json();
        // console.log(result);
        return result.data.data
    }

    console.error('Error:', response.status);
    return response.status
}