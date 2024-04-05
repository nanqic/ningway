import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { VideoInfo } from '@/utils/types'
import { searchVideo, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import VideoPlayer from '@/components/VideoPlayer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/components/ShareButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchLinks from '@/components/SearchLinks'
import { calcTotalDuration } from '@/utils/randomUtil'
import useLocalStorageState from 'use-local-storage-state'
import { DbContext } from '@/App'
import MonthSwitcher from '@/components/MonthSwitcher'
import SearchItem from '@/components/SearchItem'

interface SearchProps {
  data?: VideoInfo[],
  codes?: string[]
  month?: number
}
export default function SearchView({ data, codes }: SearchProps) {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;

  const [searchParams, setSearchParams] = useSearchParams()
  const titleParam = searchParams.get('title') || searchParams.get('keywords') || useParams()['query'] || ''
  const query = (titleParam || searchParams.get('query')
    || '').toUpperCase()
  const yearParam = searchParams.get('year') || ''
  const monthParam = searchParams.get('month') || ''
  const codesPram = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')
  const [showMore, setShowMore] = useState<number>(20)
  const [config, setConfig] = useLocalStorageState('view-config', { defaultValue: { showDuration: true, showSwitcher: true, orderReverse: false } })
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const videoRef = useRef(null);
  const [viewlist, setViewlist] = useState<VideoInfo[]>(data || [])

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

  const reverseView = () => {
    setConfig({ ...config, orderReverse: !config.orderReverse })
    setViewlist(list => list.reverse())
    if (titleParam && current)
      setCurrent(viewlist.length - current - 1)
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
          {viewlist.slice(0, showMore).map((item, i) => <SearchItem current={current} setCurrent={setCurrent} videoRef={videoRef} query={query} titleParam={titleParam} key={i} {...item} index={i} />
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
