import { getCachedSearch } from "./dbUtil";

export async function exportData(size:number) {

    const jsonData = JSON.stringify(((await getCachedSearch()).data.slice(0,size)));

    // 下载导出的数据
    const blob = new Blob([jsonData], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.json';
    downloadLink.click();
}
