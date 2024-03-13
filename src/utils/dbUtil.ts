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

type VserchCount = {
    total: number
    today: number
    weekly: number
    month: number
    dayOfMonth: number
    monthIndex: number
    keywords: string
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
    if (window.confirm(`您${text}搜索了关键字${count}次，前往捐赠以维持搜索功能？`)) {
        postCountData(true)
        location.replace("/donate");
    } else {
        postCountData(false)
        alert("快速、稳定的搜索功能需要您的支持，稍后也可到关于页捐赠")
        localStorage.setItem("visit_date", new Date().getDate() + "")
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

        let visitDate = localStorage.getItem("visit_date") || ''
        if (visitDate == '' || (new Date().getDate()) - parseInt(visitDate) >= 3) {
            donateNotify(count) // 3天内不重复通知
        }
    } else {
        count = {
            total: 1,
            today: 1,
            weekly: 1,
            month: 1,
            monthIndex,
            dayOfMonth,
            keywords
        }
    }

    localStorage.setItem("search_count", JSON.stringify(count))
}

export const getVsearchCount = (): VserchCount | null => {
    let count = localStorage.getItem('search_count')

    return count && JSON.parse(count) || null
}

export type SearchItem = {
    keywords: string
    comment: string
}

export type CachedSearch = {
    timestamp: number
    data: SearchItem[]
    initTimestamp: number
}

function convertComment(data: CommentData[]) {
    const searchData = data.map((item: CommentData) => {
        const searchItem: SearchItem = { keywords: item.nick.slice(7), comment: item.orig }

        return searchItem
    })
    return searchData
}

export const getCachedSearchByWords = async (keywords: string, sync?: boolean): Promise<CachedSearch> => {
    const cache = await getCachedSearch(sync)
    const filteredData = cache.data.filter((item) => item.keywords.includes(keywords))
    console.log('getCachedSearch filteredData: ', filteredData.length);
    cache.data = filteredData

    return cache
}

export const isNeedSync = (timestamp: number, minute = 24 * 60): boolean => Math.abs(Date.now() - timestamp) > minute * 60 * 1000

export const syncCacheNextPage = async (totalCount: number, cachedData: CachedSearch, lastMergeIndex = 0): Promise<CachedSearch> => {

    if (totalCount > cachedData.data.length) {
        const mergeIndex = Math.floor(cachedData.data.length / 100) * 100
        console.log('lastMergeIndex, mergeIndex)', lastMergeIndex, mergeIndex);
        if (lastMergeIndex == mergeIndex) {
            return await setCachedSearch(cachedData.data, cachedData.initTimestamp)
        }

        const res = await getHotSearch(Math.floor(cachedData.data.length / 100) + 1)
        const mergedItems = [...cachedData.data.slice(0, mergeIndex), ...convertComment(res.data)]
        console.log('syncCacheNextPage mergedItems: ', mergedItems.length);

        cachedData.data = mergedItems
        return syncCacheNextPage(totalCount, cachedData, mergeIndex)
    }

    // 无论如何，更新同步时间
    return await setCachedSearch(cachedData.data, cachedData.initTimestamp)
}

export const getCachedSearch = async (sync?: boolean): Promise<CachedSearch> => {
    let store = localStorage.getItem('cached_search')
    let cache: CachedSearch
    console.log(`调用了getCachedSearch`);

    if (store === null) {
        const resData = await getCachedSearchJson()
        // 分页大于1时后台获取下一页数据
        cache = {
            timestamp: Date.now(),
            data: resData,
            initTimestamp: Date.now()
        }
        setCachedSearch(resData)
        return cache
    }
    cache = JSON.parse(store)
    // 清空配置时间戳之前的数据 initTimestamp
    if (import.meta.env.VITE_CACHE_PURE_TS > cache?.timestamp) {
        localStorage.removeItem('cached_search')
    }

    return cache
}

export const setCachedSearch = (data: SearchItem[], initTimestamp = 0) => {
    const caches: CachedSearch = {
        timestamp: Date.now(),
        data: data,
        initTimestamp
    }
    localStorage.setItem('cached_search', JSON.stringify(caches))

    return caches
}
