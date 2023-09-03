export function dateFormat(timeStamp: number): string {
    const date = new Date(timeStamp * 1000);  // 参数需要毫秒数，所以这里将秒数乘于 1000
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    return date.getFullYear() + '年' + month + '月' + date.getDate() + '日';
}
