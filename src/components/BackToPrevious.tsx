import { usePlayerStore, useVideoStore } from '@/store/Index';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BackToPrevious() {
    const playlist = useVideoStore(state => state.playlist)
    const videoIndex = useVideoStore(state => state.videoIndex)
    const videoRef = usePlayerStore(state => state.videoRef)
    const navigate = useNavigate()
    // console.log(playlist.length, videoIndex, playlist[videoIndex]);

    const handleClick = () => {
        navigate(`/video?no=${playlist[videoIndex]?.no}`, { state: playlist[videoIndex] })
        videoRef?.current?.play()
    }
    return (
        <Box display={
            (playlist.length > 0 && videoIndex != -1) ? 'block' : 'none'
        }>
            <Button size='large'
                startIcon={<HistoryIcon />}
                onClick={handleClick}
            >继续播放</Button>
            <span>
                {playlist[videoIndex]?.no} - {playlist[videoIndex]?.title}
            </span>
        </Box>
    )
}

export default BackToPrevious