import DocIframe from '@/components/DocIframe'
import { searchHead } from '@/store/template'
import { SearchItem, countVsearch, getCachedSearchByWords } from '@/utils/dbUtil'
import { fetchComment } from '@/utils/requestUtil'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function Cache() {
    const { keywords } = useParams()
    const [view, setView] = useState<string>()
    const { state } = useLocation();

    const fetchData = () => {
        if (keywords && keywords.trim() != '') {
            (async () => {
                let comment = state || (await getCachedSearchByWords(keywords.trim())).data.pop()?.comment

                if (!comment) {
                    comment = (await fetchComment(keywords)).comment
                }

                if (comment) {
                    countVsearch(keywords)
                    setView(comment)
                    document.title = '宁路 | ' + keywords
                }
            })()
        }
    }

    useEffect(() => {
        fetchData()
    }, [keywords])
    return (
        <div>
            {!location.hash.includes('unique') &&
                <Button onClick={() => history.go(-1)}>返回列表</Button>}
            {view && <DocIframe src={searchHead + view} />}
        </div>
    )
}
