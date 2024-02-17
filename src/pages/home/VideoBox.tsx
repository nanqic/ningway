import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useEffect, useRef } from 'react';
import { VideoSearch } from '@/utils/types';
import { fetchVbox } from '@/utils/dbUtil';

export default function VideoBox() {
  const { id } = useParams()
  const videoRef = useRef(null);

  const no = atob(id || '')?.slice(1, 6)
  const start = atob(id || '')?.split('=')[2]

  const [searchParams, _] = useSearchParams()
  // 更改document.title
  useEffect(() => {
    const title = searchParams.get('title')
    if (title) { document.title = '宁路 | ' + title }
    else {
      (async () => {
        const list: VideoSearch[] = await fetchVbox(no)
        document.title = '宁路 | ' + list.pop()?.title
      })()
    }
  }, [])

  return (
    <Box sx={{
      width: '100%'
    }}>
      {no &&
        <VidioPlayer
          // @ts-ignore
          props={{
            src: import.meta.env.VITE_STREAM_URL + no,
            videoRef,
            start
          }}
        />}
    </Box>
  )
}
