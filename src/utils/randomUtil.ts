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

export function isLegalKeywords(s = '') {
    let reg = new RegExp("[\d_a-z\\u4E00-\\u9FFF]+", "g");
    let result = reg.test(s) && s?.trim().length != 0
    if (!result) {
        alert("请优化您输入的关键字！");
    }

    return result
}