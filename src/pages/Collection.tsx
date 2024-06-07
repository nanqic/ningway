import { Typography } from '@mui/material'
import SearchView from './SearchView'
import useLocalStorageState from 'use-local-storage-state'
import { PlayStat } from '@/components/VideoPlayer'

function Collection() {
    const [liked, _] = useLocalStorageState<string[]>('liked_videos', { defaultValue: [] })
    const [playstat, __] = useLocalStorageState<PlayStat[]>('play_history', { defaultValue: [] });
    
    return (
        <>
            <Typography variant='h5' ml={1} mt={1}>收藏列表</Typography>
            {liked.length ? <SearchView codes={liked.slice(0,50)} /> : <p>&nbsp; 暂无收藏</p>}
            {playstat.length>0 && <>
                <Typography variant='h5' ml={1}>播放历史</Typography>
                <SearchView codes={(JSON.parse(localStorage.getItem('play_history') || '') as PlayStat[]).map(x => x.no).slice(0,50)} />
            </>}
        </>
    )
}

export default Collection