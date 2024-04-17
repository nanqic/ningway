import { formatDate, wordsSplit } from './randomUtil';
import { getUri, postCountData } from './requestUtil';
import { VideoInfo } from './types';

export async function getTitleList(): Promise<string[]> {
    let titles = localStorage.getItem('title_list_v3')
    if (titles) return JSON.parse(titles)

    localStorage.removeItem('title_list_v2')
    const json = await getUri('title_list_v3.json')
    localStorage.setItem('title_list_v3', JSON.stringify(json))

    return json
}

export function searchVideo(data: string[], query = '', year = '', month = ''): VideoInfo[] {
    let originQuery = query
    const regx = /(20\d{2}|-)/

    if (regx.test(query)) {
        if (query.length === 3) {
            year = query
        } else if (query.length === 4) {
            year = query.slice(2)
        } else {
            query = formatDate(query)
        }
    }

    let words = wordsSplit(query)
    const res = data.filter((x: string) => {
        const videoArr = x.split('/')
        const videoYear = videoArr[0]?.slice(0, 2)
        const videoMonth = videoArr[0]?.slice(2, 4)
        if (regx.test(originQuery)) {
            if (year) {
                const queryYear = (parseInt(year) === parseInt(videoYear))
                if (month) return queryYear && (parseInt(month) === parseInt(videoMonth))

                return queryYear
            }
            return videoArr[0].includes(query)
        }

        const queryTitle = words.every(word => videoArr[2].includes(word))
        if (year && month) return queryTitle && year.includes(videoYear) && parseInt(month) === parseInt(videoMonth)
        if (year || month) return queryTitle && (year.includes(videoYear) || parseInt(month) === parseInt(videoMonth))

        return queryTitle
    })

    return vboxDbToObj(res)
}

export function findTitleByIds(data: string[], ids: string[]): VideoInfo[] {
    const filterId = (titlestr: string) => ids.join('/').includes(titlestr.split('/')[1])
    const results = data.filter(filterId)

    return vboxDbToObj(results)
}

const buildDate = (datestr: string) => `20${datestr.slice(0, 2)}-${datestr.slice(2, 4)}-${datestr.slice(4)}`

function vboxDbToObj(dbres: string[]): VideoInfo[] {
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
        setTimeout(() => count.keywords = '', 7 * 1000)
    }

    count.total++
}

const comfirmDonate = async (lastMonth: number, total: number) => {
    if (window.confirm(`您本月搜索了${lastMonth}次，累计${total}+次，是否愿意捐赠1元？`)) {
        await postCountData('donate: true')
        location.replace("/donate")
    } else {
        await postCountData('donate: false')
        alert("愿您暂时得安乐，究竟成就如来果。")
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
