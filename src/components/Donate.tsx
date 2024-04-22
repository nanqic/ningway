import { Box, Button, Typography } from '@mui/material'
import NotFound from './NotFound'
import QRcodBaseUA from './QRcodBaseUA'
import { getPlaystatSize } from '@/utils/dbUtil'

export default function Donate() {
    const total: number = getPlaystatSize()

    if (total < 10) {
        return <NotFound />
    }

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
            <Typography variant='subtitle2'>
                提示：为了更好地为您服务，请在捐赠时<br />
                备注您的邮箱，用该邮箱登录留言系统
            </Typography>
            <Typography sx={{ mt: 5 }} variant="subtitle2">
                愿访此网人，悉发菩提心。
            </Typography>
        </Box>
    )
}
