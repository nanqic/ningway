import { Box, Link, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useContext, useEffect, useRef, useState } from 'react';
import { VideoInfo } from '@/utils/types';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { fetchPageview } from '@/utils/requestUtil';
import { DbContext } from '@/App';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareButton from './ShareButton';
import { getRandomNum } from '@/utils/randomUtil';
import LikeButton from './LikeButton';
import OutLink from '@/hooks/OutLink';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate()
  const { state }: { state: VideoInfo } = useLocation()
  const { id } = useParams()
  const videoRef = useRef(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | undefined>(state)
  const [Pageview, setPageview] = useState(1)
  let params, no: undefined | string

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
      if (no && !state) {
        const res = findTitleByIds(await dbContext.fetchTitles(), [no])
        setVideoInfo(res[0])
      }
      setPageview(await fetchPageview() || 1)
    })()
  }, [no])
  // console.log(videoInfo);

  const nextVideo = async () => {
    let nextNo = findVideoByIndex(await dbContext?.fetchTitles(), (videoInfo?.index || 0) + 1).pop()?.no
    navigate(`/video/${btoa('=' + nextNo)}`)
  }

  const randomVideo = async () => {
    let nextNo = findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206)).pop()?.no
    navigate(`/video/${btoa('=' + nextNo)}`)
  }

  return (
    <Box
      sx={{
        width: '100%'
      }}>
      {no && videoInfo &&
        <>
          <VidioPlayer
            videoNo={no}
            start={parseInt(start)}
            videoRef={videoRef}
            title={videoInfo?.title}
            nextVideo={nextVideo}
            randomVideo={randomVideo}
          />
          <Box
            display={'flex'}
            alignItems={'center'}
            margin={1}
          >
            <Box component={'span'} paddingRight='2px'>编号：
              <OutLink href={`${import.meta.env.VITE_STREAM_URL}?code=${no}&format=mp4&width=480`}>{no?.slice(0, 5)}</OutLink>
            </Box>
            {videoInfo?.date && <Typography component={'span'} paddingX={2}>日期：
              <Link sx={{ minWidth: "5.5em", pl: .5 }} onClick={() => navigate(`/search?title=${videoInfo?.date?.slice(2)}`)}>{videoInfo?.date}</Link>
            </Typography>}
            {videoInfo && videoInfo.duration > 0 && <Typography component={'span'}>时长：{videoInfo?.duration}分钟</Typography>}
          </Box>
          <Typography variant='h6'
            display={"flex"}
            alignItems={"center"}
            sx={{
              mx: 1,
              my: .5,
              fontWeight: 600,
              letterSpacing: "2px"
            }}>
            {videoInfo?.title}
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={'space-between'}
            color={"grey"}
            fontSize={12}
          >
            <span><VisibilityIcon sx={{ ml: 1 }} />{Pageview}</span>
            {no && <LikeButton no={no} />}
            <ShareButton videoRef={videoRef} />
          </Box>
        </>
      }
    </Box>
  )
}
