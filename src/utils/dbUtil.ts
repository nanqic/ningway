import Dexie, { Table } from 'dexie';
import { getUri } from './requestUtil';
import { Post, VideoInfo, VideoSearch } from './types';

class AppDb extends Dexie {
    posts!: Table<Post>
    vbox!: Table<VideoInfo>

    constructor() {
        super('app_db');
        this.version(2).stores({
            posts: 'id', // Primary key and indexed props
            vbox: 'id'
        });
    }
}

export const db = new AppDb()

export async function fetchPosts(id?: number) {
    const count = await db.posts.count()
    if (count <= 0) {
        const json = await getUri('posts.json')
        console.log('cache posts');
        db.posts.bulkAdd(json)
        if (id != undefined) {
            return db.posts.get(id)
        }
        return json
    }
    // console.log('fetch posts from db');
    if (id != undefined) {
        return db.posts.get(id)
    }

    return db.posts.toArray()

}

export async function fetchVbox(query?: string): Promise<VideoSearch[]> {
    const count = await db.vbox.count()
    if (query == undefined || '') return []
    if (count <= 0) {
        const json = await getUri('vb_index_2209.json')
        console.log('cache vb_index_2209');
        const vboxList: VideoInfo[] = []
        let i = 1
        json.forEach((el: any) => { vboxList.push({ id: i, info: el }); i++ });
        db.vbox.bulkAdd(vboxList)

        return vboxDbToArr(vboxList.filter(x => x.info.includes(query)))
    }

    // console.log('fetch v2201 from db');
    const dbres = await db.vbox.filter(x => x.info.includes(query)).toArray()

    return vboxDbToArr(dbres)

}


function vboxDbToArr(dbres: VideoInfo[]): VideoSearch[] {
    return Array.from(dbres, x => {
        const vbox_arr = x.info.split('/')
        return {
            no: vbox_arr[0],
            vno: vbox_arr[1],
            ano: vbox_arr[2],
            title: vbox_arr[3],
        }
    })
}
