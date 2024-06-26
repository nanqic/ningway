import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Paper } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayerSphere from './PlayerSphere';

export default function BottomNav() {
    const [value, setValue] = React.useState('');
    const navigate = useNavigate()
    const location = useLocation()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (location.pathname != `/${newValue}`) {
            navigate(`/${newValue}`)
            document.title = '宁路'
        }
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: "none" } }} elevation={3}>
            <BottomNavigation showLabels value={ value} onChange={handleChange}>
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
                    value={`video`}
                    icon={<PlayerSphere />} />

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
