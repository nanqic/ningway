import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUri } from "@/utils/requestUtil";
import TitleSearch from "@/pages/TitleSearch";

export default function EmptyDetail() {
    let { title: titlesrc } = useParams() ?? 'foshism'
    const [videos, setVideos] = useState<string[]>()
    useEffect(() => {
        getUri(`emptiness/${titlesrc}.json`)
            .then(json => setVideos(json.map(({ no }: { no: string }) => no)))
    }, [])

    return <> {videos && <TitleSearch codes={videos} />} </>
}
