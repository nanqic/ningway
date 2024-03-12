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
    if (location.port == '5173') return;
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

export const getCachedKeys = async () => {
    const url = `${import.meta.env.VITE_KEY_SEARCH}allkeys`;
    const response = await fetch(url, {
        method: 'GET',
    });

    const result = await response.json();
    console.log('getCachedKeys', result.total);

    return result
}

export const getSearchHistory = () => {
    let sLog = JSON.parse(localStorage.getItem('sLog') || '')
    return sLog?.map((x: { keywords: string }) => x.keywords).slice(-7)
}

export const getHotWords = async () => {
    const url = `${import.meta.env.VITE_PROXY_URL}`;
    const response = await fetch(url);

    const result = await response.text();
    console.log('getHotWords', result.length);
    let pattern = /<a.*?>(.*?)<\/a>/g;
    let match, words = [];

    while (match = pattern.exec(result)) {
        words.push(match[1]); // 匹配到的<a>标签内的内容
    }
    return words
}
