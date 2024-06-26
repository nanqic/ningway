import { Box, Button, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FC } from 'react';

interface SearchStatusBarProps {
    query: string;
    titleParam: string;
    viewlistLength: number;
    orderReverse?: boolean;
    playlistDuration: () => string;
    reverseView: () => void;
}

const SearchStatusBar: FC<SearchStatusBarProps> = ({ query, titleParam, viewlistLength, orderReverse, playlistDuration, reverseView }) => {
    return (
        <Box>
            <Typography variant='body1' fontWeight='bold' component='span'>
                {titleParam ? `“${titleParam}”播放列表` : ''}
            </Typography>
            <Typography variant='body1' component='span' ml={1}>
                {viewlistLength}个视频
            </Typography>
            <Typography ml={1} variant='subtitle2' component={'span'}>{playlistDuration()}</Typography>
            {location.pathname == '/video' &&
                <Box marginLeft={1} component={'span'}>
                    <Button startIcon={!orderReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} onClick={reverseView} >{!orderReverse ? '正序' : '倒序'}</Button>
                </Box>}
            {/\d/.test(query) && viewlistLength === 0 &&
                <>
                    <Typography variant='h6' marginY={2}>日期/编号/标题 没有符号搜索条件的视频</Typography>
                    <Typography variant='h6'>日期格式：<b>12-02-02</b> （年-月-日各2位）</Typography>
                    <Typography variant='h6'>编号格式：<b>50001</b> （完整的5位编号）</Typography>
                    <Typography marginTop={2} color={'red'}>请检查输入的格式是否正确</Typography>
                </>
            }
        </Box>
    )
}

export default SearchStatusBar