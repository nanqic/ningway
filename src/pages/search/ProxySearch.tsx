import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export default function ProxySearch() {
  const [src, setSrc] = useState<string>('')
  let { keywords } = useParams();

  useEffect(() => {
    if (keywords && keywords != '') {
      setSrc(`${import.meta.env.VITE_PROXY_URL}${btoa(encodeURI('/'+keywords))}`)
    }
  }, [])



  return (
    <Box height={'100vh'}>
      {src && <iframe style={{
        border: 'none',
        height: '100%',
        width: '100%',
      }}
        src={src} />}
    </Box>
  )
}

