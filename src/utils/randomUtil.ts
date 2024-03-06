export function getRandomNum(length = 10, prev?: number): number {
    const index = Math.trunc(Math.random() * length)

    if (prev == index) {
        return getRandomNum(length)
    }
    return index
}

export function isEmpty(obj: {}) {
    return Object.keys(obj).length === 0;
}