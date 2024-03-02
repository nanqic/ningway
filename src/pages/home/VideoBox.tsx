import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useEffect, useRef, useState } from 'react';
import { VideoSearch } from '@/utils/types';
import { fetchVbox } from '@/utils/dbUtil';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { fetchPageview } from '@/utils/requestUtil';
import Footer from '@/components/Footer';

export default function VideoBox() {
  const { id } = useParams()
  const videoRef = useRef(null);
  const [Title, setTitle] = useState('')
  const [Pageview, setPageview] = useState(1)

  let params: undefined | string
  try {
    params = atob(id || '')
  } catch (error) {
    console.log(error);
  }
  const start = params?.split('start=')[1]
  const no = params?.slice(1, 6)
  // 浏览器地址去除search params
  if (params?.includes('&')) {
    window.history.replaceState(null, '', `${btoa(params?.split('&')[0])}${start && '?t=' + start}`,);
  }
  // 更改document.title
  useEffect(() => {
    (async () => {
      const list: VideoSearch[] = await fetchVbox(no)
      document.title = '宁路 | ' + list[0]?.title
      setTitle(list[0]?.title || '')
      setPageview(await fetchPageview() || 1)
    })()

  }, [])

  return (
    <Box
      sx={{
        width: '100%'
      }}>
      {params ?
        <>
          <VidioPlayer
            // @ts-ignore
            props={{
              src: import.meta.env.VITE_STREAM_URL + no,
              videoRef,
              start
            }}
          />
          <Typography variant='h6'
            display={"flex"}
            alignItems={"center"}
            sx={{
              mx: 1,
              my: .5,
              fontWeight: 600,
              letterSpacing: "2px"
            }}><Box
              display={"inline-flex"}
              alignItems={"center"}
              component={'span'}
              color={"grey"}
              letterSpacing={1}
              fontSize={12}
              marginRight={1.5}
            >&nbsp; <RemoveRedEyeIcon color="action" />&nbsp; {Pageview}</Box>
            {Title}
          </Typography>
        </> :
        '404 not found'
      }
      <Footer />
    </Box>
  )
}
