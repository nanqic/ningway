import { getShortUrl } from './requestUtil'

export async function copyTextToClipboard(text) {
    let copyStatus;
    let res = await getShortUrl(text)
    if (res != '') text = res

    try {
        await navigator.clipboard.writeText(text);
        console.log('文本已成功复制到剪贴板');
        copyStatus = true
    } catch (error) {
        console.error('复制到剪贴板时出现错误:', error);
        copyStatus = copy2(text)
    }
    console.log('Text copied to clipboard successfully.', text, copyStatus);

    return copyStatus
}

function copy2(text) {
    let copyStatus;
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        const range = document.createRange();
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        range.selectNode(input);
        const selection = window.getSelection();
        if (selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        copyStatus = document.execCommand('copy');
        selection.removeAllRanges();
        document.body.removeChild(input);
        console.log('ios copyed:', text);
    } else {
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        copyStatus = document.execCommand('copy')
        document.body.removeChild(input);
    }

    return copyStatus
}
