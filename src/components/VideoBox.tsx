import { Box, Link, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useContext, useEffect, useRef, useState } from 'react';
import { VideoInfo } from '@/utils/types';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { fetchPageview } from '@/utils/requestUtil';
import NotFound from '@/components/NotFound';
import { DbContext } from '@/App';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareButton from './ShareButton';
import { getRandomNum } from '@/utils/randomUtil';

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

  let params: undefined | string
  try {
    params = atob(id || '')
  } catch (error) {
    console.log(error);
  }

  // 从base64解析的参数中读取时间码 || ?t=xxx 传参的时间码
  const start = params?.split('start=')[1] || searchParams.get('t') || location.hash.slice(1)

  const no = params?.slice(1, 6)
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
    location.replace(`/video/${btoa('=' + nextNo)}`)
  }

  const randomVideo = async () => {
    let nextNo = findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206)).pop()?.no
    location.replace(`/video/${btoa('=' + nextNo)}`)
  }
  return (
    <Box
      sx={{
        width: '100%'
      }}>
      {params && videoInfo ?
        <>
          <VidioPlayer
            src={`${no}${start ? '#t=' + start : ''}`}
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
              <Link href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${no}&start=${start}`} target="_blank">{no?.slice(0, 5)}</Link>
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
            {videoInfo?.title} <Box
              display={"inline-flex"}
              alignItems={"center"}
              component={'span'}
              color={"grey"}
              letterSpacing={1}
              fontSize={12}
              marginX={2}
            > <VisibilityIcon />&nbsp; {Pageview}</Box>
            <ShareButton videoRef={videoRef} />
          </Typography>
        </> :
        <NotFound />
      }
    </Box>
  )
}
