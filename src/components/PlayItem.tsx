import { VideoInfo } from "@/utils/types"
import { Box, Link } from "@mui/material"
import { green } from "@mui/material/colors"
import Highlight from "./Highlight"
import PlayButton from "./PlayButton"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LikeButton from "./LikeButton"
import { usePlayerStore, useVideoStore } from "@/store/Index"
import { buildDate } from "@/utils/dbUtil"

interface PlayItemProps extends VideoInfo {
  totalIndex: number;
  index: number;
  query: string;
  titleParam: string;
  videoIndex: number | undefined;
  setVideoIndex: (i: number) => void;
  videoRef: React.RefObject<HTMLVideoElement> | null
}
const PlayItem = ({ date, no, title, duration, totalIndex, index, query, titleParam, videoIndex, setVideoIndex, videoRef }: PlayItemProps) => {
  const navigate = useNavigate()
  const viewlist = usePlayerStore(state => state.viewlist)
  const setPlaylist = useVideoStore(state => state.setPlaylist)
  const setPaused = useVideoStore(state => state.setPaused)

  const setTitleParam = (index: number) => {
    setVideoIndex(index)
    setPlaylist(viewlist)
    navigate(`/video?no=${no}`)
    setPaused(false)
    videoRef?.current?.play();
  }

  useEffect(() => {
    if (location.hash.includes(no)) {
      setVideoIndex(index)
    }
  }, [location.hash])

  const NavigateToVideo = (videoInfo: VideoInfo) => {
    return (
      <Link
        sx={{
          textAlign: 'left',
          textWrap: 'balance',
          fontSize: '1rem'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/video?no=${no}`, { state: videoInfo })
        }}
      >
        <Highlight search={titleParam ? '' : query} text={title} />
        <Box marginLeft={1} color="gray" component={'span'}>{duration !== 0 && duration + "'"}</Box>
      </Link>
    )
  }

  return <Box
    display={'flex'}
    alignItems={'center'}
    fontSize={'14px'}
    sx={{
      borderBottom: '1px solid',
      borderColor: green[100],
      bgcolor: index == videoIndex ? green[50] : '',
    }}
  >
    {date &&
      <Link sx={{ whiteSpace: 'nowrap', pl: '5px' }} onClick={() => navigate(`/search/${buildDate(date)}`, { replace: true })}>
        <Highlight search={titleParam ? '' : query} text={location.pathname == '/yearlist' ? `${parseInt(date.slice(-2))}日` : buildDate(date)} />
      </Link>}
    <LikeButton no={no} />
    <Box
      width={"100%"}
      display={"inline-flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={() => setTitleParam(index)}>
      <NavigateToVideo index={totalIndex} no={no} title={title} duration={duration} date={date} />
      <PlayButton />
    </Box>
  </Box >
}

export default PlayItem