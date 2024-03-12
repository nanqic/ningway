import { useNavigate, useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Link } from "@mui/material";
import { getUri } from "@/utils/requestUtil";
import { ChatVideo } from "@/utils/types";
import PlayButton from "@/pages/common/PlayButton";
import VideoPlayer from "@/pages/common/VideoPlayer";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareButton from "@/pages/common/ShareButton";

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
        <Box>
            {current != undefined && videos && <VideoPlayer
                // @ts-ignore
                props={{ src: `${import.meta.env.VITE_STREAM_URL}${videos[current]?.no}`, current, setCurrent, playing, setPlaying, videoRef: videoDom, title: videos[current]?.title }}
            />}
            {videos === undefined ? "" :
                videos.map((themeItem, index) => (
                    <Box key={themeItem.id} display={'flex'}
                        paddingX={2}
                        justifyContent={'space-between'} maxWidth={400}>
                        <ListItem sx={{ p: 0, }}>
                            <Link
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
                ))}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", maxWidth: 370 }}>
                <Button startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/emptiness')}>返回主题</Button>
                <ShareButton name='分享本期' />
            </Box>
        </Box>
    )
}
