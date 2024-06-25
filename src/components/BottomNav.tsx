import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Paper } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LotusIcon from '@/assets/lotus.webp'
import { usePlayerStore, useVideoStore } from '@/store/Index';
import { styled, keyframes } from '@mui/material/styles';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RoundIcon = styled('div')({
    zoom: 1.7,
    animation: `${rotate} 7s linear infinite`,
    '& img': {
        borderRadius: '25px',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});

export default function BottomNav() {
    const [value, setValue] = React.useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const videoRef = usePlayerStore(state => state.videoRef)
    const paused = useVideoStore(state => state.paused)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (location.pathname != `/${newValue}`) {
            navigate(`/${newValue}`)
            document.title = '宁路'
        }
    };

    const switchPlay = () => {
        videoRef?.current?.paused ?
            videoRef?.current?.play() :
            navigate(`/video`)
    }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: "none" } }} elevation={3}>
            <BottomNavigation showLabels value={location.pathname.slice(1) || value} onChange={handleChange}>
                <BottomNavigationAction
                    label="列表"
                    value="yearlist"
                    icon={<FormatListBulletedIcon />}
                />
                <BottomNavigationAction
                    label="最近"
                    value="recents"
                    icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                    // label="播放"
                    onClick={switchPlay}
                    value={`video`}
                    icon={
                        paused ? <PlayCircleOutlineIcon sx={{ zoom: 1.7 }} /> :
                            <RoundIcon>
                                <img src={LotusIcon} alt="lutos" />
                            </RoundIcon>
                    } />

                <BottomNavigationAction
                    label="收藏"
                    value="favorites"
                    icon={<StarBorderOutlinedIcon />}
                />
                <BottomNavigationAction label="微博" value="weibo" icon={<LocalLibraryOutlinedIcon />} />
            </BottomNavigation>
        </Paper>
    );
}
