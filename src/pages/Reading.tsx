import { Link } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';

function Reading() {
    const navigate = useNavigate()
    const postList = [
        { title: '修证1 通过禅修，培养专注力', id: 'xiuzheng1' },
        { title: '修证2 破除"我执', id: 'xiuzheng2' },
        { title: '修证3 累积功德', id: 'xiuzheng3' },
        { title: '缘起性空思想', id: 'yuanqi_xingkong' },
        { title: '菩提心', id: 'putixin' },
        { title: '菩提心的重要性', id: 'putixin_zhongyaoxing' },
        { title: '出离心', id: 'chulixin' },
        { title: '出离心的重要性', id: 'chulixin_zhongyaoxing' },
    ]
    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {postList.map(item => {
                  return  <ListItem key={item.id} alignItems="flex-start">
                        <Link onClick={() => navigate(`/post/${item.id}`)}>{item.title}</Link>
                    </ListItem>
                })}

            </List>
        </div>
    )
}

export default Reading