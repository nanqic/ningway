import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useEffect, useRef } from 'react';
import { VideoSearch } from '@/utils/types';
import { fetchVbox } from '@/utils/dbUtil';

export default function VideoBox() {
  const { id } = useParams()
  const videoRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const title = searchParams.get('title')
  const t = searchParams.get('t')

  let params: undefined | string
  try {
    params = atob(id || '')
  } catch (error) {
    console.log(error);
  }
  const start = params?.split('start=')[1] || t
  const no = params?.slice(1, 6)
  // 浏览器地址去除search params
  if (params?.includes('&')) {
    window.history.replaceState(null, '', `${btoa(params?.split('&')[0])}${start && '?t=' + start}`,);
  }
  // 更改document.title
  useEffect(() => {
    setSearchParams() // 读取后置空title
    t && setSearchParams({ t }) // 加上t
    if (title) { document.title = '宁路 | ' + title }
    else {
      (async () => {
        const list: VideoSearch[] = await fetchVbox(no)
        document.title = '宁路 | ' + list.pop()?.title
      })()
    }
  }, [])

  return (
    <Box
      sx={{
        width: '100%'
      }}>
      {params ?
        <VidioPlayer
          // @ts-ignore
          props={{
            src: import.meta.env.VITE_STREAM_URL + no,
            videoRef,
            start
          }}
        /> :
        '404 not found'
      }
    </Box>
  )
}
