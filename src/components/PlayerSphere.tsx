import { usePlayerStore, useVideoStore } from '@/store/Index';
import { Box, Icon, keyframes, styled, SxProps } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LotusIcon from '@/assets/lotus.webp'
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSphere = memo((sx: { sx?: SxProps }) => {
    const paused = useVideoStore(state => state.paused)
    const videoRef = usePlayerStore(state => state.videoRef)
    const navigate = useNavigate()
    const switchPlay = () => {
        videoRef?.current?.paused ?
            videoRef?.current?.play() :
            location.pathname != '/video' && navigate(`/video`)
    }

    const rotate = keyframes`
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
        `;

    const RoundIcon = styled(Icon)({
        width: 35,
        height: 35,
        borderRadius: '100%',
        animation: `${rotate} 10s linear infinite`,
        backgroundImage: LotusIcon
    });

    if (paused)
        return <Box {...sx} display={'inline-flex'} onClick={switchPlay}> <PlayCircleOutlineIcon sx={{ zoom: 1.7 }} color='secondary' /></Box>

    return (
        <RoundIcon {...sx} onClick={switchPlay}>
            <img src={LotusIcon} alt="lutos" />
        </RoundIcon>
    )
})

export default PlayerSphere