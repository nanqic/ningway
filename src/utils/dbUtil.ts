import { getUri } from './requestUtil';
import { VideoSearch } from './types';


export async function fetchVbox(query?: string): Promise<VideoSearch[]> {
    if (query == undefined || '') return []
    const vboxList = localStorage.getItem('vbox_list')
    if (!vboxList) {
        const json = await getUri('vb_index_2209.json')
        localStorage.setItem('vbox_list', JSON.stringify(json))
        const res = json.filter((x: string) => x.includes(query))

        return vboxDbToArr(res)
    }

    const res = JSON.parse(vboxList).filter((x: string) => x.includes(query))

    return vboxDbToArr(res)

}

function vboxDbToArr(dbres: string[]): VideoSearch[] {
    return Array.from(dbres, x => {
        const vbox_arr = x.split('/')
        return {
            no: vbox_arr[0],
            vno: vbox_arr[1],
            ano: vbox_arr[2],
            title: vbox_arr[3],
        }
    })
}
