import { useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { findTitleByIds, findVideoByIndex } from '@/utils/dbUtil';
import { DbContext } from '@/App';
import { getRandomNum } from '@/utils/randomUtil';
import { useVideoStore } from '@/store/Index';
import SearchView from '@/pages/SearchView';

export default function VideoBox() {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const [searchParams, _] = useSearchParams()

  const { id } = useParams()
  let no = searchParams.get('no')
  const playlist = useVideoStore(state => state.playlist)
  const setPlaylist = useVideoStore(state => state.setPlaylist)
  const videoIndex = useVideoStore(state => state.videoIndex)
  const setVideoIndex = useVideoStore(state => state.setVideoIndex)

  useEffect(() => {
    if (id) {
      let vno = isNaN(+id.slice(2, 5)) ? atob(id ?? '') : id?.slice(0, 5)
      location.replace(`/video?no=${vno}`)
    }

    (async () => {
      if (no != null) {
        let videoIndexFind = playlist.findIndex(v => v.no == no);
        if (videoIndexFind != -1) {
          videoIndexFind != videoIndex && setVideoIndex(videoIndexFind)
        } else {
          setPlaylist(findTitleByIds(await dbContext.fetchTitles(), [no]))
          setVideoIndex(0)
        }
      } else {
        if (playlist.length == 0) {
          let video = await getRandomVideo()
          setPlaylist(video)
          setVideoIndex(0)
        }
      }
    })()
  }, [])

  const getRandomVideo = async () => {
    return findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206))
  }

  return (
    <>
      <SearchView data={playlist} />
    </>
  )
}
