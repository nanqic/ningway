import { usePlayerStore, useVideoStore } from '@/store/Index';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from 'react';

const PlayerControl = () => {
    const showlist = usePlayerStore(state => state.showlist)
    const switchShowlist = usePlayerStore(state => state.switchShowlist)
    const prevVideo = useVideoStore(state => state.prevVideo)
    const nextVideo = useVideoStore(state => state.nextVideo)
    const video = useVideoStore(state => state.video)
    const paused = useVideoStore(state => state.paused)
    const switchPaused = useVideoStore(state => state.switchPaused)

    const switchPlay = () => {
        video?.paused ?
            video?.play() :
            video?.pause()
        switchPaused()
    }

    return (
        <>
            {location.hash &&
                <Box display={'flex'}>
                    <IconButton sx={{ fontSize: 12, flex: 1 }} aria-label="wrap" onClick={switchShowlist} >
                        <QueueMusicIcon />
                        {showlist ? '折叠列表' : '展开列表'}
                    </IconButton>
                    <Box sx={{ zoom: 1.5, mr: 5 }}
                        flex={3}
                        display={'flex'}
                        justifyContent={'space-between'}>
                        <IconButton aria-label="previous" onClick={prevVideo} children={<SkipPreviousIcon />} />
                        <IconButton aria-label="play" onClick={switchPlay} children={paused ? <PlayArrowIcon /> : <PauseIcon />} />
                        <IconButton aria-label="next" onClick={nextVideo} children={<SkipNextIcon />} />

                    </Box>
                </Box>
            }
        </>
    )
}

export default PlayerControl