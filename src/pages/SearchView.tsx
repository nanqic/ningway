import { Box, Button, SelectChangeEvent } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { VideoInfo } from '@/utils/types'
import { searchVideo, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/components/ShareButton'
import SearchLinks from '@/components/SearchLinks'
import { DbContext } from '@/App'
import PlayItem from '@/components/PlayItem'
import { calcTotalDuration } from '@/utils/randomUtil'
import SearchStatusBar from '@/components/SearchStatusBar'
import { usePlayerStore, useVideoStore } from '@/store/Index'
import SmallFormControl from '@/components/SmallFormControl'
import { useShallow } from 'zustand/react/shallow'

interface SearchProps {
  data?: VideoInfo[],
  codes?: string[]
}

const SearchView = memo(({ data, codes }: SearchProps) => {
  const dbContext = useContext(DbContext);
  if (!dbContext) return;
  const [displayed, setDisplayed] = useState(data || [])
  const [searchParams, _] = useSearchParams()
  const { query: pathQuery } = useParams()
  const titleParam = searchParams.get('title') || searchParams.get('keywords') || pathQuery || ''
  const query = (titleParam || searchParams.get('query')
    || '').toUpperCase()
  const yearParam = searchParams.get('year') || ''
  const monthParam = searchParams.get('month') || ''
  const codesParam = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')

  const [videoIndex, reverseList, showlist, playlist, setPlaylist, config, setConfig] = useVideoStore(
    useShallow((state) => [
      state.videoIndex,
      state.reverseList,
      state.showlist,
      state.playlist,
      state.setPlaylist,
      state.config,
      state.setConfig,
    ]))

  const [videoRef, currentShow, setCurrentShow, pageSize, setPageSize] = usePlayerStore(
    useShallow((state) => [
      state.videoRef,
      state.currentShow,
      state.setCurrentShow,
      state.pageSize,
      state.setPageSize,
    ]))
  const [listStart, setListStart] = useState(0)

  const findTitleByIdsMemoized = useMemo(async () => {
    return findTitleByIds(await dbContext.fetchTitles(), codesParam);
  }, [codesParam]);

  const fetchData = useCallback(async () => {
    let list: VideoInfo[] = []
    if (query || yearParam || monthParam) {
      list = searchVideo(await dbContext.fetchTitles(), query, yearParam, monthParam)
      setDisplayed(list)
    } else if (codesParam.length > 0) {
      const res = await findTitleByIdsMemoized
      //根据code位置设置列表
      for (let i = 0; i <= codesParam.length - 1; i++) {
        const item = res.find(x => x.no == codesParam[i])
        item && list.push(item)
      }
      setDisplayed(list)
    }
  }, [codesParam])

  useEffect(() => {
    fetchData()

    if (videoIndex + 10 > currentShow) {
      if (videoIndex > 120) {
        setListStart(videoIndex - 100)
      }
      setCurrentShow(videoIndex + 10)
    }
  }, [searchParams, videoIndex])


  const reverseView = () => {
    setConfig({ orderReverse: !config.orderReverse })
    if (videoIndex) {
      reverseList()
    }
  }

  const playlistDuration = () => calcTotalDuration(displayed.map(video => video.duration))

  const pagiOnChange = (e: SelectChangeEvent) => { setPageSize(parseInt(e.target.value)) }

  return (
    <Box>
      {(showlist || location.pathname != '/video') &&
        <Box
          margin={1} maxWidth={600}>
          {!titleParam && query &&
            <SearchLinks keywords={getSearchHistory()} />}
          {searchParams &&
            <SearchStatusBar
              titleParam={titleParam}
              query={query}
              viewlistLength={displayed.length}
              orderReverse={config?.orderReverse}
              playlistDuration={playlistDuration}
              reverseView={reverseView} />}
          <Box
            overflow={'auto'}
            maxHeight={videoIndex !== undefined ? 420 : ''}>
            {displayed.slice(listStart, currentShow).map((item, i) => <PlayItem videoIndex={videoIndex}
              videoRef={videoRef} query={query}
              titleParam={titleParam}
              key={i}
              {...item}
              index={i}
              displayed={displayed}
              totalIndex={item.index} />
            )}
          </Box>
          <Box
            marginY={1}
            display='flex'
            justifyContent='space-between'
          >
            {displayed.length > 30 &&
              <SmallFormControl label='' selectedValue={pageSize + ''} onChange={pagiOnChange} options={[
                { value: '30' }, { value: '60' }, { value: '90' }, { value: '120' }
              ]} />}
            <Box>
              {displayed.length > currentShow &&
                <Button onClick={() => setCurrentShow()} startIcon={<MoreHorizIcon />}>更多</Button>
              }
            </Box>
            {displayed.length > 0 &&
              <ShareButton url={`http://${location.host}/search?codes=${displayed.map(el => el.no)}`} />
            }
          </Box>
        </Box>
      }
    </Box>
  )
})

export default SearchView