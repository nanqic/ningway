import { Box, Button, Link, Typography } from '@mui/material'
import NotFound from './NotFound'
import QRcodBaseUA from './QRcodBaseUA'
import { getPlaystatSize } from '@/utils/dbUtil'
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

export default function Donate() {
    const total: number = getPlaystatSize()

    if (total < 3) {
        return <NotFound />
    }

    return (
        <Box textAlign='center'>
            <Box display={"flex"} alignItems={"center"}>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={() => history.go(-1)} startIcon={<KeyboardReturnOutlinedIcon />}> 返回</Button>
            </Box>
            <QRcodBaseUA />
            <h4>
                长按二维码识别，或点击保存
            </h4>
            <i><h5> 说明：此网站与任何组织无关，详情查看 <Link href='/about'>关于本站</Link></h5></i>
            <Typography sx={{ mt: 5 }} variant="subtitle2">
                愿访此网者，悉发菩提心。
            </Typography>
        </Box>
    )
}
