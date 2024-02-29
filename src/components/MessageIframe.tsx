import { Box, Typography } from '@mui/material'
import { useState } from 'react'


export default function MessageIframe({ src }: { src: string }) {
    const [message, setMessage] = useState('请节约资源...')

    return (
        <Box>
            {message && <Typography variant='h5' margin={1.5}>{message}</Typography>}
            <iframe style={{
                border: 'none',
                height: window.innerHeight < window.innerWidth ? '80vh' : '90vh',
                width: '100%',
            }}
                src={src}
                onLoad={() => setMessage('')}
            />
        </Box>
    )
}
