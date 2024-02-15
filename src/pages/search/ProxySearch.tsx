import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export default function ProxySearch() {
  const [src, setSrc] = useState<string>('')
  let { keywords } = useParams();
  const [message, setMessage] = useState('加载中...')

  useEffect(() => {
    if (keywords && keywords != '') {
      setSrc(`${import.meta.env.VITE_PROXY_URL}${btoa(encodeURI('/' + keywords))}`)
    }
  }, [])

  return (
    <Box height={'100vh'}>
      {message && <Typography variant='h5' margin={1.5}>
        {message}
      </Typography>}
      {src && <iframe style={{
        border: 'none',
        height: '100%',
        width: '100%',
      }}
        src={src}
        onLoad={() => setMessage('')}
        onError={() => setMessage('出错了~')}
      />}
    </Box>
  )
}

