import { Box, Button, Container } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { VideoSearch } from '@/utils/types'
import { fetchVbox } from '@/utils/dbUtil'
import { Highlight } from 'react-highlighter-ts'
import { ErrorBoundary } from "react-error-boundary";
import PlayButton from '@/components/PlayButton'
import { blue } from '@mui/material/colors'
import VideoPlayer from '@/components/VideoPlayer'

export default function VboxSearch() {
  const [searchParams, _] = useSearchParams()
  const query = searchParams.get('query')?.trim().replace(/\//g, '').toUpperCase() || ''
  const [showAll, setShowAll] = useState(false)
  const [current, setCurrent] = useState<number|undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const videoDom = useRef(null);
  const [filterdSize, setFilterdSize] = useState<number>(0)
  const [viewlist, setViewlist] = useState<VideoSearch[]>([])


  useEffect(() => {
    if (query != '') {
      (async () => {
        const list: VideoSearch[] = await fetchVbox(query)
        setFilterdSize(list.length)
        if (list.length > 30 && showAll) {
          setViewlist(list)
        } else {
          setViewlist(list.slice(0, 30))
        }
      })()
    }
  }, [searchParams, showAll])

  function JumpToVideo(props: VideoSearch) {
    const SiteLink = (props: any) => {
      return (
        <Highlight search={query} placeholder={undefined}>
          <Link style={{
            color: blue[300],
            marginLeft: 6,
            marginRight: 9
          }}
            to={props.href}
            target={'_blank'}
          >
            {props.title}
          </Link>
        </Highlight>
      )
    }
    return <SiteLink href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${props.no}`} title={props.title} />
  }

  const SearchResult = (props: VideoSearch) => {
    return <Box
      component="span"
      display={'flex'} justifyContent={'space-between'} maxWidth={'400px'}
      sx={{
        my: .2,
        borderBottom: '1px solid green',
        maxWidth: 600,
        '& code': {
          width: 39,
          display: 'inline-block',
          m: 1,
        }
      }}
    >
      <Highlight
        search={query} placeholder={undefined} >
        {<Box component="i"
          sx={{
            mx: 1,
            textDecoration: (props.no.slice(0, 2) === 'DZ' || props.no.slice(0, 2) === 'WB') ? 'line-through' : 'none'
          }}>№{props.no}</Box>} /
        <code>{props.vno}</code> /
        <code>{props.ano}</code>
        <JumpToVideo {...props} />
      </Highlight>
      <Box component={'span'} onClick={() => { setCurrent(props.index); setPlaying(true) }}>
        <PlayButton index={props.index || 0} current={current || 0} playing={playing} videoDom={videoDom} />
      </Box>
    </Box >
  }
  return (
    <Container>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {current != undefined && <VideoPlayer
          // @ts-ignore
          props={{ src: `${import.meta.env.VITE_STREAM_URL}${viewlist[current].no}`, setCurrent, playing, setPlaying, videoRef: videoDom }}
        />}
        <Box>
        <a href="https://less.ningway.com/s/FHRSPu9E" target='_blank'>点击填写问卷（网站可能关闭）</a>

          <p>共{filterdSize}条搜索结果</p>
          <Box
            sx={{
              fontWeight: 'bold',
              '& span': {
                component: 'span',
                mx: 2
              },
            }}>
            <span>编号</span>/
            <span>视频机</span>/
            <span>音频机</span>/
            <span>标题</span>
          </Box>
          <Box>
            {viewlist.map((item, i) => {
              return (
                <Highlight
                  key={i}
                  matchStyle={{
                    background: 'lightblue',
                    borderRadius: 4
                  }} search={query} placeholder={undefined} >
                  <SearchResult {...{ no: item.no, vno: item.vno, ano: item.ano, title: item.title, index: i }} />
                </Highlight>
              )
            })}
          </Box>
          {
            filterdSize > 30 && !showAll ?
              <Button onClick={() => setShowAll(true)}>展示全部搜索结果</Button> : ''
          }
        </Box>
      </ErrorBoundary>
    </Container>
  )
}
