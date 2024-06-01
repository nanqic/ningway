import { getMarkdown, getUri } from '@/utils/requestUtil'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { Box, Button, Container } from '@mui/material'
import ShareButton from '@/components/ShareButton'
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

function Post() {
    let { id } = useParams()
    if (!id) return;

    const [md, setMd] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMd = async () => {
            const markdown = await getMarkdown(id)
            setMd(markdown)
        }
        fetchMd()
    }, [])

    return (
        <Container sx={{ fontSize: 20 }}>
            {!md && <h2>加载中...</h2>}
            <Markdown>{md}</Markdown>
            <Box display={'flex'} justifyContent={'space-around'}>
                <Button startIcon={<KeyboardReturnOutlinedIcon />} onClick={() => navigate(`/post`)}>返回列表</Button>
                <ShareButton />
            </Box>
        </Container>
    )
}

export default Post