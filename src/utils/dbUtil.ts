import { getHotSearch, getHotSearchAsc, getUri } from './requestUtil';
import { CommentData, VideoSearch } from './types';
import localForage from "localforage";

export async function fetchVbox(query?: string): Promise<VideoSearch[]> {
    if (query == undefined || '') return []
    const vboxList = localStorage.getItem('title_list')
    if (!vboxList) {
        const json = await getUri('title_index.json')
        localStorage.setItem('title_list', JSON.stringify(json))
        const res = json.filter((x: string) => x.includes(query))

        return vboxDbToArr(res)
    }

    const res = JSON.parse(vboxList).filter((x: string) => x.includes(query))

    return vboxDbToArr(res)

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

type VserchCount = {
    total: number
    today: number
    weekly: number
    month: number
    dayOfMonth: number
    monthIndex: number
}

const increaseCount = (count: VserchCount, monthIndex: number, today: number, dayOfMonth: number) => {
    if (count.dayOfMonth != today) {
        count.dayOfMonth = today
        count.today = 1
    } else {
        count.today++
        count.month++
        count.dayOfMonth++
    }

    if (dayOfMonth % 7 == 0) {
        count.weekly = 1
    }

    if (count.monthIndex != monthIndex) {
        count.monthIndex = monthIndex
        count.month = 1
    }

    count.total++
}

const donateComfirm = (count: VserchCount) => {
    if (count.total >= 100 && count.total % 100 == 0) {
        if (window.confirm(`您已使用了关键字搜索${count.total}次，是否随喜？`)) {
            location.replace("/donate");
        }
    } else if (count.month >= 50 && count.month % 50 == 0) {
        if (window.confirm(`您本月已使用了关键字搜索${count.month}次，是否随喜？`)) {
            location.replace("/donate");
        }
    } else if (count.weekly >= 20 && count.weekly % 20 == 0) {
        if (window.confirm(`您一周内已使用了关键字搜索${count.today}次，是否随喜？`)) {
            location.replace("/donate");
        }else{
            alert()
        }
    } else if (count.today >= 10 && count.today % 10 == 0) {
        if (window.confirm(`您今天已使用了关键字搜索${count.today}次，是否随喜？`)) {
            location.replace("/donate");
        }
    }
}

export const countVsearch = () => {
    let count: VserchCount | null
    let today = new Date().getDay()
    let dayOfMonth = new Date().getDate()
    let month = new Date().getMonth()
    count = getVsearchCount()

    if (count != null) {
        increaseCount(count, month, today, dayOfMonth)
        donateComfirm(count)
    } else {
        count = {
            total: 1,
            today: 1,
            weekly: 1,
            month: 1,
            monthIndex: month,
            dayOfMonth
        }
    }

    localStorage.setItem("search_count", JSON.stringify(count))
}

export const getVsearchCount = (): VserchCount | null => {
    let count = localStorage.getItem('search_count')
    if (count !== null) {
        let obj: VserchCount = JSON.parse(count)
        return obj
    }
    return null
}

export type SearchItem = {
    keywords: string
    comment: string
}

export type CachedSearch = {
    timestamp: number
    data: SearchItem[]
}

function convertComment(data: CommentData[]) {
    const searchData = data.map((item: CommentData) => {
        const searchItem: SearchItem = { keywords: item.nick.slice(7), comment: item.orig }

        return searchItem
    })
    return searchData
}

export const getCachedSearchByWords = async (keywords: string, sync?: boolean): Promise<CachedSearch> => {
    let cache = await getCachedSearch(sync)

    return { timestamp: cache.timestamp, data: cache.data.filter((x) => x.keywords.includes(keywords)) }
}

export const isNeedSync = (timestamp: number, minute = 30): boolean => Math.abs(Date.now() - timestamp) > minute * 60 * 1000

export const getCachedSearch = async (sync?: boolean): Promise<CachedSearch> => {
    let cache = await localForage.getItem('cached_search') as CachedSearch
    if (cache === null) {
        const resData = await getHotSearchAsc(1)
        setCachedSearch(convertComment(resData.data))

        return { timestamp: Date.now(), data: convertComment(resData.data) }
    }

    // 缓存时间大于5分钟时获取总数
    if (sync || isNeedSync(cache.timestamp)) {
        // getHotSearchCount
        const hotCount = (await getHotSearch(999)).count
        if (hotCount > cache.data.length) {
            const resData = await getHotSearchAsc(Math.floor(cache.data.length / 100) + 1)

            const mergedItems = [...cache.data.slice(0, Math.floor(cache.data.length / 100) * 100), ...convertComment(resData.data)]

            cache = { timestamp: Date.now(), data: mergedItems }
        }
        // 无论如何，更新同步时间
        setCachedSearch(cache.data)

        return cache
    }

    return cache
}

export const setCachedSearch = (data: SearchItem[]) => {
    const caches: CachedSearch = {
        timestamp: Date.now(),
        data: data
    }
    localForage.setItem('cached_search', caches)
}