import usePagination from '@/hooks/usePagination';
import { postList } from '@/store/postList';
import { Link, Pagination } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';

function Reading() {
    const navigate = useNavigate()
    const pagi = usePagination(postList, 7)

    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {pagi.currentData().map(post => {
                    return <ListItem key={post.id} alignItems="flex-start">
                        <Link variant='h6' onClick={() => navigate(`/post/${post.id}`)}>{post.title}</Link>
                    </ListItem>
                })}
                <p></p>
                <Pagination count={pagi.maxPage} page={pagi.currentPage} onChange={(e, value) => pagi.setCurrentPage(value)} />
                <hr />
                <Link marginLeft={2} href='/weibo'> 微博</Link>
            </List>
        </div>
    )
}

export default Reading