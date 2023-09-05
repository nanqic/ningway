import { useNavigate, useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useRef, useState } from "react";
import { Box, Link } from "@mui/material";
import { getUri } from "@/utils/requestUtil";
import { ChatVideo } from "@/utils/types";
import PlayButton from "@/components/PlayButton";


export default function EmptyDetail() {
    let { title } = useParams()

    if (title === undefined) {
        title = 'foshism'
    }

    let navigate = useNavigate()
    const [current, setCurrent] = useState<number>(0)
    const [playing, setPlaying] = useState(false)
    const videoDom = useRef(null);
    const [videos, setVideos] = useState<ChatVideo[]>()
    useEffect(() => {
        getUri(`emptiness/${title}.json`)
            .then(json => setVideos(json))
    }, [])
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            {current != undefined && videos &&
                <video ref={videoDom} controls width="100%" style={{ display: 'none' }} autoPlay={playing}
                    src={`${import.meta.env.VITE_STREAM_URL}${videos[current].no}`}
                    onEnded={() => { current < videos.length - 1 ? setCurrent(current + 1) : false; setPlaying(true) }}
                    // @ts-ignore
                    onPlaying={(e) => { setPlaying(true); e.target.style.display = 'block' }}
                    onPause={() => setPlaying(false)}
                />
            }
            <Link sx={{ my: 2, display: 'inline-block' }} onClick={() => navigate('/step/3')}>返回列表</Link>
            {
                videos === undefined ? "" :
                    videos.map((themeItem, index) => (
                        <Box key={themeItem.id} display={'flex'} justifyContent={'space-between'} maxWidth={'400px'}>
                            <ListItem sx={{ p: .5 }}>
                                <Link underline="hover" href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${themeItem.no}`} rel="noreferrer" target="_blank">
                                    <ListItemText primary={`${themeItem.id}. ${themeItem.title}`} />
                                </Link>
                            </ListItem>
                            <Box component={'span'} onClick={() => { setCurrent(index); setPlaying(true) }}>
                                <PlayButton index={index} current={current} playing={playing} videoDom={videoDom} />
                            </Box>
                        </Box>
                    ))
            }
        </ErrorBoundary>
    )
}
