import { Box, Typography } from '@mui/material'
import { useState } from 'react'


export default function DocIframe({ src }: { src: string }) {
    const [message, setMessage] = useState('加载中...')

    return (
        <Box>
            {message && <Typography variant='h5' margin={1.5}>{message}</Typography>}
            <iframe style={{
                border: 'none',
                height: window.innerHeight < window.innerWidth ? '80vh' : '90vh',
                width: '100%',
            }}
                srcDoc={src}
                loading="lazy"
                onLoad={() => setMessage('')}
            />
        </Box>
    )
}
