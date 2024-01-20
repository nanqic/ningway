import { Button, SvgIcon } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { blue } from '@mui/material/colors';
import { PlayerProps } from '@/utils/types';


export default function PlayButton(props: PlayerProps) {
    const { current, index, playing, videoDom } = props
    return (
        <Button
            size='small'
            onClick={() => {
                if (current == index && playing) {
                    // @ts-ignore
                    videoDom.current.pause()
                } else if (videoDom.current !== null) {
                    // @ts-ignore
                    videoDom.current.play()
                }
            }}
            title='从当前开始播放'
            sx={{
                // p: 0,
                color: 'grey',
                '&:hover': {
                    color: blue[300]
                }
            }} >
            <SvgIcon component={current == index && playing ? PauseCircleOutlineIcon : PlayCircleOutlineIcon} inheritViewBox />
        </Button>
    )
}
