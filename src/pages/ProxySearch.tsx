import { searchHead } from '@/store/template';
import { getSearchResults } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import DocIframe from '@/pages/common/DocIframe';
import { countVsearch } from '@/utils/dbUtil';
import ShareButton from '@/pages/common/ShareButton';
import { isNightOwl } from '@/utils/randomUtil';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  let { keywords } = useParams();
  const [message, setMessage] = useState<string>()
  const [searchParams, _] = useSearchParams()
  const page = searchParams.get('page')

  if (keywords?.trim().length === 0) {
    return <></>
  }

  const fetchHtml = async (keywords: string) => {
    setMessage('深山幽谷清净地，蹉跎此时不修行...')

    const text = await getSearchResults(keywords, (page == null ? '1' : page))
    setSrc(searchHead + text)
    setMessage("")
  }
  useEffect(() => {
    if (keywords) {
      if (isNightOwl()) {
        keywords = '熬夜'
        alert('听老师的话，不要熬夜了')
      }
      fetchHtml(keywords)
      countVsearch(keywords)
    }
  }, [searchParams])

  return (
    <Box marginTop={1.5}>
      {message && <Typography variant='h5' margin={1.5}></Typography>}
      {src && <DocIframe src={src} />}
      <Box textAlign={"right"} marginRight={2}><ShareButton name='分享本页' /></Box>
    </Box>
  )
}
