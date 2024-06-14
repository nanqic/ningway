import { VideoInfo } from "@/utils/types"
import { Box, Link } from "@mui/material"
import { green } from "@mui/material/colors"
import Highlight from "./Highlight"
import PlayButton from "./PlayButton"
import { useNavigate } from "react-router-dom"
import { Dispatch, useEffect } from "react"
import LikeButton from "./LikeButton"
import useLocalStorageState from "use-local-storage-state"

interface PlayListProps extends VideoInfo {
  totalIndex: number;
  index: number;
  query: string;
  titleParam: string;
  current: number | undefined;
  setCurrent: Dispatch<React.SetStateAction<number | undefined>>;
  videoRef: React.RefObject<HTMLVideoElement>
}
const PlayList = ({ date, no, title, duration, totalIndex, index, query, titleParam, current, setCurrent, videoRef }: PlayListProps) => {
  const navigate = useNavigate()
  const [history, setHistory] = useLocalStorageState<string>('history_visit', { defaultValue: '' })
  const fullPath = `${location.pathname}${location.search}#${no}-${title}`

  const setTitleParam = (index: number) => {
    if (query && query != 'player' && !titleParam) {
      navigate(`/search?title=${query}`, { replace: true })
    }
    setCurrent(index)
    setTimeout(() => setHistory(fullPath), 3000)
    location.hash = `${no}-${title}`

    videoRef?.current?.play();
  }

  useEffect(() => {
    if (location.hash.includes(no)) {
      setCurrent(index)
    }
  }, [location.hash])


  const NavigateToVideo = ({ no, title, duration, date }: VideoInfo) => {
    return (
      <Link
        sx={{
          textAlign: 'left',
          textWrap: 'balance',
          fontSize: '1rem'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/video/${btoa('=' + no)}`, { state: { index: totalIndex, no, title, duration, date } })
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
      bgcolor: index == current ? green[50] : '',
    }}
  >
    {date &&
      <Link sx={{ minWidth: "5.5em" }} onClick={() => navigate(`/search/${date.slice(2)}`, { replace: true })}>
        <Highlight search={titleParam ? '' : query} text={date} />
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

export default PlayList