import { getUri } from './requestUtil';
import { VideoSearch } from './types';


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
    let count: VserchCount
    let today = new Date().getDay()
    let month = new Date().getMonth()
    let vsearch_count = localStorage.getItem('vsearch_count')

    if (vsearch_count != null) {
        count = JSON.parse(vsearch_count)
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