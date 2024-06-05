import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
        <IconButton title='收藏视频' children={liked?.includes(no) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />} size='small' onClick={() => handleLike(no)} />
    )
}

export default LikeButton