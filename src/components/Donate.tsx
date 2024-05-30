import { Box, Button, Link, Typography } from '@mui/material'
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
            <h4>
                请长按二维码保存，再用微信/支付宝扫一扫
            </h4>
            <i><h5> 说明：此网站与任何组织无关，详情查看 <Link href='/about'>关于本站</Link></h5></i>
            <Typography sx={{ mt: 5 }} variant="subtitle2">
                愿访此网人，悉发菩提心。
            </Typography>
        </Box>
    )
}
