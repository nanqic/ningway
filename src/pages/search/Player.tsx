import { findTitleByIds } from "@/utils/dbUtil";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom"
import VboxSearch from "./VboxSearch";
import { useEffect, useState } from "react";
import { VideoSearch } from "@/utils/types";

export default function Player() {
    const [searchParams, _] = useSearchParams()
    let codeList = searchParams.getAll('code')
    const [playlist, setPlaylist] = useState<VideoSearch[]>()
    useEffect(() => {
        const playList = findTitleByIds(codeList);
        // console.log(codeList, playList);
        setPlaylist(playList)
    }, [])

    return (
        <Box>
            {playlist && <VboxSearch playList={playlist} />}
        </Box>
    )
}
