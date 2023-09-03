import { useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import { themeDetails } from "@/store/Emptiness"
import { ErrorBoundary } from "react-error-boundary";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Box, SvgIcon } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { blue } from "@mui/material/colors";


export default function EmptyDetail() {
    let { title } = useParams()

    if (title === undefined) {
        title = ''
    }
    const details = themeDetails.get(title)
    const [current, setCurrent] = useState<number>()

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            {current != undefined && details &&
                <ReactPlayer
                    style={{ marginTop: '9px' }}
                    className='react-player'
                    controls
                    url={`${import.meta.env.VITE_STREAM_URL}${details[current].no}`}
                    width='100%'
                    height='100%'
                    playing={true}
                    onEnded={() => { current < details.length - 1 ? setCurrent(current + 1) : false; }}
                />}
            {
                details === undefined ? "" :
                    details.map((themeItem, index) => (
                        <ListItem
                            key={themeItem.id}
                        >
                            <Link underline="hover" href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${themeItem.no}`} rel="noreferrer" target="_blank">
                                <ListItemText primary={`${themeItem.id}. 《${themeItem.title}》`} />
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
