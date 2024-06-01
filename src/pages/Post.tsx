import { getMarkdown, getUri } from '@/utils/requestUtil'
import { useParams } from 'react-router-dom'
// import Markdown from 'react-markdown'
import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { Container } from '@mui/material'

function Post() {
    let { id } = useParams()
    if (!id) return;

    const [md, setMd] = useState('')

    useEffect(() => {
        const fetchMd = async () => {
            const markdown = await getMarkdown(id)
            setMd(markdown)
        }
        fetchMd()
    }, [])

    return (
        <Container sx={{fontSize:20}}>
            <Markdown>{md}</Markdown>
        </Container>
    )
}

export default Post