import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Icon, Paper } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import useLocalStorageState from 'use-local-storage-state';
import LotusIcon from '@/assets/lotus.webp'
import { useVideoStore } from '@/store/Index';

export default function BottomNav() {
    const [value, setValue] = React.useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const [history, _] = useLocalStorageState<string>('history_visit', { defaultValue: '' })
    const video = useVideoStore(state => state.video)
    const paused = useVideoStore(state => state.paused)
    const switchPaused = useVideoStore(state => state.switchPaused)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (location.pathname != `/${newValue}`) {
            navigate(`/${newValue}`)
            document.title = '宁路'
        }
    };

    const switchPlay = () => {
        video?.paused ?
            video?.play() ||window.location.reload():
            video?.pause()
        switchPaused()
        
    }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: "none" } }} elevation={3}>
            <BottomNavigation showLabels value={location.pathname.slice(1) || value} onChange={handleChange}>
                <BottomNavigationAction
                    label="列表"
                    value="videos"
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
                    value={`${history.slice(1)}`}
                    sx={{ zoom: 1.5 }}
                    icon={
                        paused ? <PlayCircleOutlineIcon /> :
                            <Icon sx={{ borderRadius: '25px' }}>
                                <img src={LotusIcon} alt="lutos" />
                            </Icon>
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
