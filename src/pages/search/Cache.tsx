import DocIframe from '@/components/DocIframe'
import { searchHead } from '@/store/template'
import { SearchItem, countVsearch, getCachedSearchByWords, getVsearchCount } from '@/utils/dbUtil'
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
                const searchItem: SearchItem = state || (await getCachedSearchByWords(keywords.trim())).data.pop()
                if (searchItem) {
                    let count = getVsearchCount()
                    !count?.keywords.split("|").includes(keywords) && countVsearch(searchItem.keywords)
                    setView(searchItem.comment)
                    document.title = '宁路 | ' + searchItem.keywords
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
