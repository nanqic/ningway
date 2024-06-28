import { usePlayerStore, useVideoStore } from '@/store/Index';
import { Box, Icon, keyframes, styled, SxProps } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LotusIcon from '@/assets/lotus.webp'
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const PlayerSphere = (sx: { sx?: SxProps }) => {
    const paused = useVideoStore(state => state.paused)
    const videoRef = usePlayerStore(state => state.videoRef)
    const navigate = useNavigate()

    const switchPlay = () => {
        videoRef?.current?.paused ?
            videoRef?.current?.play() :
            location.pathname != '/video' && navigate(`/video`)
    }

    const RoundIcon = useMemo(() => {
        const rotate = keyframes`
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); } 
            `;

        return styled(Icon)({
            width: 38,
            height: 38,
            borderRadius: '100%',
            animation: `${rotate} 10s linear infinite`,
            backgroundImage: LotusIcon
        });
    }, []);

    if (paused)
        return <Box {...sx} display={'inline-flex'} onClick={switchPlay}> <PlayCircleOutlineIcon sx={{ zoom: 1.7 }} color='secondary' /></Box>

    return (
        <RoundIcon {...sx} onClick={switchPlay}>
            <img src={LotusIcon} alt="lutos" />
        </RoundIcon>
    )
}

export default PlayerSphere