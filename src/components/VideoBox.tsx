import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { VideoInfo } from '@/utils/types';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { DbContext } from '@/App';
import { getRandomNum } from '@/utils/randomUtil';
import { useVideoStore } from '@/store/Index';
import SearchView from '@/pages/SearchView';
import { Box, IconButton, Typography } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const { state }: { state: VideoInfo } = useLocation()
  const [searchParams, _] = useSearchParams()

  const { id } = useParams()
  let no = ''
  const playlist = useVideoStore(state => state.playlist)
  const setPlaylist = useVideoStore(state => state.setPlaylist)
  const videoIndex = useVideoStore(state => state.videoIndex)
  const setVideoIndex = useVideoStore(state => state.setVideoIndex)

  try {
    if (id) {
      no = isNaN(+id.slice(2, 5)) ?
        atob(id || '') :
        no = id?.slice(0, 5)
    } else {
      no = searchParams.get('no') ?? ''
    }
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    (async () => {

      if (state || no) {
        state ? setPlaylist([state]) : setPlaylist(findTitleByIds(await dbContext.fetchTitles(), [no]))
        setVideoIndex(0)
      } else {
        if (playlist.length == 0) {
          let video = await getRandomVideo()
          console.log(video, no, 3);
          setPlaylist(video)
          setVideoIndex(0)
        }
      }
    })()
  }, [no])

  const getRandomVideo = async () => {
    return findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206))
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} sx={{ px: 2 }}>
        <Box>
          №{playlist[videoIndex]?.no?.slice(0, 5)}
          <Typography display={'inline'} paddingLeft={1} variant='h6' children={playlist[videoIndex]?.title} />
        </Box>
        <IconButton href={`${import.meta.env.VITE_STREAM_URL}?code=${playlist[videoIndex]?.no?.slice(0, 5)}&format=mp4&width=480`}
          children={<CloudDownloadOutlinedIcon />} />
      </Box>
      <SearchView data={playlist} />
    </>
  )
}
