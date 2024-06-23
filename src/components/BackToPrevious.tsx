import HistoryIcon from '@mui/icons-material/History';
import { Button } from '@mui/material';
import useLocalStorageState from 'use-local-storage-state';

function BackToPrevious() {
    const [history, _] = useLocalStorageState<string>('history_visit', { defaultValue: '' })
    return (
        <>
            <Button size='large' startIcon={<HistoryIcon />} onClick={() => location.assign(history)}>继续播放</Button>
            {history.split('#')[1]}
        </>
    )
}

export default BackToPrevious