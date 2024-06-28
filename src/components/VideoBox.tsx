import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { VideoInfo } from '@/utils/types';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { DbContext } from '@/App';
import { getRandomNum } from '@/utils/randomUtil';
import { useVideoStore } from '@/store/Index';
import SearchView from '@/pages/SearchView';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const { state }: { state: VideoInfo } = useLocation()
  const [searchParams, _] = useSearchParams()

  const { id } = useParams()
  let no = ''
  let listFlag = searchParams.get('list')
  const playlist = useVideoStore(state => state.playlist)
  const setPlaylist = useVideoStore(state => state.setPlaylist)
  const setVideoIndex = useVideoStore(state => state.setVideoIndex)

  try {
    if (id) {
      no = isNaN(+id.slice(2, 5)) ?
        atob(id || '') :
        no = id?.slice(0, 5)
    } else {
      no = searchParams.get('no') ?? ''
    }
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    (async () => {
      if (state || no && !listFlag) {
        state ? setPlaylist([state]) : setPlaylist(findTitleByIds(await dbContext.fetchTitles(), [no]))
        setVideoIndex(0)
      } else {
        if (playlist.length == 0) {
          let video = await getRandomVideo()
          setPlaylist(video)
          setVideoIndex(0)
        }
      }
    })()
  }, [no])

  const getRandomVideo = async () => {
    return findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206))
  }

  return (
    <>
      {playlist.length > 1 && <SearchView data={playlist} />}
    </>
  )
}
