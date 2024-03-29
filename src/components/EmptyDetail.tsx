import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUri } from "@/utils/requestUtil";
import TitleSearch from "@/pages/TitleSearch";
import { Typography } from "@mui/material";

export default function EmptyDetail() {
    let { title: titlesrc } = useParams() ?? 'foshism'
    const [searchParams, _] = useSearchParams()
    let title = searchParams.get('title')
    const [videos, setVideos] = useState<string[]>()
    useEffect(() => {
        getUri(`emptiness/${titlesrc}.json`)
            .then(json => setVideos(json.map(({ no }: { no: string }) => no)))
    }, [])

    return <>
        <Typography m={1} textAlign='center' variant="h6">{title}</Typography>
        {videos && <TitleSearch codes={videos} />}
    </>
}
