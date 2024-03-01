import { searchHead } from '@/store/template';
import { postSearchData } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import SearchCache from './SearchCache';
import DocIframe from '@/components/DocIframe';
import { countVsearch } from '@/utils/dbUtil';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  const { keywords } = useParams();
  const [message, setMessage] = useState<string>("")
  const [searchParams, _] = useSearchParams()

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
          return setTimeout(() => setMessage(""), 2000)
        }

        if (text) {
          countVsearch()
          setSrc(searchHead + text)
          const regx = /<div.class="pagination">(.|\n)*?<\/div>/
          keywords && text.includes("个视频") && postSearchData(keywords, text.replace(regx, ''))
          setMessage(' ')
        }
      })
      .catch(function (error) {
        // console.info('请求外部iframe时发生错误：', error);
        setMessage('服务器出错了，可以先搜索缓存')
        return setTimeout(() => setMessage(""), 2000)
      })
  }

  useEffect(() => {
    const url = 'https://query.ningway.com/index.php?q=' + searchParams.get('url')

    if (keywords || searchParams.get('url') != null) {
      setMessage('搜索中...')
      const originSrc = keywords ? `${import.meta.env.VITE_PROXY_URL}${btoa(encodeURI('/' + keywords))}` : url

      fetchHtml(originSrc)
    }
  }, [searchParams])

  return (
    <Box marginTop={1.5}>
      <Typography variant='h5' margin={1.5}>{message}</Typography>
      {src && <DocIframe src={src} />}
      {message === "" &&
        <SearchCache keywords={keywords} />}
    </Box>
  )
}

