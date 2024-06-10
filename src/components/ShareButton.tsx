import { copyTextToClipboard } from '@/utils/clipboard-util'
import { Button } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ShareButtonProps {
    videoRef?: React.RefObject<HTMLVideoElement> | null;
    name?: string;
    url?: string;
}
export default function ShareButton({ videoRef, name = '分享', url }: ShareButtonProps) {
    let currentTime = videoRef?.current?.currentTime || 0
    const [searchParams, setSearchParams] = useSearchParams()

    const [copyInfo, setCopyInfo] = useState('')
    return (
        <Button
            startIcon={<ShareIcon />}
            sx={{
                '&:after': {
                    content: "'" + copyInfo + "'",
                    color: 'green',
                    fontSize: '12px',
                    position: "absolute",
                    bottom: -25,
                }
            }}
            onClick={async () => {
                let copyStatus;
                let timeParam;
                if (currentTime > 3) {
                    timeParam = '?t=' + Math.floor(currentTime - 3)
                }
                copyStatus = await copyTextToClipboard(url || `${location.origin}${location.pathname}${timeParam || ''}`)

                setCopyInfo(copyStatus ? '网址已复制' : '复制失败')
                setTimeout(function () {
                    setCopyInfo('')
                }, 2000)
            }}
        >
            {name}
        </Button>
    )
}
