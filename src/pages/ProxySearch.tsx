import { searchHead } from '@/store/template';
import { getSearchResults } from '@/utils/requestUtil';
import { Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import DocIframe from '@/components/DocIframe';
import { countVsearch, getVsearchCount } from '@/utils/dbUtil';
import ShareButton from '@/components/ShareButton';
import { containsChineseAndAlphabat, isNightOwl } from '@/utils/randomUtil';
import SearchSkeleton from '@/components/SearchSkeleton';
import NotFound from '@/components/NotFound';
import { DbContext } from '@/App';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  let { keywords } = useParams();
  const [wait, setWait] = useState<boolean>(true)
  const [searchParams, _] = useSearchParams()
  const page = searchParams.get('page')

  const dbContext = useContext(DbContext);

  if (!dbContext?.enableSearch) {
    return <h3>非常抱歉，您所在的区域无法访问此内容。</h3>
  }
  if (keywords?.trim().length === 0) {

    return <NotFound />
  }

  const fetchHtml = async (keywords: string) => {
    const text = await getSearchResults(keywords, (page == null ? '1' : page))
    if (text?.indexOf('error') != -1) {
      alert('请稍等...')
      setTimeout(async () => {
        await fetch(`https://proxys.ningway.com/api/rm-keys?name=${encodeURI(keywords)}`, { method: 'POST' })
      }, 5000)
      location.reload()
    }
    setSrc(searchHead + text)
    setWait(false)
  }
  useEffect(() => {
    if (keywords) {
      if (isNightOwl()) {
        keywords = '熬夜'
        alert('早睡早起~')
      }
      if (containsChineseAndAlphabat(keywords)) {
        alert(`请检查输入的内容 ${keywords}`)
        return;
      }
      fetchHtml(keywords)
      countVsearch(keywords)
    }
  }, [searchParams])

  return (
    <Box marginTop={1.5}>
      {wait && <SearchSkeleton />}
      {src && <DocIframe src={src} />}
      <Box textAlign={"right"} marginRight={2}>
        <ShareButton name='分享本页' />
      </Box>
    </Box>
  )
}
