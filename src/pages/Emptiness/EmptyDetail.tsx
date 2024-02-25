import { useNavigate, useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Link } from "@mui/material";
import { getUri } from "@/utils/requestUtil";
import { ChatVideo } from "@/utils/types";
import PlayButton from "@/components/PlayButton";
import VideoPlayer from "@/components/VideoPlayer";


export default function EmptyDetail() {
    let { title } = useParams()

    if (title === undefined) {
        title = 'foshism'
    }

    let navigate = useNavigate()
    const [current, setCurrent] = useState<number | undefined>(undefined)
    const [playing, setPlaying] = useState(false)
    const videoDom = useRef(null);
    const [videos, setVideos] = useState<ChatVideo[]>()
    useEffect(() => {
        getUri(`emptiness/${title}.json`)
            .then(json => setVideos(json))
    }, [])
    return (
        <Container sx={{ p: 2 }}>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                {current != undefined && videos && <VideoPlayer
                    // @ts-ignore
                    props={{ src: `${import.meta.env.VITE_STREAM_URL}${videos[current]?.no}`, current, setCurrent, playing, setPlaying, videoRef: videoDom, title: videos[current]?.title }}
                />}
                <Link sx={{ display: 'inline-block' }} onClick={() => navigate('/step/3')}>返回列表</Link>
                {
                    videos === undefined ? "" :
                        videos.map((themeItem, index) => (
                            <Box key={themeItem.id} display={'flex'} justifyContent={'space-between'} maxWidth={'400px'}>
                                <ListItem sx={{ p: 1, borderBottom: '1px solid' }}>
                                    <Link underline="hover"
                                        onClick={() => navigate(`/video/${btoa('=' + themeItem.no)}`)}>
                                        <ListItemText primary={`${themeItem.id}. ${themeItem.title}`} />
                                    </Link>
                                </ListItem>
                                <PlayButton
                                    index={index}
                                    current={current || 0}
                                    playing={playing}
                                    videoDom={videoDom}
                                    setPlaying={setPlaying}
                                    setCurrent={setCurrent}
                                />
                            </Box>
                        ))
                }
            </ErrorBoundary>
        </Container >
    )
}
