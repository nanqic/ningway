import { getMarkdown } from '@/utils/requestUtil'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { Box, Button, Container } from '@mui/material'
import ShareButton from '@/components/ShareButton'
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { getRandomNum } from '@/utils/randomUtil'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { postList } from '@/store/postList'
import { handleScrollTop } from '@/components/ScrollTop'

function Post() {
    let { id } = useParams()
    let location = useLocation()
    if (!id) return;

    const [md, setMd] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMd = async () => {
            const markdown = await getMarkdown(id)
            setMd(markdown)
        }
        fetchMd()

    }, [location])

    return (
        <Container sx={{ fontSize: 20 }}>
            {!md && <h2>加载中...</h2>}
            <Markdown>{md}</Markdown>
            <Box display={'flex'} justifyContent={'space-around'}>
                <Button startIcon={<KeyboardReturnOutlinedIcon />} onClick={() => navigate(`/post`)}>返回列表</Button>
                <Button startIcon={<AutoStoriesOutlinedIcon />} onClick={(e) => {
                    navigate(`/post/${postList[getRandomNum(postList.length - 1)].id}`);
                    handleScrollTop(e);
                }}>换一篇</Button>
                <ShareButton />
            </Box>
        </Container>
    )
}

export default Post