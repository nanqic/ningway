import { VideoInfo } from "@/utils/types"
import { Box, Link } from "@mui/material"
import { green } from "@mui/material/colors"
import Highlight from "./Highlight"
import PlayButton from "./PlayButton"
import { useNavigate } from "react-router-dom"
import { Dispatch } from "react"

interface SearchItemProps extends VideoInfo {
  index: number;
  query: string;
  titleParam: string;
  current: number | undefined;
  setCurrent: Dispatch<React.SetStateAction<number | undefined>>;
  videoRef: React.RefObject<HTMLVideoElement>
}
const SearchItem = ({ date, no, title, duration, index, query, titleParam, current, setCurrent, videoRef }: SearchItemProps) => {
  const navigate = useNavigate()

  const setPlaylist = (index: number) => {
    if (query && query != 'player' && !titleParam) {
      navigate(`/search?title=${query}`, { replace: true })
    }
    setCurrent(index)
  }

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
          navigate(`/video/${btoa('=' + no)}`, { state: { no, title, duration, date } })
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
      <Link sx={{ minWidth: "5.5em", pl: .5 }} onClick={() => navigate(`/search/${date}`, { replace: true })}>
        <Highlight search={titleParam ? '' : query} text={date} />
      </Link>}
    <Link
      sx={{
        mx: 1,
        color: "gray"
      }} href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${no}`} target="_blank">
      {no}
    </Link>
    <Box
      width={"100%"}
      display={"inline-flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={() => setPlaylist(index)}>
      <NavigateToVideo no={no} title={title} duration={duration} date={date} />
      <PlayButton
        videoRef={videoRef}
        btnIndex={index}
        currentPlay={current}
      />
    </Box>
  </Box >
}

export default SearchItem