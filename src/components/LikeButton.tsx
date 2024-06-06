import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import useLocalStorageState from 'use-local-storage-state';

function LikeButton({ no }: { no: string }) {
    const [liked, setLiked] = useLocalStorageState<string[]>('liked_videos', { defaultValue: [] })

    const handleLike = (no: string) => {
        if (liked?.includes(no)) {
            let newLiked = liked.filter(item => item !== no)
            setLiked(newLiked)
        } else {
            setLiked([...liked, no])
        }
    }
    return (
        <IconButton title='收藏视频' children={liked?.includes(no) ? <StarIcon color="info"/> : <StarBorderIcon />} size='small' onClick={() => handleLike(no)} />
    )
}

export default LikeButton