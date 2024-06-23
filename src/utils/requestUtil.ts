import { ofetch } from "ofetch";
import { getVsearchCount } from "./dbUtil";
import { getTskey } from "./randomUtil";

export async function getUri(uri: string) {
    return await (await fetch(`/api/${uri}`)).json()
}

export async function getMarkdown(id: string) {
    return await (await fetch(`/api/post/${id}.md`)).text()
}

export const fetchPageview = async () => {
    const response = await fetch(`${import.meta.env.VITE_WL_SERVER}api/article?path=${location.pathname}`);
    const data = await response.json();
    return data.data[0]?.time;
}

export async function postCountData(text: string) {
    const url = import.meta.env.VITE_WL_SERVER + 'api/comment';
    const data = {
        comment: text,
        nick: JSON.parse(localStorage.getItem('WALINE_USER') || '')?.display_name || 'visit_log',
        url: '/cc202c',
    };
    const response = await ofetch(url, {
        method: 'POST',
        body: data
    });

    if (!response.ok) {
        console.error('Error:', response.status);
    }
}

export async function getAuToken() {
    const url = 'https://mp3.ningway.com/login';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: atob('ICB7InVzZXJuYW1lIjoicm9vdCIsInBhc3N3b3JkIjoiTG1xMTk2Mi4xMi4xMSJ9')
    });

    if (!response.ok) {
        console.error('Error:', response.status);
    } else {
        // @ts-ignore
        const token = (await response.json())?.user.token;
        sessionStorage.setItem('au-token', token)
    }
}

export interface UserReg {
    username: FormDataEntryValue;
    password: FormDataEntryValue;
    type: 'user';
    email: FormDataEntryValue;
}
export async function addAuUser(url = 'https://mp3.ningway.com/api/users', { arg }: { arg: UserReg }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('au-token')}`
        },
        body: JSON.stringify(arg)
    });

    if (!res.ok) {
        console.error('Error:', res.status);
        alert('注册失败，用户名已存在或服务器出错')
    } else {
        alert('注册成功！请牢记您的用户名和密码')
        location.assign('https://mp3.ningway.com/')
    }
    return await res.json()
}

export const getSearchResults = async (keywords: string, page = '1') => {
    const url = `${import.meta.env.VITE_WORKER_PROXY_URL}${encodeURI(keywords)}&page=${page}&key=${getTskey()}`;
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

export const getAuthKey = async () => {
    const url = `https://ip.ningway.com/api/auth_key`;
    const response = await fetch(url);
    return await response.text();
}

export const postVisit = async () => {
    const url = `https://proxys.ningway.com/api/visit`;
    const resp = await fetch(url);
    return await resp.json()
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