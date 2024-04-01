import { Box, Link, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import VidioPlayer from '@/components/VideoPlayer'
import { useContext, useEffect, useRef, useState } from 'react';
import { VideoSearch } from '@/utils/types';
import { searchVideo } from '@/utils/dbUtil';
import { fetchPageview } from '@/utils/requestUtil';
import NotFound from '@/components/NotFound';
import { DbContext } from '@/App';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const [searchParams, _] = useSearchParams()
  const titleParam = searchParams.get('title')
  const durationParam = searchParams.get('duration')
  const dateParam = searchParams.get('date')
  const navigate = useNavigate()

  const { id } = useParams()
  const videoRef = useRef(null);
  const [Title, setTitle] = useState(titleParam)
  const [Pageview, setPageview] = useState(1)

  let params: undefined | string
  try {
    params = atob(id || '')
  } catch (error) {
    console.log(error);
  }

  // 从base64解析的参数中读取时间码 || ?t=xxx 传参的时间码
  const start = params?.split('start=')[1] || searchParams.get('t')

  const no = params?.slice(1, 6)
  // 浏览器地址去除search params
  if (params?.includes('&')) {
    window.history.replaceState(null, '', `${btoa(params?.split('&')[0])}${start && '?t=' + start}`,);
  }
  // 更改document.title
  useEffect(() => {
    (async () => {
      if (!Title) {
        const list: VideoSearch[] = searchVideo(await dbContext.fetchTitles(), no)
        setTitle(list[0]?.title || '')
      }
      setPageview(await fetchPageview() || 1)
    })()

    document.title = '宁路 | ' + Title
  }, [Title])

  return (
    <Box
      sx={{
        width: '100%'
      }}>
      {params ?
        <>
          <VidioPlayer
            src={`${no}${start ? '#t=' + start : ''}`}
            videoRef={videoRef}
            title={Title || ''}
          />
          <Box
            display={'flex'}
            alignItems={'center'}
          >
            {dateParam && <Typography component={'span'} paddingX={2}>日期：
              <Link sx={{ minWidth: "5.5em", pl: .5 }} onClick={() => navigate(`/search?title=${dateParam.slice(2)}`)}>{dateParam}</Link>
            </Typography>}
            {durationParam && <Typography component={'span'}>时长：{durationParam}分钟</Typography>}
            <Box
              display={"inline-flex"}
              alignItems={"center"}
              component={'span'}
              color={"grey"}
              letterSpacing={1}
              fontSize={12}
              marginLeft={1.5}
            > <VisibilityIcon />&nbsp; {Pageview}</Box>
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
            {Title}
          </Typography>
        </> :
        <NotFound />
      }
    </Box>
  )
}
