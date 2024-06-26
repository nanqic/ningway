import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { VideoInfo } from '@/utils/types';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { DbContext } from '@/App';
import { getRandomNum } from '@/utils/randomUtil';
import { usePlayerStore, useVideoStore } from '@/store/Index';
import SearchView from '@/pages/SearchView';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchPageview } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material';
import OutLink from '@/hooks/OutLink';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const { state }: { state: VideoInfo } = useLocation()

  const { id } = useParams()
  let params, no: undefined | string
  const [Pageview, setPageview] = useState(1)
  const navigate = useNavigate()

  const playlist = useVideoStore(state => state.playlist)
  const setPlaylist = usePlayerStore(state => state.setViewlist)
  const videoIndex = useVideoStore(state => state.videoIndex)
  const setVideoIndex = useVideoStore(state => state.setVideoIndex)

  try {
    if (id && isNaN(+id.slice(2, 5))) {
      params = atob(id || '')
      no = params?.slice(1, 6)
    } else {
      params = id
      no = params?.slice(0, 5)
    }
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    (async () => {
      let video
      if (no && !state) {
        video = findTitleByIds(await dbContext.fetchTitles(), [no])[0]
        navigate(`/video`, { state: video })
      }
      if (playlist.length == 0) {
        video = await getRandomVideo()
        setPlaylist(video)
        setVideoIndex(0)
      }
      if (state) {
        setPlaylist([state])
        setVideoIndex(0)
      }

      setPageview(await fetchPageview() || 1)
    })()
  }, [no,state])

  const getRandomVideo = async () => {
    return findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206))
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography sx={{ display: 'inline', color: '#bbb', mx: '15px' }}><VisibilityIcon />
          <sub>{Pageview}</sub></Typography>
        {playlist[videoIndex]?.title}
        <OutLink href={`${import.meta.env.VITE_STREAM_URL}?code=${playlist[videoIndex]?.no?.slice(0, 5)}&format=mp4&width=480`}
          sx={{ px: 2 }}
        >{playlist[videoIndex]?.no?.slice(0, 5)}</OutLink>
      </Box>
      <SearchView data={playlist} />
    </>
  )
}
