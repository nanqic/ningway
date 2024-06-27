import { Box, Button, SelectChangeEvent } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SearchConfig, VideoInfo } from '@/utils/types'
import { searchVideo, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareButton from '@/components/ShareButton'
import SearchLinks from '@/components/SearchLinks'
import useLocalStorageState from 'use-local-storage-state'
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

  const [searchParams, _] = useSearchParams()
  const [config, setConfig] = useLocalStorageState<SearchConfig>('search-config', { defaultValue: { showDuration: true, orderReverse: false } })
  const { query: pathQuery } = useParams()
  const titleParam = searchParams.get('title') || searchParams.get('keywords') || pathQuery || ''
  const query = (titleParam || searchParams.get('query')
    || '').toUpperCase()
  const yearParam = searchParams.get('year') || ''
  const monthParam = searchParams.get('month') || ''
  const codesParam = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')

  const [videoIndex, reverseList, showlist, playlist, setPlaylist] = useVideoStore(
    useShallow((state) => [
      state.videoIndex,
      state.reverseList,
      state.showlist,
      state.playlist,
      state.setPlaylist,
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
    if (codesParam.length > 0) {
      const res = await findTitleByIdsMemoized
      //根据code位置设置列表
      for (let i = 0; i <= codesParam.length - 1; i++) {
        const item = res.find(x => x.no == codesParam[i])
        item && list.push(item)
      }
    } else if (query || yearParam || monthParam) {
      list = searchVideo(await dbContext.fetchTitles(), query, yearParam, monthParam)
    }
    config.orderReverse && list.reverse()
    setPlaylist(data || list)
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
    setConfig({ ...config, orderReverse: !config.orderReverse })
    if (videoIndex) {
      reverseList()
    }
  }

  const playlistDuration = () => calcTotalDuration(playlist.map(video => video.duration))

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
              viewlistLength={playlist.length}
              config={config}
              playlistDuration={playlistDuration}
              reverseView={reverseView} />}
          <Box
            overflow={'auto'}
            maxHeight={videoIndex !== undefined ? 420 : ''}>
            {playlist.slice(listStart, currentShow).map((item, i) => <PlayItem videoIndex={videoIndex}
              videoRef={videoRef} query={query}
              titleParam={titleParam}
              key={i}
              {...item}
              index={i}
              totalIndex={item.index} />
            )}
          </Box>
          <Box
            marginY={1}
            display='flex'
            justifyContent='space-between'
          >
            {playlist.length > 30 &&
              <SmallFormControl label='' selectedValue={pageSize + ''} onChange={pagiOnChange} options={[
                { value: '30' }, { value: '60' }, { value: '90' }, { value: '120' }
              ]} />}
            <Box>
              {playlist.length > currentShow &&
                <Button onClick={() => setCurrentShow()} startIcon={<MoreHorizIcon />}>更多</Button>
              }
            </Box>
            {playlist.length > 0 &&
              <ShareButton url={`http://${location.host}/search?codes=${playlist.map(el => el.no)}`} />
            }
          </Box>
        </Box>
      }
    </Box>
  )
})

export default SearchView