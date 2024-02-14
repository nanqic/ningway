import { Box } from '@mui/material';
import { useParams } from 'react-router-dom'

export default function VideoBox() {
  const { id } = useParams()
  const src = atob(id || '')?.slice(2)

  const redirectOut = () => {
    location.replace(`${import.meta.env.VITE_OFFICIAL_SITE}/${src}`)
  }
  return (
    <Box sx={{
      width: '100%'
    }}>
      <video
        controls width="100%"
        src={`${import.meta.env.VITE_STREAM_URL}${src}`}
        onError={redirectOut}
      />
    </Box>
  )
}
