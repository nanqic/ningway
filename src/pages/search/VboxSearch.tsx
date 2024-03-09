import { Box, Button, Link, Typography } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { VideoSearch } from '@/utils/types'
import { fetchVbox } from '@/utils/dbUtil'
import { Highlight } from 'react-highlighter-ts'
import { ErrorBoundary } from "react-error-boundary";
import PlayButton from '@/components/PlayButton'
import VideoPlayer from '@/components/VideoPlayer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/components/ShareButton'

export default function VboxSearch({ playList = [] }: { playList?: VideoSearch[] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useParams()['query'] || searchParams.get('query') || ''
  const [showMore, setShowMore] = useState<number>(20)
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null);
  const [viewlist, setViewlist] = useState<VideoSearch[]>(playList)
  const navigate = useNavigate()

  useEffect(() => {
    if (query != '') {
      (async () => {
        const list: VideoSearch[] = await fetchVbox(query.toUpperCase())
        setViewlist(list)
      })()
    }
  }, [query])

  function JumpToVideo(props: VideoSearch) {
    const SiteLink = (props: any) => {
      return (
        <Highlight search={query} placeholder={undefined}>
          <Link
            underline="hover"
            onClick={() => navigate(`/video/${props.id}`)}
          >
            {props.title}
          </Link>
        </Highlight>
      )
    }
    return <SiteLink id={`${btoa('=' + props.no)}`} title={props.title} />
  }

  const SearchResult = (props: VideoSearch) => {
    return <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        my: .2,
        borderBottom: '1px solid green',
        width: window.innerHeight < window.innerWidth ? 600 : '100%',
        '& code': {
          width: 39,
          display: 'inline-block',
        }
      }}
    >
      <Highlight
        search={query} placeholder={undefined} >
        <Link
          underline="hover"
          sx={{
            mr: 1,
            color: "gray"
          }} href={`/301/${props.no}`} target="_blank">{props.no}</Link>
        <JumpToVideo {...props} />
      </Highlight>

      <Box onClick={() => {
        if (!searchParams.get('list')) {
          searchParams.append('list', 'true')
          setSearchParams(searchParams)
        }
      }}>
        <PlayButton
          index={props.index || 0}
          current={current || 0}
          playing={playing}
          videoDom={videoRef}
          setPlaying={setPlaying}
          setCurrent={setCurrent}
        />
      </Box>
    </Box >
  }
  return (
    <Box>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {current != undefined && <VideoPlayer
          // @ts-ignore
          props={{ src: `${import.meta.env.VITE_STREAM_URL}${viewlist[current]?.no}`, current, setCurrent, playing, setPlaying, videoRef, title: viewlist[current]?.title }}
        />}
        <Box sx={{ m: 2 }}>
          <Typography variant="h6">列表中有{viewlist.length}个视频</Typography>
          <Box>
            {viewlist.slice(0, showMore).map((item, i) => <SearchResult key={i} {...{ no: item.no, title: item.title, index: i }} />
            )}
          </Box>

          <Box
            sx={{
              maxWidth: 600,
            }}>
            {
              viewlist.length > showMore &&
              <Button onClick={() => setShowMore(pre => pre + 20)} startIcon={<MoreHorizIcon />}>加载更多</Button>
            }
            <Box textAlign={"right"}>
              <ShareButton name='分享列表' />
            </Box>
          </Box>
        </Box>
      </ErrorBoundary>
    </Box>
  )
}
