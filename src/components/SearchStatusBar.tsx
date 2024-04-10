import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FC } from 'react';
import { SearchConfig } from '@/utils/types';


interface SearchStatusBarProps {
    titleParam: string;
    yearParam: string;
    monthParam: string;
    viewlistLength: number;
    config: SearchConfig;
    playlistDuration: () => string;
    changeMonth: () => void;
    switchShowDuration: () => void;
    reverseView: () => void;
}

const SearchStatusBar: FC<SearchStatusBarProps> = ({ titleParam, yearParam, monthParam, viewlistLength, config, changeMonth, switchShowDuration, playlistDuration, reverseView }) => {

    return (
        <Box>
            <Typography variant='body1' fontWeight='bold' component='span'>
                {titleParam ? `“${titleParam}”播放列表` : ''}
                {` ${yearParam ? yearParam + '年' : ''}${monthParam ? monthParam + '月' : ''}`}
            </Typography>
            <Typography variant='body1' component='span' ml={1}>
                {viewlistLength}个视频
            </Typography>
            {!titleParam &&
                <FormControlLabel
                    sx={{ ml: 2 }}
                    control={<Switch size='small' checked={config.showMonth}
                        onChange={changeMonth} />}
                    label="月份"
                />}
            <FormControlLabel
                sx={{ ml: titleParam ? 2 : 0 }}
                control={<Switch size='small' checked={config.showDuration}
                    onChange={switchShowDuration} />}
                label="时长"
            />
            {config.showDuration &&
                <Typography variant='subtitle2' component={'span'}>{playlistDuration()}</Typography>}
            <Box marginLeft={1} component={'span'}>
                <Button startIcon={!config.orderReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} onClick={reverseView} >{!config.orderReverse ? '正序' : '倒序'}</Button>
            </Box>
        </Box>
    )
}

export default SearchStatusBar