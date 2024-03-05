import excerptList from "@/store/excerpt"


export function getRandomExcerpt(id?: number): string {
    if (id) {
        return excerptList[id]
    }
    const prev_index: number = parseInt(location.hash.slice(1)) || 1
    const index = Math.trunc(Math.random() * excerptList.length)

    if (prev_index == index) {
        return getRandomExcerpt()
    }
    location.hash = index + ''
    return excerptList[index]
}

export function isEmpty(obj: {}) {
    return Object.keys(obj).length === 0;
}