import { getUri, postCountData } from './requestUtil';
import { VideoSearch } from './types';

export async function getTitleList(): Promise<string[]> {
    let titles = localStorage.getItem('title_list_v3')
    if (titles) return JSON.parse(titles)

    localStorage.removeItem('title_list_v2')
    const json = await getUri('title_list_v3.json')
    localStorage.setItem('title_list_v3', JSON.stringify(json))

    return json
}

export function searchVideo(data: string[], query = '', year = '', month = ''): VideoSearch[] {
    const res = data.filter((x: string) => {
        const videoArr = x.split('/')
        if (query.includes('-')) return videoArr[0].includes(query.replaceAll('-', ''))

        const videoYear = videoArr[0]?.slice(0, 2)
        const videoMonth = videoArr[0]?.slice(2, 4)
        const queryFilter = videoArr[1].includes(query) || videoArr[2].includes(query)

        if (year && month) return queryFilter && year.includes(videoYear) && parseInt(month) === parseInt(videoMonth)
        if (year || month) return queryFilter && (year.includes(videoYear) || parseInt(month) === parseInt(videoMonth))

        return queryFilter
    })

    return vboxDbToObj(res)
}

export function findTitleByIds(data: string[], ids: string[]): VideoSearch[] {
    const filterId = (titlestr: string) => ids.join('/').includes(titlestr.split('/')[1])
    const results = data.filter(filterId)

    return vboxDbToObj(results)
}

const buildDate = (datestr: string) => `20${datestr.slice(0, 2)}-${datestr.slice(2, 4)}-${datestr.slice(4)}`

function vboxDbToObj(dbres: string[]): VideoSearch[] {
    return Array.from(dbres, x => {
        const vbox_arr = x.split('/')

        return {
            date: vbox_arr[0] && buildDate(vbox_arr[0]),
            no: vbox_arr[1],
            title: vbox_arr[2],
            duration: parseInt(vbox_arr[3]) || 0,
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

    // 每周一重置
    if (new Date().getDay() == 0) {
        count.weekly = count.today
    }

    if (count.monthIndex != monthIndex) {
        count.monthIndex = monthIndex
        count.month = count.today
        setTimeout(() => count.keywords = '', 60 * 1000)
    }

    count.total++
}

const comfirmDonate = async (text: string, count: number) => {
    if (window.confirm(`您${text}搜索了${count}次，是否随力随喜捐赠`)) {
        await postCountData(true)
        location.replace("/donate")
    } else {
        postCountData(false)
        alert("诸缘具足才能关键字搜索，有条件时可到关于页随喜")
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
    } else if (count.today >= 3 && new Date().getDay() == 6 &&
        dayOfMonth != visitDate
    ) {
        comfirmDonate('本周', count.weekly)
    } else if (count.today >= 10 &&
        count.today % 10 == 0 &&
        dayOfMonth - visitDate >= 1) {
        comfirmDonate('今天', count.today)
    }

    count.visitDate = dayOfMonth
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
