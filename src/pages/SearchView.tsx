import { Box, Button, FormControlLabel, Link, Switch, Typography } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { VideoInfo } from '@/utils/types'
import { searchVideo, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import PlayButton from '@/components/PlayButton'
import VideoPlayer from '@/components/VideoPlayer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/components/ShareButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchLinks from '@/components/SearchLinks'
import Highlight from '@/components/Highlight'
import { calcTotalDuration } from '@/utils/randomUtil'
import useLocalStorageState from 'use-local-storage-state'
import { DbContext } from '@/App'
import MonthSwitcher from '@/components/MonthSwitcher'
import { green } from '@mui/material/colors'

interface SearchProps {
  data?: VideoInfo[],
  codes?: string[]
  month?: number
}
export default function SearchView({ data, codes }: SearchProps) {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;

  const [searchParams, setSearchParams] = useSearchParams()
  const titleParam = searchParams.get('title') || searchParams.get('keywords') || useParams()['query']
  const query = (titleParam || searchParams.get('query')
    || '').toUpperCase()
  const yearParam = searchParams.get('year') || ''
  const monthParam = searchParams.get('month') || ''
  const codesPram = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')
  const [showMore, setShowMore] = useState<number>(20)
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [config, setConfig] = useLocalStorageState('view-config', { defaultValue: { showDuration: true, showSwitcher: true, orderReverse: false } })
  const videoRef = useRef(null);
  const [viewlist, setViewlist] = useState<VideoInfo[]>(data || [])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      let list: VideoInfo[] = []
      if (codesPram.length > 0) {
        const res = findTitleByIds(await dbContext.fetchTitles(), codesPram)
        for (let i = 0; i <= codesPram.length - 1; i++) {
          const item = res.find(x => x.no == codesPram[i])
          item && list.push(item)
        }
      } else if (query || yearParam || monthParam) {
        list = searchVideo(await dbContext.fetchTitles(), query, yearParam, monthParam)
      }

      config.orderReverse && list.reverse()
      setViewlist(list)
    }

    fetchData()
  }, [searchParams])

  useEffect(() => {
    if (current === showMore)
      setShowMore(prev => prev + 20)
  }, [current])

  const setPlaylist = (index: number) => {
    if (query && query != 'player' && !titleParam) {
      navigate(`/search/${query}`, { replace: true })
    }
    setCurrent(index)
  }

  const reverseView = () => {
    setConfig({ ...config, orderReverse: !config.orderReverse })
    setViewlist(list => list.reverse())
    if (titleParam && current)
      setCurrent(viewlist.length - current - 1)
  }

  const SiteLink = ({ no, title, duration, date }: VideoInfo) => {
    return (
      <Link
        sx={{
          textAlign: 'left',
          textWrap: 'balance',
          fontSize: '1rem'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/video/${btoa('=' + no)}`, { state: { no, title, duration, date } })
        }}
      >
        <Highlight search={titleParam ? '' : query} text={title} />
        <Box marginLeft={1} color="gray" component={'span'}>{duration !== 0 && duration + "'"}</Box>
      </Link>
    )
  }

  const SearchResult = ({ date, no, title, duration, index }: VideoInfo & { index: number }) => {
    return <Box
      display={'flex'}
      alignItems={'center'}
      fontSize={'14px'}
      sx={{
        borderBottom: '1px solid',
        borderColor: green[100],
        bgcolor: index == current ? green[50] : '',

      }}
    >
      {date &&
        <Link sx={{ minWidth: "5.5em", pl: .5 }} onClick={() => navigate(`/search/${date}`, { replace: true })}>
          <Highlight search={titleParam ? '' : query} text={date} />
        </Link>}
      <Link
        sx={{
          mx: 1,
          color: "gray"
        }} href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${no}`} target="_blank">
        {no}
      </Link>
      <Box
        width={"100%"}
        display={"inline-flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        onClick={() => setPlaylist(index)}>
        <SiteLink no={no} title={title} duration={duration} date={date} />
        <PlayButton
          videoRef={videoRef}
          btnIndex={index}
          currentPlay={current}
        />
      </Box>
    </Box >
  }

  return (
    <Box>
      {current != undefined && <VideoPlayer
        src={viewlist[current]?.no}
        current={current}
        setCurrent={setCurrent}
        videoRef={videoRef}
        info={viewlist[current]}
      />}
      {config.showSwitcher && !titleParam && <MonthSwitcher />}
      <Box margin={1} maxWidth={600}>
        {!titleParam && query &&
          <SearchLinks keywords={getSearchHistory()} />}
        {searchParams &&
          <Box>
            <Typography variant='body1' fontWeight='bold' component='span'>
              {titleParam ? `“${titleParam}”播放列表` : ''}
              {` ${yearParam ? yearParam + '年' : ''}${monthParam ? monthParam + '月' : ''}`}
            </Typography>
            <Typography variant='body1' component='span' ml={1}>
              {viewlist.length}个视频
            </Typography>
            {!titleParam &&
              <FormControlLabel
                sx={{ ml: 2 }}
                control={<Switch size='small' checked={config.showSwitcher}
                  onChange={() => {
                    config.showSwitcher ? searchParams.delete('month') : searchParams.set('month', '1')
                    setSearchParams(searchParams)
                    setConfig({ ...config, showSwitcher: !config.showSwitcher })
                  }} />}
                label="月份"
              />}
            <FormControlLabel
              sx={{ ml: titleParam ? 2 : 0 }}
              control={<Switch size='small' checked={config.showDuration}
                onChange={() => setConfig({ ...config, showDuration: !config.showDuration })} />}
              label="时长"
            />
            {config.showDuration &&
              <Typography variant='subtitle2' component={'span'}>{calcTotalDuration(viewlist.map(video => video.duration))}</Typography>}
            <Box marginLeft={1} component={'span'}>
              <Button startIcon={!config.orderReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} onClick={reverseView} >{!config.orderReverse ? '正序' : '倒序'}</Button>
            </Box>
          </Box>}
        <Box overflow={'auto'} maxHeight={current !== undefined ? 420 : ''}>
          {viewlist.slice(0, showMore).map((item, i) => <SearchResult key={i} {...item} index={i} />
          )}
        </Box>
        <Box
          marginY={1}
          display='flex'
          justifyContent='space-between'
        >
          <Box>
            {viewlist.length > showMore &&
              <Button onClick={() => setShowMore(pre => pre + 20)} startIcon={<MoreHorizIcon />}>加载更多</Button>
            }
          </Box>
          {viewlist.length > 0 &&
            <ShareButton name='分享列表' />
          }
        </Box>
      </Box>
    </Box>
  )
}
