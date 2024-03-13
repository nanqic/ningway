import { Box, Button, Link, Typography } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { VideoSearch } from '@/utils/types'
import { fetchVbox, findTitleByIds } from '@/utils/dbUtil'
import { Highlight } from 'react-highlighter-ts'
import PlayButton from '@/pages/common/PlayButton'
import VideoPlayer from '@/pages/common/VideoPlayer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/pages/common/ShareButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchLinks from '@/components/SearchLinks'
import { getSearchHistory } from '@/utils/requestUtil'

export default function TitleSearch({ playList = [] }: { playList?: VideoSearch[] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { query } = useParams()
  const listParam = searchParams.get('list')
  const keywrodsParam = searchParams.get('keywords')
  const codesPram = searchParams.getAll('code')
  const [showMore, setShowMore] = useState<number>(20)
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const [orderReverse, setOrderReverse] = useState(false)
  const videoRef = useRef(null);
  const [viewlist, setViewlist] = useState<VideoSearch[]>(playList)
  const navigate = useNavigate()

  useEffect(() => {
    // console.log(query, keywrodsParam, codesPram, viewlist);
    setCurrent(undefined)
    setPlaying(false)

    const fetchData = async () => {
      let list: VideoSearch[] = []
      if (codesPram.length > 0) {
        list = await findTitleByIds(codesPram)
        setListFlag()
      } else if (query != '') {
        list = await fetchVbox(query?.toUpperCase())
      }
      setViewlist(list)
    }

    fetchData()
  }, [query])

  const setListFlag = () => {
    searchParams.append('list', 'true')
    setSearchParams(searchParams)
  }

  const reverseView = () => {
    setOrderReverse(prev => !prev)
  }

  function JumpToVideo(props: VideoSearch) {
    const SiteLink = (props: any) => {
      return (
        <Highlight search={listParam ? '' : query} placeholder={undefined}>
          <Link
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
      }}
    >
      <Highlight
        search={listParam ? '' : query} placeholder={undefined} >
        <Link

          sx={{
            mr: 1,
            color: "gray"
          }} href={`/301/${props.no}`} target="_blank">{props.no}</Link>
        <JumpToVideo {...props} />
      </Highlight>

      <Box onClick={() => {
        if (!listParam) {
          setListFlag()
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
      {current != undefined && <VideoPlayer
        // @ts-ignore
        props={{ src: `${import.meta.env.VITE_STREAM_URL}${viewlist[current]?.no}`, current, setCurrent, playing, setPlaying, videoRef, title: viewlist[current]?.title }}
      />}
      <Box margin={1} maxWidth={600}>
        {!listParam &&
          <Box>历史搜索：
            <SearchLinks keywords={getSearchHistory()} list={false} />
          </Box>}
        <Typography variant="h6">{listParam ? `“${keywrodsParam || query}”播放列表 - ` : '搜索到'}{viewlist.length}个视频
          <Box marginLeft={3} component={'span'}>
            <Button startIcon={!orderReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} onClick={reverseView} >{!orderReverse ? '正序' : '倒序'}</Button>
          </Box>
        </Typography>

        <Box>
          {(orderReverse ? viewlist.slice(0, showMore).reverse() : viewlist.slice(0, showMore)).map((item, i) => <SearchResult key={i} {...{ no: item.no, title: item.title, index: i }} />
          )}
        </Box>

        <Box>
          {
            viewlist.length > showMore &&
            <Button onClick={() => setShowMore(pre => pre + 20)} startIcon={<MoreHorizIcon />}>加载更多</Button>
          }
          <Box textAlign={"right"}>
            <ShareButton name='分享列表' />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
