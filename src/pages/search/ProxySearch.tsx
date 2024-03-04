import { searchHead } from '@/store/template';
import { postSearchData } from '@/utils/requestUtil';
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
  const fetchHtml = (iframeUrl: string) => {
    fetch(iframeUrl)
      .then(resp => {
        const statusCode = resp.status; // 获取响应的状态码
        if (statusCode == 200) {
          return resp.text()
        }

        console.info('外部iframe的状态码：', statusCode);
      })
      .then(text => {
        if (text?.includes("服务")) {
          setMessage('服务繁忙，可以先搜索缓存')
          return setTimeout(() => navigate('/tool/5')
            , 3000)
        }

        if (text) {
          setSrc(searchHead + text)
          keywords && text.includes("个视频") && postSearchData(keywords + (page ? '_p' + page : ''), text)
          setMessage(' ')
        }
      })
      .catch(function (error) {
        // console.info('请求外部iframe时发生错误：', error);
        setMessage('服务器出错了，可以先搜索缓存')
        return setTimeout(() => navigate('/tool/5')
          , 3000)
      })
  }

  useEffect(() => {
    if (
      localStorage.getItem("forbidden_search") &&
      localStorage.getItem("forbidden_search") == (new Date().getDate()) + ""
    ) {
      navigate("/about")
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
      countVsearch()
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
