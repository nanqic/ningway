import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useRef } from 'react';

export default function VideoBox() {
  const { id } = useParams()
  const videoRef = useRef(null);

  const no = atob(id || '')?.slice(1, 6)
  const start = atob(id || '')?.split('=')[2]

  // 更改document.title
  const [searchParams, _] = useSearchParams()
  const title = searchParams.get('title')
  title && (document.title = '宁路 | '+title)

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
