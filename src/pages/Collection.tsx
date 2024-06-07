import { Typography } from '@mui/material'
import SearchView from './SearchView'
import useLocalStorageState from 'use-local-storage-state'

function Collection() {
    const [liked, setLiked] = useLocalStorageState<string[]>('liked_videos', { defaultValue: [] })

    return (
        <>
            <Typography variant='h5' mt={1}>收藏列表</Typography>
            {liked.length ? <SearchView codes={liked} /> : <p>暂无收藏</p>}
            {localStorage.getItem('playstat') && <>
                <Typography variant='h5'>播放历史</Typography>
                <SearchView codes={Object.keys(JSON.parse(localStorage.getItem('playstat') as string)).slice(-21)} />
            </>}

        </>
    )
}

export default Collection