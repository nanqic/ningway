import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { VideoSearch } from '@/utils/types'
import { fetchVbox } from '@/utils/dbUtil'
import { Highlight } from 'react-highlighter-ts'
import { ErrorBoundary } from "react-error-boundary";
import PlayButton from '@/components/PlayButton'
import VideoPlayer from '@/components/VideoPlayer'

export default function VboxSearch() {
  const [searchParams, _] = useSearchParams()
  const query = useParams()['query'] || searchParams.get('query')||''
  const [showAll, setShowAll] = useState(false)
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const videoDom = useRef(null);
  const [filterdSize, setFilterdSize] = useState<number>(0)
  const [viewlist, setViewlist] = useState<VideoSearch[]>([])

  useEffect(() => {
    if (query != '') {
      (async () => {
        const list: VideoSearch[] = await fetchVbox(query)
        setFilterdSize(list.length)
        if (list.length > 20 && showAll) {
          setViewlist(list)
        } else {
          setViewlist(list.slice(0, 20))
        }
      })()
    }
  }, [query, showAll])

  function JumpToVideo(props: VideoSearch) {
    const SiteLink = (props: any) => {
      return (
        <Highlight search={query} placeholder={undefined}>
          <Link
            underline="hover"
            href={props.href}
          >
            {props.title}
          </Link>
        </Highlight>
      )
    }
    return <SiteLink href={`/video/${btoa('=' + props.no)}?title=${props.title}`} title={props.title} />
  }

  const SearchResult = (props: VideoSearch) => {
    return <Box
      component="span"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        my: .2,
        borderBottom: '1px solid green',
        maxWidth: 600,
        '& code': {
          width: 39,
          display: 'inline-block',
        }
      }}
    >
      <Highlight
        search={query} placeholder={undefined} >
        {<Box component="i"
          sx={{
            mr: 1,
          }}>{props.no}</Box>}
        <JumpToVideo {...props} />
      </Highlight>
      <PlayButton
        index={props.index || 0}
        current={current || 0}
        playing={playing}
        videoDom={videoDom}
        setPlaying={setPlaying}
        setCurrent={setCurrent}
      />
    </Box >
  }
  return (
    <Container>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {current != undefined && <VideoPlayer
          // @ts-ignore
          props={{ src: `${import.meta.env.VITE_STREAM_URL}${viewlist[current]?.no}`, setCurrent, playing, setPlaying, videoRef: videoDom, title: viewlist[current]?.title }}
        />}
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">共{filterdSize}条搜索结果</Typography>
          <Box>
            {viewlist.map((item, i) => {
              return (
                <Highlight
                  key={i}
                  matchStyle={{
                    background: 'lightblue',
                    borderRadius: 4
                  }} search={query} placeholder={undefined} >
                  <SearchResult {...{ no: item.no, title: item.title, index: i }} />
                </Highlight>
              )
            })}
          </Box>
          {
            filterdSize > 20 && !showAll &&
            <Button onClick={() => setShowAll(true)}>展示全部搜索结果</Button>
          }
        </Box>
      </ErrorBoundary>
    </Container>
  )
}
