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

export function containsChineseAndAlphabat(str: string): boolean {
    // 正则表达式匹配中文字符的范围
    const chineseRegex = /[\u4e00-\u9fa5]/;
    // 正则表达式匹配英文字符
    const englishRegex = /[a-zA-Z]/;

    // 检查字符串是否同时包含中文和英文字符
    return chineseRegex.test(str) && englishRegex.test(str);
}

export function calcTime(minutes: number) {
    if (minutes >= 60) {
        const hours = minutes / 60;
        return `${hours}小时`;
    }

    return `${minutes}分钟`;
}

export function calcTotalDuration(minutesArray: number[]) {
    const totalMinutes = minutesArray.reduce((acc, curr) => acc + curr, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours > 0 ? hours + '小时' : ''}${minutes}分钟`;
}

export function formatDate(inputDate: string): string {
    const dateArray = inputDate.split('-');
    const year = dateArray[0].length === 4 ? dateArray[0].slice(-2) : dateArray[0];
    const month = dateArray[1] && dateArray[1] !== '0' && dateArray[1].padStart(2, '0') || '';
    const day = dateArray[2] && dateArray[2] !== '0' && dateArray[2].padStart(2, '0') || '';

    return year + month + day;
}

export const wordsSplit = (words: string) => {
    return words.replace(/[ ,，]/g, '').split('')
}

export const getTskey = () => btoa(Math.random().toString().slice(-1) + Date.now().toString().slice(8))