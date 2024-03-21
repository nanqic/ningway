import { getUri, postCountData } from './requestUtil';
import { VideoSearch } from './types';

async function getTitleList(): Promise<string[]> {
    let titles = localStorage.getItem('title_list_v2')

    if (!titles) {
        localStorage.removeItem('title_list')
        const json = await getUri('title_index_v2.json')
        localStorage.setItem('title_list_v2', JSON.stringify(json))

        return json
    }

    return JSON.parse(titles)
}
export async function fetchVbox(query?: string): Promise<VideoSearch[]> {
    if (query == undefined || '') return []
    const res = (await getTitleList()).filter((x: string) => x.includes(query))

    return vboxDbToArr(res)
}

export async function findTitleByIds(ids: string[]): Promise<VideoSearch[]> {
    const idsJoin = ids.join('/')
    const filterId = (str: string) => idsJoin.includes(str.slice(0, 5))
    const results = (await getTitleList()).filter(filterId)

    return vboxDbToArr(results)
}

function vboxDbToArr(dbres: string[]): VideoSearch[] {
    return Array.from(dbres, x => {
        const vbox_arr = x.split('/')
        return {
            no: vbox_arr[0],
            title: vbox_arr[1],
        }
    })
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

    if (dayOfMonth - 1 % 7 == 0) {
        count.weekly = count.today
    }

    if (count.monthIndex != monthIndex) {
        count.monthIndex = monthIndex
        count.month = count.today
        setTimeout(() => count.keywords = '', 60 * 1000)
    }

    count.total++
}

const comfirmDonate = (text: string, count: number) => {
    if (window.confirm(`您${text}搜索了${count}次，是否依自己能力随喜`)) {
        location.replace("/donate");
    } else {
        postCountData(false)
        alert("诸缘具足才能稳定的搜索，有条件时可到关于页随喜")
    }
}

const donateNotify = (count: VserchCount) => {
    let { dayOfMonth, visitDate } = count
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    if (dayOfMonth - visitDate >= 3) {
        count.visitDate = dayOfMonth
    }

    if (count.total >= 100 && count.total % 50 == 0) {
        comfirmDonate('累计', count.total)
    } else if (dayOfMonth == lastDayOfMonth &&
        dayOfMonth != visitDate
    ) {
        comfirmDonate('本月', count.month)
    } else if (count.weekly >= 21 && dayOfMonth % 7 == 0 &&
        dayOfMonth != visitDate
    ) {
        comfirmDonate('一周内', count.weekly)
    } else if (count.today >= 10 &&
        count.today % 10 == 0 &&
        dayOfMonth - visitDate >= 1) {
        count.visitDate = dayOfMonth
        comfirmDonate('今天', count.today)
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
    return searchLog.keywords.split('|').slice(-7)
}
