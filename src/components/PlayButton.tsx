import { Box, SvgIcon } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { blue } from '@mui/material/colors';
import { PlayerProps } from '@/utils/types';


export default function PlayButton(props: PlayerProps) {
    const { current, index, playing, videoDom } = props
    return (
        <Box component={'span'} onClick={() => {
            if (current == index && playing) {
                // @ts-ignore
                videoDom.current.pause()
            } else {
                // @ts-ignore
                videoDom.current.play()
            }
        }}
            title='从当前开始播放'
            sx={{
                display: "flex",
                cursor: 'pointer',
                '&:hover': {
                    color: blue[300]
                }
            }} >
            <SvgIcon component={current == index && playing ? PauseCircleOutlineIcon : PlayCircleOutlineIcon} inheritViewBox />
        </Box>
    )
}
