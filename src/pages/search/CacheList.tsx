import { SearchItem,  getCachedSearchByWords } from '@/utils/dbUtil'
import {  Container, Link, List, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Cache() {
    const { keywords } = useParams()
    const [viewlist, setViewlist] = useState<SearchItem[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        if (keywords && keywords.trim() != '') {
            (async () => {
                const list: SearchItem[] | undefined = (await getCachedSearchByWords(keywords.trim()))
                list && setViewlist(list)
                if (list?.length == 0) {
                    navigate(`/vsearch/${keywords}`)
                }
            })()
        }
    }, [keywords])

    return (
        <Container>
            <Typography variant='h6'>搜到了{viewlist.length}条缓存，点击链接查看</Typography>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: "80vh",
                }}
            >
                {viewlist.map(item => {
                    return <li key={item.keywords}>
                        <Link onClick={() => navigate(`/cache/${item.keywords}`)} >{item.keywords}</Link>
                    </li>
                })}
            </List>
        </Container>
    )
}
