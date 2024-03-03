import { CachedSearch, SearchItem, getCachedSearchByWords, isNeedSync } from '@/utils/dbUtil'
import { Button, Container, Link, List, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Cache() {
    const { keywords } = useParams()
    const [viewlist, setViewlist] = useState<SearchItem[]>([])
    const [needSync, setNeedSync] = useState(true)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchData = (sync?: boolean) => {
        if (keywords && keywords.trim() != '') {
            (async () => {
                const cache: CachedSearch = (await getCachedSearchByWords(keywords.trim(), sync))
                setViewlist(cache.data)
                setLoading(false)

                const need = isNeedSync(cache.timestamp, 1)
                if (!need && cache.data.length == 0) {
                    navigate(`/vsearch/${keywords}`)
                }

                setNeedSync(need)
            })()
        }
    }

    useEffect(() => {
        fetchData()
    }, [keywords])

    return (
        <Container>
            <Typography variant='h6'>{loading ? '加载中...' : viewlist.length + '条匹配'}
                {needSync &&
                    <Button sx={{ mx: 2 }} onClick={() => {
                        setNeedSync(false)
                        setLoading(true)
                        fetchData(true)
                    }} startIcon={<AutorenewIcon />}>同步缓存</Button>
                }
            </Typography>
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
