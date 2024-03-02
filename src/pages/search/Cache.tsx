import DocIframe from '@/components/DocIframe'
import { searchHead } from '@/store/template'
import { SearchItem, getCachedSearchByWords } from '@/utils/dbUtil'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Cache() {
    const { keywords } = useParams()
    const [view, setView] = useState<string>()
    useEffect(() => {
        if (keywords && keywords.trim() != '') {
            (async () => {
                const views: SearchItem | undefined = (await getCachedSearchByWords(keywords.trim()))?.pop()
                if (views) {
                    setView(views.comment)
                    document.title = '宁路 | ' + views.keywords
                }
            })()
        }
    }, [keywords])
    return (
        <div>
            <Button onClick={() => history.go(-1)}>返回列表</Button>
            {view && <DocIframe src={searchHead + view} />}
        </div>
    )
}
