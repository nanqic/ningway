import { useNavigate, useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { Box, Link, SvgIcon } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { blue } from "@mui/material/colors";
import { getUri } from "@/utils/requestUtil";
import { ChatVideo } from "@/utils/types";


export default function EmptyDetail() {
    let { title } = useParams()

    if (title === undefined) {
        title = 'foshism'
    }

    let navigate = useNavigate()
    const [current, setCurrent] = useState<number>()
    const [videos, setVideos] = useState<ChatVideo[]>()
    useEffect(() => {
        getUri(`emptiness/${title}.json`)
            .then(json => setVideos(json))
    }, [])
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Link sx={{ mt: 1, display: 'inline-block' }} onClick={() => navigate('/step')}>空性12期全</Link>
            {current != undefined && videos &&
                <video controls width="100%" style={{ marginTop: '3px' }} autoPlay
                    src={`${import.meta.env.VITE_STREAM_URL}${videos[current].no}`}
                    onEnded={() => { current < videos.length - 1 ? setCurrent(current + 1) : false; }}
                />
            }
            {
                videos === undefined ? "" :
                    videos.map((themeItem, index) => (
                        <ListItem
                            key={themeItem.id}
                        >
                            <Link underline="hover" href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${themeItem.no}`} rel="noreferrer" target="_blank">
                                <ListItemText primary={`${themeItem.id}. ${themeItem.title}`} />
                            </Link>
                            <Box component={'span'} onClick={() => { setCurrent(index ?? 0); }}
                                title='从当前开始播放'
                                sx={{
                                    display: "flex",
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: blue[200]
                                    }
                                }} >
                                <SvgIcon component={current == index ? PauseCircleOutlineIcon : PlayCircleOutlineIcon} inheritViewBox />
                            </Box>
                        </ListItem>
                    ))
            }
        </ErrorBoundary>
    )
}
