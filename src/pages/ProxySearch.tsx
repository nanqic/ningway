import { searchHead } from '@/store/template';
import { getSearchResults } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DocIframe from '@/pages/common/DocIframe';
import { countVsearch } from '@/utils/dbUtil';
import ShareButton from '@/pages/common/ShareButton';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  let { keywords } = useParams();
  const [message, setMessage] = useState<string>("")
  const [searchParams, _] = useSearchParams()
  const page = searchParams.get('page')
  const navigate = useNavigate()
  let url = searchParams.get('url')

  if (keywords?.trim().length === url?.trim().length) {
    return <>关键字待优化 {keywords}{url}</>
  }

  const fetchHtml = async (keywords: string) => {
    setMessage('请求已发送，等待服务器响应...')


    const text = await getSearchResults(keywords, (page == null ? '1' : page))

    if (text?.includes("服务")) {
      setMessage('服务繁忙，可以先搜索缓存')
      return setTimeout(() => navigate('/tool/5')
        , 3000)
    }
    setSrc(searchHead + text)
    setMessage(' ')
  }
  useEffect(() => {
    if (
      localStorage.getItem("visit_date") &&
      localStorage.getItem("visit_date") == (new Date().getDate()) + ""
    ) {
      setMessage('服务繁忙，可以先搜索缓存')
      setTimeout(() => navigate('/tool/5')
        , 3000)
      return;
    }

    if (keywords) {
      fetchHtml(keywords)
      countVsearch(keywords)
    }
  }, [searchParams])

  return (
    <Box marginTop={1.5}>
      <Typography variant='h5' margin={1.5}>{message}</Typography>
      {src && <DocIframe src={src} />}
      <Box textAlign={"right"} marginRight={2}><ShareButton name='分享本页' /></Box>
    </Box>
  )
}
