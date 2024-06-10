import SearchView from "./SearchView"
import useLocalStorageState from "use-local-storage-state";
import { PlayStat } from "@/components/VideoPlayer";

function Recent() {
    const [playstat, _] = useLocalStorageState<PlayStat[]>('play_history', { defaultValue: [] });
    return (
        <>
            {playstat.length > 0 ? <>
                <SearchView codes={(JSON.parse(localStorage.getItem('play_history') || '') as PlayStat[]).map(x => x.no).slice(0, 50)} />
            </>:<p>&nbsp; 暂无播放历史</p>}
        </>
    )
}

export default Recent