import { Box, Button, Link, Typography } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { VideoSearch } from '@/utils/types'
import { fetchVbox, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import PlayButton from '@/pages/common/PlayButton'
import VideoPlayer from '@/pages/common/VideoPlayer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/pages/common/ShareButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchLinks from '@/components/SearchLinks'
import Highlight from '@/components/Highlight'

export default function TitleSearch({ playList = [] }: { playList?: VideoSearch[] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useParams()['query'] || searchParams.get('query') || ''
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
        const res = await findTitleByIds(codesPram)
        for (let i = 0; i <= codesPram.length - 1; i++) {
          const item = res.find(x => x.no == codesPram[i])
          item && list.push(item)
        }

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

  const SiteLink = ({ index, no, title, duration }: VideoSearch) => {
    return (
      <Link
        style={{
          color: index == current ? 'green' : '',
          textAlign: 'left'
        }}
        onClick={() => navigate(`/video/${btoa('=' + no)}`)}
      >
        <Highlight search={listParam ? '' : query} text={title} />
        <Box marginLeft={1} color="gray" component={'span'}>{duration !== 0 && duration + "'"}</Box>
      </Link>
    )
  }

  const SearchResult = ({ date, no, title, duration, index }: VideoSearch) => {

    return <Box
      display={'flex'}
      alignItems={'center'}
      sx={{
        my: .2,
        borderBottom: '1px solid green',
      }}
    >
      <Box sx={{ minWidth: "fit-content" }}>{date && !isNaN(date.getDate()) && date?.toISOString().slice(0, 10)}</Box>
      <Link
        sx={{
          mx: 1,
          color: "gray"
        }} href={`/301/${no}`} target="_blank">
        <Highlight search={listParam ? '' : query} text={no} />
      </Link>
      <Box
        width={"100%"}
        display={"inline-flex"}
        justifyContent={"space-between"}
        onClick={() => {
          if (!listParam) {
            setListFlag()
          }
        }}>
        <SiteLink no={no} title={title} index={index} duration={duration} />
        <PlayButton
          index={index || 0}
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
          {(orderReverse ? viewlist.slice(0, showMore).reverse() : viewlist.slice(0, showMore)).map((item, i) => <SearchResult key={i} {...item} index={i} />
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
