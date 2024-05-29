import { Box, Button, Typography } from '@mui/material'
import NotFound from './NotFound'
import QRcodBaseUA from './QRcodBaseUA'
import { getPlaystatSize } from '@/utils/dbUtil'

export default function Donate() {
    // const total: number = getPlaystatSize()

    // if (total < 10) {
    //     return <NotFound />
    // }

    return (
        <Box textAlign='center'>
            <Box display={"flex"} alignItems={"center"}>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={() => history.go(-1)}> 返回</Button>
                前一个页面
            </Box>
            <Typography margin={1} variant="h5">
                勤劳如山王，不如积微福。<br />
            </Typography>
            <QRcodBaseUA />
            <h5>
                请长按二维码保存，再用微信/支付宝扫一扫
            </h5>
            <Typography sx={{ mt: 5 }} variant="subtitle2">
                愿访此网人，悉发菩提心。
            </Typography>
        </Box>
    )
}
