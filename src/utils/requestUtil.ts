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
        await postCountData(JSON.stringify(error))
        return null;
    }
}

export async function postCountData(text: string) {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment';
    let ua = navigator.userAgent
    const data = {
        comment: `${ua}  
        ${text} 
        ${text.startsWith('donate') ? JSON.stringify(getVsearchCount()) : ''}`,
        nick: JSON.parse(localStorage.getItem('WALINE_USER') || '')?.display_name || 'log',
        url: '/cc202c',
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

export const postVisit = () => {
    const url = `https://proxys.ningway.com/api/visit`;
    fetch(url);
}

export const getShortUrl = async (originUrl: string) => {
    const url = `https://t.ningway.com?url=${originUrl}`;

    const response = await fetch(url, {
        method: 'POST'
    });

    if (response.ok) {
        const result = await response.json();
        if (result.status == 200)
            return 't.ningway.com' + result.key
    }
    return ''
}