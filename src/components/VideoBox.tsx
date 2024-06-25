import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { VideoInfo } from '@/utils/types';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { DbContext } from '@/App';
import { getRandomNum } from '@/utils/randomUtil';
import { useVideoStore } from '@/store/Index';
import SearchView from '@/pages/SearchView';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchPageview } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material';
import OutLink from '@/hooks/OutLink';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const [searchParams, _] = useSearchParams()
  const { state }: { state: VideoInfo } = useLocation()

  const { id } = useParams()
  let params, no: undefined | string
  const [Pageview, setPageview] = useState(1)

  const playlist = useVideoStore(state => state.playlist)
  const setPlaylist = useVideoStore(state => state.setPlaylist)
  const setVideoIndex = useVideoStore(state => state.setVideoIndex)
  let videoInfo = playlist[0]

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

  // 从base64解析的参数中读取时间码 || ?t=xxx 传参的时间码
  const start = params?.split('start=')[1] || searchParams.get('t') || location.hash.slice(3)

  // 浏览器地址去除search params
  if (params?.includes('&')) {
    window.history.replaceState(null, '', `${btoa(params?.split('&')[0])}${start && '#t=' + start}`,);
  }

  useEffect(() => {
    (async () => {
      let video
      if (no && !state) {
        video = findTitleByIds(await dbContext.fetchTitles(), [no])
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
  }, [no])
  // console.log(videoInfo);

  const getRandomVideo = async () => {
    return findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206))
  }

  return (
    <>
      <Box>
        <Typography sx={{ display: 'inline', color: '#bbb', mx: '15px' }}><VisibilityIcon />
          <sub>{Pageview}</sub></Typography>
        {videoInfo?.title}
        <OutLink href={`${import.meta.env.VITE_STREAM_URL}?code=${videoInfo?.no?.slice(0, 5)}&format=mp4&width=480`}
          sx={{ ml: 2 }}
        >{videoInfo?.no?.slice(0, 5)}</OutLink>
      </Box>
      <SearchView data={playlist} />
    </>
  )
}
