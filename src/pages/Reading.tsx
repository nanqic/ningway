import { postList } from '@/store/postList';
import { Link } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';

function Reading() {
    const navigate = useNavigate()
    
    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {postList.map(item => {
                    return <ListItem key={item.id} alignItems="flex-start">
                        <Link variant='h6' onClick={() => navigate(`/post/${item.id}`)}>{item.title}</Link>
                    </ListItem>
                })}
                <hr />
                <Link marginLeft={2} href='/search?title=视频摘录'>视频摘录</Link>
            </List>
        </div>
    )
}

export default Reading