import { Box, Button, SelectChangeEvent } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { VideoInfo } from '@/utils/types'
import { searchVideo, findTitleByIds, getSearchHistory } from '@/utils/dbUtil'
import ShareButton from '@/components/ShareButton'
import SearchLinks from '@/components/SearchLinks'
import { DbContext } from '@/App'
import PlayItem from '@/components/PlayItem'
import { calcTotalDuration } from '@/utils/randomUtil'
import SearchStatusBar from '@/components/SearchStatusBar'
import { usePlayerStore, useVideoStore } from '@/store/Index'
import SmallFormControl from '@/components/SmallFormControl'
import { useShallow } from 'zustand/react/shallow'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SearchProps {
  data?: VideoInfo[],
  codes?: string[]
}

const SearchView = memo(({ data, codes }: SearchProps) => {
  const dbContext = useContext(DbContext);
  if (!dbContext) return;
  const [displayed, setDisplayed] = useState(data || [])
  const [searchParams, _] = useSearchParams()
  const titleParam = searchParams.get('title') || searchParams.get('keywords') || ''
  const query = (searchParams.get('query') || '').toUpperCase()
  const yearParam = searchParams.get('year') || ''
  const monthParam = searchParams.get('month') || ''
  const codesParam = codes || searchParams.get('codes')?.split(',') || searchParams.getAll('code')

  const [videoIndex, showlist, config, setConfig] = useVideoStore(
    useShallow((state) => [
      state.videoIndex,
      state.showlist,
      state.config,
      state.setConfig,
    ]))

  const [videoRef, currentShow, setCurrentShow] = usePlayerStore(
    useShallow((state) => [
      state.videoRef,
      state.currentShow,
      state.setCurrentShow,
    ]))

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
  }, [codesParam, currentShow])

  useEffect(() => {
    fetchData()

  }, [searchParams, videoIndex])

  const reverseView = () => setConfig({ orderReverse: !config.orderReverse })

  const playlistDuration = () => calcTotalDuration(displayed.map(video => video.duration))

  const pagiOnChange = (e: SelectChangeEvent) => {
    setCurrentShow(parseInt(e.target.value))
  }

  const generateSizeArray = (size: number) => {
    const result = [];
    let value = 25;

    while (value <= size) {
      value *= 2;
      result.push({ value: value.toString() });
    }

    return result;
  }

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
            maxHeight={450}
            >
            {displayed.slice(currentShow < 100 ? 0 : Math.min(currentShow, displayed.length) - 50, currentShow).map((item, i) => <PlayItem videoIndex={videoIndex}
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
            {displayed.length > 25 &&
              <SmallFormControl label='' selectedValue={currentShow + ''} onChange={pagiOnChange} options={generateSizeArray(displayed.length)} />}
            <Box>
              {displayed.length > currentShow &&
                <Button onClick={() => setCurrentShow()} startIcon={<ExpandMoreIcon />}>下一页</Button>
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