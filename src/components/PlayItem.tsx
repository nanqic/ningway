import { VideoInfo } from "@/utils/types"
import { Box, Link } from "@mui/material"
import { green } from "@mui/material/colors"
import Highlight from "./Highlight"
import PlayButton from "./PlayButton"
import { useNavigate } from "react-router-dom"
import LikeButton from "./LikeButton"
import { useVideoStore } from "@/store/Index"
import { buildDate } from "@/utils/dbUtil"

interface PlayItemProps extends VideoInfo {
  index: number;
  query: string;
  titleParam: string;
  videoIndex: number | undefined;
  videoRef: React.RefObject<HTMLVideoElement> | null;
  displayed: VideoInfo[];
}
const PlayItem = ({ date, no, title, duration, index, query, titleParam, videoIndex, videoRef, displayed }: PlayItemProps) => {
  const navigate = useNavigate()
  const setPaused = useVideoStore(state => state.setPaused)
  const setVideoIndex = useVideoStore(state => state.setVideoIndex)
  const setPlaylist = useVideoStore(state => state.setPlaylist)

  const changePlaylist = (index: number) => {
    setPlaylist(displayed)
    setVideoIndex(index)
    navigate(`/video`)
    setPaused(false)
    videoRef?.current?.play();
  }

  const NavigateToVideo = () => {
    return (
      <Link
        sx={{
          textAlign: 'left',
          textWrap: 'balance',
          fontSize: '1rem'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/video?no=${no}`)
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
      onClick={() => changePlaylist(index)}>
      <NavigateToVideo />
      <PlayButton />
    </Box>
  </Box >
}

export default PlayItem