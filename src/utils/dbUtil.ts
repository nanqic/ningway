import { wordsSplit } from './randomUtil';
import { getUri, postCountData } from './requestUtil';
import { VideoInfo, Weibo } from './types';

export async function getWeiboList(): Promise<Weibo[]> {
    let weibo = localStorage.getItem('weibo')
    if (weibo) return JSON.parse(weibo)

    const json = await getUri('weibo.json')
    localStorage.setItem('weibo', JSON.stringify(json))

    return json
}

export const getWeiboById = async (id: number): Promise<Weibo> => {
    const list = await getWeiboList()
    return list[id - 1]
}

export async function getTitleList(): Promise<string[]> {
    let titles = localStorage.getItem('title_list_v3.1')
    if (titles) return JSON.parse(titles)

    localStorage.removeItem('title_list_v3')
    const json = await getUri('title_list_v3.1.json')
    localStorage.setItem('title_list_v3.1', JSON.stringify(json))

    return json
}

export function findVideoByIndex(data: string[], index: number): VideoInfo[] {
    if (index < 0 || index > 9206) index = 0

    return titlesToVideoInfo([{ element: data[index], index: index }])
}

export function searchVideo(data: string[], query = '', year = '', month = ''): VideoInfo[] {
    let words = wordsSplit(query)
    let fullDate = ''
    if (query.includes('-') && query.length === 8) {
        fullDate = query.replaceAll('-', '')
    }

    const res = data.map((x, index) => ({ element: x, index }))
        .filter(({ element }) => {
            const videoArr = element.split('/')
            const videoYear = videoArr[0]?.slice(0, 2);
            const videoMonth = videoArr[0]?.slice(2, 4);

            if (year && month) return parseInt(year) === parseInt(videoYear) && parseInt(month) === parseInt(videoMonth);

            if (year || month) return parseInt(year) === parseInt(videoYear) || parseInt(month) === parseInt(videoMonth);

            if (fullDate) {
                return videoArr[0] === fullDate
            }
            return words.every(word => videoArr[2].includes(word));
        });

    return titlesToVideoInfo(res)
}

export function findTitleByIds(data: string[], ids: string[]): VideoInfo[] {
    const filterId = (obj: { element: string, index: number }) => {
        return ids.join('/').includes(obj.element.split('/')[1]);
    }
    const results = data.map((element, index) => ({ element, index }))
        .filter(filterId);
    return titlesToVideoInfo(results)
}

const buildDate = (datestr: string) => `20${datestr.slice(0, 2)}-${datestr.slice(2, 4)}-${datestr.slice(4)}`

interface Dbres { element: string, index: number }
export function titlesToVideoInfo(dbres: Dbres[]): VideoInfo[] {
    return Array.from(dbres, x => {
        const vbox_arr = x.element?.split('/');

        return {
            index: x.index,
            date: vbox_arr[0] && buildDate(vbox_arr[0]),
            no: vbox_arr[1],
            title: vbox_arr[2],
            duration: parseInt(vbox_arr[3]) || 0,
        };
    });

}

export type VserchCount = {
    total: number
    today: number
    weekly: number
    month: number
    dayOfMonth: number
    monthIndex: number
    keywords: string
    visitDate: number
}

const increaseCount = (count: VserchCount, monthIndex: number, dayOfMonth: number) => {
    if (count.dayOfMonth != dayOfMonth) {
        count.dayOfMonth = dayOfMonth
        count.today = 1
    } else {
        count.today++
        count.weekly++
        count.month++
    }

    // 每周一重置
    if (new Date().getDay() == 0) {
        count.weekly = count.today
    }

    if (count.monthIndex != monthIndex) {
        count.monthIndex = monthIndex
        count.month = count.today
        setTimeout(() => count.keywords = '', 7 * 1000)
    }

    count.total++
}

const comfirmDonate = async (lastMonth: number, total: number) => {
    if (window.confirm(`您本月搜索了${lastMonth}次，累计${total}+次，是否捐赠？`)) {
        await postCountData('donate: true')
        location.replace("/donate")
    } else {
        await postCountData('donate: false')
        alert("愿您暂得安乐果，究竟成就正等觉。")
    }
}

const donateNotify = (count: VserchCount) => {
    let { dayOfMonth, visitDate } = count
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    if (count.total >= 50 &&
        (count.total % 50 === 0 || dayOfMonth >= lastDayOfMonth - 3) &&
        dayOfMonth - 3 > visitDate) {
        count.visitDate = dayOfMonth
        comfirmDonate(count.month, count.total)
    } else if (dayOfMonth === 14 && dayOfMonth !== visitDate) {
        comfirmDonate(count.month, count.total)
        count.visitDate = dayOfMonth
    }
}

export const countVsearch = (keywords: string) => {
    let count = getVsearchCount() || null
    if (count?.keywords.split("|").includes(keywords)) {
        return;
    }

    let dayOfMonth = new Date().getDate()
    let monthIndex = new Date().getMonth()

    if (count != null) {
        count.keywords += '|' + keywords
        increaseCount(count, monthIndex, dayOfMonth)
        donateNotify(count)
    } else {
        count = {
            total: 1,
            today: 1,
            weekly: 1,
            month: 1,
            monthIndex,
            dayOfMonth,
            keywords,
            visitDate: dayOfMonth
        }
    }

    localStorage.setItem("search_count", JSON.stringify(count))
}

export const getVsearchCount = (): VserchCount => {
    let count = localStorage.getItem('search_count')

    return count && JSON.parse(count)
}

export const getSearchHistory = () => {
    let searchLog = getVsearchCount()
    if (searchLog == null) return []
    return searchLog.keywords?.split('|').slice(-7)
}

export const getPlaystatSize = (): number => {
    return Object.keys(JSON.parse(localStorage.getItem('playstat') || '{}'))?.length
}
