import { Box } from '@mui/material';
import { useParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useRef } from 'react';

export default function VideoBox() {
  const { id } = useParams()
  const videoRef = useRef(null);

  const no = atob(id || '')?.slice(1, 6)
  const start = atob(id || '')?.split('=')[2]

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
