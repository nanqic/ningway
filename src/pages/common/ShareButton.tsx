import { copyTextToClipboard } from '@/utils/clipboard-util'
import { Button } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

export default function ShareButton({ videoBase = '', currentTime = 0, name = '分享' }) {
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
                    color: 'blue',
                    fontSize: '12px',
                    position: "absolute",
                    bottom: -20
                }
            }}
            onClick={async () => {
                let copyStatus;
                if (currentTime > 0) {
                    copyStatus = await copyTextToClipboard(`${location.host}/video/${videoBase}?t=${Math.floor(currentTime)}# ${document.title}`)
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
