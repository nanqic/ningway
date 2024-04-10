import { Box, Button, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { SearchConfig, VideoInfo } from '@/utils/types'
import { searchVideo, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import VideoPlayer from '@/components/VideoPlayer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/components/ShareButton'
import SearchLinks from '@/components/SearchLinks'
import useLocalStorageState from 'use-local-storage-state'
import { DbContext } from '@/App'
import MonthSwitcher from '@/components/MonthSwitcher'
import SearchItem from '@/components/SearchItem'
import { calcTotalDuration } from '@/utils/randomUtil'
import SearchStatusBar from '@/components/SearchStatusBar'

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
  const [config, setConfig] = useLocalStorageState<SearchConfig>('search-config', { defaultValue: { showDuration: true, showMonth: true, orderReverse: false } })
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

  const changeMonth = () => {
    config.showMonth ? searchParams.delete('month') : searchParams.set('month', '1')
    setSearchParams(searchParams)
    setConfig({ ...config, showMonth: !config.showMonth })
  }

  const switchShowDuration = () => setConfig({ ...config, showDuration: !config.showDuration })

  const playlistDuration =()=> calcTotalDuration(viewlist.map(video => video.duration))

  return (
    <Box>
      {current != undefined && <VideoPlayer
        src={viewlist[current]?.no}
        current={current}
        setCurrent={setCurrent}
        videoRef={videoRef}
        info={viewlist[current]}
      />}
      {config.showMonth && !titleParam && <MonthSwitcher />}
      <Box margin={1} maxWidth={600}>
        {!titleParam && query &&
          <SearchLinks keywords={getSearchHistory()} />}
        {searchParams && viewlist.length>0?
          <SearchStatusBar titleParam={titleParam}
            yearParam={yearParam}
            monthParam={monthParam}
            viewlistLength={viewlist.length}
            config={config}
            playlistDuration={playlistDuration}
            changeMonth={changeMonth}
            switchShowDuration={switchShowDuration}
            reverseView={reverseView} />:
            <>
            <Typography variant='h6' marginY={2}>日期/编号/标题 没有符号搜索条件的视频</Typography>
            <Typography variant='h6'>日期格式：<b>12-02-02</b></Typography>
            <Typography variant='h6'>编号格式：<b>50001</b> （完整的5位编号）</Typography>
            <Typography marginTop={2} color={'red'}>请检查输入的格式是否正确</Typography>
            <Typography marginTop={2}>点击搜索按钮将搜索 <b>视频字幕出现的关键字</b></Typography>
            </>
        }
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
