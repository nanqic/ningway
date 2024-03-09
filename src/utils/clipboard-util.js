export async function copyTextToClipboard(text) {
    let copyStatus;
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            console.log('文本已成功复制到剪贴板');
            copyStatus = true
        } catch (error) {
            console.error('复制到剪贴板时出现错误:', error);
            copyStatus = false
        }
    } else {
        copyStatus = copy2(text)
    }
    console.log('Text copied to clipboard successfully.', text, copyStatus);

    return copyStatus
}

function copy2(text) {
    let copyStatus;
    if ((navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))) {
        const range = document.createRange();
        range.selectNode(document.querySelector("#copyTxt"));
        const selection = window.getSelection();
        if (selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        copyStatus = document.execCommand('copy');
        selection.removeAllRanges();
    } else {
        const input = document.createElement("INPUT");
        input.value = text;
        input.className = "";
        document.body.appendChild(input);
        input.select();
        copyStatus = document.execCommand('copy')
        document.body.removeChild(input);
    }

    return copyStatus
}
