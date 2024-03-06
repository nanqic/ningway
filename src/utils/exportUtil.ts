import { getCachedSearch } from "./dbUtil";

export async function exportData(size:number) {
const data = (await getCachedSearch()).data.slice(0,size)
let words = data.map(item=>item.keywords)
    const jsonData = JSON.stringify(words);

    // 下载导出的数据
    const blob = new Blob([jsonData], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.json';
    downloadLink.click();
}
