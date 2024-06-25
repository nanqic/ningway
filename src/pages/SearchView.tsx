import { Box, Button, SelectChangeEvent } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
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

export default function SearchView({ data, codes }: SearchProps) {
  const dbContext = useContext(DbContext);
  const [searchParams, _] = useSearchParams()
  const [config, setConfig] = useLocalStorageState<SearchConfig>('search-config', { defaultValue: { showDuration: true, orderReverse: false } })
  const { query: pathQuery } = useParams()
  const titleParam = searchParams.get('title') || searchParams.get('keywords') || pathQuery || ''
  const query = (titleParam || searchParams.get('query')
    || '').toUpperCase()
  const yearParam = searchParams.get('year') || ''
  const monthParam = searchParams.get('month') || ''
  const authParam = searchParams.get('auth')
  const codesPram = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')

  const [videoIndex, setVideoIndex, reverseList, showlist] = useVideoStore(
    useShallow((state) => [
      state.videoIndex,
      state.setVideoIndex,
      state.reverseList,
      state.showlist,
    ]))

  const [videoRef, playlist, setViewlist, currentShow, showMore, pageSize, setPageSize] = usePlayerStore(
    useShallow((state) => [
      state.videoRef,
      state.viewlist,
      state.setViewlist,
      state.currentShow,
      state.showMore,
      state.pageSize,
      state.setPageSize,
    ]))

  useEffect(() => {
    if (!dbContext) return;

    // if (authParam) {
    //   parent.location.replace(`/vsearch/${titleParam}?page=${searchParams.get('page')}`)
    // }

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
      setViewlist(data || list)
    }
    fetchData()

    if (currentShow > videoIndex) { showMore() }
  }, [searchParams])

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
            {playlist.slice(0, currentShow).map((item, i) => <PlayItem videoIndex={videoIndex} setVideoIndex={setVideoIndex} videoRef={videoRef} query={query} titleParam={titleParam} key={i} {...item} index={i} totalIndex={item.index} />
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
                <Button onClick={showMore} startIcon={<MoreHorizIcon />}>更多</Button>
              }
            </Box>
            {playlist.length > 0 &&
              <ShareButton url={`http://${location.host}/search/player?keywords=%E5%88%86%E4%BA%AB&codes=${playlist.map(el=>el.no)}`} />
            }
          </Box>
        </Box>
      }
    </Box>
  )
}
