import DocIframe from '@/components/DocIframe'
import { searchHead } from '@/store/template'
import { CachedSearch, getCachedSearchByWords } from '@/utils/dbUtil'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Cache() {
    const { keywords } = useParams()
    const [view, setView] = useState<string>()

    const fetchData = () => {
        if (keywords && keywords.trim() != '') {
            (async () => {
                const cache: CachedSearch = (await getCachedSearchByWords(keywords.trim()))
                const searchItem = cache.data.pop()
                if (searchItem) {
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
