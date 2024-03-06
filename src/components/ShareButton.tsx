import { copyTextToClipboard } from '@/utils/clipUtil'
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
            onClick={() => {
                if (currentTime > 0) {
                    copyTextToClipboard(`${location.host}/video/${videoBase}?t=${Math.floor(currentTime)}# ${document.title}`)
                } else {
                    copyTextToClipboard(`${location.href}# ${document.title}`)
                }
                setCopyInfo('网址已复制')

                setTimeout(function () {
                    setCopyInfo('')
                }, 2000)
            }}
        >
            {name}
        </Button>
    )
}
