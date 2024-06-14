import HistoryIcon from '@mui/icons-material/History';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

function BackToPrevious() {
    const navigate = useNavigate()
    const [history, setHistory] = useLocalStorageState<string>('history_visit', { defaultValue: '' })
    return (
        <>
            <Button size='large' startIcon={<HistoryIcon />} onClick={() => navigate(history)}>继续播放</Button>
            {history.split('#')[1]}
        </>
    )
}

export default BackToPrevious