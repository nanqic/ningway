import { usePlayerStore, useVideoStore } from '@/store/Index';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const PlayerControl = () => {
    const switchShowlist = useVideoStore(state => state.switchShowlist)
    const switchShowMenu = useVideoStore(state => state.switchShowMenu)
    const prevVideo = useVideoStore(state => state.prevVideo)
    const nextVideo = useVideoStore(state => state.nextVideo)
    const paused = useVideoStore(state => state.paused)
    const videoRef = usePlayerStore(state => state.videoRef)

    const switchPlay = () => {
        videoRef?.current?.paused ?
            videoRef?.current?.play() :
            videoRef?.current?.pause()
    }

    return (
        <>
            {(location.hash || location.pathname === '/video') &&
                <Box display={'flex'}>
                    <IconButton sx={{ fontSize: 12, flex: 1 }} aria-label="wrap" onClick={switchShowlist} children={<QueueMusicIcon />} />
                    <Box sx={{ zoom: 1.5 }}
                        flex={3}
                        display={'flex'}
                        justifyContent={'space-between'}>
                        <IconButton aria-label="previous" onClick={prevVideo} children={<SkipPreviousIcon />} />
                        <IconButton aria-label="play" onClick={switchPlay} children={paused ? <PlayArrowIcon /> : <PauseIcon />} />
                        <IconButton aria-label="next" onClick={nextVideo} children={<SkipNextIcon />} />
                    </Box>
                    <IconButton sx={{ flex: 1 }}
                        children={<SettingsOutlinedIcon />}
                        onClick={switchShowMenu}
                    />
                </Box>
            }
        </>
    )
}

export default PlayerControl