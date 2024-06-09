import { Box, Button, Link, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { getRandomNum } from '@/utils/randomUtil';
import { useState } from 'react';

type Ad = {
    text: string;
    url?: string;
}

export interface IAds {
    ads: Ad[];
    label?: string;
}

function MyAds({ ads, label = '广告' }: IAds) {
    let x = getRandomNum(ads.length)
    const [show, setShow] = useState(true)

    return (
        <> {
            show && <Box m={1}>
                <Typography component={'span'} variant='subtitle2' mr={3}><Link href={ads[x]?.url || '#'}>{ads[x]?.text}</Link></Typography>
                <Button sx={{ color: 'GrayText', fontSize: 10 }} size='small' component={'span'}
                    onClick={() => setShow(false)}
                    endIcon={<CloseIcon />}>{label}</Button>
            </Box>}
        </>
    )
}

export default MyAds