import { Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const PlayButton: React.FC = () => {
    return (
        <Button title='从当前开始播放' >
            <PlayCircleOutlineIcon />
        </Button>
    );
};

export default PlayButton;
