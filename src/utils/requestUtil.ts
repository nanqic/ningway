import { getVsearchCount } from "./dbUtil";

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

export async function postSearchData(keywords: string, comment: string) {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment/202cb962';
    const data = {
        comment: comment,
        nick: 'search_' + keywords,
        url: '/202cb962',
        ua: navigator.userAgent
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error('Error:', response.status);
    }
}

export async function postCountData() {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment';
    const data = {
        comment: JSON.stringify(getVsearchCount()),
        nick: 'count_bot' + location.pathname,
        url: '/cc202cb962',
        ua: navigator.userAgent
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error('Error:', response.status);
    }
}

export async function getCachedSearchJson() {
    const res = await fetch('/api/cached_keywrods.json')
    return await res.json()
}

// &sortBy=insertedAt_asc 按插入顺序
export const getHotSearch = async (page = 1, pageSize = 10) => {
    const url = `${import.meta.env.VITE_WL_SERVER}api/comment?path=/202cb962&pageSize=${pageSize}&page=${page}&sortBy=insertedAt_asc`;

    const response = await fetch(url)
    if (response.ok) {
        const result = await response.json();
        // console.log(result);
        return result.data
    }

    console.error('Error:', response.status);
    return response.status
}

export const postKeywords = async (keywords: string, comment: string) => {
    const url = `${import.meta.env.VITE_KEY_SEARCH}${keywords}`;
    const data = {
        comment,
        keywords,
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
        console.log(result);
        return result.ok
    }

    console.error('Error:', response.status);
    return response.status
}

export const fetchComment = async (keywords: string) => {
    const url = `${import.meta.env.VITE_KEY_SEARCH}${keywords}`;
    const response = await fetch(url);

    if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result
    }

    return response.status
}

export const isExistsKeywords = async (keywords: string) => {
    const url = `${import.meta.env.VITE_KEY_SEARCH}${keywords}&check=true`;
    const response = await fetch(url);

    const result = await response.json();
    console.log(result);

    return result
}

export const getKeywordsCount = async () => {
    const url = `${import.meta.env.VITE_KEY_SEARCH}total`;
    const response = await fetch(url, {
        method: 'GET',
    });

    const result = await response.json();
    console.log('getKeywordsCount', result.total);

    return result
}
