import { getCachedSearchJson, getHotSearch, getUri, postCountData } from './requestUtil';
import { CommentData, VideoSearch } from './types';

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

    if (dayOfMonth % 7 == 0) {
        count.weekly = count.today
    }

    if (count.monthIndex != monthIndex) {
        count.monthIndex = monthIndex
        count.month = 1
        setTimeout(() => count.keywords = '', 60 * 1000)
    }

    count.total++
}

const comfirmDonate = (text: string, count: number) => {
    if (window.confirm(`您${text}搜索了关键字${count}次，前往捐赠支持一下可以吗？`)) {
        location.replace("/donate");
    } else {
        postCountData(false)
        alert("快速、稳定的搜索功能诸缘具足才能用，稍后可到关于页捐赠")
    }
}

const donateNotify = (count: VserchCount) => {
    if (count.total >= 100 && count.total % 100 == 0) {
        comfirmDonate('累计', count.total)
    } else if (count.month >= 49 && count.month % 49 == 0) {
        comfirmDonate('本月', count.month)
    } else if (count.weekly >= 21 && count.weekly % 21 == 0) {
        comfirmDonate('一周内', count.weekly)
    } else if (count.today >= 10 && count.today % 10 == 0) {
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

        let { visitDate } = count
        if (dayOfMonth - visitDate >= 3) {
            donateNotify(count) // 3天内不重复通知
            count.visitDate = dayOfMonth
        }
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
