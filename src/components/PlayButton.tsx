import { Button } from '@mui/material';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';

const PlayButton: React.FC = () => {
    return (
        <Button title='从当前开始播放' >
            <SmartDisplayOutlinedIcon />
        </Button>
    );
};

export default PlayButton;
