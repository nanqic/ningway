import { Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import OutLink from '@/hooks/OutLink';
import { getRandomNum } from '@/utils/randomUtil';
import { useState } from 'react';

function MyAds() {
    const adList = [
        { text: '今生修行的重点与归宿', url: 'box.hdcxb.net/其他资料/a/sound/前行/今生修行的重點和歸宿' },
        { text: '正法念处经', url: 'box.hdcxb.net/其他资料/a/sound/前行/《正法念處經》' },
        { text: '了凡四训', url: 'box.hdcxb.net/其他资料/a/sound/了凡四訓' },
        { text: '思维无常 公案', url: 'box.hdcxb.net/其他资料/a/sound/前行/思维无常-公案' },
        { text: '有声书App', url: 'a.hdcxb.net/login2' },
    ]
    let x = getRandomNum(adList.length)
    const [show, setShow] = useState(true)

    return (
        <> {
            show && <div>

                <Typography component={'span'} mr={3}><OutLink href={adList[x]?.url}>{adList[x]?.text}</OutLink></Typography>
                <Button sx={{ color: 'GrayText', fontSize: 10 }} size='small' component={'span'}
                    onClick={() => setShow(false)}
                    endIcon={<CloseIcon />}>广告</Button>
            </div>}
        </>
    )
}

export default MyAds