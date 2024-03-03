import { getHotSearch, getUri } from './requestUtil';
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
    }

    count.total++
}

const comfirmDonate = (text: string, count: number) => {
    if (window.confirm(`您${text}已使用了关键字搜索${count}次，是否随喜？`)) {
        location.replace("/donate");
    } else {
        localStorage.setItem("forbidden_search", new Date().getDate() + "")
    }
}

const donateNotify = (count: VserchCount) => {
    if (count.total >= 100 && count.total % 100 == 0) {
        comfirmDonate('累计', count.total)
    } else if (count.month >= 50 && count.month % 50 == 0) {
        comfirmDonate('本月', count.month)
    } else if (count.weekly >= 20 && count.weekly % 20 == 0) {
        comfirmDonate('一周内', count.weekly)
    } else if (count.today >= 10 && count.today % 10 == 0) {
        comfirmDonate('今天', count.today)
    }
}

export const countVsearch = () => {
    let count: VserchCount | null
    let dayOfMonth = new Date().getDate()
    let monthIndex = new Date().getMonth()
    count = getVsearchCount()

    if (count != null) {
        increaseCount(count, monthIndex, dayOfMonth)
        donateNotify(count)
    } else {
        count = {
            total: 1,
            today: 1,
            weekly: 1,
            month: 1,
            monthIndex,
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

export const isNeedSync = (timestamp: number, minute = 24 * 60): boolean => Math.abs(Date.now() - timestamp) > minute * 60 * 1000

export const syncCacheNextPage = (totalCount: number, cachedData: SearchItem[]): CachedSearch => {
    if (totalCount > cachedData.length) {
        getHotSearch(Math.floor(cachedData.length / 100) + 1)
            .then(res => {
                const mergedItems = [...cachedData.slice(- Math.floor(cachedData.length / 100) * 100), ...convertComment(res.data)]

                setCachedSearch(mergedItems)
                return syncCacheNextPage(totalCount, mergedItems)
            })
    }

    // 无论如何，更新同步时间
    return setCachedSearch(cachedData)

}

export const getCachedSearch = async (sync?: boolean): Promise<CachedSearch> => {
    let cache = await localForage.getItem('cached_search') as CachedSearch

    // 清空3.3日之前的数据
    if (cache?.timestamp < 1709467710072) {
        localForage.removeItem('cached_search')
    }

    if (cache === null) {
        const resData = await getHotSearch(1)
        const mergedItems = convertComment(resData.data)

        // 分页大于1时后台获取下一页数据
        syncCacheNextPage(resData.count, mergedItems)

        return setCachedSearch(mergedItems)
    }

    // 缓存时间大于时间戳时获取总数
    if (sync || isNeedSync(cache.timestamp || 1)) {
        // get total Count
        const totalCount = (await getHotSearch(1000)).count

        return syncCacheNextPage(totalCount, cache.data)
    }

    return cache
}

export const setCachedSearch = (data: SearchItem[]) => {
    const caches: CachedSearch = {
        timestamp: Date.now(),
        data: data
    }
    localForage.setItem('cached_search', caches)

    return caches
}