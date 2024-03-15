import { copyTextToClipboard } from '@/utils/clipboard-util'
import { Button } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

export default function ShareButton({ videoRef = null, name = '分享' }) {
    //@ts-ignore
    let currentTime = videoRef?.current?.currentTime || 0


    const [copyInfo, setCopyInfo] = useState('')
    return (
        <Button size='small'
            startIcon={<ShareIcon />}
            component="label"
            variant="text"
            sx={{
                fontSize: '1rem',
                '&:after': {
                    content: "'" + copyInfo + "'",
                    color: 'green',
                    fontSize: '13px',
                    position: "absolute",
                    bottom: -20
                }
            }}
            onClick={async () => {
                let copyStatus;
                if (currentTime > 3) {
                    copyStatus = await copyTextToClipboard(`m.ningway.com${location.pathname}?t=${Math.floor(currentTime - 3)}# ${document.title}`)
                } else {
                    copyStatus = copyTextToClipboard(`${location.href}# ${document.title}`)
                }
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
