import { searchHead } from '@/store/template';
import { getSearchResults } from '@/utils/requestUtil';
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import DocIframe from '@/pages/common/DocIframe';
import { countVsearch } from '@/utils/dbUtil';
import ShareButton from '@/pages/common/ShareButton';
import { containsChineseAndAlphabat, isNightOwl } from '@/utils/randomUtil';
import SearchSkeleton from '@/components/SearchSkeleton';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  let { keywords } = useParams();
  const [wait, setWait] = useState<boolean>(true)
  const [searchParams, _] = useSearchParams()
  const page = searchParams.get('page')

  if (keywords?.trim().length === 0) {
    return <></>
  }

  const fetchHtml = async (keywords: string) => {
    const text = await getSearchResults(keywords, (page == null ? '1' : page))
    setSrc(searchHead + text)
    setWait(false)
  }
  useEffect(() => {
    if (keywords) {
      if (isNightOwl()) {
        keywords = '熬夜'
        alert('听老师的话，不要熬夜了')
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
