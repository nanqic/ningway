export function getRandomNum(length = 10, prev?: number): number {
    const index = Math.trunc(Math.random() * length)

    if (prev == index) {
        return getRandomNum(length, index)
    }
    return index
}

export function isEmpty(obj: {}) {
    return Object.keys(obj).length === 0;
}

export function isNightOwl(): boolean {
    // 将当前时间转换为北京时间
    var hour = new Date((new Date()).toLocaleString("en-US", { timeZone: "Asia/Shanghai" })).getHours();

    // 判断时间是否在0点到6点之间
    if (hour >= 0 && hour < 6) {
        return true
    }
    return false
}