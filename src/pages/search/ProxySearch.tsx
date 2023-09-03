import { Box, Button, Link, Input } from '@mui/material'
import { styled } from '@mui/styles'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';


export default function ProxySearch() {
  const [src, setSrc] = useState<string>('')
  const queryRef = useRef(null);
  let {keywords} = useParams();

  useEffect(() => {
    if (keywords && keywords != '') {
      // 如果有search且参数不为空
        setSrc(`${import.meta.env.VITE_PROXY_URL}${keywords}`)
    }
  }, [])

  const PreviewIframe = styled('iframe')({
    border: 'none',
    height: '100%',
    width: '100%',
  })

  const handleEnter = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    // @ts-ignore
    const query = queryRef.current?.value
    if (query != null && query.trim() != '') {

    }
  }

  return (
    <Box height={'100vh'}>

      {/* <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          m: 1
        }}
      >
        <Input size='small'
          // @ts-ignore
          onKeyUp={handleEnter}
          autoFocus
          placeholder='请输入关键字'
          inputRef={queryRef}
          sx={{ mr: 1 }} />
        <Button variant="text" sx={{ height: 40 }} onClick={handleSearch}>搜索</Button>
      </Box> */}
      {src && <PreviewIframe src={src} />}
    </Box>
  )
}

