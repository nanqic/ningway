import { Link } from '@mui/material'
import SearchView from './SearchView'
import useLocalStorageState from 'use-local-storage-state'

function Favorite() {
    const [liked, _] = useLocalStorageState<string[]>('liked_videos', { defaultValue: [] })

    return (
        <>
            {liked.length ? <SearchView codes={liked.slice(0, 50)} /> : <p>&nbsp; 暂无收藏</p>}
            <Link variant='h6' href='/recents' sx={{ display: { md: 'block', xs: "none" } }}>最近播放</Link>
        </>
    )
}

export default Favorite