import { getMarkdown, getUri } from '@/utils/requestUtil'
import { useParams } from 'react-router-dom'
// import Markdown from 'react-markdown'
import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'

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
        <div>
            <Markdown>{md}</Markdown>
        </div>
    )
}

export default Post