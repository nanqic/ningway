import SearchView from './SearchView'
import useLocalStorageState from 'use-local-storage-state'

function Collection() {
    const [liked, setLiked] = useLocalStorageState<string[]>('liked_videos', { defaultValue: [] })

    return (
        <SearchView codes={liked} />
    )
}

export default Collection