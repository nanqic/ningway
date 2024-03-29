import { Box, Button, FormControlLabel, Link, Switch, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import { calcTotalDuration } from '@/utils/randomUtil'
import useLocalStorageState from 'use-local-storage-state'

interface SearchProps {
  codes?: string[]
  month?: string
}
export default function TitleSearch({ codes, month }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useParams()['query'] || searchParams.get('query') || ''
  const listParam = searchParams.get('list')
  const keywrodsParam = searchParams.get('keywords')
  const { state } = useLocation()
  const yearParam = state || searchParams.get('year')
  const monthParam = month || searchParams.get('month') || ''
  const codesPram = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')
  const [showMore, setShowMore] = useState<number>(20)
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const [showDuration, setShowDuration] = useLocalStorageState('showDuration', { defaultValue: true })
  const [orderReverse, setOrderReverse] = useState(false)
  const videoRef = useRef(null);
  const [viewlist, setViewlist] = useState<VideoSearch[]>([])
  const navigate = useNavigate()

  useEffect(() => {
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
      } else if (query || yearParam || monthParam) {
        list = await fetchVbox(query?.toUpperCase(), yearParam, monthParam)
        yearParam && searchParams.set('year', yearParam)
        monthParam && searchParams.set('month', monthParam)
        setSearchParams(searchParams)
      }

      setViewlist(list)
    }

    fetchData()
  }, [query, yearParam, monthParam])

  useEffect(() => {
    if (listParam && current)
      setCurrent(viewlist.length - current - 1)
  }, [orderReverse])

  useEffect(() => {
    if (current === showMore)
      setShowMore(prev => prev + 20)
  }, [current])

  const setListFlag = () => {
    if (!listParam) {
      searchParams.append('list', 'true')
      setSearchParams(searchParams)
    }
  }

  const reverseView = () => {
    setOrderReverse(prev => !prev)
    setViewlist(list => list.reverse())
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
      <Box sx={{ minWidth: "5.5em", pl: .5 }}>{date}</Box>
      <Link
        sx={{
          mx: 1,
          color: "gray"
        }} href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${no}`} target="_blank">
        <Highlight search={listParam ? '' : query} text={no} />
      </Link>
      <Box
        width={"100%"}
        display={"inline-flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        onClick={setListFlag}>
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
        props={{ src: `${viewlist[current]?.no}`, current, setCurrent, playing, setPlaying, videoRef, title: viewlist[current]?.title }}
      />}
      <Box margin={1} maxWidth={600}>
        {!listParam && query &&
          <Box>历史搜索：
            <SearchLinks keywords={getSearchHistory()} list={false} />
          </Box>}
        {(query || yearParam || monthParam || listParam) &&
          <Box>
            <Typography variant='body1' fontWeight='bold' component='span'>
              {listParam ? `“${keywrodsParam || query}”播放列表` : `${yearParam ? yearParam + '年' : ''}${monthParam ? monthParam + '月' : ''}`}
            </Typography>
            <Typography variant='body1' component='span' ml={1}>
              {viewlist.length}个视频
            </Typography>
            <FormControlLabel
              sx={{ ml: 2 }}
              control={<Switch size='small' checked={showDuration}
                onChange={() => setShowDuration((prev) => !prev)} />}
              label="时长"
            />
            {showDuration &&
              <Typography variant="body1" component={'span'}>{calcTotalDuration(viewlist.map(video => video.duration))}</Typography>}
            <Box marginLeft={3} component={'span'}>
              <Button startIcon={!orderReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} onClick={reverseView} >{!orderReverse ? '正序' : '倒序'}</Button>
            </Box>
          </Box>}
        {/^\/(?:list|search)/.test(location.pathname) &&
          <Typography variant='subtitle2'>（点击三角筛选年份）</Typography>}
        <Box overflow={'auto'} maxHeight={current !== undefined ? 420 : ''}>
          {viewlist.slice(0, showMore).map((item, i) => <SearchResult key={i} {...item} index={i} />
          )}
        </Box>
        <Box>
          {viewlist.length > showMore &&
            <Button onClick={() => setShowMore(pre => pre + 20)} startIcon={<MoreHorizIcon />}>加载更多</Button>}
          {viewlist.length > 0 && <Box textAlign={"right"}>
            <ShareButton name='分享列表' />
          </Box>}
        </Box>
      </Box>
    </Box>
  )
}
