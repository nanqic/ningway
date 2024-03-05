import { searchHead } from '@/store/template';
import { postKeywords, postSearchData } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DocIframe from '@/components/DocIframe';
import { countVsearch } from '@/utils/dbUtil';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  const { keywords } = useParams();
  const [message, setMessage] = useState<string>("")
  const [searchParams, _] = useSearchParams()
  const page = searchParams.get('page')
  const navigate = useNavigate()

  const fetchHtml = async (iframeUrl: string) => {
    const resp = await fetch(iframeUrl)

    const statusCode = resp.status; // 获取响应的状态码
    if (statusCode !== 200) {
      console.info('外部iframe的状态码：', statusCode);
      setMessage('服务器出错了，可以先搜索缓存')
      return setTimeout(() => navigate('/tool/5')
        , 3000)
    }

    const text = await resp.text()

    if (text?.includes("服务")) {
      setMessage('服务繁忙，可以先搜索缓存')
      return setTimeout(() => navigate('/tool/5')
        , 3000)
    }

    if (text) {
      setSrc(searchHead + text)
      setMessage(' ')

      if (keywords && text.includes("个视频")) {
        // const isOk = await postKeywords({ keywords, comment: text })
        // isOk && 
        postSearchData(keywords + (page ? '_p' + page : ''), text)
      }
    }
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

    let url = searchParams.get('url')
    if (url) {
      const subtitle = decodeURI(atob(url || '').slice(37).split('?page=')[0])
      const pagePram = atob(url || '').split('page=')[1]
      if (subtitle !== '' && pagePram !== null) {
        navigate(`/vsearch/${subtitle}?page=${pagePram}`)
      }
    }

    if (keywords) {
      const originSrc = `${import.meta.env.VITE_PROXY_URL}${btoa(encodeURI('/' + keywords) + (page ? '?page=' + page : ''))}`
      countVsearch(keywords)
      setMessage('搜索中...')
      fetchHtml(originSrc)
    }
  }, [searchParams])

  return (
    <Box marginTop={1.5}>
      <Typography variant='h5' margin={1.5}>{message}</Typography>
      {src && <DocIframe src={src} />}
    </Box>
  )
}
