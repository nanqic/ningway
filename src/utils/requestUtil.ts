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

export async function postCountData(donate: boolean) {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment';
    const data = {
        comment: JSON.stringify(getVsearchCount()),
        nick: 'confirm: ' + donate,
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

export const getSearchResults = async (keywords: string, page = '1') => {
    const url = `${import.meta.env.VITE_WORKER_PROXY_URL}${encodeURI(keywords)}&page=${page}`;
    const response = await fetch(url, { method: 'POST' });

    if (response.ok) {
        const result = await response.text();
        console.log('getSearchResults', response.ok);
        return result
    }

    return response.status + ''
}

export const getHotWords = async () => {
    const url = `https://proxys.ningway.com/api/hotwords`;
    const response = await fetch(url);
    return await response.json();
}

export const postVisit = async () => {
    const url = `https://proxys.ningway.com/api/visit`;
    const response = await fetch(url);
    return await response.json();
}

export const getShortUrl = async (originUrl: string) => {
    const url = `https://t.ningway.com?url=${originUrl}`;

    const response = await fetch(url, {
        method: 'POST'
    });

    console.log(response);
    if (response.ok) {
        const result = await response.json();
        if (result.status == 200)
            return 't.ningway.com' + result.key
    }
    return ''
}