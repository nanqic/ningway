import { createSrc, searchFrom, searchHead } from '@/store/template';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export default function ProxySearch() {
  const [src, setSrc] = useState<string>('')
  const { keywords } = useParams();
  const [message, setMessage] = useState('搜索中...')

  const fetchHtml = (iframeUrl: string) => {
    fetch(iframeUrl)
      .then(resp => {
        const statusCode = resp.status; // 获取响应的状态码
        if (statusCode !== 200) {
          console.info('外部iframe的状态码：', statusCode);
          setMessage('服务繁忙，请稍后再试')
        }

        return resp.text()
      })
      .then(text => {
        !text.includes("服务") && setSrc(createSrc(searchHead + searchFrom(keywords) + text))
      })
      .catch(function (error) {
        console.info('请求外部iframe时发生错误：', error);
        setMessage('服务器出错了~')
      });
  }

  useEffect(() => {
    if (keywords && keywords != '') {
      const originSrc = `${import.meta.env.VITE_PROXY_URL}${btoa(encodeURI('/' + keywords))}`
      fetchHtml(originSrc)
    }

  }, [])

  return (
    <Box>
      {message && <Typography variant='h5' margin={1.5}>
        {message}
      </Typography>}
      {src && <iframe style={{
        border: 'none',
        height: window.innerHeight < window.innerWidth ? '80vh' : '90vh',
        width: '100%',
      }}
        src={src}
        onLoad={() => setMessage('')}
      />}
    </Box>
  )
}

