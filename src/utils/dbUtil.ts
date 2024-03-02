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
    month: number
    dayIndex: number
    monthIndex: number
}

const increaseCount = (count: VserchCount, month: number, today: number) => {
    if (count.dayIndex != today) {
        count.dayIndex = today
        count.today = 1
    } else {
        count.today += 1
        count.month += 1
    }

    if (count.monthIndex != month) {
        count.monthIndex = month
        count.month = 1
    }

    count.total += 1
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
    } else if (count.today >= 10 && count.today % 10 == 0) {
        if (window.confirm(`您今天已使用了关键字搜索${count.today}次，是否随喜？`)) {
            location.replace("/donate");
        }
    }
}

export const countVsearch = () => {
    let count: VserchCount | null
    let today = new Date().getDay()
    let month = new Date().getMonth()
    count = getVsearchCount()

    if (count != null) {
        increaseCount(count, month, today)
        donateComfirm(count)
    } else {
        count = {
            total: 1,
            today: 1,
            month: 1,
            dayIndex: today,
            monthIndex: month
        }
    }

    localStorage.setItem("vsearch_count", JSON.stringify(count))
}

export const getVsearchCount = (): VserchCount | null => {
    let count = localStorage.getItem('vsearch_count')
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
    miniutes: number
    data: SearchItem[]
}

function convertComment(data: CommentData[]) {
    const searchData = data.map((item: CommentData) => {
        const searchItem: SearchItem = { keywords: item.nick.slice(7), comment: item.orig }

        return searchItem
    })
    return searchData
}

export const getCachedSearchByWords = async (keywords: string): Promise<SearchItem[] | undefined> => {
    let cache = await getCachedSearch()

    return cache.data.filter((x) => x.keywords.includes(keywords))
}

export const getCachedSearch = async (): Promise<CachedSearch> => {
    let cache = await localForage.getItem('cached_search') as CachedSearch
    if (cache === null) {
        const resData = await getHotSearchAsc(1)
        setCachedSearch(convertComment(resData.data))

        return { miniutes: new Date().getMinutes(), data: convertComment(resData.data) }
    }

    // 缓存时间大于5分钟时获取总数
    if (Math.abs(new Date().getMinutes() - cache.miniutes) > 5) {
        // getHotSearchCount
        const hotCount = (await getHotSearch(999)).count
        if (hotCount > cache.data.length) {
            const resData = await getHotSearchAsc(Math.floor(cache.data.length / 100) + 1)

            const mergedItems = [...cache.data.slice(0, Math.floor(cache.data.length / 100) * 100), ...convertComment(resData.data)]

            cache = { miniutes: new Date().getMinutes(), data: mergedItems }
        }
        // 无论如何，更新同步时间
        setCachedSearch(cache.data)

        return cache
    }

    return cache
}

export const setCachedSearch = (data: SearchItem[]) => {
    const caches: CachedSearch = {
        miniutes: new Date().getMinutes(),
        data: data
    }
    localForage.setItem('cached_search', caches)
}